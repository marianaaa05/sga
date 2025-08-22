"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    title: "Participación en la red COLSI 2025: Sistema web para la administración de invernadero y visualización de variables ambientales mediante IoT aplicado a cultivos de cannabis medicinal",
    description:
    "Carlos Daniel Marcillo Tobar presentó el 26 de abril de 2025 el proyecto titulado “Desarrollo de un sistema web para la administración de invernadero y visualización de variables ambientales mediante IoT aplicado a cultivos de cannabis medicinal”. La propuesta integra sensores IoT capaces de registrar en tiempo real variables críticas como la temperatura, humedad del suelo y humedad relativa del aire, las cuales se transmiten hacia una plataforma web desarrollada con Next.js, TypeScript y Supabase. El sistema no solo permite la visualización centralizada de datos y el cálculo de promedios por etapas de cultivo, sino que también brinda una herramienta para la toma de decisiones oportunas en el manejo de invernaderos. Este trabajo busca dar solución a problemáticas reales como las pérdidas de producción ocasionadas por hongos, plagas o condiciones ambientales inadecuadas, aportando a la consolidación de la agricultura de precisión e inteligente en Colombia y contribuyendo de manera directa al fortalecimiento del sector del cannabis medicinal bajo un enfoque sostenible, eficiente y tecnológicamente innovador. "
  },
  {
    src: "/participacion-redCOLSI-bug-bounty-2025.jpg",
    alt: "Proyecto: Bug Bounty como Puerta de Entrada Legal a la Ciberseguridad: Formaci ́on, Legalidad y Empleo",
    title: "Participación en la red COLSI 2025: Bug Bounty como Puerta de Entrada Legal a la Ciberseguridad: Formación, Legalidad y Empleo",
    description:
     "El 26 de abril de 2025, los estudiantes Santiago David López Villota y Francisco Alejandro Tello Mirama, integrantes de los semilleros de investigación de Ingeniería Informática, participaron en la RedCOLSI presentando el proyecto “Bug Bounty como Puerta de Entrada Legal a la Ciberseguridad: Formación, Legalidad y Empleo”. La investigación abordó el impacto de los programas de Bug Bounty como una vía innovadora para la formación en ciberseguridad, el acceso a empleos legales y el fortalecimiento de la seguridad digital a nivel global. El trabajo destacó cómo estas prácticas fomentan el aprendizaje técnico, la cultura de la divulgación responsable y la democratización de oportunidades en regiones donde el acceso a la educación tecnológica es limitado. Con este proyecto, los autores resaltaron la importancia del hacking ético como motor de inclusión laboral y como estrategia pedagógica que abre las puertas al talento emergente en el campo de la ciberseguridad."
  }
];

const DashboardHome = () => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 20000);
    return () => clearInterval(interval);
  }, [current]);

  const currentImage = images[current];

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            Bienvenido 🚀
          </h1>
          <p className="text-muted-foreground mt-2 w-full">
            Explora los semilleros de investigación y los cursos del programa de
            Ingeniería Informática de la Corporación Universitaria Autónoma de
            Nariño - Pasto.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link href="/dashboard/skahverse/research-group">
          <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 cursor-pointer hover:bg-slate-50">
            <h2 className="text-xl font-semibold mb-1">🧪 Semilleros</h2>
            <p className="text-sm text-muted-foreground">
              Accede a semilleros de investigación y gestiona sus proyectos.
            </p>
          </div>
        </Link>

        <Link href="/dashboard/skahverse/courses">
          <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 cursor-pointer hover:bg-slate-50">
            <h2 className="text-xl font-semibold mb-1">📚 Cursos</h2>
            <p className="text-sm text-muted-foreground">
              Explora cursos virtuales para aprender y compartir conocimientos.
            </p>
          </div>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start border rounded-xl p-4 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 shadow">
        <div className="md:pr-4 space-y-4 border-l-4 border-[#9900ff] pl-4">
          <h3 className="text-lg font-semibold text-[#9900ff] flex items-center gap-2">
            🥇 Participantes Destacados
          </h3>
          <div className="mt-2 p-4 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 border rounded-xl shadow-sm transition-all duration-300">
            <h4 className="text-xl font-bold text-slate-800">
              <span className="bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] bg-clip-text text-transparent">
              {currentImage.title}
              </span>
            </h4>
            <p className="text-muted-foreground text-sm mt-2">
              {currentImage.description}
            </p>
          </div>
        </div>

        <div className="w-full relative overflow-hidden rounded-xl border shadow">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={1920}
            height={1080}
            className="w-full h-[300px] md:h-[350px] object-cover transition-all duration-700"
            priority
          />

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#9900ff] text-white p-2 rounded-full hover:bg-[#9900ff]/70"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#9900ff] text-white p-2 rounded-full hover:bg-[#9900ff]/70"
          >
            <ChevronRight size={18} />
          </button>

          <div className="flex justify-center mt-2 mb-4 gap-2 absolute bottom-3 left-1/2 -translate-x-1/2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition ${
                  current === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
