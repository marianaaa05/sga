"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    url: "./maquinarte2025-1.jpg",
    alt: "Imagen 1",
    title: "BATALLA DE ROBOTS EN MAQUINARTE",
    description: "Participación en la batalla de robots del evento Maquinarte 2025-I",
  },
  {
    url: "./maquinarte2025.jpg",
    alt: "Imagen 2",
    title: "INTERNET MAS SEGURO",
    description: "Promoviendo un internet más seguro para todos",
  },
  {
    url: "https://global.tiffin.edu/img/article/uso-de-la-inteligencia-artificial-en-ciberseguridad.webp",
    alt: "Imagen 3",
    title: "USO DE LA INTELIGENCIA ARTIFICIAL EN CIBERSEGURIDAD",
    description: "Explorando el impacto de la IA en la seguridad cibernética",
  },
  {
    url: "https://img.freepik.com/vector-gratis/ilustracion-concepto-redes-sociales_53876-37557.jpg",
    alt: "Imagen 4",
    title: "ILUSTRACION CONCEPTO TECNOLOGÍA",
    description: "Conectando el mundo a través de la tecnología",
  },
  {
    url: "https://img.freepik.com/vector-gratis/tecnologia-inteligencia-artificial-robotica-aprendizaje-inteligente-bigdata_1150-48136.jpg",
    alt: "Imagen 5",
    title: "INTELIGENCIA ARTIFICIAL",
    description: "La revolución de la inteligencia artificial en la tecnología",
  },
  {
    url: "https://img.freepik.com/vector-gratis/ilustracion-concepto-mecanografia-codigo_114360-3581.jpg",
    alt: "Imagen 6",
    title: "ILUSTRACIÓN CONCEPTO PROGRAMACIÓN",
    description: "El arte de programar: creando el futuro digital",
  },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full max-w-4xl mx-auto ">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-neutral-100 text-center mb-4">
        Algunas de nuestras actividades
      </h2>
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={images[current].url}
          alt={images[current].alt}
          title={images[current].title}
          className="w-full h-[400px] md:h-[500px] object-cover transition-all duration-700"
        />
        <p className="absolute text-center bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm md:text-base bg-black/60 px-4 py-2 rounded">
          {images[current].description}
        </p>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#9900ff] text-white p-2 rounded-full hover:bg-[#9900ff]/60"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#9900ff] text-white p-2 rounded-full hover:bg-[#9900ff]/60"
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
  );
}
