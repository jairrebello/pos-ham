export interface Course {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  area: string;
  modality: 'presencial' | 'online' | 'ead' | 'hibrido';
  modality_complement: string;
  duration_hours: number;
  min_students: number;
  max_students: number;
  start_date: string;
  location: string;
  investment: string;
  contact_us: string;
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