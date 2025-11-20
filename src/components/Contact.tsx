import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Instagram, Mail, Phone, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  // === CONFIGURAÇÃO (edite conforme necessário) ===
  // 1) Para enviar dados para um Google Form sem backend:
  //    - crie um Google Form ligado a uma Planilha
  //    - abra o Form > envie > abra o URL do formulário e pegue o action (formResponse)
  //    - copie os IDs de campo (entry.xxxxx) e coloque abaixo no objeto GOOGLE_FORM_FIELDS
  //    - defina a variável de ambiente VITE_GOOGLE_FORM_ACTION_URL com a url do formResponse
  // 2) Alternativa: usar um Google Apps Script Web App que recebe JSON (mais controle).
  //    - definir VITE_APPS_SCRIPT_URL para a URL do Web App
  // Nota: envio via Apps Script pode exigir configuração de CORS/Deploy; a opção do Google Form evita CORS
  const GOOGLE_FORM_ACTION = import.meta.env.VITE_GOOGLE_FORM_ACTION_URL as string | undefined;
  const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined;

  // Se usar Google Form, mapeie os nomes do formulário para os entry IDs do Google Form
  // Exemplo: { name: 'entry.1234567890', phone: 'entry.0987654321', ... }
  // Substitua pelos IDs reais do seu Google Form (veja o arquivo GOOGLE_FORMS.md no projeto)
  const GOOGLE_FORM_FIELDS: Record<string, string> = {
    name: "entry.1206562979",
    phone: "entry.751105732",
    email: "entry.1813304572",
    message: "entry.507715777",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive"
      });
      return;
    }

    // If GOOGLE_FORM_ACTION is set and fields are mapped, submit via a classic HTML form POST
    if (GOOGLE_FORM_ACTION && Object.values(GOOGLE_FORM_FIELDS).every(v => !v.includes('REPLACE'))) {
      // Build a hidden form and submit to Google Form's formResponse endpoint to avoid CORS
      // Use a hidden iframe as target so the confirmation page doesn't replace/navigate the current page
      const iframeName = 'google-form-target';
      let iframe = document.querySelector(`iframe[name="${iframeName}"]`) as HTMLIFrameElement | null;

      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.name = iframeName;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_FORM_ACTION;
      form.target = iframeName;

      Object.entries(GOOGLE_FORM_FIELDS).forEach(([key, entryId]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = entryId;
        input.value = (formData as any)[key] ?? '';
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      form.remove();

      // Optionally remove the iframe after a short delay to keep DOM clean
      setTimeout(() => {
        try {
          iframe && iframe.remove();
        } catch (err) {
          /* ignore */
        }
      }, 2000);

      toast({ title: 'Enviado', description: 'Seu contato foi enviado e em breve entraremos em contato.' });
      setFormData({ name: '', phone: '', email: '', message: '' });
      return;
    }

    // If APPS_SCRIPT_URL is set, send JSON via fetch to the Apps Script Web App (needs deployment)
    if (APPS_SCRIPT_URL) {
      try {
        const res = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!res.ok) throw new Error(`Status ${res.status}`);

        toast({ title: 'Mensagem enviada!', description: 'Entraremos em contato em breve.' });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } catch (err) {
        console.error('Apps Script submit error', err);
        toast({ title: 'Erro ao enviar', description: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.', variant: 'destructive' });
      }

      return;
    }

    // Fallback: show toast and log (no backend configured)
    console.warn('Nenhuma URL de envio configurada (Google Form ou Apps Script)');
    toast({ title: 'Configuração ausente', description: 'O formulário não está configurado para envio. Veja as instruções no repositório.', variant: 'destructive' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contato" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Entre em </span>
            <span className="glow-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Contato
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vamos conversar sobre como podemos ajudar a elevar a qualidade do seu software
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Nome *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                  className="bg-input border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Telefone *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  required
                  className="bg-input border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  E-mail *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className="bg-input border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Motivo do contato *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-nos como podemos ajudar..."
                  required
                  rows={5}
                  className="bg-input border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 transition-all duration-300 hover:scale-105 glow-border"
              >
                Enviar Mensagem
              </Button>
            </form>
          </Card>

          {/* Instagram CTA */}
          <div className="flex flex-col justify-center space-y-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary/60 transition-all duration-300 group">
              <div className="space-y-6 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <Instagram className="w-10 h-10 text-primary" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-foreground">
                    Nos siga no Instagram
                  </h3>
                  <p className="text-muted-foreground">
                    Acompanhe nosso conteúdo sobre qualidade de software, 
                    dicas de testes e novidades do mercado.
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary/50 hover:border-primary hover:bg-primary/10 text-foreground font-semibold py-6 transition-all duration-300 hover:scale-105"
                >
                  <a 
                    href="https://instagram.com/testmind_qa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Instagram className="w-5 h-5" />
                    @testmind_qa
                  </a>
                </Button>
              </div>
            </Card>

            {/* Additional info */}
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                Prefere outra forma de contato? Envie um email para{' '}
                <a href="mailto:testmind.consulting@gmail.com" className="underline hover:text-foreground" rel="noopener noreferrer">
                  testmind.consulting@gmail.com
                </a>
                !
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
