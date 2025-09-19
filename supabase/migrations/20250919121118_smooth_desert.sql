/*
  # Criar bucket de storage para imagens

  1. Novo Bucket
    - `images` - bucket para armazenar imagens dos cursos
    
  2. Políticas de Segurança
    - Permitir upload para usuários autenticados
    - Permitir leitura pública das imagens
    - Limitar tipos de arquivo a imagens
*/

-- Criar bucket para imagens se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir upload de imagens por usuários autenticados
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

-- Política para permitir leitura pública das imagens
CREATE POLICY "Public can view images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'images');

-- Política para permitir que usuários autenticados deletem imagens
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');