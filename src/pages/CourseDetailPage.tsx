import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import ContactForm from '../components/forms/ContactForm';
import { Clock, Users, MapPin, Calendar, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    apresentacao: true,
    programa: false,
    coordenacao: false,
    documentos: false
  });
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
        .from('pos_cursos')
        .select('*')
        .eq('slug', courseId)
        .maybeSingle();

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

  const toggleAccordion = (tabId: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [tabId]: !prev[tabId]
    }));
  };

  const renderTabContent = (tabId: string) => {
    if (tabId === 'apresentacao') {
      return (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#02558C' }}>Sobre o curso</h2>
            <p className="text-gray-700 leading-relaxed">{course?.content.about}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#02558C' }}>A quem se destina?</h2>
            <p className="text-gray-700 leading-relaxed">{course?.content.target_audience}</p>
          </div>
        </div>
      );
    }

    if (tabId === 'programa') {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#02558C' }}>Programa do Curso</h2>
          <div className="space-y-4">
            {course?.content.program.map((item, index) => (
              <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start flex-1">
                  <span className="rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5" style={{ backgroundColor: '#21D3EE', color: 'white' }}>
                    {index + 1}
                  </span>
                  <span className="text-gray-700 font-medium">
                    {typeof item === 'string' ? item : item.name}
                  </span>
                </div>
                {typeof item === 'object' && item.hours > 0 && (
                  <div className="text-sm font-semibold" style={{ color: '#02558C' }}>
                    {item.hours}h
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (tabId === 'coordenacao') {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#02558C' }}>Coordenação</h2>
          
          {/* Coordenação Geral */}
          {(course?.content.coordination_general || course?.content.coordination_general_photo) && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Coordenação Geral</h3>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {course?.content.coordination_general_photo && (
                  <div className="flex-shrink-0">
                    <img
                      src={course.content.coordination_general_photo}
                      alt="Coordenador Geral"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                    />
                  </div>
                )}
                {course?.content.coordination_general && (
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
          {(course?.content.coordination || course?.content.coordination_photo) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Coordenação do Curso</h3>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {course?.content.coordination_photo && (
                  <div className="flex-shrink-0">
                    <img
                      src={course.content.coordination_photo}
                      alt="Coordenador do Curso"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                    />
                  </div>
                )}
                {course?.content.coordination && (
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
          {!course?.content.coordination_general && !course?.content.coordination_general_photo && 
           !course?.content.coordination && !course?.content.coordination_photo && (
            <p className="text-gray-500 italic">Informações de coordenação não disponíveis.</p>
          )}
        </div>
      );
    }

    if (tabId === 'documentos') {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#02558C' }}>Documentos</h2>
          <div 
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ 
              __html: typeof course?.content.requirements === 'string' 
                ? course.content.requirements 
                : Array.isArray(course?.content.requirements)
                  ? course.content.requirements.map(req => `<p>• ${req}</p>`).join('')
                  : ''
            }}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative">
        <img
          src={course.image_url}
          alt={course.title}
          className="w-full h-96 object-cover"
        />
      </section>

      {/* Title Bar */}
      <section className="py-6" style={{ backgroundColor: '#02558C' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center" style={{ color: '#21D3EE' }}>
            {course.title}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Layout */}
          <div className="hidden lg:block">
            {/* Two Column Layout */}
            <div className="grid grid-cols-12 gap-8">
              {/* Left Sidebar - Info Cards */}
              <div className="col-span-4 xl:col-span-3">
                <div className="space-y-6">
                  {/* Matricule-se Button */}
                  <button
                    className="w-full py-4 px-6 font-bold text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: '#21D3EE' }}
                  >
                    Matricule-se já!
                  </button>
                  {/* Modalidade */}
                  <div className="overflow-hidden" style={{ backgroundColor: '#E8F4F8' }}>
                    <div className="py-4 px-6" style={{ backgroundColor: '#02558C' }}>
                      <h3 className="text-lg font-bold text-white">
                        Modalidade
                      </h3>
                    </div>
                    <div className="py-4 px-6">
                      <p className="text-sm text-gray-700 font-semibold leading-relaxed mb-2">
                        {course.modality === 'presencial' && 'Presencial'}
                        {course.modality === 'online' && 'Online (Ao Vivo)'}
                        {course.modality === 'ead' && 'EAD'}
                        {course.modality === 'hibrido' && 'Híbrido'}
                      </p>
                      {course.modality_complement && (
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                          {course.modality_complement}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Carga Horária */}
                  <div className="overflow-hidden" style={{ backgroundColor: '#E8F4F8' }}>
                    <div className="py-4 px-6" style={{ backgroundColor: '#02558C' }}>
                      <h3 className="text-lg font-bold text-white">
                        Carga horária
                      </h3>
                    </div>
                    <div className="py-4 px-6">
                      <p className="text-2xl font-bold" style={{ color: '#02558C' }}>
                        {course.duration_hours} horas
                      </p>
                    </div>
                  </div>

                  {/* Vagas */}
                  <div className="overflow-hidden" style={{ backgroundColor: '#E8F4F8' }}>
                    <div className="py-4 px-6" style={{ backgroundColor: '#02558C' }}>
                      <h3 className="text-lg font-bold text-white">
                        Vagas
                      </h3>
                    </div>
                    <div className="py-4 px-6">
                      <p className="text-sm text-gray-700">Mínimo: {course.min_students}</p>
                      <p className="text-sm text-gray-700 mb-2">Máximo: {course.max_students}</p>
                      <p className="text-sm font-bold mb-3" style={{ color: '#21D3EE' }}>
                        Vagas limitadas
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        O HAM se reserva o direito de prorrogar o início do curso ou cancelá-lo caso não tenha atingido o número mínimo de alunos. Não havendo abertura da turma, o aluno é reembolsado integralmente do valor pago.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content Area */}
              <div className="col-span-8 xl:col-span-9">
                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-6 font-semibold transition-all duration-200 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'ring-2 ring-offset-2'
                          : 'hover:opacity-80'
                      }`}
                      style={{
                        backgroundColor: '#02558C',
                        color: 'white',
                        ringColor: activeTab === tab.id ? '#21D3EE' : 'transparent'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Content Box */}
                <div className="bg-white rounded-lg shadow-md p-8">
                  {renderTabContent(activeTab)}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Accordion Layout */}
          <div className="lg:hidden space-y-6">
            {/* Matricule-se Button */}
            <button
              className="w-full py-4 px-6 text-center font-bold text-white transition-all duration-200 hover:opacity-90 rounded-lg"
              style={{ backgroundColor: '#21D3EE' }}
            >
              Matricule-se já!
            </button>

            {/* Accordions */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {tabs.map((tab) => (
                <div key={tab.id} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleAccordion(tab.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors"
                    style={{
                      backgroundColor: openAccordions[tab.id] ? '#02558C' : 'white',
                      color: openAccordions[tab.id] ? 'white' : '#02558C'
                    }}
                  >
                    <span className="font-semibold">{tab.label}</span>
                    {openAccordions[tab.id] ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  {openAccordions[tab.id] && (
                    <div className="px-6 py-6 bg-gray-50">
                      {renderTabContent(tab.id)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Info Cards Mobile */}
            <div className="space-y-6">
              <div className="overflow-hidden" style={{ backgroundColor: '#E8F4F8' }}>
                <div className="py-4 px-6" style={{ backgroundColor: '#02558C' }}>
                  <h3 className="text-lg font-bold text-white">
                    Modalidade
                  </h3>
                </div>
                <div className="py-4 px-6">
                  <p className="text-sm text-gray-700 font-semibold leading-relaxed mb-2">
                    {course.modality === 'presencial' && 'Presencial'}
                    {course.modality === 'online' && 'Online (Ao Vivo)'}
                    {course.modality === 'ead' && 'EAD'}
                    {course.modality === 'hibrido' && 'Híbrido'}
                  </p>
                  {course.modality_complement && (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {course.modality_complement}
                    </p>
                  )}
                </div>
              </div>

              <div className="overflow-hidden" style={{ backgroundColor: '#E8F4F8' }}>
                <div className="py-4 px-6" style={{ backgroundColor: '#02558C' }}>
                  <h3 className="text-lg font-bold text-white">
                    Carga horária
                  </h3>
                </div>
                <div className="py-4 px-6">
                  <p className="text-2xl font-bold" style={{ color: '#02558C' }}>
                    {course.duration_hours} horas
                  </p>
                </div>
              </div>

              <div className="overflow-hidden" style={{ backgroundColor: '#E8F4F8' }}>
                <div className="py-4 px-6" style={{ backgroundColor: '#02558C' }}>
                  <h3 className="text-lg font-bold text-white">
                    Vagas
                  </h3>
                </div>
                <div className="py-4 px-6">
                  <p className="text-sm text-gray-700">Mínimo: {course.min_students}</p>
                  <p className="text-sm text-gray-700 mb-2">Máximo: {course.max_students}</p>
                  <p className="text-sm font-bold mb-3" style={{ color: '#21D3EE' }}>
                    Vagas limitadas
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    O HAM se reserva o direito de prorrogar o início do curso ou cancelá-lo caso não tenha atingido o número mínimo de alunos. Não havendo abertura da turma, o aluno é reembolsado integralmente do valor pago.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      <Footer />
    </div>
  );
};