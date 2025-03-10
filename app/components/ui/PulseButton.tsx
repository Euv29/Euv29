'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RiWhatsappFill } from 'react-icons/ri';

interface PulseButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
  showWhatsApp?: boolean;
}

const PulseButton: React.FC<PulseButtonProps> = ({ 
  children, 
  onClick, 
  href, 
  className = '',
  type = 'button',
  external = false,
  showWhatsApp = true
}) => {
  // Conteúdo interno do botão com o ícone do WhatsApp
  const buttonContent = (
    <>
      <span className="z-10 relative">{children}</span>
      
      {showWhatsApp && (
        <motion.div 
          className="inline-flex z-10 relative items-center ml-2"
          animate={{ 
            rotateY: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotateY: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <RiWhatsappFill size={20} className="text-white" />
        </motion.div>
      )}
    </>
  );

  // Classes comuns para o botão
  const commonClasses = `relative bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-md font-medium text-lg ${className}`;
  
  // Propriedades de animação para hover e click
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  };

  // Componente wrapper com os efeitos de pulso
  const ButtonWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block relative">
      {/* Primeira camada de pulso */}
      <motion.div
        className="absolute inset-0 bg-primary opacity-30 rounded-md"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Segunda camada de pulso */}
      <motion.div
        className="absolute inset-0 bg-primary opacity-20 rounded-md"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.2
        }}
      />
      
      {children}
    </div>
  );

  // Renderização condicional baseada no tipo de elemento
  if (href) {
    if (external) {
      // Link externo
      return (
        <ButtonWrapper>
          <motion.a
            href={href}
            className={`${commonClasses} inline-flex items-center justify-center`}
            onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
            target="_blank"
            rel="noopener noreferrer"
            {...motionProps}
          >
            {buttonContent}
          </motion.a>
        </ButtonWrapper>
      );
    }
    
    // Link interno (Next.js)
    return (
      <ButtonWrapper>
        <Link href={href} legacyBehavior passHref>
          <motion.a 
            className={`${commonClasses} inline-flex items-center justify-center`}
            onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
            {...motionProps}
          >
            {buttonContent}
          </motion.a>
        </Link>
      </ButtonWrapper>
    );
  }
  
  // Botão padrão
  return (
    <ButtonWrapper>
      <motion.button
        type={type}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
        className={`${commonClasses} inline-flex items-center justify-center`}
        {...motionProps}
      >
        {buttonContent}
      </motion.button>
    </ButtonWrapper>
  );
};

export default PulseButton;