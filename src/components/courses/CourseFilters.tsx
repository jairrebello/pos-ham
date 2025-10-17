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
    if (area === 'todas') {
      onFiltersChange({
        ...filters,
        area: []
      });
      return;
    }

    const newAreas = filters.area.includes(area)
      ? filters.area.filter(a => a !== area)
      : [...filters.area, area];

    onFiltersChange({
      ...filters,
      area: newAreas
    });
  };

  return (
    <div style={{ backgroundColor: '#E8FCFF' }} className="p-6 rounded-lg">
      <div className="space-y-6">
        {/* Modalidade */}
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#02558C' }}>MODALIDADE</h3>
          <div className="space-y-3">
            {modalityOptions.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.modality.includes(option.value)}
                    onChange={() => handleModalityChange(option.value)}
                    className="peer sr-only"
                  />
                  <div
                    className="w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all"
                    style={{
                      borderColor: '#02558C',
                      backgroundColor: filters.modality.includes(option.value) ? '#02558C' : 'transparent'
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"
                    ></div>
                  </div>
                </div>
                <span className="ml-3 transition-opacity group-hover:opacity-80" style={{ color: '#02558C' }}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Áreas */}
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#02558C' }}>ÁREAS</h3>
          <div className="space-y-3">
            {areaOptions.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={option.value === 'todas' ? filters.area.length === 0 : filters.area.includes(option.value)}
                    onChange={() => handleAreaChange(option.value)}
                    className="peer sr-only"
                  />
                  <div
                    className="w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all"
                    style={{
                      borderColor: '#02558C',
                      backgroundColor: (option.value === 'todas' ? filters.area.length === 0 : filters.area.includes(option.value)) ? '#02558C' : 'transparent'
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"
                    ></div>
                  </div>
                </div>
                <span className="ml-3 transition-opacity group-hover:opacity-80" style={{ color: '#02558C' }}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};