import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Clock, Users, MapPin, Calendar, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import type { Course } from '../types/course';

export const CourseDetailPage: React.FC = () => {
  // Extract course ID from URL path
  const getCourseIdFromPath = () => {
    const path = window.location.pathname;
    const segments = path.split('/');
    return segments[segments.length - 1];
  };

  const courseId = getCourseIdFromPath();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('apresentacao');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      loadCourse();
    }
  }, [courseId]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', courseId)
        .single();

      if (error) throw error;

      setCourse(data);
    } catch (error: any) {
      console.error('Erro ao carregar curso:', error);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando curso...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Curso não encontrado</h1>
            <p className="mt-4 text-gray-600">O curso solicitado não foi encontrado.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: 'apresentacao', label: 'Apresentação' },
    { id: 'programa', label: 'Programa' },
    { id: 'coordenacao', label: 'Coordenação' },
    { id: 'documentos', label: 'Documentos' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Detalhes do Curso</h1>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Matricule-se */}
              <div className="bg-blue-900 text-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">MATRICULE-SE JÁ</h3>
                <p className="text-sm mb-4">Precisa de ajuda para realizar sua inscrição?</p>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  CLIQUE AQUI
                </Button>
              </div>

              {/* Modalidade */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-3 text-blue-600" />
                  Modalidade
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Aulas virtuais (síncronas, ao vivo), com materiais e atividades disponíveis em ambiente virtual.
                </p>
              </div>

              {/* Carga Horária */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-blue-600" />
                  Carga Horária
                </h3>
                <p className="text-xl font-bold">{course.duration_hours} horas</p>
              </div>

              {/* Número de vagas */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-3 text-blue-600" />
                  Número de vagas
                </h3>
                <p className="text-sm text-gray-600">Número mínimo: 20</p>
                <p className="text-sm text-gray-600">Número máximo: {course.max_students}</p>
                <p className="text-sm text-red-600 mt-2">(Vagas limitadas)</p>
              </div>

              {/* Previsão de início */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                  Previsão de início
                </h3>
                {course.start_date ? (
                  <p className="text-sm text-gray-600">
                    Em {new Date(course.start_date + 'T00:00:00').toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}, conforme preenchimento das vagas e formação da turma.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    A definir, conforme preenchimento das vagas e formação da turma.
                  </p>
                )}
              </div>

              {/* Local */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                  Local
                </h3>
                <p className="text-sm text-gray-600">{course.location}</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Course Header */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-6 text-sm font-medium border-b-2 ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'apresentacao' && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-xl font-bold text-blue-900 mb-4">SOBRE O CURSO</h2>
                        <p className="text-gray-700 leading-relaxed">{course.content.about}</p>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-blue-900 mb-4">A QUEM SE DESTINA?</h2>
                        <p className="text-gray-700 leading-relaxed">{course.content.target_audience}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'programa' && (
                    <div>
                      <h2 className="text-xl font-bold text-blue-900 mb-4">PROGRAMA DO CURSO</h2>
                      <div className="space-y-4">
                        {course.content.program.map((item, index) => (
                          <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start flex-1">
                            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                              {index + 1}
                            </span>
                              <span className="text-gray-700 font-medium">
                                {typeof item === 'string' ? item : item.name}
                              </span>
                            </div>
                            {typeof item === 'object' && item.hours > 0 && (
                              <div className="text-sm text-blue-600 font-semibold">
                                {item.hours}h
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'coordenacao' && (
                    <div>
                      <h2 className="text-xl font-bold text-blue-900 mb-4">COORDENAÇÃO</h2>
                      
                      {/* Coordenação Geral */}
                      {(course.content.coordination_general || course.content.coordination_general_photo) && (
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coordenação Geral</h3>
                          <div className="flex flex-col md:flex-row gap-6 items-start">
                            {course.content.coordination_general_photo && (
                              <div className="flex-shrink-0">
                                <img
                                  src={course.content.coordination_general_photo}
                                  alt="Coordenador Geral"
                                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                                />
                              </div>
                            )}
                            {course.content.coordination_general && (
                              <div className="flex-1">
                                <p className="text-gray-700 leading-relaxed">
                                  {course.content.coordination_general}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Coordenação */}
                      {(course.content.coordination || course.content.coordination_photo) && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coordenação do Curso</h3>
                          <div className="flex flex-col md:flex-row gap-6 items-start">
                            {course.content.coordination_photo && (
                              <div className="flex-shrink-0">
                                <img
                                  src={course.content.coordination_photo}
                                  alt="Coordenador do Curso"
                                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                                />
                              </div>
                            )}
                            {course.content.coordination && (
                              <div className="flex-1">
                                <p className="text-gray-700 leading-relaxed">
                                  {course.content.coordination}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Mensagem quando não há coordenação cadastrada */}
                      {!course.content.coordination_general && !course.content.coordination_general_photo && 
                       !course.content.coordination && !course.content.coordination_photo && (
                        <p className="text-gray-500 italic">Informações de coordenação não disponíveis.</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'documentos' && (
                    <div>
                      <h2 className="text-xl font-bold text-blue-900 mb-4">DOCUMENTOS NECESSÁRIOS</h2>
                      <div 
                        className="prose prose-sm max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ 
                          __html: typeof course.content.requirements === 'string' 
                            ? course.content.requirements 
                            : Array.isArray(course.content.requirements)
                              ? course.content.requirements.map(req => `<p>• ${req}</p>`).join('')
                              : ''
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};