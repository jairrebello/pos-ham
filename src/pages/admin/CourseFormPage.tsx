import React, { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { TextArea } from '../../components/ui/TextArea';
import { RichTextEditor } from '../../components/ui/RichTextEditor';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { generateUniqueSlug } from '../../utils/slugify';
import type { Course } from '../../types/course';

interface CourseFormPageProps {
  courseId?: string;
}

export const CourseFormPage: React.FC<CourseFormPageProps> = ({ courseId }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    image_url: '',
    area: '',
    modality: 'online' as const,
    modality_complement: '',
    duration_hours: 0,
    min_students: 0,
    max_students: 0,
    start_date: '',
    location: '',
    investment: '',
    contact_us: '',
    status: 'draft' as const,
    content: {
      about: '',
      target_audience: '',
      program: [{ name: '', hours: 0 }],
      coordination_general: '',
      coordination_general_photo: '',
      coordination: '',
      coordination_photo: '',
      requirements: ''
    }
  });

  const areaOptions = [
    { value: 'enfermagem', label: 'Enfermagem' },
    { value: 'farmacia', label: 'Farmácia' },
    { value: 'fisioterapia', label: 'Fisioterapia' },
    { value: 'gestao', label: 'Gestão' },
    { value: 'nutricao', label: 'Nutrição' },
    { value: 'oncologia', label: 'Oncologia' }
  ];

  const modalityOptions = [
    { value: 'presencial', label: 'Presencial' },
    { value: 'online', label: 'Online (Ao Vivo)' },
    { value: 'ead', label: 'EAD' },
    { value: 'hibrido', label: 'Híbrido' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Rascunho' },
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' }
  ];

  useEffect(() => {
    if (courseId) {
      loadCourse();
    }
  }, [courseId]);

  const loadCourse = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pos_cursos')
        .select('*')
        .eq('id', courseId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug || '',
          image_url: data.image_url || '',
          area: data.area,
          modality: data.modality,
          modality_complement: data.modality_complement || '',
          duration_hours: data.duration_hours,
          min_students: data.min_students || 0,
          max_students: data.max_students,
          start_date: data.start_date || '',
          location: data.location || '',
          investment: data.investment || '',
          contact_us: data.contact_us || '',
          status: data.status,
          content: {
            about: data.content?.about || '',
            target_audience: data.content?.target_audience || '',
            program: data.content?.program?.map((item: any) =>
              typeof item === 'string' ? { name: item, hours: 0 } : item
            ) || [{ name: '', hours: 0 }],
            coordination_general: data.content?.coordination_general || '',
            coordination_general_photo: data.content?.coordination_general_photo || '',
            coordination: data.content?.coordination || '',
            coordination_photo: data.content?.coordination_photo || '',
            requirements: Array.isArray(data.content?.requirements)
              ? data.content.requirements.join('\n')
              : data.content?.requirements || ''
          }
        });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-gerar slug quando o título for alterado (apenas para novos cursos)
    if (field === 'title' && !courseId && value.trim()) {
      const autoSlug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      setFormData(prev => ({
        ...prev,
        slug: autoSlug
      }));
    }
  };

  const handleContentChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field: 'program' | 'requirements', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: prev.content[field].map((item, i) => i === index ? value : item)
      }
    }));
  };

  const addArrayItem = (field: 'program' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: [...prev.content[field], '']
      }
    }));
  };

  const removeArrayItem = (field: 'program' | 'requirements', index: number) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: prev.content[field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Validações básicas
      if (!formData.title.trim()) {
        throw new Error('Título é obrigatório');
      }
      if (!formData.area) {
        throw new Error('Área é obrigatória');
      }

      // Gerar slug único se não existir ou se o título mudou
      let slug = formData.slug;
      if (!slug || slug.trim() === '') {
        slug = await generateUniqueSlug(formData.title, courseId);
      }

      // Filtrar itens vazios dos arrays
      const cleanedProgram = formData.content.program.filter(item => 
        typeof item === 'string' ? item.trim() : item.name?.trim()
      );

      const courseData = {
        title: formData.title.trim(),
        slug: slug,
        image_url: formData.image_url.trim(),
        area: formData.area,
        modality: formData.modality,
        modality_complement: formData.modality_complement.trim(),
        duration_hours: Number(formData.duration_hours),
        min_students: Number(formData.min_students),
        max_students: Number(formData.max_students),
        start_date: formData.start_date || null,
        location: formData.location.trim(),
        investment: formData.investment.trim(),
        contact_us: formData.contact_us.trim(),
        status: formData.status,
        content: {
          about: formData.content.about.trim(),
          target_audience: formData.content.target_audience.trim(),
          program: cleanedProgram,
          coordination_general: formData.content.coordination_general.trim(),
          coordination_general_photo: formData.content.coordination_general_photo.trim(),
          coordination: formData.content.coordination.trim(),
          coordination_photo: formData.content.coordination_photo.trim(),
          requirements: formData.content.requirements.trim()
        }
      };

      let result;
      if (courseId) {
        // Atualizar curso existente
        result = await supabase
          .from('pos_cursos')
          .update(courseData)
          .eq('id', courseId);
      } else {
        // Criar novo curso
        result = await supabase
          .from('pos_cursos')
          .insert([courseData]);
      }

      if (result.error) throw result.error;

      setSuccess(courseId ? 'Curso atualizado com sucesso!' : 'Curso criado com sucesso!');
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        window.location.href = '/admin/courses';
      }, 2000);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isAdmin />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando curso...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAdmin />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="mr-4 p-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {courseId ? 'Editar Curso' : 'Novo Curso'}
            </h1>
            <p className="text-gray-600 mt-2">
              {courseId ? 'Atualize as informações do curso' : 'Preencha os dados para criar um novo curso'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{success}</div>
            </div>
          )}

          {/* Informações Básicas */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Informações Básicas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Título do Curso *"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Ex: Neuropsicologia"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Input
                  label="Slug da URL"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="Ex: neuropsicologia (deixe vazio para gerar automaticamente)"
                  help="Este será usado na URL do curso. Se deixar vazio, será gerado automaticamente baseado no título."
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL final: /curso/{formData.slug || 'slug-do-curso'}
                </p>
              </div>

              <ImageUpload
                label="Imagem do Curso"
                value={formData.image_url}
                onChange={(url) => handleInputChange('image_url', url)}
              />

              <Select
                label="Área *"
                value={formData.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
                options={areaOptions}
                placeholder="Selecione uma área"
                required
              />

              <Select
                label="Modalidade *"
                value={formData.modality}
                onChange={(e) => handleInputChange('modality', e.target.value)}
                options={modalityOptions}
                required
              />

              <div className="md:col-span-2">
                <TextArea
                  label="Complemento da Modalidade"
                  value={formData.modality_complement}
                  onChange={(e) => handleInputChange('modality_complement', e.target.value)}
                  placeholder="Informações adicionais sobre a modalidade do curso"
                  rows={3}
                />
              </div>

              <Select
                label="Status *"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                options={statusOptions}
                required
              />
            </div>
          </div>

          {/* Detalhes do Curso */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Detalhes do Curso</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Carga Horária (horas)"
                type="number"
                value={formData.duration_hours}
                onChange={(e) => handleInputChange('duration_hours', e.target.value)}
                placeholder="440"
                min="0"
              />

              <Input
                label="Número Mínimo de Alunos"
                type="number"
                value={formData.min_students}
                onChange={(e) => handleInputChange('min_students', e.target.value)}
                placeholder="15"
                min="0"
              />

              <Input
                label="Número Máximo de Alunos"
                type="number"
                value={formData.max_students}
                onChange={(e) => handleInputChange('max_students', e.target.value)}
                placeholder="25"
                min="0"
              />

              <Input
                label="Data de Início"
                type="date"
                value={formData.start_date}
                onChange={(e) => handleInputChange('start_date', e.target.value)}
              />

              <div className="md:col-span-2">
                <TextArea
                  label="Local"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Informações sobre o local do curso (endereço completo, cidade, estado, etc.)"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2">
                <TextArea
                  label="Investimento"
                  value={formData.investment}
                  onChange={(e) => handleInputChange('investment', e.target.value)}
                  placeholder="Informações sobre o investimento do curso (valor, formas de pagamento, descontos, etc.)"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2">
                <TextArea
                  label="Fale Conosco"
                  value={formData.contact_us}
                  onChange={(e) => handleInputChange('contact_us', e.target.value)}
                  placeholder="Informações de contato para dúvidas sobre o curso (telefone, email, WhatsApp, etc.)"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Conteúdo do Curso */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Conteúdo do Curso</h2>
            
            <div className="space-y-6">
              <TextArea
                label="Sobre o Curso"
                value={formData.content.about}
                onChange={(e) => handleContentChange('about', e.target.value)}
                placeholder="Descrição detalhada sobre o curso, objetivos e metodologia"
                rows={4}
              />

              <TextArea
                label="Público-Alvo"
                value={formData.content.target_audience}
                onChange={(e) => handleContentChange('target_audience', e.target.value)}
                placeholder="A quem se destina este curso"
                rows={3}
              />

              {/* Coordenação Geral */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <TextArea
                    label="Coordenação Geral"
                    value={formData.content.coordination_general}
                    onChange={(e) => handleContentChange('coordination_general', e.target.value)}
                    placeholder="Informações sobre a coordenação geral do curso"
                    rows={4}
                  />
                </div>
                <div>
                  <ImageUpload
                    label="Foto do Coordenador Geral"
                    value={formData.content.coordination_general_photo}
                    onChange={(url) => handleContentChange('coordination_general_photo', url)}
                  />
                </div>
              </div>

              {/* Coordenação */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <TextArea
                    label="Coordenação"
                    value={formData.content.coordination}
                    onChange={(e) => handleContentChange('coordination', e.target.value)}
                    placeholder="Informações sobre a coordenação do curso"
                    rows={4}
                  />
                </div>
                <div>
                  <ImageUpload
                    label="Foto do Coordenador"
                    value={formData.content.coordination_photo}
                    onChange={(url) => handleContentChange('coordination_photo', url)}
                  />
                </div>
              </div>

              {/* Programa do Curso */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Programa do Curso
                </label>
                <div className="space-y-2">
                  {formData.content.program.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={typeof item === 'string' ? item : item.name || ''}
                        onChange={(e) => {
                          const newValue = typeof item === 'string' 
                            ? { name: e.target.value, hours: 0 }
                            : { ...item, name: e.target.value };
                          handleArrayChange('program', index, newValue);
                        }}
                        placeholder={`Nome do Módulo ${index + 1}`}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={typeof item === 'string' ? 0 : item.hours || 0}
                        onChange={(e) => {
                          const newValue = typeof item === 'string'
                            ? { name: item, hours: parseInt(e.target.value) || 0 }
                            : { ...item, hours: parseInt(e.target.value) || 0 };
                          handleArrayChange('program', index, newValue);
                        }}
                        placeholder="Horas"
                        className="w-20"
                        min="0"
                      />
                      {formData.content.program.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('program', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        content: {
                          ...prev.content,
                          program: [...prev.content.program, { name: '', hours: 0 }]
                        }
                      }));
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Módulo
                  </Button>
                </div>
              </div>

              {/* Requisitos */}
              <div>
                <RichTextEditor
                  label="Requisitos/Documentos Necessários"
                  value={formData.content.requirements}
                  onChange={(value) => handleContentChange('requirements', value)}
                  placeholder="Digite os requisitos e documentos necessários. Use formatação para organizar melhor as informações..."
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={saving}
              disabled={!formData.title.trim() || !formData.area}
            >
              {courseId ? 'Atualizar Curso' : 'Criar Curso'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};