import React, { useState, useEffect } from "react";
import { database, admin, invitations } from "../lib/supabase_enhanced.jsx";
import { useAuth } from "../hooks/useAuthEnhanced.jsx";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Users, 
  UserPlus, 
  BookOpen, 
  Mail, 
  Trash2, 
  Edit, 
  Eye,
  Copy,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  Plus,
  Settings
} from "lucide-react";

export function AdminPanelEnhanced() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("info");

  // Estados para usuários
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  
  // Estados para aulas
  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  
  // Estados para convites
  const [invitationsList, setInvitationsList] = useState([]);
  
  // Estados para formulários
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "student"
  });
  
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    video_url: "",
    order_num: 1,
    module: "Módulo 1",
    course_id: "",
    duration_minutes: 0,
    is_free: false
  });
  
  const [newInvitation, setNewInvitation] = useState({
    email: "",
    course_id: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const showMessage = (message, type = "info") => {
    setMsg(message);
    setMsgType(type);
    setTimeout(() => setMsg(""), 5000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadUsers(),
        loadLessons(),
        loadCourses(),
        loadInvitations(),
        loadEnrollments()
      ]);
    } catch (error) {
      showMessage("Erro ao carregar dados", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    const { data, error } = await admin.getAllUsers();
    if (!error && data) {
      setUsers(data);
    }
  };

  const loadEnrollments = async () => {
    const { data, error } = await admin.getAllEnrollments();
    if (!error && data) {
      setEnrollments(data);
    }
  };

  const loadLessons = async () => {
    const { data, error } = await database.getLessons();
    if (!error && data) {
      setLessons(data);
    }
  };

  const loadCourses = async () => {
    const { data, error } = await database.getCourses();
    if (!error && data) {
      setCourses(data);
    }
  };

  const loadInvitations = async () => {
    const { data, error } = await invitations.getInvitations();
    if (!error && data) {
      setInvitationsList(data);
    }
  };

  // Funções para usuários
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await admin.createUser(
        newUser.email,
        newUser.password,
        newUser.fullName,
        newUser.role
      );
      
      if (error) {
        showMessage(error.message, "error");
      } else {
        showMessage("Usuário criado com sucesso!", "success");
        setNewUser({ email: "", password: "", fullName: "", role: "student" });
        await loadUsers();
      }
    } catch (error) {
      showMessage("Erro ao criar usuário", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEnrollment = async (userId, courseId) => {
    try {
      const { error } = await admin.createEnrollment(userId, courseId);
      if (error) {
        showMessage(error.message, "error");
      } else {
        showMessage("Matrícula criada com sucesso!", "success");
        await loadEnrollments();
      }
    } catch (error) {
      showMessage("Erro ao criar matrícula", "error");
    }
  };

  // Funções para aulas
  const handleCreateLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const lessonData = {
        ...newLesson,
        order_num: parseInt(newLesson.order_num),
        duration_minutes: parseInt(newLesson.duration_minutes) || 0
      };
      
      const { error } = await database.addLesson(lessonData);
      
      if (error) {
        showMessage(error.message, "error");
      } else {
        showMessage("Aula criada com sucesso!", "success");
        setNewLesson({
          title: "",
          description: "",
          video_url: "",
          order_num: lessons.length + 1,
          module: "Módulo 1",
          course_id: "",
          duration_minutes: 0,
          is_free: false
        });
        await loadLessons();
      }
    } catch (error) {
      showMessage("Erro ao criar aula", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta aula?')) return;
    
    try {
      const { error } = await database.deleteLesson(id);
      if (error) {
        showMessage(error.message, "error");
      } else {
        showMessage("Aula excluída com sucesso!", "success");
        await loadLessons();
      }
    } catch (error) {
      showMessage("Erro ao excluir aula", "error");
    }
  };

  // Funções para convites
  const handleCreateInvitation = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await admin.generateInvitation(
        newInvitation.email,
        newInvitation.course_id
      );
      
      if (error) {
        showMessage(error.message, "error");
      } else {
        const inviteLink = `${window.location.origin}/#/registro?token=${data}`;
        showMessage("Convite criado! Link copiado para a área de transferência.", "success");
        
        // Copiar link para clipboard
        navigator.clipboard.writeText(inviteLink);
        
        setNewInvitation({ email: "", course_id: "" });
        await loadInvitations();
      }
    } catch (error) {
      showMessage("Erro ao criar convite", "error");
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = (token) => {
    const inviteLink = `${window.location.origin}/#/registro?token=${token}`;
    navigator.clipboard.writeText(inviteLink);
    showMessage("Link copiado para a área de transferência!", "success");
  };

  const goBack = () => {
    window.location.hash = '#/';
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.hash = '#/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={goBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao site
            </Button>
            <h1 className="font-semibold text-lg">
              Painel Administrativo - Videos Craft IA
            </h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sair
          </Button>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        {/* Mensagens */}
        {msg && (
          <Alert className={`mb-6 ${
            msgType === 'error' ? 'border-red-500 text-red-700' :
            msgType === 'success' ? 'border-green-500 text-green-700' :
            'border-blue-500 text-blue-700'
          }`}>
            <AlertDescription>{msg}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Aulas
            </TabsTrigger>
            <TabsTrigger value="invitations" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Convites
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Tab: Usuários */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Criar usuário */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Criar Usuário
                  </CardTitle>
                  <CardDescription>
                    Adicione um novo usuário manualmente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome completo</Label>
                      <Input
                        id="fullName"
                        value={newUser.fullName}
                        onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Tipo de usuário</Label>
                      <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Aluno</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Criar Usuário
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Lista de usuários */}
              <Card>
                <CardHeader>
                  <CardTitle>Usuários Cadastrados ({users.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.full_name || 'Sem nome'}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? 'Admin' : 'Aluno'}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {courses.length > 0 && (
                            <Select onValueChange={(courseId) => handleCreateEnrollment(user.id, courseId)}>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Matricular" />
                              </SelectTrigger>
                              <SelectContent>
                                {courses.map((course) => (
                                  <SelectItem key={course.id} value={course.id}>
                                    {course.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Matrículas */}
            <Card>
              <CardHeader>
                <CardTitle>Matrículas Ativas ({enrollments.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{enrollment.profiles?.full_name || 'Sem nome'}</p>
                        <p className="text-sm text-gray-600">{enrollment.profiles?.email}</p>
                        <p className="text-xs text-gray-500">
                          Curso: {enrollment.courses?.title} | 
                          Método: {enrollment.payment_method} | 
                          Status: {enrollment.status}
                        </p>
                      </div>
                      <Badge variant={enrollment.status === 'active' ? 'default' : 'secondary'}>
                        {enrollment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Aulas */}
          <TabsContent value="lessons" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Criar aula */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Adicionar Nova Aula
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateLesson} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="lessonTitle">Título da Aula</Label>
                      <Input
                        id="lessonTitle"
                        value={newLesson.title}
                        onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                        placeholder="Ex: Introdução ao Pipeline de IA"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lessonDescription">Descrição</Label>
                      <Textarea
                        id="lessonDescription"
                        value={newLesson.description}
                        onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
                        placeholder="Breve descrição do conteúdo da aula..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="videoUrl">URL do Vídeo</Label>
                      <Input
                        id="videoUrl"
                        type="url"
                        value={newLesson.video_url}
                        onChange={(e) => setNewLesson({...newLesson, video_url: e.target.value})}
                        placeholder="https://..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="module">Módulo</Label>
                        <Select value={newLesson.module} onValueChange={(value) => setNewLesson({...newLesson, module: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Módulo 1">Módulo 1</SelectItem>
                            <SelectItem value="Módulo 2">Módulo 2</SelectItem>
                            <SelectItem value="Módulo 3">Módulo 3</SelectItem>
                            <SelectItem value="Módulo 4">Módulo 4</SelectItem>
                            <SelectItem value="Bônus">Bônus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="order">Ordem</Label>
                        <Input
                          id="order"
                          type="number"
                          value={newLesson.order_num}
                          onChange={(e) => setNewLesson({...newLesson, order_num: e.target.value})}
                          min="1"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Adicionando...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Aula
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Lista de aulas */}
              <Card>
                <CardHeader>
                  <CardTitle>Aulas Cadastradas ({lessons.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {lessons.map((lesson) => (
                      <div key={lesson.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{lesson.title}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{lesson.module} - Ordem: {lesson.order_num}</span>
                          <a 
                            href={lesson.video_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            Ver vídeo
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Convites */}
          <TabsContent value="invitations" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Criar convite */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Gerar Convite
                  </CardTitle>
                  <CardDescription>
                    Crie um link de convite para um novo usuário
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateInvitation} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="inviteEmail">Email do convidado</Label>
                      <Input
                        id="inviteEmail"
                        type="email"
                        value={newInvitation.email}
                        onChange={(e) => setNewInvitation({...newInvitation, email: e.target.value})}
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inviteCourse">Curso</Label>
                      <Select value={newInvitation.course_id} onValueChange={(value) => setNewInvitation({...newInvitation, course_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um curso" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Gerar Convite
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Lista de convites */}
              <Card>
                <CardHeader>
                  <CardTitle>Convites Enviados ({invitationsList.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {invitationsList.map((invitation) => (
                      <div key={invitation.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{invitation.email}</p>
                            <p className="text-sm text-gray-600">
                              Curso: {invitation.courses?.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              Criado em: {new Date(invitation.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={invitation.used_at ? 'default' : 'secondary'}>
                              {invitation.used_at ? (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Usado
                                </>
                              ) : new Date(invitation.expires_at) < new Date() ? (
                                <>
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Expirado
                                </>
                              ) : (
                                'Ativo'
                              )}
                            </Badge>
                            {!invitation.used_at && new Date(invitation.expires_at) > new Date() && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyInviteLink(invitation.token)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Configurações */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>
                  Configurações gerais do painel administrativo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      <strong>Instruções de Uso:</strong>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Para acessar este painel, vá para: <code className="bg-gray-100 px-1 rounded">seusite.com/#/admin</code></li>
                        <li>• Organize as aulas por módulos e defina a ordem de exibição</li>
                        <li>• Use URLs diretas de vídeo ou links do YouTube/Vimeo</li>
                        <li>• As aulas aparecerão automaticamente na área do aluno após serem cadastradas</li>
                        <li>• Convites têm validade de 72 horas por padrão</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                  
                  <Button onClick={loadData} className="w-full">
                    <Loader2 className="w-4 h-4 mr-2" />
                    Recarregar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

