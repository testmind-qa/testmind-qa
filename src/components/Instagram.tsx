import { Card } from "@/components/ui/card";
import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type IgPost = {
  id: string | number;
  image: string;
  caption?: string;
  permalink?: string;
};

const InstagramSection = () => {
  const SHOW = (import.meta.env.VITE_SHOW_INSTAGRAM as string | undefined) === 'true';
  if (!SHOW) return null;
  // Environment-driven config
  const PROXY_URL = import.meta.env.VITE_INSTAGRAM_PROXY_URL as string | undefined;
  const ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN as string | undefined;
  const USER_ID = import.meta.env.VITE_INSTAGRAM_USER_ID as string | undefined;
  const POLL_MS = Number(import.meta.env.VITE_IG_POLL_INTERVAL_MS ?? 60000);

  const [posts, setPosts] = useState<IgPost[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Placeholder used when integration is not configured or a fetch fails
  const placeholderPosts: IgPost[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop",
      caption: "Dicas de qualidade de software"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
      caption: "Melhores práticas de teste"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop",
      caption: "Novidades do mercado"
    }
  ];

  // Fetch implementation: proxy preferred, otherwise direct Graph API (not recommended on frontend)
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      let json: any = null;

      if (PROXY_URL) {
        // Proxy should return { data: [{ id, image, caption, permalink }, ...] }
        const res = await fetch(`${PROXY_URL.replace(/\/$/, '')}/instagram?limit=3`);
        if (!res.ok) throw new Error(`Proxy error ${res.status}`);
        json = await res.json();
        const data = (json && json.data) || [];
        setPosts(
          data.slice(0, 3).map((p: any) => ({ id: p.id, image: p.media_url || p.image || p.thumbnail_url, caption: p.caption, permalink: p.permalink }))
        );
        setLoading(false);
        return;
      }

      if (ACCESS_TOKEN && USER_ID) {
        // Direct fetch to Instagram Graph API
        // fields: id,caption,media_url,permalink,timestamp
        const mediaRes = await fetch(
          `https://graph.instagram.com/${USER_ID}/media?fields=id,caption,media_url,permalink&access_token=${ACCESS_TOKEN}`
        );
        if (!mediaRes.ok) throw new Error(`Instagram API error ${mediaRes.status}`);
        const mediaJson = await mediaRes.json();
        const items = mediaJson.data || [];
        setPosts(
          items.slice(0, 3).map((p: any) => ({ id: p.id, image: p.media_url, caption: p.caption, permalink: p.permalink }))
        );
        setLoading(false);
        return;
      }

      // No integration configured
      setPosts(placeholderPosts);
      setLoading(false);
    } catch (err: any) {
      console.error('Instagram fetch error', err);
      setError(err?.message ?? 'Erro ao buscar posts do Instagram');
      setPosts(placeholderPosts);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchPosts();

    // Polling so the component updates when new posts arrive
    const iv = setInterval(() => {
      fetchPosts();
    }, POLL_MS);

    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="instagram" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] mb-4">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <Instagram className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Siga no </span>
            <span className="glow-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Instagram
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conteúdo exclusivo sobre qualidade de software, dicas de testes e tendências do mercado
          </p>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {loading && (
            <div className="col-span-1 md:col-span-3 text-center text-muted-foreground">Carregando últimas publicações...</div>
          )}

          {error && (
            <div className="col-span-1 md:col-span-3 text-center text-destructive">{error}</div>
          )}

          {(posts || placeholderPosts).slice(0, 3).map((post, index) => (
            <a
              key={post.id}
              href={post.permalink ?? 'https://instagram.com/testmind_qa'}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card 
                className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-foreground text-sm font-medium">{post.caption}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 transition-all duration-300 hover:scale-105 glow-border"
          >
            <a 
              href="https://instagram.com/testmind_qa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              Ver mais no @testmind_qa
            </a>
          </Button>
        </div>

        {/* Note for integration */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            💡 Integração automática com Instagram pode ser configurada através da API do Instagram
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
