import React from 'react';
import { ArrowRight, Clock, Users, MapPin, Calendar } from 'lucide-react';
import type { Course } from '../../types/course';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const modalityLabels = {
    presencial: 'PRESENCIAL',
    online: 'ONLINE',
    ead: 'EAD',
    hibrido: 'HÍBRIDO'
  };

  const areaColors = {
    educacao: 'bg-cyan-400',
    gestao: 'bg-cyan-400',
    saude: 'bg-cyan-400',
    psicologia: 'bg-cyan-400',
    tecnologia: 'bg-cyan-400',
    direito: 'bg-cyan-400',
    engenharia: 'bg-cyan-400'
  };

  const getAreaColor = (area: string) => {
    return areaColors[area as keyof typeof areaColors] || 'bg-gray-400';
  };

  const formatStartDate = (dateString: string) => {
    if (!dateString) return 'A definir';
    
    const date = new Date(dateString + 'T00:00:00');
    const month = date.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    
    return `${month}/${year}`;
  };

  return (
    <div className="bg-blue-800 rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      {/* Imagem do curso */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image_url || 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Faixa da área */}
      <div className={`${getAreaColor(course.area)} px-6 py-3 flex items-center justify-between`}>
        <span className="text-white font-bold text-sm uppercase tracking-wide">
          {course.area}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-white/90 text-xs font-medium uppercase">
            {modalityLabels[course.modality]}
          </span>
          {course.modality === 'online' && (
            <span className="text-white/70 text-xs">(ao vivo)</span>
          )}
        </div>
      </div>

      {/* Seção principal azul */}
      <div className="text-white px-6 py-6 flex-1 flex flex-col" style={{ backgroundColor: '#02558C' }}>
        <h3 className="text-xl font-bold mb-4 leading-tight line-clamp-3">
          {course.title}
        </h3>

        {/* Informações do curso */}
        <div className="space-y-2 mb-6 flex-1">
          {course.start_date && (
            <div className="flex items-center text-blue-300 text-sm">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Início: {formatStartDate(course.start_date)}</span>
            </div>
          )}
          
          <div className="flex items-center text-blue-300 text-sm">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{course.duration_hours}h de carga horária</span>
          </div>
          
          <div className="flex items-center text-blue-300 text-sm">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Até {course.max_students} alunos</span>
          </div>
          
          {course.location && (
            <div className="flex items-center text-blue-300 text-sm">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{course.location}</span>
            </div>
          )}
        </div>

        {/* Botão Saiba mais */}
        <div className="flex justify-end mt-auto">
          <a
            href={`/curso/${course.slug}`}
            className="inline-flex items-center text-cyan-400 hover:text-white font-medium text-sm transition-colors duration-200 group"
          >
            Saiba mais
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </div>
  );
};