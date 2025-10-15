import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CourseCard } from '../components/courses/CourseCard';
import { CourseFiltersComponent } from '../components/courses/CourseFilters';
import { supabase } from '../lib/supabase';
import type { Course, CourseFilters } from '../types/course';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filters, setFilters] = useState<CourseFilters>({
    area: [],
    modality: [],
    search: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCourses(data || []);
      setFilteredCourses(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar cursos:', error);
      setCourses([]);
      setFilteredCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = courses;

    // Filter by area
    if (filters.area.length > 0) {
      filtered = filtered.filter(course => filters.area.includes(course.area));
    }

    // Filter by modality
    if (filters.modality.length > 0) {
      filtered = filtered.filter(course => filters.modality.includes(course.modality));
    }

    // Filter by search
    if (filters.search) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [courses, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando cursos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/60"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-cyan-400"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-2 bg-cyan-400"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              {/* Speech Bubble */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg mb-8 max-w-md">
                <div className="space-y-2">
                  <p className="text-2xl font-normal" style={{ color: '#02558C' }}>Sua</p>
                  <div className="bg-cyan-400 text-white px-4 py-2 rounded-lg inline-block">
                    <p className="text-2xl font-bold">PÓS-GRADUAÇÃO</p>
                  </div>
                  <p className="text-xl" style={{ color: '#02558C' }}>
                    em um dos<br />
                    melhores hospitais<br />
                    do Brasil
                  </p>
                </div>
                
                {/* Speech bubble tail */}
                <div className="absolute -bottom-4 left-8 w-8 h-8 bg-white transform rotate-45"></div>
              </div>
            </div>
            
            {/* Right Content - Professional Image */}
            <div className="relative z-10 flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Profissional da saúde"
                  className="w-80 h-96 object-cover rounded-2xl shadow-xl"
                />
                
                {/* Blue overlay shape */}
                <div 
                  className="absolute -top-4 -left-4 w-full h-full rounded-2xl -z-10"
                  style={{ backgroundColor: '#02558C', opacity: 0.8 }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Bottom Title Section */}
          <div className="relative z-10 text-center mt-16">
            <h1 className="text-5xl font-bold mb-6" style={{ color: '#02558C' }}>
              Cursos de Pós-graduação
            </h1>
            <p className="text-xl max-w-4xl mx-auto" style={{ color: '#02558C' }}>
              Para você que já possui uma graduação, o Hospital Adventista Manaus, oferece
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <CourseFiltersComponent 
                filters={filters} 
                onFiltersChange={setFilters} 
              />
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    Nenhum curso encontrado com os filtros aplicados.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};