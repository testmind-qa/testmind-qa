import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {currentYear} TestMind. Todos os direitos reservados.
            </p>
          </div>

          {/* Social Links (column on small screens, row on md+) */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <a
              href="https://instagram.com/testmind_qa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group"
            >
              <div className="flex-none w-10 h-10 aspect-square rounded-full border border-border/50 group-hover:border-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">@testmind_qa</span>
            </a>

            {/* Email button under Instagram (opens mail client) */}
            <a
              href="mailto:testmind.consulting@gmail.com"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group max-w-[220px] md:max-w-none"
            >
              <div className="flex-none w-10 h-10 aspect-square rounded-full border border-border/50 group-hover:border-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium break-words">testmind.consulting@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Qualidade de Software • Sem Achismos
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
