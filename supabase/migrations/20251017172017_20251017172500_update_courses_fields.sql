/*
  # Atualizar campos da tabela pos_cursos

  1. Mudanças nos Campos
    - Remover: description, short_description
    - Adicionar: modality_complement (texto longo após modality)
    - Adicionar: min_students (inteiro, número mínimo de alunos)
    - Modificar: location (texto para texto longo)
    - Modificar: price para investment (texto longo)
    - Adicionar: contact_us (texto longo para informações de contato)

  2. Notas Importantes
    - Campos removidos: description e short_description não são mais necessários
    - Campo investment substitui price com tipo texto para maior flexibilidade
    - Todos os novos campos têm valores padrão seguros
*/

-- Verificar e remover colunas antigas se existirem
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'description'
  ) THEN
    ALTER TABLE pos_cursos DROP COLUMN description;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'short_description'
  ) THEN
    ALTER TABLE pos_cursos DROP COLUMN short_description;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'price'
  ) THEN
    ALTER TABLE pos_cursos DROP COLUMN price;
  END IF;
END $$;

-- Adicionar novo campo modality_complement
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'modality_complement'
  ) THEN
    ALTER TABLE pos_cursos ADD COLUMN modality_complement text DEFAULT '';
  END IF;
END $$;

-- Adicionar campo min_students
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'min_students'
  ) THEN
    ALTER TABLE pos_cursos ADD COLUMN min_students integer DEFAULT 0;
  END IF;
END $$;

-- Modificar campo location para texto longo (já é text, apenas garantir)
COMMENT ON COLUMN pos_cursos.location IS 'Campo de texto longo para localização detalhada';

-- Adicionar campo investment (substitui price)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'investment'
  ) THEN
    ALTER TABLE pos_cursos ADD COLUMN investment text DEFAULT '';
  END IF;
END $$;

-- Adicionar campo contact_us
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'contact_us'
  ) THEN
    ALTER TABLE pos_cursos ADD COLUMN contact_us text DEFAULT '';
  END IF;
END $$;
