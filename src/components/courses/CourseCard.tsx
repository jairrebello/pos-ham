import React from 'react';
import { ArrowRight, Clock, Users, MapPin } from 'lucide-react';
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

  const modalityColors = {
    presencial: 'bg-green-500',
    online: 'bg-blue-500',
    ead: 'bg-purple-500',
    hibrido: 'bg-orange-500'
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={course.image_url || 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black bg-opacity-70 text-white text-sm rounded">
            {course.area}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-white text-sm rounded ${modalityColors[course.modality]}`}>
            {modalityLabels[course.modality]}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.short_description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration_hours}h</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.max_students} vagas</span>
            </div>
            {course.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="truncate">{course.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-blue-600">
            {course.modality}
          </div>
          <a
            href={`/curso/${course.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Saiba mais
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};