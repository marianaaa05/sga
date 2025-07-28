"use client";

export default function WhoWeAre() {
  return (
    <div className="w-full max-w-screen-xl mx-auto text-center px-4 sm:px-6 lg:px-8 mb-10"
         id="about">
      <h2 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-bold text-white mb-1 drop-shadow-md">
        ¿Quiénes somos?
      </h2>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide mb-8">
        <span className="bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] bg-clip-text text-transparent">
          Semilleros de Investigación
        </span>
        <span className="text-white"> de Ingeniería Informática</span>
      </h1>

      <div className="relative w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/80 shadow-xl px-6 py-10 md:py-12 md:px-12 flex flex-col gap-6 text-left text-gray-800 dark:text-gray-200 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
        <p>
          Somos los <strong>Semilleros de Investigación de Ingeniería Informática</strong> de la <strong>
            Corporación Universitaria Autónoma de Nariño</strong>, un espacio donde estudiantes y docentes colaboran 
            activamente en el desarrollo de proyectos tecnológicos, impulsando la innovación, el pensamiento crítico y la 
            cultura investigativa.
        </p>

        <p>Contamos con tres semilleros con diferentes enfoques:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Animus Hacking:</strong> Dedicado a la <em>ciberseguridad</em>, análisis de vulnerabilidades y 
            hacking ético.
          </li>
          <li>
            <strong>Sinapsis:</strong> Enfocado en la <em>electrónica</em>, el <em>Internet de las Cosas (IoT)</em>, 
            desarrollo de <em>prototipos</em>, robótica de sumo y sistemas de <em>telemetría</em> mediante plataformas como Arduino.
          </li>
          <li>
            <strong>Kernel:</strong> Especializado en <em>programación</em>, <em>desarrollo de software </em> 
            y creación de <em>sistemas inteligentes</em>, incorporando técnicas de inteligencia artificial y buenas 
            prácticas de ingeniería.
          </li>
        </ul>

        <p>
          Además, también contamos con <strong>cursos interactivos</strong> desarrollados por estudiantes y docentes, 
          donde puedes aprender y contribuir con la enseñarza de diferentes temáticas que van desde programación, seguridad informática, 
          desarrollo web, electrónica, inteligencia artificial y más.
        </p>

        <p>
          Los cursos están pensados para fortalecer el aprendizaje autónomo, compartir conocimiento y formar una comunidad 
          activa alrededor de la tecnología.
        </p>

        <p className="font-semibold">
          Te invitamos a explorar, participar y contribuir en este espacio de formación colaborativa.
        </p>
      </div>
    </div>
  );
}
