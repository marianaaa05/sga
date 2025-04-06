import { Header } from "./header";
import { Footer } from "./footer";

type Props = {
  children: React.ReactNode;
};

const MarkLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex-1 flex flex-col items-center 
       justify-center bg-sky-800"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarkLayout;
