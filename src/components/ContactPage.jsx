import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Orçamento de Projeto',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Preparar mensagem para WhatsApp
    const whatsappMessage = `
*Nova mensagem do site VideosCraftIA*

*Nome:* ${formData.name}
*Email:* ${formData.email}
*Empresa:* ${formData.company || 'Não informado'}
*Assunto:* ${formData.subject}

*Mensagem:*
${formData.message}
    `.trim();
    
    // Enviar para WhatsApp
    const phoneNumber = "5547997739046";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      // Abrir WhatsApp
      window.open(whatsappUrl, '_blank');
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'Orçamento de Projeto',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="pt-20 pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Vamos criar o próximo <span className="text-yellow-400">viral</span>?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Se você tem um projeto audacioso, uma marca que quer se destacar ou simplesmente precisa de uma ideia que quebre a internet, você está no lugar certo. Preencha o formulário abaixo e minha equipe (ou eu mesmo) retornará o mais breve possível.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="px-4 md:px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">📱</div>
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">Redirecionado para WhatsApp!</h2>
                <p className="text-gray-300 mb-6">
                  Sua mensagem foi formatada e enviada para o WhatsApp. Retornarei em breve com uma proposta personalizada!
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-full font-semibold transition-all duration-200"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-300">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white placeholder-gray-400"
                    placeholder="Seu nome completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-300">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white placeholder-gray-400"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold mb-2 text-gray-300">
                    Empresa/Marca (Opcional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white placeholder-gray-400"
                    placeholder="Nome da sua empresa ou marca"
                  />
                </div>

                {/* Assunto */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-300">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                  >
                    <option value="Orçamento de Projeto">Orçamento de Projeto</option>
                    <option value="Consultoria Criativa">Consultoria Criativa</option>
                    <option value="Imprensa">Imprensa</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                {/* Mensagem */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-300">
                    Me conte sobre o seu desafio *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white placeholder-gray-400 resize-vertical"
                    placeholder="Descreva seu projeto, objetivos, público-alvo e o que você espera alcançar. Quanto mais detalhes, melhor será minha proposta!"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        Enviando...
                      </div>
                    ) : (
                      'ENVIAR MENSAGEM'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
              <div className="flex items-center gap-3 mb-3">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#FFD700" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                <h3 className="text-lg font-bold text-yellow-400">Resposta Rápida</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Retorno em até 24 horas para projetos urgentes e oportunidades especiais.
              </p>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
              <div className="flex items-center gap-3 mb-3">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#FFD700" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M16 12l-4-4-4 4"/>
                  <path d="M12 16V8"/>
                </svg>
                <h3 className="text-lg font-bold text-yellow-400">Consultoria Gratuita</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Primeira conversa sempre gratuita para entender seu desafio e propor soluções.
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/30">
              <p className="text-gray-300 mb-4">
                <strong className="text-yellow-400">+50 marcas</strong> já confiaram no meu trabalho para criar momentos virais
              </p>
              <div className="flex justify-center items-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  <span>Startups</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4v18"/>
                    <path d="M19 21V11l-6-4"/>
                  </svg>
                  <span>Empresas</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Influenciadores</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Artistas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
