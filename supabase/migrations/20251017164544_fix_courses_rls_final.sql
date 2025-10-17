/*
  # Corrigir políticas RLS da tabela courses

  1. Políticas
    - SELECT: Público pode ler cursos ativos/publicados, autenticados leem todos
    - INSERT: Usuários autenticados podem inserir cursos
    - UPDATE: Usuários autenticados podem atualizar cursos
    - DELETE: Usuários autenticados podem deletar cursos

  2. Segurança
    - RLS ativado na tabela courses
    - Políticas restritivas para autenticação
*/

-- Garantir que RLS está ativado
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Public can read published courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can create courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can modify courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can remove courses" ON courses;
DROP POLICY IF EXISTS "Anyone can read active courses, authenticated users can read all" ON courses;
DROP POLICY IF EXISTS "Authenticated users can insert courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can update courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can delete courses" ON courses;
DROP POLICY IF EXISTS "Active courses are publicly visible" ON courses;
DROP POLICY IF EXISTS "Authenticated users can manage courses" ON courses;

-- Política para SELECT: público pode ver cursos ativos, autenticados veem todos
CREATE POLICY "Public can read active courses"
  ON courses
  FOR SELECT
  USING (
    status = 'active'
    OR
    auth.uid() IS NOT NULL
  );

-- Política para INSERT: usuários autenticados podem criar cursos
CREATE POLICY "Authenticated users can create courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Política para UPDATE: usuários autenticados podem atualizar cursos
CREATE POLICY "Authenticated users can modify courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Política para DELETE: usuários autenticados podem deletar cursos
CREATE POLICY "Authenticated users can remove courses"
  ON courses
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
