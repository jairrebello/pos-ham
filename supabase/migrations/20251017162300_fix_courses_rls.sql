/*
  # Corrigir políticas RLS da tabela courses

  1. Remove todas as políticas existentes da tabela courses
  2. Cria novas políticas simplificadas e funcionais:
     - SELECT: Qualquer pessoa pode ler cursos publicados, usuários autenticados leem todos
     - INSERT: Usuários autenticados podem inserir cursos
     - UPDATE: Usuários autenticados podem atualizar cursos
     - DELETE: Usuários autenticados podem deletar cursos

  3. Segurança
     - RLS ativado na tabela courses
     - Políticas restritivas para autenticação
*/

-- Remover todas as políticas existentes da tabela courses
DROP POLICY IF EXISTS "Anyone can read active courses, authenticated users can read all" ON courses;
DROP POLICY IF EXISTS "Authenticated users can insert courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can update courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can delete courses" ON courses;
DROP POLICY IF EXISTS "public_read_active_courses" ON courses;
DROP POLICY IF EXISTS "authenticated_insert_courses" ON courses;
DROP POLICY IF EXISTS "authenticated_update_courses" ON courses;
DROP POLICY IF EXISTS "authenticated_delete_courses" ON courses;
DROP POLICY IF EXISTS "authenticated_read_all_courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can manage courses" ON courses;
DROP POLICY IF EXISTS "Active courses are publicly visible" ON courses;

-- Garantir que RLS está ativado
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Política para SELECT: público pode ver cursos publicados, autenticados veem todos
CREATE POLICY "Public can read published courses"
  ON courses
  FOR SELECT
  USING (
    is_published = true
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
