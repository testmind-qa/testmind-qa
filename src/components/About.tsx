import { Card } from "@/components/ui/card";
import { Lightbulb, Target, Eye, Users, Shield } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Clareza",
    description: "Comunicação simples, objetiva e sem ruídos."
  },
  {
    icon: Shield,
    title: "Qualidade",
    description: "Excelência em cada entrega."
  },
  {
    icon: Users,
    title: "Parceria",
    description: "Crescemos junto com nossos clientes."
  },
  {
    icon: Eye,
    title: "Curiosidade",
    description: "Buscamos aprender e inovar sempre."
  },
  {
    icon: Target,
    title: "Transparência",
    description: "Agimos com ética e confiança em todas as etapas."
  }
];

const About = () => {
  return (
    <section id="sobre" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Quem </span>
            <span className="glow-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Somos
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            A TestMind é uma consultoria especializada em qualidade de software. Ajudamos empresas a melhorar seus processos de teste, garantindo entregas com mais confiança, eficiência e valor para o negócio.


            Nascemos da necessidade de levar qualidade para todos os projetos de software, desde pequenos sistemas à ecossistemas complexos.


            PORQUE QUALIDADE É INEGOCIÁVEL!
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ajudar empresas a entregar software de qualidade,
                com testes inteligentes e foco real no usuário.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary/60 transition-all duration-300 hover:scale-105 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser referência em consultoria de qualidade de software,
                unindo técnica, agilidade e propósito.
              </p>
            </div>
          </Card>
        </div>

        {/* Values */}
        <div className="space-y-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-foreground">
            Nossos Valores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
