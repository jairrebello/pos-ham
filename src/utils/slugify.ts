export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Substituir espaços por hífens
    .replace(/-+/g, '-'); // Remover hífens duplicados
};

export const generateUniqueSlug = async (title: string, courseId?: string): Promise<string> => {
  const { supabase } = await import('../lib/supabase');
  
  let baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    // Verificar se o slug já existe (excluindo o curso atual se estiver editando)
    let query = supabase
      .from('pos_cursos')
      .select('id')
      .eq('slug', slug);
    
    if (courseId) {
      query = query.neq('id', courseId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Erro ao verificar slug:', error);
      break;
    }
    
    if (!data || data.length === 0) {
      break; // Slug disponível
    }
    
    // Slug já existe, tentar próximo
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
  
  return slug;
};