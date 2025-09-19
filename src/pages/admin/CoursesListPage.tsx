import React, { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Course } from '../../types/course';

export const CoursesListPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCourses(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar cursos:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      deleteCourse(id);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Atualizar a lista local
      setCourses(courses.filter(course => course.id !== id));
    } catch (error: any) {
      console.error('Erro ao excluir curso:', error);
      alert('Erro ao excluir curso: ' + error.message);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Ativo', color: 'bg-green-100 text-green-800' },
      inactive: { label: 'Inativo', color: 'bg-red-100 text-red-800' },
      draft: { label: 'Rascunho', color: 'bg-yellow-100 text-yellow-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isAdmin />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando cursos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAdmin />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cursos</h1>
            <p className="text-gray-600 mt-2">Gerencie todos os cursos de pós-graduação</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            <a href="/admin/courses/new">Novo Curso</a>
          </Button>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">
              Erro ao carregar cursos: {error}
            </div>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {courses.length === 0 && !loading ? (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <Plus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum curso encontrado</h3>
                <p className="text-gray-500 mb-4">Comece criando seu primeiro curso de pós-graduação.</p>
                <Button>
                  <a href="/admin/courses/new">Criar Primeiro Curso</a>
                </Button>
              </div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Área
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modalidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={course.image_url || 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400'}
                          alt={course.title}
                          className="w-10 h-10 rounded object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {course.short_description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {course.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {course.modality}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(course.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(`/curso/${course.slug}`, '_blank')}
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver curso"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => window.location.href = `/admin/courses/edit/${course.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};