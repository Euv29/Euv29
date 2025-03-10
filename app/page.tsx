'use client';
import React, { useState, useEffect } from 'react';
import { RiCloseLine, RiMenu3Line, RiSunLine, RiMoonLine, RiArrowDownSLine } from 'react-icons/ri';
import Image from 'next/image';
import './globals.css';

// Pages
import HomePage from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';

// Define valid section names
type SectionName = 'home' | 'sobre' | 'projectos' | 'contactos';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [buttonClickable, setButtonClickable] = useState(false); 

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            
            // Dispatch a new event when progress completes
            window.dispatchEvent(new CustomEvent('progressComplete'));
            
            // After progress completes and the transition finishes, enable the button
            setTimeout(() => {
              setShowButton(true);
              setButtonClickable(true);
            }, 400);
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleStartClick = () => {
    if (!buttonClickable) return;
    
    // Create flash effect with smooth transition
    setIsFlashing(true);
    
    // After flash effect reaches full opacity, trigger app start
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('appStart'));
    }, 500); // Increased from 300ms to 500ms to allow for fade-in
  };

  return (
    <div className="z-[100] fixed inset-0 flex justify-center items-center w-full h-screen">
      {/* Flash overlay with smooth transition - now using primary color */}
      <div
        className="z-50 fixed inset-0 bg-primary transition-opacity duration-1000 ease-in-out pointer-events-none"
        style={{ opacity: isFlashing ? 1 : 0 }}
        aria-hidden="true"
      />
      
      <div className="relative flex justify-center items-center">
        {/* Progress Bar */}
        <div
          className={`bg-[#000] rounded-full transition-all duration-700 ease-in-out absolute  ${isComplete ? 'w-28 h-28 opacity-0' : 'w-72 h-1 opacity-100'
            }`}
        >
          <div
            className="progressFill"
            style={{ '--progress-width': `${progress}%` } as React.CSSProperties}
          />
        </div>

        {/* Start Button - Add pointer-events-none when not clickable */}
        <button
          type="button"
          onClick={handleStartClick}
          disabled={!buttonClickable}
          className={`flex justify-center items-center border border-[#0057FF] shadow-lg rounded-full focus:outline-none w-44 h-44 text-[#0057FF] hover:scale-110 transition-all duration-700 transform z-10 relative ${
            showButton ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-50'
          } ${
            buttonClickable ? 'cursor-pointer' : 'cursor-not-allowed pointer-events-none'
          }`}
          aria-disabled={!buttonClickable}
        >
          <span className="font-medium text-sm">
            {buttonClickable ? 'START' : 'LOADING...'}
          </span>
          {/* Pulsating inner circle */}
          <div className={`absolute w-40 h-40 rounded-full border border-[#0057FF] animate-ping opacity-30`}></div>
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true); // New state for loader visibility
  const [flashType, setFlashType] = useState<'primary' | 'white'>('primary'); // New state for flash type
  const [activeSection, setActiveSection] = useState<SectionName>('home');
  const [activeContactSection, setActiveContactSection] = useState(false); // New state for active contact section

  // Handle app loading
  useEffect(() => {
    const handleAppStart = () => {
      setFlashType('primary'); // Use primary flash for app start
      console.log("App start event received in main page component");
      // First set the fade-in state to start transition
      setFadeIn(true);
      
      // Then remove loader after transition
      setTimeout(() => {
        setLoading(false);
        // Instead of removing the Loader, keep it visible for a longer time
        setTimeout(() => {
          setLoaderVisible(false); // Hide the loader after all transitions complete
        }, 2000); // Give enough time for background to appear
      }, 1000); // Wait for fade-in animation 
    };
    
    window.addEventListener('appStart', handleAppStart);
    return () => window.removeEventListener('appStart', handleAppStart);
  }, []);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    // Run only on client-side
    const initDarkMode = () => {
      // First check for saved preference
      const savedDarkMode = localStorage.getItem('darkMode');

      if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
      } else {
        // If no saved preference, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
    };

    initDarkMode();
  }, []);

  // Apply dark mode class when state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Toggle dark mode function with smoother flash effect
  const toggleDarkMode = () => {
    setFlashType('white'); // Use white flash for dark mode toggle
    // Start flash effect
    setIsFlashing(true);

    // Toggle dark mode after the flash reaches full opacity
    setTimeout(() => {
      setDarkMode(prev => !prev);

      // Start fading out after the mode has changed
      setTimeout(() => {
        setIsFlashing(false);
      }, 500); // Wait a bit before starting fade-out
    }, 500); // Wait for fade-in to complete before changing mode
  };

  // Function to handle navigation without showing hash in URL
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: SectionName) => {
    e.preventDefault();
    
    // Close mobile menu if it's open
    if (mobileMenuOpen) setMobileMenuOpen(false);
    
    // Case 1: If already in the active section, just scroll to it without changing URL
    if (activeSection === sectionId) {
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        // Scroll without changing hash
        targetSection.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', window.location.pathname); // Remove any hash
      }
      return;
    }
    
    // Case 2: If user clicks on Home while in another section, navigate to home and scroll to top
    if (sectionId === 'home' && activeSection !== 'home') {
      // Create flash effect
      setFlashType('primary');
      setIsFlashing(true);
      
      // Switch to home after flash reaches full opacity
      setTimeout(() => {
        setActiveSection('home');
        
        // Start fading out the flash
        setTimeout(() => {
          setIsFlashing(false);
          
          // After flash fades out, scroll to top of home without changing URL
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.replaceState(null, '', window.location.pathname); // Remove any hash
          }, 300);
        }, 300);
      }, 500);
      
      return;
    }
  
    // Case 3: If user clicks on Contactos, special handling
    if (sectionId === 'contactos') {
      // If already on home, just scroll without changing URL
      if (activeSection === 'home') {
        const contactsSection = document.getElementById('contactos');
        if (contactsSection) {
          contactsSection.scrollIntoView({ behavior: 'smooth' });
          history.replaceState(null, '', window.location.pathname); // Remove any hash
        }
        return;
      }
      
      // Otherwise need to switch to home first then scroll
      setFlashType('primary');
      setIsFlashing(true);
      
      setTimeout(() => {
        setActiveSection('home');
        
        setTimeout(() => {
          setIsFlashing(false);
          
          // Wait for home component to render before scrolling
          setTimeout(() => {
            const contactsSection = document.getElementById('contactos');
            if (contactsSection) {
              contactsSection.scrollIntoView({ behavior: 'smooth' });
              history.replaceState(null, '', window.location.pathname); // Remove any hash
            }
          }, 500); // Longer delay to ensure component is mounted
        }, 300);
      }, 500);
      
      return;
    }
    
    // Default case: Regular section navigation for Sobre and Projectos
    setFlashType('primary');
    setIsFlashing(true);
    
    setTimeout(() => {
      setActiveSection(sectionId);
      
      setTimeout(() => {
        setIsFlashing(false);
        history.replaceState(null, '', window.location.pathname); // Remove any hash
      }, 300);
    }, 500);
  };

  // Track scroll position for active indication without changing URL
  useEffect(() => {
    // Function to check if scrolled to contactos
    const handleScroll = () => {
      if (activeSection === 'home') {
        const contactsSection = document.getElementById('contactos');
        if (contactsSection) {
          const rect = contactsSection.getBoundingClientRect();
          // If contacts section is more than 30% in view, consider it active
          if (rect.top < window.innerHeight * 0.7) {
            setActiveContactSection(true);
          } else {
            setActiveContactSection(false);
          }
        }
      } else {
        // If not on home, make sure contact is not active
        setActiveContactSection(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Function to render the active component
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'sobre':
        return <About darkMode={darkMode} />;
      case 'projectos':
        return <Projects darkMode={darkMode} />;
      case 'home':
      default:
        return (
          <HomePage 
            darkMode={darkMode} 
            onNavigate={(sectionId) => {
              // Create a synthetic event that can be passed to handleNavigation
              const syntheticEvent = {
                preventDefault: () => {}
              } as React.MouseEvent<HTMLAnchorElement>;
              
              handleNavigation(syntheticEvent, sectionId);
            }} 
          />
        );
    }
  };

  return (
    <>
      {/* Flash overlay with smooth transition - now using primary color */}
      <div
        className="z-[200] fixed inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none"
        style={{ 
          opacity: isFlashing ? 1 : 0,
          backgroundColor: flashType === 'primary' ? 'var(--primary)' : 'white' 
        }}
        aria-hidden="true"
      />

      {/* Keep loader visible based on loaderVisible state, not loading state */}
      {loaderVisible && <Loader />}
      
      <div className={`flex flex-col justify-center items-center min-h-full text-foreground transition-opacity duration-700 
        ${loading ? 'opacity-0' : 'opacity-100'} 
        ${fadeIn ? 'block' : 'hidden'}`}
      >
        {/* Header */}
        <header className="top-0 z-30 fixed flex justify-between items-center bg-white/10 dark:bg-gray-900/10 shadow-sm backdrop-blur-sm px-6 py-4 w-full max-w-screen-2xl">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(e, 'home');
              history.replaceState(null, '', window.location.pathname);
            }} 
            className="flex items-center"
          >
            {darkMode ? (
              <Image src="/img/logo-light.webp" alt="Logo" width={50} height={50} />
            ) : (
              <Image src="/img/logo-dark.webp" alt="Logo" width={50} height={50} />
            )}
          </a>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="focus:outline-none text-blue-800 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <RiCloseLine size={24} />
              ) : (
                <RiMenu3Line size={24} />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(e, 'home');
                  history.replaceState(null, '', window.location.pathname);
                }}
                className={`transition-colors ${activeSection === 'home' && !activeContactSection ? 'text-primary font-medium' : 'hover:text-blue-600'}`}
              >
                Home
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(e, 'sobre');
                  history.replaceState(null, '', window.location.pathname);
                }} 
                className={`transition-colors ${activeSection === 'sobre' ? 'text-primary font-medium' : 'hover:text-blue-600'}`}
              >
                Quem Sou
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(e, 'projectos');
                  history.replaceState(null, '', window.location.pathname);
                }} 
                className={`transition-colors ${activeSection === 'projectos' ? 'text-primary font-medium' : 'hover:text-blue-600'}`}
              >
                Projectos
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(e, 'contactos');
                  history.replaceState(null, '', window.location.pathname);
                }} 
                className={`transition-colors ${
                  activeSection === 'home' && activeContactSection ? 'text-primary font-medium' : 'hover:text-blue-600'
                }`}
              >
                Contactos
              </a>
            </nav>

            {/* Desktop dark mode button: */}
            <button
              onClick={toggleDarkMode}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full"
            >
              {darkMode ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
            </button>

            <div className="group relative">
              <button
                className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full"
              >
                <span className="font-medium text-sm">PT</span>
                <RiArrowDownSLine size={16} />
              </button>
              <div className="group-hover:visible invisible right-0 absolute bg-white dark:bg-gray-900 opacity-0 group-hover:opacity-100 shadow-lg mt-2 rounded-md w-24 transition-all duration-300">
                <div className="py-1">
                  <button className="block hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 w-full text-sm text-left">PT</button>
                  <button className="block hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 w-full text-sm text-left">EN</button>
                </div>
              </div>
            </div>

            <a
              href="/portfolio.pdf"
              className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white transition-colors"
              download
            >
              Baixar Portfolio
            </a>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden top-16 right-0 left-0 z-10 absolute bg-white dark:bg-gray-800 shadow-md p-4">
              <nav className="flex flex-col space-y-4">
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(e, 'home');
                    history.replaceState(null, '', window.location.pathname);
                  }} 
                  className={`transition-colors ${activeSection === 'home' && !activeContactSection ? 'text-primary font-medium' : 'hover:text-blue-600'}`}
                >
                  Home
                </a>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(e, 'sobre');
                    history.replaceState(null, '', window.location.pathname);
                  }} 
                  className={`transition-colors ${activeSection === 'sobre' ? 'text-primary font-medium' : 'hover:text-blue-600'}`}
                >
                  Quem Sou
                </a>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(e, 'projectos');
                    history.replaceState(null, '', window.location.pathname);
                  }} 
                  className={`transition-colors ${activeSection === 'projectos' ? 'text-primary font-medium' : 'hover:text-blue-600'}`}
                >
                  Projectos
                </a>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(e, 'contactos');
                    history.replaceState(null, '', window.location.pathname);
                  }} 
                  className={`transition-colors ${
                    activeSection === 'home' && activeContactSection ? 'text-primary font-medium' : 'hover:text-blue-600'
                  }`}
                >
                  Contactos
                </a>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  {/* Mobile dark mode button: */}
                  <button
                    onClick={toggleDarkMode}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full"
                  >
                    {darkMode ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
                  </button>

                  <a
                    href="/portfolio.pdf"
                    className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white transition-colors"
                    download
                  >
                    Baixar Portfolio
                  </a>
                </div>
              </nav>
            </div>
          )}
        </header>
        <main className="flex flex-col flex-1 justify-between items-center mt-16 px-4 md:px-8 w-full max-w-screen-2xl content-area">
          {/* Render the active section component */}
          {renderActiveSection()}

        </main>
        <footer className='flex flex-col flex-1 justify-between items-center bg-card px-4 md:px-8 w-full max-w-screen-2xl'>
          <section>
            <div className="py-6 dark:border-gray-700 border-t w-full text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} Venâncio Wapinda. Todos os direitos reservados.
              </p>
              <p className="mt-1 text-gray-500 dark:text-gray-500 text-xs">
                Desenvolvido com ❤️ pelo webdesigner mais mau de Angola!
              </p>
            </div>
          </section>
        </footer>
      </div>
    </>
  );
}
