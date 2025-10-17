/*
  # Corrigir políticas do bucket images

  1. Políticas de Storage
    - INSERT: usuários autenticados podem fazer upload
    - SELECT: acesso público para leitura
    - UPDATE: usuários autenticados podem atualizar seus próprios arquivos
    - DELETE: usuários autenticados podem deletar seus próprios arquivos
*/

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Public can read images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Política para INSERT: usuários autenticados podem fazer upload
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'images'
    AND auth.uid() IS NOT NULL
  );

-- Política para SELECT: acesso público para leitura
CREATE POLICY "Public can read images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'images');

-- Política para UPDATE: usuários autenticados podem atualizar
CREATE POLICY "Authenticated users can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'images'
    AND auth.uid() IS NOT NULL
  )
  WITH CHECK (
    bucket_id = 'images'
    AND auth.uid() IS NOT NULL
  );

-- Política para DELETE: usuários autenticados podem deletar
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'images'
    AND auth.uid() IS NOT NULL
  );
