'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import ScrollReveal from '../components/ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiGithubFill,
  RiExternalLinkLine,
  RiHtml5Fill,
  RiCss3Fill,
  RiJavascriptFill
} from 'react-icons/ri';
import { FiFigma } from 'react-icons/fi';
import { SiTailwindcss, SiNextdotjs, SiMysql } from 'react-icons/si';

// Types
type ProjectCategory = 'Sites' | 'Apps' | 'Design' | 'Projectos' | 'Trabalhos';

interface Technology {
  name: string;
  icon: React.ReactNode;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  categories: ProjectCategory[];
  links: {
    github?: string;
    figma?: string;
    demo?: string;
  };
}

// Filter categories
const FILTER_CATEGORIES = ['Todos', 'Sites', 'Apps', 'Design', 'Projectos', 'Trabalhos'] as const;
type FilterType = typeof FILTER_CATEGORIES[number];

/**
 * Projects component displays filterable project cards
 */
const Projects: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const textColorClass = darkMode ? 'text-white' : 'text-black';
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');
  
  // Create projects data with useMemo
  const projects = useMemo<Project[]>(() => [
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
      categories: ['Sites', 'Trabalhos'],
      links: {
        demo: "https://supa-servicos.com/"
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
      categories: ['Sites', 'Trabalhos'],
      links: {
        demo: "https://cyscomp.co.ao/"
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
      categories: ['Sites', 'Trabalhos'],
      links: {
        demo: "https://chante-dompig.com"
      }
    },
    // Add more projects as needed
  ], []);
  
  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') {
      return projects;
    }
    return projects.filter(project => 
      project.categories.includes(activeFilter as ProjectCategory)
    );
  }, [projects, activeFilter]);
  
  return (
    <div className={`w-full py-14 ${textColorClass}`}>
      <ScrollReveal>
        <h2 className="mb-8 font-bold text-3xl text-center">Meus Projetos</h2>
      </ScrollReveal>
      
      {/* Filter categories */}
      <ScrollReveal direction="none" className="mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {FILTER_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </ScrollReveal>
      
      {/* Projects grid */}
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex"
            >
              <ScrollReveal direction="up" delay={0.1} className="w-full">
                <div className="bg-card shadow-md hover:shadow-lg rounded-lg h-full overflow-hidden hover:scale-[1.02] transition-transform duration-300 transform">
                  <div className="relative bg-gray-300 h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-semibold text-xl">{project.title}</h3>
                    <p className="mb-4 text-sm">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum projeto encontrado nessa categoria.
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(Projects);