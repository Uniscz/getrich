import React, { useState, useEffect } from "react";
import { database, progress } from "../lib/supabase_enhanced.jsx";
import { useAuth } from "../hooks/useAuthEnhanced.jsx";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Play, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  User, 
  LogOut,
  ArrowLeft,
  Trophy,
  Target,
  Calendar,
  Video
} from "lucide-react";

export function StudentPortal() {
  const { user, profile, signOut } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [progressStats, setProgressStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    progressPercentage: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadLessons(),
        loadProgress(),
        loadProgressStats()
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLessons = async () => {
    const { data, error } = await database.getLessons();
    if (!error && data) {
      setLessons(data.sort((a, b) => a.order_num - b.order_num));
    }
  };

  const loadProgress = async () => {
    const { data, error } = await progress.getUserProgress();
    if (!error && data) {
      setUserProgress(data);
    }
  };

  const loadProgressStats = async () => {
    const { data, error } = await progress.getProgressStats();
    if (!error && data) {
      setProgressStats(data);
    }
  };

  const isLessonCompleted = (lessonId) => {
    return userProgress.some(p => p.lesson_id === lessonId && p.completed);
  };

  const handleMarkComplete = async (lessonId) => {
    try {
      await progress.markLessonComplete(lessonId);
      await loadProgress();
      await loadProgressStats();
    } catch (error) {
      console.error('Erro ao marcar aula como concluída:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.hash = '#/';
  };

  const goBack = () => {
    window.location.hash = '#/';
  };

  const groupedLessons = lessons.reduce((acc, lesson) => {
    const module = lesson.module || 'Sem módulo';
    if (!acc[module]) {
      acc[module] = [];
    }
    acc[module].push(lesson);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu progresso...</p>
        </div>
      </div>
    );
  }

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
              Portal do Aluno - Videos Craft IA
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium">{profile?.full_name || 'Aluno'}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        {/* Dashboard de Progresso */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressStats.progressPercentage}%</div>
              <Progress value={progressStats.progressPercentage} className="mt-2" />
              <p className="text-xs text-gray-600 mt-2">
                {progressStats.completedLessons} de {progressStats.totalLessons} aulas concluídas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aulas Concluídas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressStats.completedLessons}</div>
              <p className="text-xs text-gray-600">
                {progressStats.totalLessons - progressStats.completedLessons} restantes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Aulas</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressStats.totalLessons}</div>
              <p className="text-xs text-gray-600">
                Disponíveis no curso
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Boas-vindas */}
        <Alert className="mb-8 border-blue-500 bg-blue-50">
          <Target className="h-4 w-4" />
          <AlertDescription>
            <strong>Bem-vindo ao curso Videos Craft IA!</strong> 
            {progressStats.progressPercentage === 0 
              ? " Comece assistindo a primeira aula abaixo."
              : ` Você já concluiu ${progressStats.progressPercentage}% do curso. Continue assim!`
            }
          </AlertDescription>
        </Alert>

        {/* Lista de Aulas por Módulo */}
        <div className="space-y-8">
          {Object.entries(groupedLessons).map(([module, moduleLessons]) => (
            <Card key={module}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {module}
                </CardTitle>
                <CardDescription>
                  {moduleLessons.length} aula{moduleLessons.length !== 1 ? 's' : ''} • 
                  {moduleLessons.filter(lesson => isLessonCompleted(lesson.id)).length} concluída{moduleLessons.filter(lesson => isLessonCompleted(lesson.id)).length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moduleLessons.map((lesson, index) => {
                    const completed = isLessonCompleted(lesson.id);
                    return (
                      <div 
                        key={lesson.id} 
                        className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                          completed ? 'bg-green-50 border-green-200' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-medium text-gray-500">
                                Aula {lesson.order_num}
                              </span>
                              {completed && (
                                <Badge variant="default" className="bg-green-600">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Concluída
                                </Badge>
                              )}
                              {lesson.is_free && (
                                <Badge variant="secondary">
                                  Gratuita
                                </Badge>
                              )}
                            </div>
                            
                            <h3 className="font-semibold text-lg mb-2">{lesson.title}</h3>
                            
                            {lesson.description && (
                              <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                            )}
                            
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              {lesson.duration_minutes > 0 && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.duration_minutes} min
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Video className="w-3 h-3" />
                                Vídeo aula
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 ml-4">
                            <Button
                              onClick={() => window.open(lesson.video_url, '_blank')}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Assistir
                            </Button>
                            
                            {!completed && (
                              <Button
                                variant="outline"
                                onClick={() => handleMarkComplete(lesson.id)}
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Marcar como concluída
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mensagem de conclusão */}
        {progressStats.progressPercentage === 100 && (
          <Card className="mt-8 border-green-500 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">
                  Parabéns! Você concluiu o curso!
                </h2>
                <p className="text-green-600">
                  Você assistiu todas as {progressStats.totalLessons} aulas do curso Videos Craft IA. 
                  Agora é hora de colocar em prática tudo que aprendeu!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instruções */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 Dicas para aproveitar melhor o curso</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Assista as aulas na ordem sugerida para melhor compreensão</li>
              <li>• Pratique os exercícios propostos em cada módulo</li>
              <li>• Marque as aulas como concluídas para acompanhar seu progresso</li>
              <li>• Revise as aulas sempre que necessário</li>
              <li>• Aplique os conhecimentos em projetos reais</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

