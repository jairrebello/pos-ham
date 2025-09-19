/*
  # Reativar RLS na tabela courses com políticas simplificadas

  1. Reativa RLS na tabela courses
  2. Cria políticas básicas e funcionais:
     - SELECT: Todos podem ler cursos ativos, usuários autenticados podem ler todos
     - INSERT: Usuários autenticados podem inserir
     - UPDATE: Usuários autenticados podem atualizar
     - DELETE: Usuários autenticados podem deletar
*/

-- Reativar RLS na tabela courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Política para SELECT (leitura)
CREATE POLICY "Anyone can read active courses, authenticated users can read all"
  ON courses
  FOR SELECT
  USING (
    status = 'active' OR auth.role() = 'authenticated'
  );

-- Política para INSERT (inserção)
CREATE POLICY "Authenticated users can insert courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política para UPDATE (atualização)
CREATE POLICY "Authenticated users can update courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para DELETE (exclusão)
CREATE POLICY "Authenticated users can delete courses"
  ON courses
  FOR DELETE
  TO authenticated
  USING (true);