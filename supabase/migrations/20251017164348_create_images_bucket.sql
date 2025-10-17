/*
  # Criar bucket de storage para imagens

  1. Novo Bucket
    - `images` - bucket público para armazenar imagens dos cursos
    
  2. Políticas de Segurança
    - Permitir leitura pública de todas as imagens
    - Permitir upload para usuários autenticados
    - Permitir atualização e exclusão para usuários autenticados
*/

-- Criar bucket para imagens se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Anyone can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Política para SELECT: público pode visualizar todas as imagens
CREATE POLICY "Anyone can view images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'images');

-- Política para INSERT: usuários autenticados podem fazer upload
CREATE POLICY "Authenticated can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images' AND auth.uid() IS NOT NULL);

-- Política para UPDATE: usuários autenticados podem atualizar
CREATE POLICY "Authenticated can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'images' AND auth.uid() IS NOT NULL)
  WITH CHECK (bucket_id = 'images' AND auth.uid() IS NOT NULL);

-- Política para DELETE: usuários autenticados podem deletar
CREATE POLICY "Authenticated can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'images' AND auth.uid() IS NOT NULL);
