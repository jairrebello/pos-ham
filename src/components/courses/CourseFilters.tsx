import React from 'react';
import type { CourseFilters } from '../../types/course';

interface CourseFiltersProps {
  filters: CourseFilters;
  onFiltersChange: (filters: CourseFilters) => void;
}

export const CourseFiltersComponent: React.FC<CourseFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const modalityOptions = [
    { value: 'presencial', label: 'Presencial' },
    { value: 'online', label: 'Online(Ao-Vivo)' },
    { value: 'ead', label: 'EAD' },
    { value: 'hibrido', label: 'Híbrido' }
  ];

  const areaOptions = [
    { value: 'educacao', label: 'Educação' },
    { value: 'gestao', label: 'Gestão' },
    { value: 'saude', label: 'Saúde' },
    { value: 'psicologia', label: 'Psicologia' },
    { value: 'tecnologia', label: 'Tecnologia' }
  ];

  const handleModalityChange = (modality: string) => {
    const newModalities = filters.modality.includes(modality)
      ? filters.modality.filter(m => m !== modality)
      : [...filters.modality, modality];
    
    onFiltersChange({
      ...filters,
      modality: newModalities
    });
  };

  const handleAreaChange = (area: string) => {
    const newAreas = filters.area.includes(area)
      ? filters.area.filter(a => a !== area)
      : [...filters.area, area];
    
    onFiltersChange({
      ...filters,
      area: newAreas
    });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="space-y-6">
        {/* Modalidade */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">MODALIDADE</h3>
          <div className="space-y-3">
            {modalityOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.modality.includes(option.value)}
                  onChange={() => handleModalityChange(option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Áreas */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ÁREAS</h3>
          <div className="space-y-3">
            {areaOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.area.includes(option.value)}
                  onChange={() => handleAreaChange(option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};