/*
  # Recriar tabela de cursos como pos_cursos

  1. Mudanças
    - Excluir tabela courses antiga
    - Criar nova tabela pos_cursos com estrutura completa
    
  2. Nova Tabela pos_cursos
    - id (uuid, chave primária, gerado automaticamente)
    - title (texto, obrigatório)
    - slug (texto, único, obrigatório)
    - description (texto)
    - short_description (texto)
    - image_url (texto)
    - area (texto)
    - modality (texto)
    - duration_hours (inteiro)
    - max_students (inteiro)
    - start_date (data)
    - location (texto)
    - price (numérico)
    - status (texto, padrão 'draft')
    - content (jsonb)
    - created_at (timestamp com timezone)
    - updated_at (timestamp com timezone)

  3. Segurança
    - RLS habilitado
    - Política SELECT: público pode ver cursos ativos, autenticados veem todos
    - Política INSERT: usuários autenticados podem criar
    - Política UPDATE: usuários autenticados podem atualizar
    - Política DELETE: usuários autenticados podem deletar
*/

-- Excluir tabela antiga se existir
DROP TABLE IF EXISTS courses CASCADE;

-- Criar nova tabela pos_cursos
CREATE TABLE IF NOT EXISTS pos_cursos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  short_description text DEFAULT '',
  image_url text DEFAULT '',
  area text DEFAULT '',
  modality text DEFAULT '',
  duration_hours integer DEFAULT 0,
  max_students integer DEFAULT 0,
  start_date date,
  location text DEFAULT '',
  price numeric DEFAULT 0,
  status text DEFAULT 'draft',
  content jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE pos_cursos ENABLE ROW LEVEL SECURITY;

-- Política para SELECT: público pode ver cursos ativos, autenticados veem todos
CREATE POLICY "Public can read active courses"
  ON pos_cursos
  FOR SELECT
  USING (
    status = 'active'
    OR
    auth.uid() IS NOT NULL
  );

-- Política para INSERT: usuários autenticados podem criar
CREATE POLICY "Authenticated users can create courses"
  ON pos_cursos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Política para UPDATE: usuários autenticados podem atualizar
CREATE POLICY "Authenticated users can update courses"
  ON pos_cursos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Política para DELETE: usuários autenticados podem deletar
CREATE POLICY "Authenticated users can delete courses"
  ON pos_cursos
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Criar índice para slug (busca rápida)
CREATE INDEX IF NOT EXISTS idx_pos_cursos_slug ON pos_cursos(slug);

-- Criar índice para status (filtragem)
CREATE INDEX IF NOT EXISTS idx_pos_cursos_status ON pos_cursos(status);
