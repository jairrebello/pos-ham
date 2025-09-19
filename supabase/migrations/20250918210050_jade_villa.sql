/*
  # Corrigir políticas RLS para cursos

  1. Mudanças
    - Remover todas as políticas restritivas existentes
    - Criar políticas simples que funcionam corretamente
    - Permitir que usuários autenticados gerenciem cursos
    - Manter acesso público para leitura de cursos ativos

  2. Segurança
    - RLS continua habilitado
    - Acesso público apenas para leitura de cursos ativos
    - Usuários autenticados podem fazer todas as operações
*/

-- Remover todas as políticas existentes
DROP POLICY IF EXISTS "Cursos ativos são visíveis publicamente" ON courses;
DROP POLICY IF EXISTS "Active courses are publicly visible" ON courses;
DROP POLICY IF EXISTS "Administradores podem gerenciar todos os cursos" ON courses;
DROP POLICY IF EXISTS "Authenticated users can manage courses" ON courses;

-- Política para leitura pública de cursos ativos
CREATE POLICY "public_read_active_courses"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- Política para usuários autenticados poderem inserir cursos
CREATE POLICY "authenticated_insert_courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política para usuários autenticados poderem atualizar cursos
CREATE POLICY "authenticated_update_courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para usuários autenticados poderem deletar cursos
CREATE POLICY "authenticated_delete_courses"
  ON courses
  FOR DELETE
  TO authenticated
  USING (true);

-- Política para usuários autenticados poderem ler todos os cursos
CREATE POLICY "authenticated_read_all_courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);