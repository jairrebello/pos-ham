/*
  # Adicionar novos campos à tabela pos_cursos

  1. Novos Campos
    - start_forecast (text): Previsão de início - texto longo
    - estimated_time (text): Tempo previsto - texto curto
    - class_frequency (text): Periodicidade das aulas - texto longo
    - coordination_polo_ham (text): Coordenação Polo HAM - texto longo

  2. Notas Importantes
    - Todos os campos são do tipo texto para máxima flexibilidade
    - Valores padrão vazios para evitar problemas com dados nulos
*/

-- Adicionar campo start_forecast (previsão de início)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'start_forecast'
  ) THEN
    ALTER TABLE pos_cursos ADD COLUMN start_forecast text DEFAULT '';
  END IF;
END $$;

-- Adicionar campo estimated_time (tempo previsto)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'estimated_time'
  ) THEN
    ALTER TABLE pos_cursos ADD COLUMN estimated_time text DEFAULT '';
  END IF;
END $$;

-- Adicionar campo class_frequency (periodicidade das aulas)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'class_frequency'
  ) THEN
    ALTER TABLE pos_cursos ADD COLUMN class_frequency text DEFAULT '';
  END IF;
END $$;

-- Adicionar campo coordination_polo_ham (coordenação polo HAM)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pos_cursos' AND column_name = 'coordination_polo_ham'
  ) THEN
    ALTER TABLE pos_cursos ADD COLUMN coordination_polo_ham text DEFAULT '';
  END IF;
END $$;

-- Adicionar comentários explicativos
COMMENT ON COLUMN pos_cursos.start_forecast IS 'Previsão de início do curso - texto longo';
COMMENT ON COLUMN pos_cursos.estimated_time IS 'Tempo previsto do curso - texto curto';
COMMENT ON COLUMN pos_cursos.class_frequency IS 'Periodicidade das aulas - texto longo';
COMMENT ON COLUMN pos_cursos.coordination_polo_ham IS 'Coordenação Polo HAM - texto longo';
