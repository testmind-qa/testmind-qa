import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import InstagramSection from "@/components/Instagram";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Contact />
      <InstagramSection />
      <Footer />
    </div>
  );
};

export default Index;
