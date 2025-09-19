/*
  # Criação do sistema de cursos para UNIAENE

  1. Nova Tabela
    - `courses` - tabela principal para armazenar informações dos cursos
      - `id` (uuid, primary key)
      - `title` (text, título do curso)  
      - `description` (text, descrição completa)
      - `short_description` (text, descrição breve)
      - `image_url` (text, URL da imagem)
      - `area` (text, área do curso)
      - `modality` (text, modalidade - presencial/online/ead/hibrido)
      - `duration_hours` (integer, carga horária)
      - `max_students` (integer, número máximo de alunos)
      - `start_date` (date, data de início)
      - `location` (text, local do curso)
      - `price` (numeric, preço do curso)
      - `status` (text, status - active/inactive/draft)
      - `content` (jsonb, conteúdo estruturado do curso)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Segurança
    - Habilitar RLS na tabela `courses`
    - Política para leitura pública dos cursos ativos
    - Política para administradores gerenciarem todos os cursos
*/

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  image_url text DEFAULT '',
  area text NOT NULL,
  modality text NOT NULL CHECK (modality IN ('presencial', 'online', 'ead', 'hibrido')),
  duration_hours integer NOT NULL DEFAULT 0,
  max_students integer NOT NULL DEFAULT 0,
  start_date date,
  location text DEFAULT '',
  price numeric(10,2) DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'inactive', 'draft')),
  content jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública de cursos ativos
CREATE POLICY "Cursos ativos são visíveis publicamente"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- Política para administradores gerenciarem todos os cursos
CREATE POLICY "Administradores podem gerenciar todos os cursos"
  ON courses
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@uniaene.edu.br');

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();