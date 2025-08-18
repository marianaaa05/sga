"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const images = [
  // textos de prueba
  {
    src: "/destacados-2.jpg",
    alt: "Imagen 1",
    title: "BATALLA DE ROBOTS EN MAQUINARTE",
    description:
      "Participación de estudiantes de Ingeniería Informática en la batalla de robots del evento Maquinarte 2025-I. Roberto Ramirez, Pepe Martinez y Juan Castro, tras meses de preparación, demostraron sus habilidades en robótica y programación, mostrando los resultados obtenidos a partir de los encuentros de los semilleros de investigación Sinapsis y Kernel dirigidos por docentes encargados. Un evento emocionante lleno de innovación y competencia, donde los estudiantes aplicaron sus conocimientos en un entorno real, destacando la importancia de la colaboración y el trabajo en equipo.",
  },
  {
    src: "/maquinarte2025.jpg",
    alt: "Imagen 2",
    title: "DESTACADA PARTICIPACIÓN ESTUDIANTIL EN MAQUINARTE 2025",
    description:
      "Durante el evento Maquinarte 2025-I, varios estudiantes se destacaron por sus aportes en proyectos tecnológicos innovadores, resultado del trabajo constante en los semilleros de investigación. Desde soluciones en inteligencia artificial hasta prototipos funcionales, los asistentes pudieron presenciar cómo el talento estudiantil impulsa el desarrollo académico. El evento sirvió como plataforma para visibilizar el compromiso, la creatividad y la capacidad de los futuros ingenieros, quienes fueron reconocidos por sus propuestas que abordan problemáticas actuales con enfoque tecnológico y social.",
  },

  {
    src: "/destacados-1.jpg",
    alt: "Imagen 3",
    title: "INNOVADORES EN CIBERSEGURIDAD",
    description:
      "Estudiantes del semillero de investigación Animus Hacking destacaron durante la feria tecnológica Maquinarte 2025-I al presentar soluciones innovadoras enfocadas en la protección de datos y la navegación segura en entornos escolares y empresariales. Su propuesta incluyó el desarrollo de un software educativo interactivo que enseña a niños y jóvenes sobre prácticas seguras en internet. El equipo, conformado en su mayoría por estudiantes de cuarto y quinto semestre de Ingeniería Informática, logró captar la atención de docentes y expertos invitados, posicionándose como referentes en el uso ético y consciente de la tecnología.",
  },
  {
    src: "/maquinarte2025-1.jpg",
    alt: "Imagen 4",
    title: "LIDERAZGO FEMENINO EN LA TECNOLOGÍA",
    description:
      "Durante el evento Maquinarte 2025-I, un grupo de estudiantes liderado por Ana María Rodríguez, integrante del semillero Sinapsis, presentó un proyecto de automatización para procesos industriales que impresionó por su enfoque práctico y escalabilidad. Ana y su equipo destacaron no solo por su capacidad técnica, sino por promover la inclusión y el liderazgo femenino en carreras STEM. Su labor representa el compromiso del semillero con la equidad de género y el desarrollo de talento en áreas tecnológicas tradicionalmente dominadas por hombres, inspirando a más mujeres a integrarse activamente en el mundo de la ingeniería.",
  },
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
