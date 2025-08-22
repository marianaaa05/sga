"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar1 } from "lucide-react";
import Image from "next/image";

const images = [
  {
    src: "/participacion-redCOLSI-2025.jpg",
    alt: "Participación en la Red COLSI 2025",
    title: "Participación en la Red COLSI – Pasto, Nariño (2025)",
    description:
      "Los docentes encargados de los semilleros de investigación, Cristhian Villota y Raúl Peña, acompañaron a los estudiantes Jhon Deivy, Antonio Romo, Fernando, Santiago y Francisco en la Red COLSI, realizada en Pasto, Nariño, durante el semestre anterior. El equipo presentó un destacado proyecto en el área de ciberseguridad, resaltando el trabajo colaborativo y el compromiso con la formación académica e investigativa. Asimismo, el estudiante Daniel Marcillo participó con un proyecto de Internet de las Cosas (IoT), orientado al control de variables medioambientales aplicadas al cultivo de cannabis, evidenciando la innovación y la aplicación de tecnologías emergentes en problemáticas reales. Más información en redcolsiplataforma.org",
  },
  {
    src: "/ganadores-batalla-sumos-maquinarte-2025.jpg",
    alt: "Ganadores del Torneo de Robots Sumos – Maquinarte 2025",
    title: "Ganadores del Torneo de Robots Sumos – Maquinarte 2025",
    description:
      "La imagen muestra a tres chicos que integran los semilleros de investigación de Ingeniería Informática quienes obtuvieron el primer lugar en el Torneo de Robots Sumos en su quinta vesión durante el evento Maquinarte, llevado a cabo en el primer semestre de 2025. En ese entonces cursaban primer semestre y, actualmente, continúan su formación académica. Su logro refleja el talento, la creatividad y la capacidad de innovación de los nuevos integrantes de la carrera, así como el potencial de los semilleros de investigación en el área de la robótica y la automatización.",
  },
  {
    src: "/participacion-robot-asistente-medico-redCOLSI-2025.jpg",
    alt: "Proyecto: Robot Asistente Médico",
    title: "Participación en la red COLSI 2025: Robot Asistente Médico",
    description:
      "Los estudiantes Anthony, John Deivy y Juan, integrantes de los semilleros de investigación de Ingeniería Informática, presentaron un robot asistente médico orientado a fortalecer la labor del personal hospitalario en la atención de pacientes. Este prototipo permite medir variables como la temperatura y el ritmo cardíaco, para así determinar la prioridad de atención según el nivel de urgencia. Con ello, se busca optimizar los tiempos, mejorar la eficiencia de los servicios de salud y apoyar la toma de decisiones médicas mediante el uso de tecnologías emergentes. Este proyecto fue presentado en la RedCOLSI (Red Colombiana de Semilleros de Investigación). Más información en redcolsiplataforma.org",
  },
  {
    src: "/participacion-redCOLSI-sistema-web-invernadero-2025.jpg",
    alt: "Proyecto: Sistema web para la administración de invernadero y visualización de variables ambientales mediante IoT aplicado a cultivos de cannabis medicinal",
    title:
      "Participación en la red COLSI 2025: Sistema web para la administración de invernadero y visualización de variables ambientales mediante IoT aplicado a cultivos de cannabis medicinal",
    description:
      "Carlos Daniel Marcillo Tobar presentó el 26 de abril de 2025 el proyecto titulado “Desarrollo de un sistema web para la administración de invernadero y visualización de variables ambientales mediante IoT aplicado a cultivos de cannabis medicinal”. La propuesta integra sensores IoT capaces de registrar en tiempo real variables críticas como la temperatura, humedad del suelo y humedad relativa del aire, las cuales se transmiten hacia una plataforma web desarrollada con Next.js, TypeScript y Supabase. El sistema no solo permite la visualización centralizada de datos y el cálculo de promedios por etapas de cultivo, sino que también brinda una herramienta para la toma de decisiones oportunas en el manejo de invernaderos. Este trabajo busca dar solución a problemáticas reales como las pérdidas de producción ocasionadas por hongos, plagas o condiciones ambientales inadecuadas, aportando a la consolidación de la agricultura de precisión e inteligente en Colombia y contribuyendo de manera directa al fortalecimiento del sector del cannabis medicinal bajo un enfoque sostenible, eficiente y tecnológicamente innovador. ",
  },
  {
    src: "/participacion-redCOLSI-bug-bounty-2025.jpg",
    alt: "Proyecto: Bug Bounty como Puerta de Entrada Legal a la Ciberseguridad: Formaci ́on, Legalidad y Empleo",
    title:
      "Participación en la red COLSI 2025: Bug Bounty como Puerta de Entrada Legal a la Ciberseguridad: Formación, Legalidad y Empleo",
    description:
      "El 26 de abril de 2025, los estudiantes Santiago David López Villota y Francisco Alejandro Tello Mirama, integrantes de los semilleros de investigación de Ingeniería Informática, participaron en la RedCOLSI presentando el proyecto “Bug Bounty como Puerta de Entrada Legal a la Ciberseguridad: Formación, Legalidad y Empleo”. La investigación abordó el impacto de los programas de Bug Bounty como una vía innovadora para la formación en ciberseguridad, el acceso a empleos legales y el fortalecimiento de la seguridad digital a nivel global. El trabajo destacó cómo estas prácticas fomentan el aprendizaje técnico, la cultura de la divulgación responsable y la democratización de oportunidades en regiones donde el acceso a la educación tecnológica es limitado. Con este proyecto, los autores resaltaron la importancia del hacking ético como motor de inclusión laboral y como estrategia pedagógica que abre las puertas al talento emergente en el campo de la ciberseguridad.",
  },
  {
    src: "/maquinarte-ponencia-2025.jpg",
    alt: "Ponencia: Inteligencia Natural en la era de la Inteligencia Artificial",
    title: "Ponencia: Inteligencia Natural en la era de la Inteligencia Artificial",
    description:
      "El ponente partió de una definición genérica de inteligencia resaltada por Stephen Hawking, quien la considera como la habilidad para adaptarse a los cambios, y en este sentido, manifestó que la inteligencia no es un atributo único de los seres humanos, así los virus, durante unos miles de millones de años han tenido que adaptarse a todos los cambios que han acontecido durante ese largo periodo de tiempo y lo siguen haciendo, las bacterias por su parte, consideradas los primeros seres vivos, también han subsistido por casi 3 mil millones de años, y se adaptan de maneras preocupantes para nosotros porque se adaptan hasta para ser resistentes a los antibióticos que diseñamos para combatirlas. Las células más complejas, como el óvulo fecundado del que derivaron los casi 40 billones de células que forman el cuerpo humano, se adaptan en forma de una comunicad inteligente para sobrevivir a los cambios, junto con unos 50 billones de bacterias.\n \n" +
      "Recordando a Carl Sagan, continuó precisando cómo la evolución de la materia que dio origen al universo, la terminó transformando en materia viva que “llegó a ser consciente de su existencia”, y así, al decir de Pepe Mujica, se puede afirmar que la inteligencia es una “aventura de las moléculas”, como lo son las que se hacen a base de silicio con las que se fabrican los circuitos de los computadores o las de litio con las que se les provee más eficazmente la energía necesaria para su operación. Posteriormente, describió cómo la arquitectura de billones de conexiones neuronales, donde parece residir la inteligencia natural de humanos y animales, cuidadosamente descrita por Santiago Ramón y Cajal, podía ser moldeada por parte de sus poseedores para adaptarse a nuevas situaciones propias del devenir natural, condición que se conoce como neuroplasticidad, que el hardware biológico de carbono puede hacer y que el hardware de silicio aun no, para puntualizar una diferencia sustancial entre inteligencia natural e inteligencia artificial. Acto seguido contó, como Rita Levi Montalcini demostró que las neuronas, contrariamente a lo que se creía, podían reproducirse, potenciando la neuroplasticidad a través de esta neurogénesis, lo cual garantiza que nuestra inteligencia humana nos hace aprender durante toda la vida, algo que antes se creía imposible una vez alcanzada la madurez biológica. \n \n" +
      "Seguidamente comentó que la inteligencia natural no está localizada en un órgano en particular, sino que está repartida por todo el organismo, en cada una de nuestras células pues cada una de ellas debe hacer uso de la inteligencia para adaptarse a los cambios; no obstante, la mayor actividad es registrada por células neuronales, que pueden conversar entre sí y con casi todas las demás células del organismo, y lo hacen en forma genérica por medio de electricidad, como lo hace la inteligencia artificial, y también de manera mucho más versátil, mediante mensajes químicos, suministrados por más de un centenar de moléculas de neurotransmisores que ellas producen para enviarlos a otras células, que en la IA no existen, ya que allí la comunicación es exclusivamente eléctrica. Las respuestas que dan las células ante estos neurotransmisores pueden generar un buen estado de ánimo, si el mensajero es la serotonina, placer si es dopamina, enojo si es epinefrina, sueño si es melatonina, claridad mental si es acetilcolina, registros de memoria si es el GABA, y así, una multiplicidad de emociones básicas, de cuyas combinaciones en diferentes dosis pueden emerger sentimientos más complejos, que van desde lo más sublime hasta lo mas perverso. Finalmente, el ponente afirmó que, estas cualidades, por lo pronto se encuentran por fuera del alcance de la IA, que, aunque se fundamenta en el impreciso concepto de “redes neuronales” y es posible que desarrolle conciencia, es muy probable que para esta “inteligencia ajena” basada en algoritmos eficientes, no sea de su interés adquirir características tan ineficientes como la creatividad, la intuición, la ética y la capacidad crítica propias de la inteligencia humana y natural."

  }
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 15000); // más tiempo para leer cada imagen
    return () => clearInterval(interval);
  }, [current]);

  const currentImage = images[current];
  const imageSrc = currentImage.src || "";

  return (
    <div className="text-center" id="events">
      <h2 className="flex items-center justify-center gap-2 text-3xl md:text-4xl lg:text-4xl lg:mb-0 font-bold text-neutral-100">
        <Calendar1 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
        EVENTOS
      </h2>

      <div className="max-w-screen-xl mx-auto px-4 py-2">
        <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-neutral-100 mb-6">
          Algunos de nuestros proyectos, eventos y participantes destacados:
        </h3>

        <div className="relative overflow-hidden rounded-2xl border border-white/80 shadow-xl bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700">
          <Image
            src={imageSrc}
            alt={currentImage.alt}
            title={currentImage.title}
            width={1920}
            height={1080}
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover transition-all duration-700"
            priority
          />

          <div className="p-4 mt-4 md:p-6 text-left text-sky-800 bg-white/10 backdrop-blur-md rounded-2xl border border-white/80 shadow-xl">
            <div className="max-h-60 md:max-h-52 lg:max-h-64 overflow-y-auto pr-2">
              <h4 className="text-lg md:text-xl font-semibold mb-2">
                {currentImage.title}
              </h4>

              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {currentImage.description}
              </p>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#9900ff] text-white p-2 rounded-full hover:bg-[#9900ff]/60"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#9900ff] text-white p-2 rounded-full hover:bg-[#9900ff]/60"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="flex justify-center mt-4 gap-2 h-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-[#9900ff]" : "bg-[#9900ff]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
