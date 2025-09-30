import React, { useState } from 'react';

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Case: A Grávida de Taubaté",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      videoUrl: "https://www.tiktok.com/embed/v2/example1",
      challenge: "Criar uma peça de conteúdo que unisse um meme histórico da cultura pop brasileira com a sátira política atual, gerando identificação em múltiplos públicos e potencial de viralização massiva para marcar um retorno estratégico à plataforma.",
      results: {
        views: "15.7 Milhões",
        shares: "834 mil",
        comments: "120 mil",
        followers: "+25 mil",
        impact: "Mídia espontânea em portais de notícia e menções por influenciadores."
      }
    },
    {
      id: 2,
      title: "Case: Sátira Prisional",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
      videoUrl: "https://www.tiktok.com/embed/v2/example2",
      challenge: "Desenvolver uma narrativa visual impactante que combinasse elementos de crítica social com humor inteligente, criando um conteúdo que gerasse discussão e engajamento massivo.",
      results: {
        views: "8.2 Milhões",
        shares: "456 mil",
        comments: "89 mil",
        followers: "+18 mil",
        impact: "Trending topic no Twitter e compartilhamento por celebridades."
      }
    },
    {
      id: 3,
      title: "Case: Viral Cultural",
      thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop",
      videoUrl: "https://www.tiktok.com/embed/v2/example3",
      challenge: "Criar um momento cultural que transcendesse as redes sociais e se tornasse parte do vocabulário popular, estabelecendo uma nova referência na internet brasileira.",
      results: {
        views: "22.1 Milhões",
        shares: "1.2 milhões",
        comments: "234 mil",
        followers: "+42 mil",
        impact: "Virou meme nacional e foi referenciado em programas de TV."
      }
    }
  ];

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="pt-20 pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Projetos que Viraram <span className="text-yellow-400">Assunto</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cases reais que quebraram a internet e geraram milhões de visualizações
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="px-4 md:px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 border border-gray-700/50"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Clique para ver os detalhes e resultados
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetail = ({ project, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Back Button */}
      <div className="pt-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar aos Projetos
          </button>
        </div>
      </div>

      {/* Project Header */}
      <div className="px-4 md:px-6 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Video Player */}
      <div className="px-4 md:px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p>Vídeo do TikTok seria incorporado aqui</p>
                <p className="text-sm mt-2">URL: {project.videoUrl}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Section */}
      <div className="px-4 md:px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">O Desafio</h2>
            <p className="text-gray-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="px-4 md:px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Os Resultados em 48 Horas</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-300">Visualizações:</span>
                <span className="font-bold text-xl">{project.results.views}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-300">Compartilhamentos:</span>
                <span className="font-bold text-xl">{project.results.shares}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-300">Comentários:</span>
                <span className="font-bold text-xl">{project.results.comments}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-300">Novos Seguidores:</span>
                <span className="font-bold text-xl">{project.results.followers}</span>
              </div>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6">
              <h3 className="font-semibold mb-2 text-yellow-400">Impacto:</h3>
              <p className="text-gray-300">{project.results.impact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <a
            href="#contato"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-200 hover:scale-105"
          >
            QUERO UM RESULTADO ASSIM
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
