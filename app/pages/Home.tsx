import React from 'react';
import Image from 'next/image';
import { RiGithubFill, RiLinkedinBoxFill, RiMailFill, RiPhoneFill, RiExternalLinkLine, RiHtml5Fill, RiCss3Fill, RiJavascriptFill, RiCodeSSlashFill, RiDoubleQuotesR, RiBuilding3Line, RiPaintBrushLine } from 'react-icons/ri';
import { FiFigma } from 'react-icons/fi';
import { SiNextdotjs, SiTailwindcss, SiMysql } from 'react-icons/si';

import ScrollReveal from '../components/ui/ScrollReveal';
import OutlineText from '../components/ui/OutlineText';
import PulseButton from '../components/ui/PulseButton';

const Home = ({
  darkMode,
  onNavigate
}: {
  darkMode: boolean;
  onNavigate?: (sectionId: 'home' | 'sobre' | 'projectos' | 'contactos') => void;
}) => {
  const textColorClass = darkMode ? 'text-white' : 'text-black';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to handle "Ver detalhes" click
  const handleVerDetalhesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('sobre');
    }
  };

  // Function to handle "Ver Projectos" click
  const handleVerProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('projectos');
    }
  };

  // Featured projects data - using the same structure as in Projects.tsx
  const featuredProjects = [
    {
      id: 1,
      title: "Supa Serviços Website",
      description: "Um website com visual futurista alinhado a visão tecnologica da empresa.",
      image: "/img/projects/supa.gif",
      technologies: [
        { name: "HTML", icon: <RiHtml5Fill className="text-[#E34F26]" size={16} /> },
        { name: "CSS", icon: <RiCss3Fill className="text-[#1572B6]" size={16} /> },
        { name: "JavaScript", icon: <RiJavascriptFill className="text-[#F7DF1E]" size={16} /> }
      ],
      links: {
        demo: "https://supa-servicos.com/",
        github: undefined,
        figma: undefined
      }
    },
    {
      id: 2,
      title: "CYSOMP Website",
      description: "Um website para a empresa de consultoria em cyber segurança.",
      image: "/img/projects/cyscomp.gif",
      technologies: [
        { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" size={16} /> },
        { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" size={16} /> },
        { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" size={16} /> }
      ],
      links: {
        demo: "https://cyscomp.co.ao/",
        github: undefined,
        figma: undefined
      }
    },
    {
      id: 3,
      title: "Chante Dompig Website",
      description: "Trabalho feito em nome da empresa Supa Serviços site para a jogadora do AC Milan.",
      image: "/img/projects/chante.gif",
      technologies: [
        { name: "HTML", icon: <RiHtml5Fill className="text-[#E34F26]" size={16} /> },
        { name: "CSS", icon: <RiCss3Fill className="text-[#1572B6]" size={16} /> },
        { name: "JavaScript", icon: <RiJavascriptFill className="text-[#F7DF1E]" size={16} /> }
      ],
      links: {
        demo: "https://chante-dompig.com",
        github: undefined,
        figma: undefined
      }
    }
  ];

  return (
    <div className="z-10 relative mx-auto px-4 sm:px-4 lg:px-6 w-full">

      {/* Hero Section - with transparent background */}
      <section id="home" className={`flex md:flex-row flex-col-reverse items-center justify-center md:py-32 min-h-screen  ${textColorClass}`}>
        <ScrollReveal direction="right" className="mb-8 md:mb-0 md:w-1/2">
          <h1 className="mb-4 font-bold text-3xl md:text-6xl">Venancio Wapinda</h1>
          <h2 className="mb-6 text-primary text-xl md:text-xl">UI/UX Designer & Dev Front-End</h2>
          <p className="mb-8 text-lg">
            Transformando ideias em experiências digitais incríveis. Vamos criar algo extraordinário juntos? Explore meu portfólio e descubra como sua visão pode ganhar vida!
          </p>
          <div className="flex space-x-4">
            <a href="#contactos" onClick={(e) => scrollToSection(e, 'contactos')} className="bg-primary hover:bg-primary-hover px-6 py-2 rounded-md text-white transition-colors">
              Contactar
            </a>
            <a href="#projectos" onClick={(e) => scrollToSection(e, 'projectos')} className="hover:bg-primary px-6 py-2 border border-primary rounded-md text-primary hover:text-white transition-colors">
              Ver Projectos
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" className="flex justify-center w-full md:w-1/2">
          <div className="relative w-full max-w-[280px] md:max-w-[800px] md:h-96 aspect-square md:aspect-auto">
            <Image
              src="/img/hero-img2.webp"
              alt="Venancio Wapinda"
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              className="object-contain"
              priority
              style={{ objectPosition: 'center center' }}
              onError={(e) => {
                console.error('Image failed to load:', e);
                // Fallback to a basic styling if image fails
                (e.target as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.1)';
              }}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20">
        <ScrollReveal>
          <h2 className="mb-10 font-bold text-3xl text-center">Sobre Mim</h2>
        </ScrollReveal>

        <div className="flex md:flex-row flex-col gap-10">
          <ScrollReveal direction="right" delay={0.2} className="flex flex-col gap-1 md:w-1/2">
            <h3 className="mb-4 font-semibold text-xl">Quem Sou</h3>
            <p className="mb-4">
              Desenvolvedor Full Stack apaixonado por criar soluções web inovadoras e eficientes.
              Com experiência em desenvolvimento front-end e Ui/Ux Design, tenho trabalhado em projetos diversos que me permitiram aprimorar minhas habilidades técnicas e de resolução de problemas.
            </p>
            <p>
              Focado em entregar experiências de usuário excepcionais e código limpo, busco constantemente aprender novas tecnologias e metodologias para melhorar meu trabalho e contribuir para o sucesso dos projetos em que participo.
            </p>

            <a
              href="#"
              className="mt-2 font-bold text-md text-primary hover:underline"
              onClick={handleVerDetalhesClick}  // Updated handler
            >
              Ver detalhes →
            </a>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.4} className="md:w-1/2">
            <h3 className="mb-4 font-semibold text-xl">Minhas Competências</h3>
            <div className="gap-4 grid grid-cols-2">
              <div className="bg-card p-4 rounded-md">
                <h4 className="mb-2 font-medium">Front-end</h4>
                <div className="flex flex-wrap gap-3">
                  <Image src="/icons/react.svg" alt="React" width={24} height={24} />
                  <Image src="/icons/nextjs.svg" alt="Next.js" width={24} height={24} />
                  <Image src="/icons/laravel.svg" alt="Laravel" width={24} height={24} />
                  <Image src="/icons/ionic.svg" alt="Ionic" width={24} height={24} />
                  <Image src="/icons/tailwind.svg" alt="Tailwind CSS" width={24} height={24} />
                  <Image src="/icons/javascript.svg" alt="JavaScript" width={24} height={24} />
                  <Image src="/icons/typescript.svg" alt="TypeScript" width={24} height={24} />
                </div>
              </div>
              <div className="bg-card p-4 rounded-md">
                <h4 className="mb-2 font-medium">Ui/Ux Design</h4>
                <div className="flex flex-wrap gap-3">
                  <Image src="/icons/canva.svg" alt="Canva" width={24} height={24} />
                  <Image src="/icons/figma.svg" alt="Figma" width={24} height={24} />
                  <Image src="/icons/photoshop.svg" alt="Photoshop" width={24} height={24} />
                  <Image src="/icons/xd.svg" alt="Adobe XD" width={24} height={24} />
                </div>
              </div>
              <div className="bg-card p-4 rounded-md">
                <h4 className="mb-2 font-medium">Ferramentas</h4>
                <div className="flex flex-wrap gap-3">
                  <Image src="/icons/git.svg" alt="Git" width={24} height={24} />
                  <Image src="/icons/github.svg" alt="GitHub" width={24} height={24} />
                  <Image src="/icons/docker.svg" alt="Docker" width={24} height={24} />
                  <Image src="/icons/vscode.svg" alt="VS Code" width={24} height={24} />
                  <Image src="/icons/figma.svg" alt="Figma" width={24} height={24} />
                </div>
              </div>
              <div className="bg-card p-4 rounded-md">
                <h4 className="mb-1 font-medium">Soft Skills</h4>
                <p className="text-sm">Trabalho em equipe, Resolução de problemas, Comunicação</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projectos" className="py-20">
        <ScrollReveal>
          <h2 className="mb-10 font-bold text-3xl text-center">Meus Projectos</h2>
        </ScrollReveal>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.id} direction="up" delay={0.1 * (index + 1)}>
              <div className="bg-card shadow-md hover:shadow-lg rounded-lg h-full overflow-hidden hover:scale-[1.02] transition-transform duration-300 transform">
                <div className="relative bg-gray-300 h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    unoptimized={project.image.endsWith('.gif')} // Add this line
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-semibold text-xl">{project.title}</h3>
                  <p className="mb-4 text-sm">
                    {project.description}
                  </p>

                  {/* Technologies with icons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs"
                      >
                        {tech.icon}
                        {tech.name}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 mt-4">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-gray-800 hover:bg-black px-3 py-1 rounded text-white text-sm transition-colors"
                      >
                        <RiGithubFill size={18} />
                        Code
                      </a>
                    )}
                    {project.links.figma && (
                      <a
                        href={project.links.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-[#F24E1E] hover:bg-[#EB3C0F] px-3 py-1 rounded text-white text-sm transition-colors"
                      >
                        <FiFigma size={18} />
                        Design
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-primary hover:bg-primary-hover ml-auto px-3 py-1 rounded text-white text-sm transition-colors"
                      >
                        <RiExternalLinkLine size={18} />
                        Abrir Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className='flex justify-center items-center mt-10'>
          <a
            href="#"
            onClick={handleVerProjects}
            className="bg-primary hover:bg-primary-hover px-6 py-2 rounded-md text-white transition-colors"
          >
            Mais Projectos
          </a>
        </ScrollReveal>
      </section>


      {/* CTA - Seção Futurista */}
      <section className="relative py-24 overflow-hidden">
        {/* Fundo com gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

        <div className="mx-auto px-4 max-w-6xl">
          {/* Componente de texto com outline animado */}
          <div className="flex justify-center items-center mb-8 h-[28px] md:h-[80px]">
            <OutlineText text="Pronto Para a Magia?" className="w-full" />
          </div>
          <ScrollReveal>
            <div className="flex justify-center">
              <ScrollReveal direction="up" delay={0.5}>
                <PulseButton href="#contactos" showWhatsApp={true}>
                  Vamos Conversar!
                </PulseButton>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>

        {/* Elementos decorativos - linhas de grid futuristas */}
        <div className="z-[-1] absolute inset-0">
          <div className="top-0 right-0 left-0 absolute bg-gradient-to-r from-transparent via-primary/20 to-transparent h-px"></div>
          <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-r from-transparent via-primary/20 to-transparent h-px"></div>
          <div className="top-1/4 right-0 left-0 absolute bg-gradient-to-r from-transparent via-primary/10 to-transparent h-px"></div>
          <div className="right-0 bottom-1/4 left-0 absolute bg-gradient-to-r from-transparent via-primary/10 to-transparent h-px"></div>
        </div>
      </section>

      {/* Feedbacks */}
      <section className="py-20">
        <ScrollReveal>
          <h2 className="mb-10 font-bold text-3xl text-center">Feedbacks</h2>
        </ScrollReveal>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="group relative bg-white dark:bg-gray-800 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-md border border-gray-200 hover:border-primary dark:hover:border-primary dark:border-gray-700 rounded-xl h-full overflow-hidden transition-all duration-300">
              {/* Efeito de Glow no Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              {/* Borda luminosa no topo */}
              <div className="group-hover:via-primary/80 top-0 right-0 left-0 absolute bg-gradient-to-r from-primary/0 via-primary to-primary/0 h-[2px] transition-all duration-500"></div>

              {/* Conteúdo */}
              <div className="z-10 relative flex flex-col justify-between p-6 h-full">
                <div className="mb-6 text-gray-700 dark:text-gray-300 text-lg italic">
                  &ldquo;Venancio é excepcional em UI/UX, transformando conceitos complexos em designs intuitivos e atraentes.&rdquo;
                </div>

                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="p-[2px] border-2 border-primary rounded-full w-12 h-12 overflow-hidden">
                      <Image
                        src="/img/IMG_7450.webp"
                        alt="Marta Silva"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>

                    {/* Indicador de status */}
                    <div className="right-0 bottom-0 absolute bg-green-500 border border-white rounded-full w-3 h-3"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Marta Silva</h4>
                    <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                      <RiBuilding3Line /> CEO, TechInova
                    </p>
                  </div>
                  <div className="ml-auto">
                    <RiDoubleQuotesR className="group-hover:text-primary/40 text-primary/20 transition-colors duration-300" size={28} />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="group relative bg-white dark:bg-gray-800 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-md border border-gray-200 hover:border-primary dark:hover:border-primary dark:border-gray-700 rounded-xl h-full overflow-hidden transition-all duration-300">
              {/* Efeito de Glow no Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              {/* Borda luminosa no topo */}
              <div className="group-hover:via-primary/80 top-0 right-0 left-0 absolute bg-gradient-to-r from-primary/0 via-primary to-primary/0 h-[2px] transition-all duration-500"></div>

              {/* Conteúdo */}
              <div className="z-10 relative flex flex-col justify-between p-6 h-full">
                <div className="mb-6 text-gray-700 dark:text-gray-300 text-lg italic">
                  &ldquo;Colaborar com o Venancio foi incrível - entregou além das expectativas e trouxe soluções criativas que transformaram nossa visão.&rdquo;
                </div>

                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="p-[2px] border-2 border-primary rounded-full w-12 h-12 overflow-hidden">
                      <Image
                        src="/img/IMG_7450.webp"
                        alt="João Santos"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>

                    {/* Indicador de status */}
                    <div className="right-0 bottom-0 absolute bg-green-500 border border-white rounded-full w-3 h-3"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">João Santos</h4>
                    <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                      <RiCodeSSlashFill /> CTO, CodeSync
                    </p>
                  </div>
                  <div className="ml-auto">
                    <RiDoubleQuotesR className="group-hover:text-primary/40 text-primary/20 transition-colors duration-300" size={28} />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="group relative bg-white dark:bg-gray-800 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-md border border-gray-200 hover:border-primary dark:hover:border-primary dark:border-gray-700 rounded-xl h-full overflow-hidden transition-all duration-300">
              {/* Efeito de Glow no Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              {/* Borda luminosa no topo */}
              <div className="group-hover:via-primary/80 top-0 right-0 left-0 absolute bg-gradient-to-r from-primary/0 via-primary to-primary/0 h-[2px] transition-all duration-500"></div>

              {/* Conteúdo */}
              <div className="z-10 relative flex flex-col justify-between p-6 h-full">
                <div className="mb-6 text-gray-700 dark:text-gray-300 text-lg italic">
                  &ldquo;A qualidade do trabalho do Venancio é impressionante. Profissional, criativo e extremamente responsivo durante todo o processo.&rdquo;
                </div>

                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="p-[2px] border-2 border-primary rounded-full w-12 h-12 overflow-hidden">
                      <Image
                        src="/img/IMG_7450.webp"
                        alt="Ana Costa"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>

                    {/* Indicador de status */}
                    <div className="right-0 bottom-0 absolute bg-green-500 border border-white rounded-full w-3 h-3"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Ana Costa</h4>
                    <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                      <RiPaintBrushLine /> Dir. Criativa, DesignHub
                    </p>
                  </div>
                  <div className="ml-auto">
                    <RiDoubleQuotesR className="group-hover:text-primary/40 text-primary/20 transition-colors duration-300" size={28} />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contactos" className="py-20">
        <ScrollReveal>
          <h2 className="mb-10 font-bold text-3xl text-center">Entre em Contacto</h2>
        </ScrollReveal>

        <div className="flex md:flex-row flex-col gap-10">
          <ScrollReveal direction="right" delay={0.2} className="md:w-1/2">
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium text-sm">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="bg-background p-3 border border-input rounded-md w-full"
                  placeholder="Seu nome"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-medium text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  className="bg-background p-3 border border-input rounded-md w-full"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 font-medium text-sm">Mensagem</label>
                <textarea
                  id="message"
                  rows={5}
                  className="bg-background p-3 border border-input rounded-md w-full"
                  placeholder="Sua mensagem..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover px-6 py-3 rounded-md w-full text-white transition-colors"
              >
                Enviar Mensagem
              </button>
            </form>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.4} className="md:w-1/2">
            <div className="bg-card p-6 rounded-lg h-full">
              <h3 className="mb-6 font-semibold text-xl">Informações de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <RiMailFill size={24} className="mr-4 text-primary" />
                  <span>venancio@example.com</span>
                </div>
                <div className="flex items-center">
                  <RiPhoneFill size={24} className="mr-4 text-primary" />
                  <span>+244 123 456 789</span>
                </div>
                <div className="flex items-center mt-8">
                  <a href="https://github.com" className="mr-4" target="_blank" rel="noopener noreferrer">
                    <RiGithubFill size={32} className="text-foreground hover:text-primary transition-colors" />
                  </a>
                  <a href="https://linkedin.com" className="mr-4" target="_blank" rel="noopener noreferrer">
                    <RiLinkedinBoxFill size={32} className="text-foreground hover:text-primary transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;