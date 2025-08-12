import React, { useState, useEffect } from "react";
import { database } from "../lib/supabase.jsx";

export function AdminPanel() {
  const [lessons, setLessons] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    video_url: "",
    order: 1,
    module: "Módulo 1"
  });

  // Senha para acesso ao painel (pode ser armazenada em variável de ambiente em produção)
  const ADMIN_PASSWORD = "Alain1331@";

  // Carregar aulas existentes
  useEffect(() => {
    if (loggedIn) {
      loadLessons();
    }
  }, [loggedIn]);

  const loadLessons = async () => {
    try {
      const { data, error } = await database.getLessons();
      
      if (error) throw error;
      setLessons(data || []);
    } catch (error) {
      console.error('Erro ao carregar aulas:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
    } else {
      alert('Senha incorreta!');
      setPassword('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const lessonData = {
        title: newLesson.title,
        description: newLesson.description,
        video_url: newLesson.video_url,
        order_num: parseInt(newLesson.order),
        module: newLesson.module
      };

      const { data, error } = await database.addLesson(lessonData);

      if (error) throw error;

      // Limpar formulário
      setNewLesson({
        title: "",
        description: "",
        video_url: "",
        order: lessons.length + 1,
        module: "Módulo 1"
      });

      // Recarregar lista
      await loadLessons();
      alert('Aula adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar aula:', error);
      alert('Erro ao adicionar aula: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteLesson = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta aula?')) return;

    try {
      const { error } = await database.deleteLesson(id);

      if (error) throw error;
      await loadLessons();
      alert('Aula excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir aula:', error);
      alert('Erro ao excluir aula: ' + error.message);
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-6 text-center">Acesso Restrito</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Senha de Acesso</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite a senha"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 font-medium hover:bg-blue-700"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">
          <h1 className="font-semibold text-lg">
            Painel Administrativo - Videos Craft IA
          </h1>
          <a href="#/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Voltar ao site
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário para adicionar nova aula */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Adicionar Nova Aula</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título da Aula
                </label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Introdução ao Pipeline de IA"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Breve descrição do conteúdo da aula..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL do Vídeo
                </label>
                <input
                  type="url"
                  value={newLesson.video_url}
                  onChange={(e) => setNewLesson({...newLesson, video_url: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Cole a URL do vídeo (YouTube, Vimeo, ou link direto)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Módulo
                  </label>
                  <select
                    value={newLesson.module}
                    onChange={(e) => setNewLesson({...newLesson, module: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Módulo 1">Módulo 1</option>
                    <option value="Módulo 2">Módulo 2</option>
                    <option value="Módulo 3">Módulo 3</option>
                    <option value="Módulo 4">Módulo 4</option>
                    <option value="Bônus">Bônus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ordem
                  </label>
                  <input
                    type="number"
                    value={newLesson.order}
                    onChange={(e) => setNewLesson({...newLesson, order: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Adicionando..." : "Adicionar Aula"}
              </button>
            </form>
          </div>

          {/* Lista de aulas existentes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Aulas Cadastradas ({lessons.length})</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {lessons.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Nenhuma aula cadastrada ainda.
                </p>
              ) : (
                lessons.map((lesson) => (
                  <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                      <button
                        onClick={() => deleteLesson(lesson.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Excluir
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{lesson.module} - Ordem: {lesson.order_num}</span>
                      <a 
                        href={lesson.video_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Ver vídeo
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">📋 Instruções de Uso</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Para acessar este painel, vá para: <code className="bg-blue-100 px-1 rounded">seusite.com/#/admin</code></li>
            <li>• Organize as aulas por módulos e defina a ordem de exibição</li>
            <li>• Use URLs diretas de vídeo ou links do YouTube/Vimeo</li>
            <li>• As aulas aparecerão automaticamente na área do aluno após serem cadastradas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}



