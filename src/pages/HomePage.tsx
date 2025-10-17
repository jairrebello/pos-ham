import React from 'react';
import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { MetaTags } from '../components/ui/MetaTags';
import { ArrowRight, GraduationCap, Users, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Course } from '../types/course';

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('pos_cursos')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching featured courses:', error);
        } else {
          setFeaturedCourses(data || []);
        }
      } catch (error) {
        console.error('Error fetching featured courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="Pós-Graduação HAM - Hospital Adventista de Manaus"
        description="Cursos de pós-graduação em saúde oferecidos pelo Hospital Adventista de Manaus. Formação especializada com excelência e qualidade."
        image={`${window.location.origin}/logo-ham.png`}
        url={window.location.href}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        {/* Banner Image */}
        <div className="w-full max-h-[400px] overflow-hidden">
          <img
            src="/BANNER PRINCIPAL_editaado.jpg"
            alt="Pós-graduação Hospital Adventista Manaus"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#02558C' }}>
              Cursos de Pós-graduação
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Para você que já possui uma graduação, o Hospital Adventista Manaus, oferece
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Cursos de Especialização</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10.000+</h3>
              <p className="text-gray-600">Alunos Formados</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25</h3>
              <p className="text-gray-600">Anos de Experiência</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cursos em Destaque</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça alguns dos nossos cursos mais procurados nas principais áreas de atuação profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                </div>
              ))
            ) : featuredCourses.length > 0 ? (
              featuredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={course.image_url || 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400'} 
                      alt={course.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black bg-opacity-70 text-white text-sm rounded capitalize">
                        {course.area}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded uppercase">
                        {course.modality}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {course.short_description}
                    </p>
                    <a
                      href={`/course/${course.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Saiba mais
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              // Fallback quando não há cursos
              <div className="col-span-full text-center py-12">
                <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Cursos em breve</h3>
                <p className="text-gray-500">Novos cursos serão adicionados em breve.</p>
              </div>
            )}
          </div>

          {/* Fallback courses when no database courses exist */}
          {!loading && featuredCourses.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: 'Neuropsicologia',
                  area: 'Psicologia',
                  modality: 'Online',
                  image: 'https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=400'
                },
                {
                  title: 'Enfermagem em Obstetrícia',
                  area: 'Saúde',
                  modality: 'Online',
                  image: 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=400'
                },
                {
                  title: 'Gestão Educacional',
                  area: 'Educação',
                  modality: 'EAD',
                  image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400'
                }
              ].map((course, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black bg-opacity-70 text-white text-sm rounded">
                      {course.area}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded">
                      {course.modality}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Especialização completa com foco na prática profissional e metodologias inovadoras.
                  </p>
                  <a
                    href="/courses"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Saiba mais
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: '#02558C' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#024a7a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#02558C'}
            >
              Ver Todos os Cursos
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};