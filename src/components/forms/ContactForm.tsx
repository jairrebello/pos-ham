import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Course } from '../../types/course';

export default function ContactForm() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    interest: 'conhecer'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await supabase
      .from('pos_cursos')
      .select('id, title')
      .eq('status', 'active')
      .order('title');

    if (data) {
      setCourses(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Save to database
      const { data: submission, error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          course_id: formData.course,
          interest: formData.interest,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Send email via edge function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ submissionId: submission.id }),
        }
      );

      if (!response.ok) {
        console.error('Failed to send email:', await response.text());
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        interest: 'conhecer'
      });

      alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert('Erro ao enviar mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16" style={{ backgroundColor: '#21D3EE' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-6 py-4 rounded-lg border-0 focus:ring-2 focus:ring-blue-600 text-gray-700 placeholder-gray-400"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-6 py-4 rounded-lg border-0 focus:ring-2 focus:ring-blue-600 text-gray-700 placeholder-gray-400"
          />

          <input
            type="tel"
            placeholder="Celular"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="w-full px-6 py-4 rounded-lg border-0 focus:ring-2 focus:ring-blue-600 text-gray-700 placeholder-gray-400"
          />

          <select
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            required
            className="w-full px-6 py-4 rounded-lg border-0 focus:ring-2 focus:ring-blue-600 text-gray-700 appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2302558C' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 1rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '3rem'
            }}
          >
            <option value="">Qual curso você deseja fazer?</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center bg-white px-8 py-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors flex-1 sm:flex-initial">
              <input
                type="radio"
                name="interest"
                value="conhecer"
                checked={formData.interest === 'conhecer'}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="mr-3 w-5 h-5 text-blue-600"
                style={{ accentColor: '#02558C' }}
              />
              <span className="font-medium" style={{ color: '#02558C' }}>
                Fale conosco
              </span>
            </label>

            <label className="flex items-center bg-white px-8 py-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors flex-1 sm:flex-initial">
              <input
                type="radio"
                name="interest"
                value="matricular"
                checked={formData.interest === 'matricular'}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="mr-3 w-5 h-5 text-blue-600"
                style={{ accentColor: '#02558C' }}
              />
              <span className="font-medium" style={{ color: '#02558C' }}>
                Matricule-se
              </span>
            </label>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-3 font-bold text-white rounded transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#02558C' }}
            >
              {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
