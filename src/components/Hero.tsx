import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import logo from "@/assets/logo.png";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden tech-grid">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-pulse" 
           style={{ animationDuration: '4s' }} />
      
      {/* Circuit lines decoration removed per design request */}

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
            <img 
              src={logo} 
              alt="TestMind Logo" 
              className="relative w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl animate-scale-in"
            />
          </div>

          {/* Main headline */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-foreground">TestMind</span>
              <br />
              <span className="glow-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Software Quality Consulting
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Consultoria especializada em testes e qualidade de software. 
              Transformamos processos com clareza, parceria e transparência.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 glow-border"
            >
              <span className="relative z-10">Fale com a TestMind</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default Hero;
