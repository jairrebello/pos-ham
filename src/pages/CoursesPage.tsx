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
      <section className="relative">
        {/* Banner Image */}
        <div className="w-full overflow-hidden">
          <img
            src="/BANNER PRINCIPAL_editaado.jpg"
            alt="Pós-graduação Hospital Adventista Manaus"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ backgroundColor: 'rgb(232, 252, 255)' }}>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#02558C' }}>
              Cursos de Pós-graduação
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'rgb(2, 85, 140)' }}>
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