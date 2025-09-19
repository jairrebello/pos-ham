export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  short_description: string;
  image_url: string;
  area: string;
  modality: 'presencial' | 'online' | 'ead' | 'hibrido';
  duration_hours: number;
  max_students: number;
  start_date: string;
  location: string;
  price: number;
  status: 'active' | 'inactive' | 'draft';
  content: {
    about: string;
    target_audience: string;
    program: string[];
    coordination_general: string;
    coordination_general_photo: string;
    coordination: string;
    coordination_photo: string;
    requirements: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CourseFilters {
  area: string[];
  modality: string[];
  search: string;
}