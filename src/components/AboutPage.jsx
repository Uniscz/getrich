import React from 'react';
import SocialLinks from './SocialLinks.jsx';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="pt-20 pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              De <span className="text-red-400">"multi-nicho"</span> a <span className="text-yellow-400">mestre do algoritmo</span>
            </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Photo */}
            <div className="md:col-span-1">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-800 border border-gray-700">
                <img
                  src="/author_image.png"
                  alt="Foto profissional"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                  Eu nunca me encaixei em um nicho. E essa sempre foi a minha maior força.
                </p>

                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                  Enquanto o mercado insistia em fórmulas e repetição, eu estava ocupado entendendo o que realmente conecta as pessoas: <strong className="text-yellow-400">autenticidade</strong>, <strong className="text-yellow-400">timing cultural</strong> e a <strong className="text-yellow-400">coragem de ser imprevisível</strong>. Meu processo não segue um manual; ele segue o pulso da internet.
                </p>

                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                  Comecei postando "de zoeira" e, em poucos meses, transformei um perfil do zero em um fenômeno com milhões de visualizações, provando que uma boa ideia vale mais que qualquer orçamento de marketing.
                </p>

                <p className="text-lg leading-relaxed text-gray-300 mb-8">
                  Hoje, meu laboratório criativo é o TikTok, mas minha missão é maior: ajudar marcas e projetos corajosos a criarem momentos que não são apenas vistos, mas <strong className="text-yellow-400">sentidos e compartilhados</strong>. Eu não sigo tendências. Eu ajudo a criá-las.
                </p>

                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl p-6 border border-yellow-400/30">
                  <p className="text-xl font-bold text-center">
                    Meu nome é <span className="text-yellow-400">André</span> e eu sou um <span className="text-yellow-400">estrategista de conteúdo viral</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills/Expertise Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
              Minha Expertise
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Timing Cultural</h3>
                <p className="text-gray-300">
                  Identifico o momento exato para lançar conteúdo que ressoa com o zeitgeist digital
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Psicologia Viral</h3>
                <p className="text-gray-300">
                  Entendo os gatilhos emocionais que fazem as pessoas compartilharem compulsivamente
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Execução Rápida</h3>
                <p className="text-gray-300">
                  Transformo ideias em conteúdo viral em questão de horas, não semanas
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">
                Minha Filosofia
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">❌ O que EU NÃO faço:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Seguir fórmulas prontas</li>
                    <li>• Copiar tendências óbvias</li>
                    <li>• Criar conteúdo "seguro"</li>
                    <li>• Prometer resultados sem estratégia</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">✅ O que EU faço:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Crio momentos únicos e memoráveis</li>
                    <li>• Antecipo tendências culturais</li>
                    <li>• Assumo riscos calculados</li>
                    <li>• Entrego resultados mensuráveis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">
              Me siga nas redes sociais
            </h2>
            <div className="flex justify-center">
              <SocialLinks iconSize="w-8 h-8" />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para criar o próximo viral?
            </h2>
            <a
              href="#contato"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-200 hover:scale-105"
            >
              VAMOS CONVERSAR
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
