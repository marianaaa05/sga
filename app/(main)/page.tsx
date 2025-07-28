import ImageCarousel from "./carousel";
import VideoGrid from "./interviews";
import Logos from "./logos";
import Title from "./title";
import Who from "./who";
import AboutPage from "./whoweare";

export default function Home() {
  return (
    <main className="bg-sky-800 text-white">
      <section className="py-10 px-4 max-w-screen-xl mx-auto">
        <Title />
      </section>

      <section className="py-4 px-4 max-w-screen-xl mx-auto">
        <Logos />
      </section>

      <section className="py-4 px-4 max-w-screen-xl mx-auto">
        <ImageCarousel />
      </section>

      <section className="py-4 px-4 max-w-screen-xl mx-auto">
        <VideoGrid />
      </section>

      <section className="py-4 px-4 max-w-screen-xl mx-auto"> 
        <AboutPage />
      </section>

      <section className="py-4 px-4 max-w-screen-xl mx-auto">
        <Who />
      </section>

      <section className="py-4 px-4 max-w-screen-md mx-auto text-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-neutral-100">
          <br /> ¡Únete a nuestros semilleros y potencia tus habilidades en el
          mundo de la tecnología! <br />
          👨‍💻👩‍💻
          <br />
          <br />
          Un universo de posibilidades espera por ti.💫
        </h2>
      </section>
    </main>
  );
}
