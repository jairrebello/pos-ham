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
    { value: 'todas', label: 'Todas' },
    { value: 'enfermagem', label: 'Enfermagem' },
    { value: 'farmacia', label: 'Farmácia' },
    { value: 'fisioterapia', label: 'Fisioterapia' },
    { value: 'gestao', label: 'Gestão' },
    { value: 'nutricao', label: 'Nutrição' },
    { value: 'oncologia', label: 'Oncologia' }
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
    <div className="bg-cyan-50 p-6 rounded-lg">
      <div className="space-y-6">
        {/* Áreas */}
        <div>
          <h3 className="text-lg font-bold text-teal-700 mb-4">Áreas</h3>
          <div className="space-y-3">
            {areaOptions.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="area"
                    checked={filters.area.includes(option.value)}
                    onChange={() => {
                      onFiltersChange({
                        ...filters,
                        area: [option.value]
                      });
                    }}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    filters.area.includes(option.value)
                      ? 'border-teal-500 bg-white'
                      : 'border-teal-400 bg-white'
                  }`}>
                    {filters.area.includes(option.value) && (
                      <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    )}
                  </div>
                </div>
                <span className={`ml-3 text-base transition-colors ${
                  filters.area.includes(option.value)
                    ? 'text-teal-700 font-medium'
                    : 'text-teal-600'
                }`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};