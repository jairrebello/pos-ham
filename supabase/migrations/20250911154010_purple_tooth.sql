/*
  # Dados iniciais para cursos UNIAENE

  Inserir cursos de exemplo para demonstrar o sistema funcionando.
*/

INSERT INTO courses (
  title,
  description,
  short_description,
  image_url,
  area,
  modality,
  duration_hours,
  max_students,
  start_date,
  location,
  price,
  status,
  content
) VALUES 
(
  'Neuropsicologia',
  'Especialização em Neuropsicologia com foco em avaliação e reabilitação neuropsicológica, proporcionando formação completa e atualizada para profissionais da área da saúde.',
  'Preparar profissionais com vistas à qualificação acadêmica e técnica no campo da neuropsicologia.',
  'https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=400',
  'psicologia',
  'online',
  440,
  22,
  '2025-09-23',
  'Online',
  2400.00,
  'active',
  '{
    "about": "Preparar profissionais com vistas à qualificação acadêmica e técnica no campo da neuropsicologia, na perspectiva de uma formação interdisciplinar, favorecendo uma práxis ética e socialmente referenciada no exercício da neuropsicologia e suas áreas de atuação: avaliação, habilitação e reabilitação, nos diferentes contextos de inserção profissional.",
    "target_audience": "Profissionais da área da saúde e educação que desejam se especializar em neuropsicologia, incluindo psicólogos, médicos, fonoaudiólogos, terapeutas ocupacionais, pedagogos e profissionais afins.",
    "program": [
      "Fundamentos da Neuroanatomia e Neurofisiologia",
      "História e Conceitos Básicos da Neuropsicologia", 
      "Desenvolvimento Neuropsicológico",
      "Avaliação Neuropsicológica Infantil",
      "Avaliação Neuropsicológica do Adulto",
      "Reabilitação Neuropsicológica",
      "Transtornos do Neurodesenvolvimento",
      "Demências e Envelhecimento",
      "Neuropsicologia das Funções Executivas",
      "Metodologia da Pesquisa em Neuropsicologia"
    ],
    "coordination": "Prof. Dra. Maria Silva - Doutora em Neuropsicologia pela USP, com mais de 15 anos de experiência na área clínica e de pesquisa.",
    "requirements": [
      "Diploma de graduação reconhecido pelo MEC",
      "Registro ativo no conselho profissional da área", 
      "Conhecimentos básicos em psicologia ou áreas afins"
    ]
  }'
),
(
  'Enfermagem em Obstetrícia',
  'Especialização em Enfermagem Obstétrica para atuação qualificada em maternidades, centros de parto e assistência à saúde da mulher durante todo o ciclo reprodutivo.',
  'Capacitação para o cuidado especializado à mulher durante o ciclo gravídico-puerperal.',
  'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=400',
  'saude',
  'online',
  480,
  25,
  '2025-02-20',
  'Online',
  2800.00,
  'active',
  '{
    "about": "Formar enfermeiros especialistas em obstetrícia, capacitados para prestar cuidados de alta qualidade à mulher durante o ciclo gravídico-puerperal, com base em evidências científicas e práticas humanizadas.",
    "target_audience": "Enfermeiros graduados com registro ativo no COREN, que desejam se especializar na assistência obstétrica e neonatal.",
    "program": [
      "Fisiologia da Gestação e Parto",
      "Assistência ao Pré-natal",
      "Assistência ao Trabalho de Parto",
      "Assistência ao Puerpério",
      "Cuidados Neonatais Imediatos",
      "Emergências Obstétricas",
      "Políticas de Saúde da Mulher",
      "Humanização do Nascimento",
      "Metodologia da Pesquisa em Obstetrícia"
    ],
    "coordination": "Prof. Dr. Ana Santos - Doutora em Enfermagem Obstétrica, coordenadora do programa de residência em enfermagem obstétrica.",
    "requirements": [
      "Graduação em Enfermagem reconhecida pelo MEC",
      "Registro ativo no COREN",
      "Experiência prévia em área hospitalar (desejável)"
    ]
  }'
),
(
  'Enfermagem em UTI / Urgência e Emergência - COMBO',
  'Especialização completa combinando conhecimentos de UTI e Urgência/Emergência, preparando enfermeiros para atuação em unidades críticas com excelência técnica e científica.',
  'Formação abrangente para atuação em unidades críticas e emergenciais.',
  'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
  'saude',
  'online',
  520,
  30,
  '2025-04-10',
  'Online',
  3200.00,
  'active',
  '{
    "about": "Capacitar enfermeiros para atuação especializada em unidades de terapia intensiva e serviços de urgência e emergência, desenvolvendo competências técnicas, científicas e éticas para o cuidado ao paciente crítico.",
    "target_audience": "Enfermeiros graduados com experiência em áreas críticas, interessados em aprofundar conhecimentos em terapia intensiva e emergência.",
    "program": [
      "Fisiopatologia do Paciente Crítico",
      "Suporte Avançado de Vida",
      "Ventilação Mecânica",
      "Hemodinâmica e Monitorização",
      "Farmacologia em UTI",
      "Emergências Cardiológicas",
      "Emergências Neurológicas",
      "Trauma e Emergências Cirúrgicas",
      "Bioética em Cuidados Críticos",
      "Gestão de Qualidade em UTI"
    ],
    "coordination": "Prof. Dr. Carlos Oliveira - Doutor em Enfermagem, especialista em cuidados críticos com mais de 20 anos de experiência em UTI.",
    "requirements": [
      "Graduação em Enfermagem reconhecida pelo MEC",
      "Registro ativo no COREN", 
      "Experiência mínima de 1 ano em unidade crítica ou emergência"
    ]
  }'
),
(
  'Gestão Educacional',
  'Especialização em Gestão Educacional voltada para o desenvolvimento de competências em administração e liderança em instituições de ensino, com foco em qualidade e inovação pedagógica.',
  'Formação de gestores educacionais para liderança e inovação em instituições de ensino.',
  'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
  'educacao',
  'ead',
  400,
  35,
  '2025-03-01',
  'EAD',
  2200.00,
  'active',
  '{
    "about": "Formar gestores educacionais competentes para liderar processos de transformação e inovação em instituições de ensino, desenvolvendo habilidades de planejamento, gestão de pessoas e qualidade educacional.",
    "target_audience": "Professores, coordenadores pedagógicos, diretores escolares e profissionais da educação interessados em gestão educacional.",
    "program": [
      "Fundamentos da Gestão Educacional",
      "Planejamento Estratégico em Educação",
      "Gestão de Pessoas na Educação",
      "Liderança e Comunicação",
      "Gestão Financeira Escolar",
      "Qualidade e Avaliação Institucional",
      "Tecnologias na Gestão Educacional",
      "Marco Legal da Educação",
      "Metodologia da Pesquisa Educacional"
    ],
    "coordination": "Prof. Dra. Lucia Fernandes - Doutora em Educação, consultora em gestão educacional com ampla experiência em instituições públicas e privadas.",
    "requirements": [
      "Graduação em área da Educação ou áreas afins",
      "Experiência em educação (desejável)",
      "Conhecimentos básicos de informática"
    ]
  }'
);