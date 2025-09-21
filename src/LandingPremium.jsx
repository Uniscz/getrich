import React, { useRef, useEffect, useState } from "react";

/** Videos Craft IA — Landing Premium com melhorias de conversão */
export default function LandingPremium() {
  const CTA = "https://www.asaas.com/c/sf24e6hym93upjk6";
  const HERO_VIDEO =
    "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/video%20(24).mp4";
  const AUTHOR_IMG =
    "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/a-cinematic-portrait-photograph-of-a-you_AHl6tkPZRTi7hwXV9BIKgg_BoXTMqhdS1umGQ-lfiilYA.jpeg";

  const VIDEOS = [
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2022.13.27.mp4", label: "Transformação impressionante" },
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2021.09.23.mp4", label: "Deepfake ultra realista" },
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2023.30.40.mp4", label: "Criado em minutos" },
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2021.09.30%20(1).mp4", label: "Lip-sync perfeito" },
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2021.09.30.mp4", label: "Edição cinematográfica" },
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2021.09.18.mp4", label: "Cena feita em 5 minutos" },
  ];

  const TESTIMONIALS = [
    {
      name: "Carlos M.",
      role: "Creator",
      text: "Consegui 2M de views no primeiro vídeo usando as técnicas do curso!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Ana Silva",
      role: "Influencer",
      text: "O pipeline completo mudou minha forma de criar conteúdo. Incrível!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Pedro L.",
      role: "Empresário",
      text: "ROI de 300% no primeiro mês aplicando as estratégias de viralização.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Aluno 1",
      role: "Iniciante",
      text: "Cara, eu nunca imaginei que ia conseguir fazer video assim... antes eu ficava horas no capcut e ficava uma bosta, agora eu faço em 15 min e fica parecendo coisa de agencia kkk valeu msm!",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Aluno 2",
      role: "Entusiasta",
      text: "No começo achei q era papo furado, mas segui as aulas e no segundo dia ja postei um video que bateu 48 mil views... pra mim que nunca passei de 200 foi surreal.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Aluno 3",
      role: "Criador de Conteúdo",
      text: "O curso do Deh abriu minha mente... eu ja tinha tentado outras coisas mas sempre ficava preso na parte tecnica, aqui é tudo explicado de um jeito facil. Só errei pq viciei e fiquei até 4 da manha fazendo video kkk",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Aluno 4",
      role: "Trabalhador",
      text: "Eu trabalho e nao tenho muito tempo, mas mesmo assim consegui fazer os exercicio e postar. Em 1 semana ja vi resultado, as pessoas me chamando pra perguntar como eu fazia. To mt feliz",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Aluno 5",
      role: "Expert em IA",
      text: "Eu ja sabia um pouco de IA mas nunca tinha aplicado pra video, achei q ia ser complicado mas é tranquilo... só segue o passo a passo que da certo. Inclusive ja consegui fechar 2 trampo pago com isso.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const BEFORE_AFTER = [
    {
      before: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/137971-man_in_red_polo_shirt-1920x1080.jpg",
      after: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/c7v.mp4",
      title: "De amador a profissional"
    },
    {
      before: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/antes.png",
      after: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/ec074259-a311-46fe-8672-4e9a4355d51b.mp4",
      title: "Qualidade cinematográfica"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] selection:bg-[#0A68FF]/20">
      <Navbar cta={CTA} />
      <FixedCTA cta={CTA} />
      <HeroWithBG cta={CTA} video={HERO_VIDEO} />
      <Proof />
      <Examples videos={VIDEOS} />
      <BeforeAfter examples={BEFORE_AFTER} />
      <Benefits />
      <Timeline />
      <Testimonials testimonials={TESTIMONIALS} />
      <Offer cta={CTA} />
      <Faq />
      <Author img={AUTHOR_IMG} />
      <FinalCTA cta={CTA} />
      <Footer />
    </div>
  );
}

/* CTA FIXO RESPONSIVO */
function FixedCTA({ cta }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2">
      <a
        href={cta}
        className="inline-flex items-center bg-[#0A68FF] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:brightness-110 transition-all duration-200 hover:scale-105"
      >
        🚀 Quero Garantir Minha Vaga
      </a>
    </div>
  );
}

/* NAVBAR */
function Navbar({ cta }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-black/10">
      <div className="mx-auto max-w-7xl h-16 px-4 md:px-6 flex items-center justify-between">
        <a href="#topo" className="font-semibold text-lg tracking-tight">
          <span>Videos</span> <span>Craft</span>{" "}
          <span className="text-[#0A68FF]">IA</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#exemplos" className="hover:opacity-70">Exemplos</a>
          <a href="#beneficios" className="hover:opacity-70">Benefícios</a>
          <a href="#faq" className="hover:opacity-70">FAQ</a>
          <a href="#autor" className="hover:opacity-70">Autor</a>
        </div>
        <a href={cta}
                className="hidden md:inline-flex items-center rounded-full border border-[#0A0A0A] px-4 py-2 text-sm font-medium hover:bg-[#0A0A0A] hover:text-white transition"
        >
          Garantir minha vaga
        </a>
      </div>
    </nav>
  );
}

/* HERO MELHORADO */
function HeroWithBG({ cta, video }) {
  const [vagas, setVagas] = useState(13);

  useEffect(() => {
    const interval = setInterval(() => {
      setVagas(prev => prev > 10 ? prev - 1 : prev);
    }, 30000); // Reduz 1 vaga a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="topo" className="relative bg-gray-50">
      {/* vídeo de fundo */}
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* overlay pra legibilidade */}
      <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px]" />

      {/* conteúdo */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-14 md:pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            {/* Gatilho de urgência */}
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 text-sm font-medium text-red-700 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Apenas {vagas} vagas restantes
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Domine a criação de vídeos com IA que <span className="text-[#0A68FF]">viralizam</span>
            </h1>
            <p className="mt-6 text-base md:text-xl text-black/70">
              Pipeline completo: do roteiro à cena final com deepfake, lip-sync e estratégias de conversão que geram milhões de views.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={cta}
                className="inline-flex items-center justify-center rounded-full bg-[#0A68FF] text-white px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all duration-200 hover:scale-105"
              >
                🚀 Começar agora
              </a>
              <a
                href="#exemplos"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-8 py-4 text-lg hover:bg-black/[0.03] transition"
              >
                Ver exemplos
              </a>
            </div>
            <div className="mt-6 text-sm text-black/60">
              ✅ Pré-venda com vagas limitadas • ✅ Acesso vitalício + atualizações • ✅ Garantia de 7 dias
            </div>
          </div>

          {/* mantemos a coluna direita vazia pra preservar o respiro do layout */}
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}

/* PROVA SOCIAL */
function Proof() {
  return (
    <section className="bg-white mx-auto max-w-7xl px-4 md:px-6 py-12">
      <div className="rounded-xl border border-black/10 p-6 md:p-8 bg-white shadow-sm">
        <h3 className="text-xl font-semibold mb-6">Resultados comprovados</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">5M+</span>
            </div>
            <div>
              <div className="font-medium">Views mensais</div>
              <div className="text-black/60">TikTok + Instagram</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">9.7k</span>
            </div>
            <div>
              <div className="font-medium">Interações/post</div>
              <div className="text-black/60">Média geral</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold">300%</span>
            </div>
            <div>
              <div className="font-medium">ROI médio</div>
              <div className="text-black/60">Primeiro mês</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ANTES E DEPOIS */
function BeforeAfter({ examples }) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Transformação real dos nossos alunos
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Veja como nossos alunos evoluíram de conteúdo amador para vídeos profissionais que viralizam
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {examples.map((example, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4 text-center">{example.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-red-600 font-medium mb-2">❌ ANTES</div>
                  {example.before.endsWith(".mp4") ? (
                    <video
                      src={example.before}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-32 object-cover rounded-lg border object-top"
                    />
                  ) : (
                    <img
                      src={example.before}
                      alt="Antes"
                      className="w-full h-32 object-cover rounded-lg border object-top"
                    />
                  )}
                </div>
                <div>
                  <div className="text-sm text-green-600 font-medium mb-2">✅ DEPOIS</div>
                  {i === 1 ? (
                    <AnimatedTransition 
                      imageSrc={example.before}
                      videoSrc={example.after}
                    />
                  ) : (
                    example.after.endsWith(".mp4") ? (
                      <video
                        src={example.after}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-32 object-cover rounded-lg border object-top"
                      />
                    ) : (
                      <img
                        src={example.after}
                        alt="Depois"
                        className="w-full h-32 object-cover rounded-lg border object-top"
                      />
                    )
                  )}
                </div>
              </div>
              {i === 1 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-black/70 italic">
                    Veja como transformamos memórias paradas em histórias vivas.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* COMPONENTE DE TRANSIÇÃO ANIMADA */
function AnimatedTransition({ imageSrc, videoSrc }) {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 1000); // Mostra a imagem por 1 segundo

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-32 rounded-lg border overflow-hidden">
      {/* Imagem estática */}
      <img
        src={imageSrc}
        alt="Antes"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
          showVideo ? 'opacity-0 scale-110 filter grayscale' : 'opacity-100 scale-100'
        }`}
      />
      
      {/* Vídeo animado */}
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
          showVideo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      />
      
      {/* Overlay de transição */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 ${
        showVideo ? 'opacity-0' : 'opacity-100'
      }`} />
    </div>
  );
}

/* EXEMPLOS — grid 3×3, áudio só após gesto e pausa os outros */
function Examples({ videos }) {
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef([]);

  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    // Se o vídeo clicado já está tocando, pause
    if (playingVideo === index) {
      video.pause();
      setPlayingVideo(null);
    } else {
      // Pause todos os outros vídeos
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause();
        }
      });
      
      // Toque o vídeo clicado
      video.play().then(() => {
        setPlayingVideo(index);
      }).catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  };

  return (
    <section id="exemplos" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Cenas criadas em minutos com IA
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Veja o poder da inteligência artificial na criação de vídeos. Deixe a complexidade de lado e foque na sua criatividade.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="group relative aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={video.src}
                playsInline
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleVideoClick(i)}
              />
              
              {/* Botão de play personalizado */}
              {playingVideo !== i && (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => handleVideoClick(i)}
                >
                  <div className="bg-white/90 rounded-full p-4 shadow-lg hover:bg-white transition-all duration-200">
                    <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium leading-tight drop-shadow-lg">{video.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#/checkout"
            className="inline-flex items-center rounded-full bg-[#0A68FF] text-white px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all duration-200 hover:scale-105"
          >
            Quero criar vídeos assim
          </a>
        </div>
      </div>
    </section>
  );
}

/* LINHA DO TEMPO DO CURSO */
function Timeline() {
  const modules = [
    {
      icon: "🎯",
      title: "Módulo 1: Fundamentos",
      description: "Pipeline completo e ferramentas essenciais",
      duration: "2h"
    },
    {
      icon: "🎭",
      title: "Módulo 2: Deepfake & Avatar",
      description: "Criação de personagens ultra-realistas",
      duration: "3h"
    },
    {
      icon: "🎤",
      title: "Módulo 3: Voz & Lip-sync",
      description: "Sincronização perfeita de áudio e vídeo",
      duration: "2.5h"
    },
    {
      icon: "🎬",
      title: "Módulo 4: Edição Avançada",
      description: "Finalização cinematográfica profissional",
      duration: "3.5h"
    },
    {
      icon: "🚀",
      title: "Bônus: Viralização",
      description: "Estratégias de distribuição e conversão",
      duration: "1.5h"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Jornada completa de aprendizado
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Mais de 12 horas de conteúdo prático dividido em módulos progressivos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {modules.map((module, i) => (
            <div key={i} className="flex items-start gap-6 mb-8 last:mb-0">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-black/10">
                  {module.icon}
                </div>
                {i < modules.length - 1 && (
                  <div className="w-px h-12 bg-black/10 mx-auto mt-4"></div>
                )}
              </div>
              <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{module.title}</h3>
                  <span className="text-sm text-black/60 bg-gray-100 px-3 py-1 rounded-full">
                    {module.duration}
                  </span>
                </div>
                <p className="text-black/70">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* DEPOIMENTOS EM CARROSSEL */
function Testimonials({ testimonials }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            O que nossos alunos dizem
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-gray-50 p-8 md:p-12">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="text-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                    />
                    <blockquote className="text-xl md:text-2xl font-medium mb-4 text-black/90">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="text-black/60">
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition ${
                  i === current ? 'bg-[#0A68FF]' : 'bg-black/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* BENEFÍCIOS */
function Benefits() {
  const benefits = [
    {
      icon: "⚡",
      title: "Pipeline Completo",
      description: "Do roteiro à cena final em um fluxo otimizado"
    },
    {
      icon: "🎭",
      title: "Deepfake Profissional",
      description: "Técnicas avançadas de troca de rosto ultra-realista"
    },
    {
      icon: "🎤",
      title: "Lip-sync Perfeito",
      description: "Sincronização de áudio e movimento labial"
    },
    {
      icon: "🎨",
      title: "Identidade Visual",
      description: "Crie uma assinatura visual consistente e marcante"
    },
    {
      icon: "📈",
      title: "Estratégias de Viralização",
      description: "Técnicas comprovadas para maximizar alcance"
    },
    {
      icon: "💰",
      title: "Monetização",
      description: "Como transformar views em receita real"
    }
  ];

  return (
    <section id="beneficios" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Tudo que você vai dominar
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Habilidades práticas que vão transformar sua criação de conteúdo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-black/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* OFERTA */
function Offer({ cta }) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Oferta de Pré-venda
            </h2>
            <div className="mb-8">
              <div className="text-sm text-black/60 mb-2">De R$ 297 por apenas</div>
              <div className="text-5xl md:text-6xl font-bold text-[#0A68FF] mb-2">
                R$ 119,90
              </div>
              <div className="text-sm text-black/60">
                Pagamento único • Sem mensalidades • Garantia de 7 dias
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Acesso vitalício</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Atualizações gratuitas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Suporte direto</span>
              </div>
            </div>

            <a
              href={cta}
              className="inline-flex items-center rounded-full bg-[#0A68FF] text-white px-8 py-4 text-xl font-semibold hover:brightness-110 transition-all duration-200 hover:scale-105"
            >
              🚀 Garantir Minha Vaga Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* FAQ */
function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Preciso ter experiência prévia com edição de vídeo?",
      a: "Não! O curso foi pensado para iniciantes. Começamos do básico e evoluímos gradualmente até técnicas avançadas."
    },
    {
      q: "Quais ferramentas vou precisar?",
      a: "Todas as ferramentas utilizadas são gratuitas ou têm versões gratuitas. Fornecemos uma lista completa no primeiro módulo."
    },
    {
      q: "Quanto tempo leva para dominar as técnicas?",
      a: "Com dedicação de 1-2 horas por dia, você pode dominar o pipeline completo em 2-3 semanas."
    },
    {
      q: "Há garantia de reembolso?",
      a: "Sim! Oferecemos 7 dias de garantia incondicional. Se não ficar satisfeito, devolvemos 100% do valor."
    },
    {
      q: "O curso é atualizado?",
      a: "Sim! Sempre que surgem novas ferramentas ou técnicas, atualizamos o conteúdo gratuitamente para todos os alunos."
    }
  ];

  return (
    <section id="faq" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-black/10 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="font-medium">{faq.q}</span>
                <span className={`transform transition ${openIndex === i ? 'rotate-180' : ''}`}>
                  ↓
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-black/70">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* AUTOR */
function Author({ img }) {
  return (
    <section id="autor" className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={img}
              alt="Autor do curso"
              className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Sobre o instrutor</h2>
            <p className="text-black/70 mb-6">
              Creator com mais de 5 milhões de views mensais, especialista em IA generativa 
              e estratégias de viralização. Desenvolveu o pipeline completo que ensina no curso 
              através de anos de experimentação e otimização.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>5M+ views mensais no TikTok</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Especialista em IA generativa</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>3+ anos criando conteúdo viral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CTA FINAL */
function FinalCTA({ cta }) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Pronto para criar vídeos que viralizam?
        </h2>
        <p className="text-lg text-black/70 mb-8 max-w-2xl mx-auto">
          Junte-se aos criadores que já estão dominando a criação de conteúdo com IA 
          e transformando views em receita real.
        </p>
        <a
          href={cta}
          className="inline-flex items-center rounded-full bg-[#0A68FF] text-white px-8 py-4 text-xl font-semibold hover:brightness-110 transition-all duration-200 hover:scale-105"
        >
          🚀 Começar Agora - R$ 119,90
        </a>
        <div className="mt-4 text-sm text-black/60">
          Garantia de 7 dias • Acesso vitalício • Atualizações gratuitas
        </div>
      </div>
    </section>
  );
}

/* FOOTER */
function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center text-sm text-black/60">
          <p>© 2025 Videos Craft IA. Todos os direitos reservados.</p>
          <p className="mt-2">
            Curso de criação de vídeos com inteligência artificial
          </p>
        </div>
      </div>
    </footer>
  );
}

