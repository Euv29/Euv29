import React from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';
import Image from 'next/image';

const About = ({ darkMode }: { darkMode: boolean }) => {
  const textColorClass = darkMode ? 'text-white' : 'text-black';

  return (
    <div className={`w-full py-20 ${textColorClass}`}>

      <div className="flex md:flex-row flex-col items-center gap-10">
      <ScrollReveal direction="right" className="hidden md:flex justify-center md:w-2/5">
          <div className="relative w-64 md:w-96 h-64 md:h-96">
            <Image
              src="/img/IMG_7451.webp"
              alt="Venancio Wapinda"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
              />
          </div>
        </ScrollReveal>

        <section className="md:w-3/5">
          <ScrollReveal direction="left" delay={0.4} >
            <h3 className="mb-4 font-semibold text-xl">Venâncio Wapinda</h3>
            <p className="mb-4">
              Desenvolvedor Full Stack apaixonado por criar soluções web inovadoras e eficientes.
              Com experiência em desenvolvimento front-end e back-end, tenho trabalhado em projetos
              diversos que me permitiram aprimorar minhas habilidades técnicas e de resolução de problemas.
            </p>
            <p className="mb-6">
              Focado em entregar experiências de usuário excepcionais e código limpo,
              busco constantemente aprender novas tecnologias e metodologias para
              melhorar meu trabalho e contribuir para o sucesso dos projetos em que participo.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.4} className="">
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
        </section>
      </div>
    </div>
  );
};

export default About;