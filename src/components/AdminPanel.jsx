import React, { useState, useEffect } from "react";
import { database, supabase } from "../lib/supabase.jsx";

export function AdminPanel() {
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('lessons');
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    video_url: "",
    order: 1,
    module: "Módulo 1"
  });
  const [newStudent, setNewStudent] = useState({
    email: "",
    password: "",
    status: "active"
  });

  // Senha para acesso ao painel (pode ser armazenada em variável de ambiente em produção)
  const ADMIN_PASSWORD = "Alain1331@";

  // Carregar dados existentes
  useEffect(() => {
    if (loggedIn) {
      loadLessons();
      loadStudents();
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

  const loadStudents = async () => {
    try {
      // Buscar usuários e suas matrículas
      const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          profiles!inner(email, role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudents(enrollments || []);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
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

  const handleSubmitLesson = async (e) => {
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

  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newStudent.email,
        password: newStudent.password,
        email_confirm: true
      });

      if (authError) throw authError;

      // Criar perfil do usuário
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          email: newStudent.email,
          role: 'student'
        }]);

      if (profileError) throw profileError;

      // Criar matrícula
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .insert([{
          user_id: authData.user.id,
          status: newStudent.status
        }]);

      if (enrollmentError) throw enrollmentError;

      // Limpar formulário
      setNewStudent({
        email: "",
        password: "",
        status: "active"
      });

      // Recarregar lista
      await loadStudents();
      alert('Aluno cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      alert('Erro ao cadastrar aluno: ' + error.message);
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

  const toggleStudentStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ status: newStatus })
        .eq('user_id', userId);

      if (error) throw error;
      
      await loadStudents();
      alert(`Status do aluno alterado para ${newStatus === 'active' ? 'ativo' : 'inativo'}!`);
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      alert('Erro ao alterar status: ' + error.message);
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-6 text-center">Acesso Restrito</h2>
          <p className="text-sm text-gray-600 mb-4 text-center">Você precisa estar logado para acessar esta página.</p>
          <button
            onClick={() => window.location.hash = '#/login'}
            className="w-full bg-purple-600 text-white rounded-lg py-2 px-4 font-medium hover:bg-purple-700"
          >
            Fazer Login
          </button>
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
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'lessons'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Gerenciar Aulas
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'students'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Gerenciar Alunos
              </button>
            </nav>
          </div>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'lessons' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulário para adicionar nova aula */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Adicionar Nova Aula</h2>
              
              <form onSubmit={handleSubmitLesson} className="space-y-4">
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
        )}

        {activeTab === 'students' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulário para cadastrar novo aluno */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Cadastrar Novo Aluno</h2>
              
              <form onSubmit={handleSubmitStudent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email do Aluno
                  </label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="aluno@exemplo.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha Temporária
                  </label>
                  <input
                    type="password"
                    value={newStudent.password}
                    onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Senha temporária"
                    required
                    minLength="6"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    O aluno poderá alterar a senha após o primeiro login
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status da Matrícula
                  </label>
                  <select
                    value={newStudent.status}
                    onChange={(e) => setNewStudent({...newStudent, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-green-600 text-white rounded-lg py-2 px-4 font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? "Cadastrando..." : "Cadastrar Aluno"}
                </button>
              </form>
            </div>

            {/* Lista de alunos cadastrados */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Alunos Cadastrados ({students.length})</h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {students.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Nenhum aluno cadastrado ainda.
                  </p>
                ) : (
                  students.map((student) => (
                    <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{student.profiles?.email}</h3>
                          <p className="text-sm text-gray-500">
                            Cadastrado em: {new Date(student.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {student.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                          <button
                            onClick={() => toggleStudentStatus(student.user_id, student.status)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            {student.status === 'active' ? 'Desativar' : 'Ativar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instruções */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">📋 Instruções de Uso</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Para acessar este painel, vá para: <code className="bg-blue-100 px-1 rounded">seusite.com/#/admin</code></li>
            <li>• <strong>Aulas:</strong> Organize por módulos e defina a ordem de exibição</li>
            <li>• <strong>Alunos:</strong> Cadastre manualmente alunos que pagaram por fora do sistema</li>
            <li>• <strong>Status:</strong> Alunos ativos têm acesso ao conteúdo, inativos são bloqueados</li>
            <li>• As alterações aparecem automaticamente na área do aluno</li>
          </ul>
        </div>
      </div>
    </div>
  );
}



