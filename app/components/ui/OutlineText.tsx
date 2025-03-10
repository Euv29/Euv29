'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface OutlineTextProps {
  text: string;
  className?: string;
}

const OutlineText: React.FC<OutlineTextProps> = ({ text, className = '' }) => {
  const textRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(70);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 200 });
  const [isMounted, setIsMounted] = useState(false);
  const controls = useAnimationControls();
  
  // Usando useCallback para ajustar o tamanho do texto
  // Isso resolve o warning de dependência no useEffect
  const adjustTextSize = useCallback(() => {
    if (!containerRef.current) return;
    
    // Obter dimensões do container
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    // Garantir dimensões mínimas para evitar colapso
    const effectiveWidth = Math.max(containerWidth, 200);
    const effectiveHeight = Math.max(containerHeight, 80);
    
    // Estimar tamanho de fonte ideal com base no espaço disponível
    // Usamos uma proporção que garante que o texto caiba mesmo com caracteres largos
    const estimatedFontSize = Math.min(
      effectiveWidth / (text.length * 0.65),
      effectiveHeight * 0.8
    );
    
    // Atualizar tamanho de fonte com uma margem de segurança
    const newFontSize = Math.max(16, Math.floor(estimatedFontSize * 0.9));
    
    // Calcular dimensões ideais do SVG com base na fonte
    const svgWidth = Math.max(text.length * newFontSize * 0.7, effectiveWidth);
    const svgHeight = Math.max(newFontSize * 2, effectiveHeight);
    
    // Atualizar estados apenas se houver mudanças significativas
    if (Math.abs(newFontSize - fontSize) > 2) {
      setFontSize(newFontSize);
    }
    
    setDimensions({
      width: svgWidth,
      height: svgHeight
    });
  }, [text, fontSize]);
  
  // Efeito para sinalizar que o componente está montado
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Inicialização da animação - SOMENTE após a montagem do componente
  useEffect(() => {
    if (!isMounted) return;
    
    // Iniciar ciclo de animação
    let isActive = true; // Flag para evitar atualizações após desmontagem
    
    const runAnimationCycle = async () => {
      if (!isActive) return;
      
      try {
        // Começar escondido
        await controls.start("hidden");
        if (!isActive) return;
        
        // Animar escrita
        await controls.start("writing");
        if (!isActive) return;
        
        // Aguardar com texto completo
        await new Promise(resolve => setTimeout(resolve, 3000));
        if (!isActive) return;
        
        // Animar apagando
        await controls.start("erasing");
        if (!isActive) return;
        
        // Aguardar entre ciclos
        await new Promise(resolve => setTimeout(resolve, 800));
        if (!isActive) return;
        
        // Reiniciar ciclo
        runAnimationCycle();
      } catch (error) {
        console.warn('Animation cycle interrupted:', error);
      }
    };
    
    // Iniciar com um pequeno delay
    const timer = setTimeout(() => {
      runAnimationCycle();
    }, 500);
    
    // Limpeza ao desmontar
    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [controls, isMounted]); // Dependência em isMounted garante que só execute após montagem
  
  // Ajustar tamanho quando o componente montar ou a janela for redimensionada
  useEffect(() => {
    // Primeira execução após renderização para calcular tamanho correto
    const initialTimer = setTimeout(adjustTextSize, 50);
    
    // Função de debounce para evitar muitas chamadas durante redimensionamento
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(adjustTextSize, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Também verificar quando o texto mudar
    adjustTextSize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialTimer);
      clearTimeout(resizeTimer);
    };
  }, [adjustTextSize]); // Usando a função memorizada com useCallback
  
  // Variantes de animação para o preenchimento do caminho
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    writing: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { 
          duration: 2.5,
          ease: "easeInOut" 
        },
        opacity: { 
          duration: 0.5,
          ease: "easeIn"
        }
      }
    },
    erasing: {
      pathLength: 0,
      opacity: 0.5,
      transition: {
        pathLength: { 
          duration: 1.8,
          ease: "easeInOut" 
        },
        opacity: { 
          duration: 1.8,
          ease: "easeIn" 
        }
      }
    }
  };
  
  // Efeito de glitch para dar um toque mais futurista
  const glitchEffect = {
    animate: {
      opacity: [1, 0.8, 1, 0.6, 1],
      scale: [1, 1.01, 0.99, 1],
      transition: {
        duration: 0.3,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: 4,
        repeatDelay: 3
      }
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}
    >
      <svg 
        ref={textRef} 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="textOutlineGradient" gradientTransform="rotate(10)">
            <stop offset="0%" stopColor="#0057FF">
              <animate 
                attributeName="stop-color"
                values="#0057FF; #00A3FF; #0057FF"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#00A3FF">
              <animate 
                attributeName="stop-color"
                values="#00A3FF; #0057FF; #00A3FF"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#0057FF">
              <animate 
                attributeName="stop-color"
                values="#0057FF; #00A3FF; #0057FF"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <animate 
              attributeName="x1" 
              values="0%;100%;0%" 
              dur="8s" 
              repeatCount="indefinite" 
            />
          </linearGradient>
          
          <filter id="textGlow" x="-20%" y="-20%" width="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <motion.text 
          x="50%" 
          y="50%" 
          textAnchor="middle" 
          dominantBaseline="central"
          fill="none" 
          stroke="url(#textOutlineGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ 
            fontSize: `${fontSize}px`, 
            fontWeight: 'bold',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            filter: 'url(#textGlow)'
          }}
          animate={glitchEffect.animate}
        >
          {text.split('').map((char, i) => (
            <motion.tspan 
              key={i}
              variants={pathVariants}
              initial="hidden"
              animate={controls}
              transition={{
                ...pathVariants.writing.transition,
                delay: i * 0.1
              }}
            >
              {char}
            </motion.tspan>
          ))}
        </motion.text>
      </svg>
    </div>
  );
};

export default React.memo(OutlineText);