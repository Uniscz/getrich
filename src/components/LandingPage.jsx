import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { CheckCircle, Play, Star, Users, Clock, Trophy, ArrowRight } from 'lucide-react'

const LandingPage = ({ onGetAccess }) => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    await onGetAccess(email)
    setIsLoading(false)
  }

  const benefits = [
    "Aprenda a criar vídeos profissionais com IA",
    "Técnicas avançadas de edição automatizada",
    "Scripts e roteiros gerados por inteligência artificial",
    "Ferramentas de IA para criação de conteúdo",
    "Monetização através de vídeos automatizados",
    "Suporte completo da comunidade"
  ]

  const faqs = [
    {
      question: "Preciso ter experiência prévia?",
      answer: "Não! O curso foi desenvolvido para iniciantes e avançados. Começamos do básico e evoluímos gradualmente."
    },
    {
      question: "Quanto tempo tenho acesso?",
      answer: "Você terá acesso vitalício ao curso e todas as atualizações futuras."
    },
    {
      question: "Funciona em qualquer computador?",
      answer: "Sim! As ferramentas funcionam em Windows, Mac e Linux. Você só precisa de internet."
    },
    {
      question: "Tem garantia?",
      answer: "Sim! Oferecemos 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do valor."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-600 hover:bg-purple-700">
            🚀 Lançamento Especial
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Videos Craft <span className="text-purple-400">IA</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Domine a criação de vídeos profissionais usando Inteligência Artificial. 
            Transforme suas ideias em conteúdo viral de forma automatizada.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5 text-purple-400" />
              <span>+1.000 alunos</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>4.9/5 estrelas</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5 text-green-400" />
              <span>8+ horas de conteúdo</span>
            </div>
          </div>
        </div>

        {/* CTA Form */}
        <Card className="max-w-md mx-auto mb-16 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Garanta sua vaga</CardTitle>
            <CardDescription className="text-gray-300">
              Insira seu e-mail abaixo. Você receberá um link mágico para acessar o curso.
            </CardDescription>
            <div className="text-center">
              <span className="text-3xl font-bold text-white">R$ 119,90</span>
              <span className="text-gray-400 line-through ml-2">R$ 297,00</span>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar link mágico'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
            <p className="text-xs text-gray-400 text-center mt-4">
              Após clicar em enviar, abriremos o checkout em uma nova guia. 
              Complete o pagamento para liberar o acesso.
            </p>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            O que você vai aprender
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-white">{benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Preview */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Veja uma prévia do curso
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Button variant="ghost" className="text-white hover:bg-white/20">
                    <Play className="w-16 h-16" />
                  </Button>
                </div>
                <p className="text-gray-300 mt-4">
                  Assista ao vídeo de apresentação e descubra como a IA pode revolucionar sua criação de conteúdo
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="max-w-lg mx-auto bg-gradient-to-r from-purple-600 to-blue-600 border-0">
            <CardContent className="p-8">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Não perca esta oportunidade!
              </h3>
              <p className="text-white/90 mb-6">
                Junte-se a mais de 1.000 criadores que já estão usando IA para criar conteúdo profissional.
              </p>
              <Button 
                onClick={() => document.querySelector('input[type="email"]').focus()}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Começar Agora
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

