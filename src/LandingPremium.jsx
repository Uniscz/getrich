import React, { useRef, useEffect, useState } from "react";

/** Videos Craft IA — Landing Premium com melhorias de conversão */
export default function LandingPremium() {
  const CTA = "#/checkout";
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
      video.play();
      setPlayingVideo(index);
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
      </div>
    </section>
  );
}

/* BENEFÍCIOS */
function Benefits() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            O que você vai aprender
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Nosso curso é dividido em módulos práticos, focados em resultados rápidos e eficientes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Criação de Roteiros com IA</h3>
            <p className="text-black/70 text-sm">
              Aprenda a gerar roteiros envolventes e otimizados para viralização usando as melhores ferramentas de IA.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Deepfake e Lip-Sync</h3>
            <p className="text-black/70 text-sm">
              Domine a arte de criar vídeos com personagens realistas e sincronia labial perfeita, sem precisar de atores.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Edição Cinematográfica</h3>
            <p className="text-black/70 text-sm">
              Transforme seus vídeos em produções de alta qualidade com técnicas de edição que prendem a atenção do público.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Estratégias de Viralização</h3>
            <p className="text-black/70 text-sm">
              Descubra os segredos para fazer seus vídeos alcançarem milhões de visualizações e gerarem engajamento.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Monetização e Negócios</h3>
            <p className="text-black/70 text-sm">
              Aprenda a transformar suas habilidades em fonte de renda, criando vídeos para clientes ou para seus próprios projetos.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Atualizações Constantes</h3>
            <p className="text-black/70 text-sm">
              Tenha acesso vitalício a todas as atualizações do curso, acompanhando as novidades do mundo da IA para vídeos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* LINHA DO TEMPO DO CURSO */
function Timeline() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Sua jornada no VideosCraft IA
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Um passo a passo completo para você dominar a criação de vídeos com inteligência artificial.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Linha vertical */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-200 h-full hidden md:block"></div>

          <div className="space-y-12">
            {/* Item 1 */}
            <div className="flex flex-col md:flex-row items-center md:justify-between relative">
              <div className="md:w-1/2 md:pr-8 text-right">
                <div className="bg-[#0A68FF] text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <h3 className="font-semibold text-lg">Módulo 1: Fundamentos da IA para Vídeos</h3>
                <p className="text-black/70 text-sm">Introdução às ferramentas e conceitos essenciais.</p>
                <p className="text-black/50 text-xs mt-1">Duração: 2 horas</p>
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row items-center md:justify-between relative">
              <div className="hidden md:block md:w-1/2"></div>
              <div className="md:w-1/2 md:pl-8 text-left">
                <div className="bg-[#0A68FF] text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <h3 className="font-semibold text-lg">Módulo 2: Roteiro e Storytelling com IA</h3>
                <p className="text-black/70 text-sm">Crie narrativas envolventes e roteiros otimizados para viralização.</p>
                <p className="text-black/50 text-xs mt-1">Duração: 3 horas</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row items-center md:justify-between relative">
              <div className="md:w-1/2 md:pr-8 text-right">
                <div className="bg-[#0A68FF] text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <h3 className="font-semibold text-lg">Módulo 3: Deepfake e Lip-Sync na Prática</h3>
                <p className="text-black/70 text-sm">Aprenda a criar personagens realistas e sincronia labial perfeita.</p>
                <p className="text-black/50 text-xs mt-1">Duração: 4 horas</p>
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col md:flex-row items-center md:justify-between relative">
              <div className="hidden md:block md:w-1/2"></div>
              <div className="md:w-1/2 md:pl-8 text-left">
                <div className="bg-[#0A68FF] text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <h3 className="font-semibold text-lg">Módulo 4: Edição e Pós-Produção com IA</h3>
                <p className="text-black/70 text-sm">Técnicas avançadas para transformar seus vídeos em obras de arte.</p>
                <p className="text-black/50 text-xs mt-1">Duração: 5 horas</p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="flex flex-col md:flex-row items-center md:justify-between relative">
              <div className="md:w-1/2 md:pr-8 text-right">
                <div className="bg-[#0A68FF] text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <h3 className="font-semibold text-lg">Módulo 5: Estratégias de Viralização e Monetização</h3>
                <p className="text-black/70 text-sm">Faça seus vídeos alcançarem milhões e aprenda a monetizar seu conteúdo.</p>
                <p className="text-black/50 text-xs mt-1">Duração: 3 horas</p>
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CARROSSEL DE DEPOIMENTOS */
function Testimonials({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Troca de depoimento a cada 5 segundos
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        currentIndex * 100
      }%)`;
    }
  }, [currentIndex]);

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            O que nossos alunos dizem
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Histórias de sucesso de quem já está transformando sua paixão em resultados.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl shadow-sm border border-black/10 bg-white p-6 md:p-8">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${testimonials.length * 100}%` }}
          >
            {testimonials.map((testimonial, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full object-cover shadow-md"
                  />
                  <div className="text-center md:text-left">
                    <p className="text-lg italic text-black/80 mb-4">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <p className="font-semibold text-black">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-black/60">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navegação (opcional, se precisar de botões) */}
          {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === i ? "bg-[#0A68FF]" : "bg-gray-300"
                }`}
              />
            ))}
          </div> */}
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
        <div className="rounded-xl border border-black/10 p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 shadow-sm text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Não perca essa oportunidade!
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">
            Aprenda a criar vídeos incríveis com IA e transforme sua presença online. Vagas limitadas!
          </p>
          <a
            href={cta}
            className="inline-flex items-center justify-center rounded-full bg-[#0A68FF] text-white px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all duration-200 hover:scale-105"
          >
            🚀 Quero Garantir Minha Vaga Agora
          </a>
        </div>
      </div>
    </section>
  );
}

/* FAQ */
function Faq() {
  const faqs = [
    {
      question: "Preciso ter conhecimento prévio em edição de vídeo ou IA?",
      answer: "Não! O curso é feito para iniciantes e avançados. Você aprenderá do zero ao avançado, sem complicação.",
    },
    {
      question: "Quais ferramentas de IA serão utilizadas?",
      answer: "Utilizaremos as ferramentas mais atuais e eficientes do mercado, muitas delas gratuitas ou com planos acessíveis. Você terá acesso a uma lista completa dentro do curso.",
    },
    {
      question: "O curso oferece suporte?",
      answer: "Sim! Você terá acesso à nossa comunidade exclusiva de alunos, onde poderá tirar dúvidas e trocar experiências com outros criadores.",
    },
    {
      question: "Por quanto tempo terei acesso ao curso?",
      answer: "O acesso é vitalício! Compre uma vez e tenha acesso a todas as aulas e futuras atualizações para sempre.",
    },
    {
      question: "Existe garantia?",
      answer: "Sim! Oferecemos 7 dias de garantia incondicional. Se por qualquer motivo você não gostar do curso, devolvemos 100% do seu dinheiro.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Tire suas dúvidas e comece sua jornada na criação de vídeos com IA hoje mesmo.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-black/10"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left font-semibold text-lg"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-black/70">
                  <p>{faq.answer}</p>
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
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={img}
              alt="Autor"
              className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Conheça o seu mentor
            </h2>
            <p className="text-lg text-black/70 mb-4">
              Olá! Sou [Nome do Autor], especialista em inteligência artificial e criação de conteúdo viral. Já ajudei milhares de pessoas a transformarem suas ideias em vídeos que geram milhões de visualizações.
            </p>
            <p className="text-lg text-black/70">
              Minha missão é descomplicar a IA e te mostrar como você pode usar essa tecnologia para criar vídeos incríveis, mesmo que você nunca tenha editado um vídeo na vida.
            </p>
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
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-xl border border-black/10 p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white shadow-sm text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Comece a criar vídeos virais hoje mesmo!
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto mb-8">
            Não fique para trás. A inteligência artificial é o futuro da criação de conteúdo. Garanta sua vaga agora e domine essa tecnologia.
          </p>
          <a
            href={cta}
            className="inline-flex items-center justify-center rounded-full bg-[#0A68FF] text-white px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all duration-200 hover:scale-105"
          >
            🚀 Quero Dominar a IA para Vídeos
          </a>
        </div>
      </div>
    </section>
  );
}

/* FOOTER */
function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} VideosCraft IA. Todos os direitos reservados.</p>
        <p className="mt-2">
          <a href="#" className="hover:text-white">Termos de Uso</a> | <a href="#" className="hover:text-white">Política de Privacidade</a>
        </p>
      </div>
    </footer>
  );
}


