// Dicionario de Protocolos de Peptideos — Dados do E-Book (Portugues)
// Fontes: PubMed, PMC, PeptidesInsider, BeWellLifestyleCenters, PeptideFox
// Apenas para fins educacionais e de pesquisa

export const reconstitutionGuidePT = {
  title: 'Guia de Reconstituicao e Administracao de Peptideos',

  supplies: [
    'Frasco de peptideo liofilizado',
    'Agua bacteriostatica (com 0,9% de alcool benzilico)',
    'Seringas de insulina U-100 (29-31G, 1/2 polegada)',
    'Algodao com alcool',
    'Recipiente para descarte de perfurocortantes'
  ],

  steps: [
    { step: 1, action: 'Lave bem as maos e prepare um espaco de trabalho limpo.' },
    { step: 2, action: 'Remova as tampas dos frascos de peptideo e de agua bacteriostatica.' },
    { step: 3, action: 'Limpe as rolhas de borracha de ambos os frascos com algodao com alcool.' },
    { step: 4, action: 'Aspire o volume desejado de agua bacteriostatica em uma seringa (normalmente 1-2,5 mL).' },
    { step: 5, action: 'Insira a agulha no frasco do peptideo em angulo, deixando a agua escorrer pela parede do frasco — NAO borrife diretamente sobre o po.' },
    { step: 6, action: 'Gire suavemente o frasco ate o po dissolver completamente. NUNCA agite — a agitacao desnatura as cadeias peptidicas.' },
    { step: 7, action: 'Rotule o frasco com: nome do peptideo, concentracao (mg/mL), data da reconstituicao.' },
    { step: 8, action: 'Refrigere a 2-8°C (36-46°F). Use dentro de 30 dias.' }
  ],

  dosingFormula: {
    concentration: 'Quantidade do Peptideo (mcg) / Volume de Agua (mL) = Concentracao (mcg/mL)',
    injectionVolume: 'Dose Alvo (mcg) / Concentracao (mcg/mL) = Volume a Injetar (mL)',
    example: {
      peptideAmount: '5mg (5000 mcg)',
      bacWaterVolume: '2 mL',
      concentration: '2500 mcg/mL',
      targetDose: '500 mcg',
      volumeToInject: '0,2 mL (20 unidades na seringa U-100)'
    }
  },

  syringeConversion: [
    { units: 5, mL: 0.05 },
    { units: 10, mL: 0.1 },
    { units: 20, mL: 0.2 },
    { units: 25, mL: 0.25 },
    { units: 50, mL: 0.5 },
    { units: 100, mL: 1.0 }
  ],

  injectionSites: [
    'Abdomen inferior — 4 quadrantes, 5 cm do umbigo',
    'Coxas externas — parte media, alternando as pernas',
    'Alterne os locais sistematicamente para prevenir lipodistrofia'
  ],

  injectionTechnique: [
    'Limpe o local da injecao com algodao com alcool e deixe secar completamente.',
    'Faca uma pequena prega na pele.',
    'Insira a agulha em angulo de 45-90° no tecido subcutaneo.',
    'Injete lenta e constantemente.',
    'Remova a agulha e aplique pressao suave se necessario.'
  ],

  storage: {
    naoReconstituido: 'Armazene a -20°C (freezer) longo prazo ou 2-8°C (geladeira) curto prazo.',
    reconstituido: 'Refrigere a 2-8°C. Use dentro de 30 dias. Nunca congele peptideos reconstituidos.',
    protecao: 'Mantenha longe da luz direta. Armazene na caixa original ou embrulhe em papel aluminio.',
    posicao: 'Use o compartimento principal da geladeira — evite a porta (oscilacoes de temperatura).'
  }
};

export const protocolDictionaryPT = [
  // ─────────────────────────────────────────────
  // CONTROLE DE PESO E METABOLISMO
  // ─────────────────────────────────────────────
  {
    id: 'semaglutide',
    name: 'Semaglutida',
    category: 'Controle de Peso',
    class: 'Agonista do Receptor GLP-1',
    casNumber: '910463-68-2',
    molecularFormula: 'C187H291N45O59',
    molecularWeight: '4113,58 g/mol',
    mechanism: 'Liga-se aos receptores GLP-1 para regular o apetite, retardar o esvaziamento gastrico e aumentar a secrecao de insulina. Mimetiza o hormonio incretina GLP-1.',
    protocol: {
      route: 'Injecao subcutanea',
      titration: [
        { weeks: 'Semanas 1-4', dose: '0,25 mg semanal' },
        { weeks: 'Semanas 5-8', dose: '0,5 mg semanal' },
        { weeks: 'Semanas 9-12', dose: '1,0 mg semanal' },
        { weeks: 'Semana 13+', dose: '1,7-2,4 mg semanal' }
      ],
      timing: 'Mesmo dia toda semana, qualquer horario',
      cycleDuration: 'Minimo 12-16 semanas, frequentemente continuo',
      notes: 'Tome com alimentos se sentir nausea. Aumente fibras e agua para constipacao.'
    },
    researchHighlights: [
      'Aprovado pela FDA para controle de peso (Wegovy) e DM2 (Ozempic)',
      'Estudos STEP: reducao media de 15-20% do peso corporal em 68 semanas',
      'Reducao do risco cardiovascular demonstrada no estudo SELECT',
      'Superior a liraglutida em comparacoes diretas'
    ],
    contraindications: [
      'Historico pessoal/familiar de carcinoma medular de tireoide',
      'Sindrome de Neoplasia Endocrina Multipla tipo 2 (NEM2)',
      'Gravidez ou amamentacao',
      'Gastroparesia grave',
      'Historico de pancreatite'
    ],
    sideEffects: ['Nausea', 'Diarreia', 'Constipacao', 'Reacoes no local da injecao', 'Fadiga'],
    evidenceLevel: 'Forte — Aprovado FDA, multiplos ECRs Fase III'
  },

  {
    id: 'tirzepatide',
    name: 'Tirzepatida',
    category: 'Controle de Peso',
    class: 'Agonista Duplo GIP/GLP-1',
    casNumber: '2023788-19-2',
    molecularFormula: 'C225H348N48O68',
    molecularWeight: '4813,50 g/mol',
    mechanism: 'Agonista duplo que ativa receptores GIP e GLP-1 para efeitos metabolicos potencializados — melhor sensibilidade a insulina, supressao do apetite e reducao superior de gordura.',
    protocol: {
      route: 'Injecao subcutanea',
      titration: [
        { weeks: 'Semanas 1-4', dose: '2,5 mg semanal' },
        { weeks: 'Semanas 5-8', dose: '5 mg semanal' },
        { weeks: 'Semanas 9-12', dose: '7,5 mg semanal' },
        { weeks: 'Semanas 13-16', dose: '10 mg semanal' },
        { weeks: 'Semana 17+', dose: '12,5-15 mg semanal' }
      ],
      timing: 'Mesmo dia toda semana',
      cycleDuration: 'Minimo 12-20 semanas',
      notes: 'Perda de peso superior vs semaglutida em estudos clinicos. Titulacao lenta reduz efeitos GI.'
    },
    researchHighlights: [
      'Estudo SURMOUNT: reducao media de 20-25% do peso corporal',
      'Mecanismo duplo oferece eficacia superior a agentes apenas GLP-1',
      'Melhorias significativas no controle glicemico',
      'Melhora dos marcadores cardiovasculares e perfil lipidico'
    ],
    contraindications: [
      'Historico pessoal/familiar de carcinoma medular de tireoide',
      'Sindrome NEM2',
      'Gravidez ou amamentacao',
      'Historico de pancreatite'
    ],
    sideEffects: ['Nausea', 'Diarreia', 'Apetite diminuido', 'Vomito', 'Constipacao'],
    evidenceLevel: 'Forte — Aprovado FDA, ECRs Fase III'
  },

  {
    id: 'aod-9604',
    name: 'AOD-9604',
    category: 'Controle de Peso',
    class: 'Fragmento do Hormonio de Crescimento',
    casNumber: '221231-10-3',
    molecularFormula: 'C78H123N23O23S2',
    molecularWeight: '1815,12 g/mol',
    mechanism: 'Fragmento modificado (aminoacidos 177-191) do hormonio de crescimento humano. Atua especificamente no metabolismo de gordura sem afetar acucar no sangue, crescimento ou niveis de IGF-1.',
    protocol: {
      route: 'Injecao subcutanea',
      dose: '250-500 mcg diarios',
      timing: 'Manha em jejum',
      cycleDuration: '12-16 semanas',
      notes: 'Sem efeito no IGF-1 ou insulina. Pode ser combinado com outros peptideos para perda de gordura.'
    },
    researchHighlights: [
      'Atua no metabolismo de gordura sem efeitos anabolicos/de crescimento',
      'Nao afeta glicose sanguinea ou niveis de insulina',
      'Potencial de reparo de cartilagem em estudos pre-clinicos',
      'Status GRAS para uso alimentar em algumas jurisdicoes'
    ],
    contraindications: ['Gravidez ou amamentacao', 'Cancer ativo'],
    sideEffects: ['Irritacao leve no local da injecao', 'Cefaleia (raro)'],
    evidenceLevel: 'Moderado — pre-clinico forte, ECRs humanos limitados'
  },

  {
    id: 'mots-c',
    name: 'MOTS-C',
    category: 'Controle de Peso',
    class: 'Peptideo Derivado Mitocondrial',
    casNumber: '1627580-64-6',
    molecularFormula: 'C121H200N42O32S2',
    molecularWeight: '2174,52 g/mol',
    mechanism: 'Peptideo derivado mitocondrial que ativa a via AMPK, potencializando a oxidacao de acidos graxos, captacao de glicose e homeostase metabolica. Age como mimetico de exercicio.',
    protocol: {
      route: 'Injecao subcutanea ou intramuscular',
      dose: '5-10 mg, 3x por semana',
      timing: 'Manha ou pre-treino',
      cycleDuration: '4-8 semanas',
      notes: 'Frequentemente chamado de "mimetico de exercicio." Pode melhorar o desempenho fisico junto com beneficios metabolicos.'
    },
    researchHighlights: [
      'Codificado no DNA mitocondrial — peptideo endogeno',
      'Ativa a via de sinalizacao AMPK',
      'Melhora a sensibilidade a insulina em modelos pre-clinicos',
      'Niveis diminuem com a idade — correlaciona com declinio metabolico'
    ],
    contraindications: ['Gravidez ou amamentacao', 'Cancer ativo'],
    sideEffects: ['Vermelhidao no local da injecao', 'Fadiga leve inicialmente'],
    evidenceLevel: 'Emergente — dados pre-clinicos fortes, estudos humanos limitados'
  },

  {
    id: 'tesofensine',
    name: 'Tesofensina',
    category: 'Controle de Peso',
    class: 'Inibidor Triplo de Recaptacao',
    casNumber: '195875-84-4',
    mechanism: 'Inibidor triplo de recaptacao de monoaminas (serotonina, dopamina, norepinefrina) que suprime o apetite e aumenta a taxa metabolica via modulacao do sistema nervoso central.',
    protocol: {
      route: 'Oral',
      startingDose: '0,25 mg diario',
      therapeuticDose: '0,5-1 mg diario',
      cycleDuration: '12-16 semanas, depois pausa',
      notes: 'Monitore pressao arterial e humor. Nao e um peptideo propriamente, mas comumente incluido em protocolos de terapia peptidica.'
    },
    researchHighlights: [
      'Estudos Fase II mostraram ~10% de perda de peso corporal com 0,5mg',
      'Eficacia maior que a maioria dos medicamentos de mecanismo unico',
      'Dupla acao: supressao de apetite + aumento de metabolismo'
    ],
    contraindications: [
      'Hipertensao nao controlada',
      'Historico de eventos cardiovasculares',
      'Uso de IMAO',
      'Transtornos de ansiedade (pode agravar)'
    ],
    sideEffects: ['Boca seca', 'Insonia', 'Frequencia cardiaca elevada', 'Alteracoes de humor', 'Constipacao'],
    evidenceLevel: 'Moderado — Fase II completa, Fase III em andamento'
  },

  // ─────────────────────────────────────────────
  // RECUPERACAO E CICATRIZACAO
  // ─────────────────────────────────────────────
  {
    id: 'bpc-157',
    name: 'BPC-157 (Composto de Protecao Corporal)',
    category: 'Recuperacao e Cicatrizacao',
    class: 'Pentadecapeptideo Gastrico',
    casNumber: '137525-51-0',
    molecularFormula: 'C62H98N16O22',
    molecularWeight: '1419,56 g/mol',
    mechanism: 'Derivado naturalmente do suco gastrico. Promove angiogenese, regula receptores de fatores de crescimento, modula o sistema de oxido nitrico e acelera a cicatrizacao tecidual em multiplos sistemas organicos.',
    protocol: {
      route: 'Injecao subcutanea ou oral',
      dose: '250-500 mcg diarios (dividir AM/PM se desejado)',
      reconstitution: 'Frasco 10mg + 3 mL agua BAC = 3,33 mg/mL',
      frequency: '1-2x ao dia',
      cycleDuration: '4-8 semanas (agudo) ou 12+ semanas (cronico)',
      cyclePattern: '6-8 semanas ligado, 2-4 semanas desligado',
      notes: 'Injete proximo ao local da lesao para efeito local, ou no abdomen para efeito sistemico. Forma oral disponivel para cicatrizacao intestinal.'
    },
    researchHighlights: [
      'Peptideo de cicatrizacao sistemica — atua em tendoes, ligamentos, musculos, intestino, nervos',
      'Promove angiogenese e formacao de vasos sanguineos',
      'Anti-inflamatorio por multiplas vias',
      'Origem gastrica — estavel em acido gastrico (biodisponibilidade oral)',
      'Pre-clinico: cicatrizacao acelerada em 100+ estudos em tipos de tecido'
    ],
    contraindications: ['Gravidez ou amamentacao', 'Cancer ativo (teorico — promove angiogenese)'],
    sideEffects: ['Efeitos colaterais minimos relatados', 'Irritacao leve no local da injecao', 'Raro: tontura, nausea'],
    evidenceLevel: 'Moderado — dados pre-clinicos extensos, ECRs humanos limitados'
  },

  {
    id: 'tb-500',
    name: 'TB-500 (Fragmento de Timosina Beta-4)',
    category: 'Recuperacao e Cicatrizacao',
    class: 'Peptideo de Timosina',
    casNumber: '77591-33-4',
    molecularFormula: 'C212H350N56O78S',
    molecularWeight: '4963,44 g/mol',
    mechanism: 'Derivado da Timosina Beta-4. Promove migracao celular, formacao de vasos sanguineos e deposicao de colageno. Regula actina para reparo celular e reduz inflamacao sistemicamente.',
    protocol: {
      route: 'Injecao subcutanea',
      loadingPhase: '2-5 mg/semana divididos em 2 injecoes (Seg/Qui) por 4-6 semanas',
      maintenancePhase: '2 mg uma vez por semana',
      reconstitution: 'Frasco 10mg + 3 mL agua BAC = 3,33 mg/mL',
      cycleDuration: '8-12 semanas total',
      notes: 'Peptideo sistemico — nao precisa ser injetado proximo ao local da lesao. Melhor combinado com BPC-157 para cicatrizacao sinergica.'
    },
    researchHighlights: [
      'Promove angiogenese e migracao celular',
      'Reduz inflamacao e fibrose',
      'Protecao cardiovascular em modelos pre-clinicos',
      'Sinergico com BPC-157 para recuperacao acelerada'
    ],
    contraindications: ['Cancer ativo', 'Gravidez ou amamentacao', 'Proibido em esportes competitivos (WADA)'],
    sideEffects: ['Vermelhidao no local da injecao', 'Cefaleia leve', 'Letargia (temporaria)'],
    evidenceLevel: 'Moderado — pre-clinico forte, dados ortopedicos humanos limitados'
  },

  {
    id: 'kpv',
    name: 'KPV',
    category: 'Recuperacao e Cicatrizacao',
    class: 'Tripeptideo Anti-inflamatorio',
    casNumber: '867021-83-8',
    molecularFormula: 'C18H34N6O5',
    molecularWeight: '414,50 g/mol',
    mechanism: 'Fragmento tripeptidico C-terminal do alfa-MSH. Anti-inflamatorio potente que inibe a via NF-kB e modula citocinas inflamatorias. Atravessa a barreira hematoencefalica.',
    protocol: {
      route: 'Oral (intestino) ou subcutaneo (sistemico)',
      oralDose: '200-500 mcg, 1-3x ao dia',
      subqDose: '200-500 mcg diario',
      cycleDuration: '4-8 semanas',
      notes: 'Oral para inflamacao intestinal (DII, SIBO). SubQ para efeitos anti-inflamatorios sistemicos.'
    },
    researchHighlights: [
      'Inibidor potente da via NF-kB',
      'Eficacia pre-clinica em modelos de colite',
      'Propriedades antimicrobianas',
      'Atravessa barreira hematoencefalica — potencial beneficio em neuroinflamacao'
    ],
    contraindications: ['Gravidez ou amamentacao'],
    sideEffects: ['Efeitos colaterais minimos relatados'],
    evidenceLevel: 'Emergente — dados pre-clinicos, sem ECRs humanos'
  },

  // ─────────────────────────────────────────────
  // PROTOCOLOS COMBINADOS DE CICATRIZACAO
  // ─────────────────────────────────────────────
  {
    id: 'wolverine-protocol',
    name: 'Protocolo Wolverine (Stack Avancado de Cicatrizacao)',
    category: 'Recuperacao e Cicatrizacao',
    class: 'Stack Multi-Peptideo',
    mechanism: 'Combinacao sinergica direcionada a reparo tecidual local (BPC-157), cicatrizacao sistemica (TB-500), colageno/pele (GHK-Cu), suporte imunologico (Timosina Alfa-1) e otimizacao do hormonio de crescimento (CJC/Ipamorelinao).',
    protocol: {
      components: [
        { peptide: 'BPC-157', dose: '500 mcg diario', timing: 'Manha' },
        { peptide: 'TB-500', dose: '2,5 mg 2x/sem (Seg & Qui)', timing: 'Manha' },
        { peptide: 'GHK-Cu', dose: '2 mg diario', timing: 'Manha' },
        { peptide: 'Timosina Alfa-1', dose: '1,6 mg 2x/sem', timing: 'Variavel' },
        { peptide: 'CJC-1295/Ipamorelinao', dose: '200/200 mcg a noite', timing: 'Antes de dormir (jejum)' }
      ],
      cycleDuration: '6-8 semanas ligado, minimo 4 semanas de pausa',
      notes: 'Requer multiplas injecoes diarias. Monitoramento por exames de sangue recomendado antes, durante e apos o ciclo.'
    },
    evidenceLevel: 'Anedotico — baseado na combinacao de peptideos estudados individualmente'
  },

  {
    id: 'bpc157-tb500-combo',
    name: 'Stack de Recuperacao BPC-157 + TB-500',
    category: 'Recuperacao e Cicatrizacao',
    class: 'Stack Duplo de Peptideos',
    mechanism: 'BPC-157 fornece reparo tecidual local e cicatrizacao intestinal enquanto TB-500 promove migracao celular sistemica e angiogenese. Juntos abordam vias de cicatrizacao local e sistemica.',
    protocol: {
      optionA: {
        label: 'Padrao (Diario + 2x/sem)',
        bpc157: '250-500 mcg diario',
        tb500: '2,5 mg 2x/sem (Seg/Qui)',
        duration: '6-8 semanas'
      },
      optionB: {
        label: 'Simplificado (Alternado)',
        monday: 'BPC-157 — 0,35 mL',
        thursday: 'TB-500 — 0,35 mL',
        duration: '6-8 semanas'
      },
      expectedTimeline: [
        { weeks: '1-2', effect: 'Efeitos anti-inflamatorios comecam' },
        { weeks: '3-4', effect: 'Cicatrizacao tecidual ativa' },
        { weeks: '5-6', effect: 'Progresso significativo na recuperacao' },
        { weeks: '7-8', effect: 'Consolidacao e conclusao da cicatrizacao' }
      ]
    },
    evidenceLevel: 'Anedotico — combinacao clinica amplamente utilizada'
  },

  // ─────────────────────────────────────────────
  // HORMONIO DE CRESCIMENTO
  // ─────────────────────────────────────────────
  {
    id: 'cjc-1295',
    name: 'CJC-1295',
    category: 'Hormonio de Crescimento',
    class: 'Analogo de GHRH',
    casNumber: '863288-34-0',
    molecularFormula: 'C165H269N47O46',
    molecularWeight: '3649,30 g/mol',
    mechanism: 'Analogo do hormonio liberador de hormonio de crescimento (GHRH) que estende a duracao dos pulsos de GH sem aumentar a amplitude do pulso. Estimula a hipofise a liberar GH naturalmente.',
    protocol: {
      withoutDAC: {
        route: 'Injecao subcutanea',
        dose: '100-300 mcg por injecao',
        frequency: '1-3x ao dia',
        timing: 'Estomago vazio, melhor antes de dormir',
        notes: 'Acao curta. Quase sempre combinado com Ipamorelinao para sinergia.'
      },
      withDAC: {
        route: 'Injecao subcutanea',
        dose: '1-2 mg semanal',
        frequency: '1-2x por semana',
        notes: 'Complexo de Afinidade Farmacologica estende a meia-vida. Fornece elevacao sustentada de GH.'
      },
      cycleDuration: '3-6 meses para resultados ideais'
    },
    researchHighlights: [
      'Analogo de GHRH — estende duracao do pulso natural de GH',
      'Sinergico com mimeticos de grelina (Ipamorelinao, GHRP-6)',
      'Nao dessensibiliza o eixo GH nas doses recomendadas',
      'Melhora arquitetura do sono, recuperacao e composicao corporal'
    ],
    contraindications: ['Cancer ativo', 'Gravidez', 'Disturbios hipofisarios'],
    sideEffects: ['Rubor', 'Cefaleia', 'Irritacao no local da injecao', 'Retencao hidrica'],
    evidenceLevel: 'Moderado — estudos clinicos existem, nao aprovado pela FDA para este uso'
  },

  {
    id: 'ipamorelin',
    name: 'Ipamorelinao',
    category: 'Hormonio de Crescimento',
    class: 'Mimetico Seletivo de Grelina (Agonista GHSR)',
    casNumber: '170851-70-4',
    molecularFormula: 'C38H49N9O5',
    molecularWeight: '711,86 g/mol',
    mechanism: 'Secretagogo seletivo de hormonio de crescimento que estimula a liberacao de GH via receptores de grelina SEM elevar cortisol ou prolactina — o secretagogo de GH mais limpo disponivel.',
    protocol: {
      route: 'Injecao subcutanea',
      dose: '200-300 mcg por injecao',
      frequency: '2-3x ao dia (manha, pos-treino, antes de dormir)',
      timing: 'Estomago vazio (2+ horas em jejum, 30 min antes de comer)',
      cycleDuration: '8-12 semanas ligado, 8 semanas desligado',
      notes: 'Melhor combinado com CJC-1295 para liberacao amplificada de GH. Agonista GHSR mais seletivo.'
    },
    researchHighlights: [
      'Secretagogo de GH mais seletivo — sem aumento de cortisol/prolactina',
      'Liberacao de GH dose-dependente',
      'Melhora a densidade mineral ossea em estudos',
      'Sinergico com analogos de GHRH (CJC-1295)'
    ],
    contraindications: ['Cancer ativo', 'Gravidez', 'Tumores hipofisarios'],
    sideEffects: ['Leve aumento de fome', 'Vermelhidao no local da injecao', 'Raro: cefaleia, tontura'],
    evidenceLevel: 'Moderado — estudos clinicos, nao aprovado pela FDA'
  },

  {
    id: 'sermorelin',
    name: 'Sermorelina',
    category: 'Hormonio de Crescimento',
    class: 'Analogo de GHRH (29 aminoacidos)',
    casNumber: '86168-78-7',
    molecularFormula: 'C149H246N44O42S',
    molecularWeight: '3357,96 g/mol',
    mechanism: 'Fragmento de GHRH bioidentico (primeiros 29 aminoacidos). Estimula a hipofise a produzir e liberar hormonio de crescimento seguindo o ritmo pulsatil natural do corpo.',
    protocol: {
      route: 'Injecao subcutanea',
      dose: '200-500 mcg antes de dormir',
      frequency: 'Diario',
      timing: 'Antes de dormir em jejum — alinha com o pico natural de GH',
      cycleDuration: 'Minimo 3-6 meses',
      notes: 'Foi aprovado pela FDA para teste de deficiencia de GH pediatrica. Funciona com o ritmo natural de GH do corpo.'
    },
    researchHighlights: [
      'Bioidentico ao GHRH(1-29) endogeno',
      'Previamente aprovado pela FDA (Geref) para diagnostico de deficiencia de GH',
      'Restaura o padrao pulsatil jovem de GH',
      'Dados extensos de seguranca do historico de uso clinico'
    ],
    contraindications: ['Cancer ativo', 'Gravidez'],
    sideEffects: ['Irritacao no local da injecao', 'Rubor', 'Cefaleia', 'Tontura'],
    evidenceLevel: 'Forte — previamente aprovado pela FDA, historico de uso clinico'
  },

  {
    id: 'tesamorelin',
    name: 'Tesamorelina',
    category: 'Hormonio de Crescimento',
    class: 'Analogo de GHRH (44 aminoacidos + acido trans-3-hexenoico)',
    casNumber: '218949-48-5',
    mechanism: 'Analogo sintetico de GHRH com estabilidade aprimorada. Aprovado pela FDA para reducao de gordura abdominal excessiva em lipodistrofia associada ao HIV. Estimulador potente da producao endogena de GH.',
    protocol: {
      route: 'Injecao subcutanea',
      fdaApproved: '2 mg uma vez ao dia',
      wellnessProtocol: [
        { week: 'Semana 1', dose: '1,5 mg', frequency: '5x/sem (Seg-Sex)' },
        { weeks: 'Semanas 2-5', dose: '1,75 mg', frequency: '5x/sem' },
        { weeks: 'Semanas 6-10', dose: '2 mg', frequency: '5x/sem' }
      ],
      timing: 'Noite, estomago vazio',
      notes: 'Aprovado pela FDA — evidencia regulatoria mais forte de qualquer secretagogo de GH.'
    },
    researchHighlights: [
      'Aprovado pela FDA para lipodistrofia (Egrifta)',
      'Reduz tecido adiposo visceral especificamente',
      'Melhora composicao corporal sem GH suprafisiologico',
      'Nao prejudica metabolismo da glicose na maioria dos pacientes'
    ],
    contraindications: ['Cancer ativo', 'Gravidez', 'Patologia hipofisaria', 'Historico de hipersensibilidade'],
    sideEffects: ['Reacoes no local da injecao', 'Dor articular', 'Edema periferico', 'Dor muscular'],
    evidenceLevel: 'Forte — Aprovado pela FDA'
  },

  {
    id: 'mk-677',
    name: 'MK-677 (Ibutamoren)',
    category: 'Hormonio de Crescimento',
    class: 'Mimetico Nao-Peptidico de Grelina',
    casNumber: '159752-10-0',
    mechanism: 'Agonista oral do receptor de grelina que estimula a secrecao de GH. Nao e um peptideo verdadeiro, mas comumente usado em protocolos de terapia peptidica pela conveniencia da dosagem oral.',
    protocol: {
      route: 'Oral',
      dose: '10-25 mg diario',
      timing: 'Noite (pode causar sonolencia)',
      cycleDuration: 'Pode ser usado a longo prazo (estudos de ate 2 anos)',
      notes: 'Pode aumentar significativamente o apetite. Monitore glicose sanguinea — pode elevar glicose em jejum.'
    },
    researchHighlights: [
      'Biodisponibilidade oral — sem necessidade de injecoes',
      'Elevacao sustentada de IGF-1 por 24+ horas',
      'Melhora da qualidade do sono em estudos clinicos',
      'Aumento da densidade mineral ossea em 12 meses'
    ],
    contraindications: ['Diabetes (nao controlada)', 'Cancer ativo', 'Gravidez'],
    sideEffects: ['Aumento do apetite', 'Retencao hidrica', 'Glicose em jejum elevada', 'Sonolencia', 'Formigamento'],
    evidenceLevel: 'Moderado — dados clinicos Fase II, nao aprovado pela FDA'
  },

  // ─────────────────────────────────────────────
  // ANTI-ENVELHECIMENTO E LONGEVIDADE
  // ─────────────────────────────────────────────
  {
    id: 'epithalon',
    name: 'Epithalon (Epitalon)',
    category: 'Anti-Envelhecimento e Longevidade',
    class: 'Tetrapeptideo (Derivado da Pineal)',
    casNumber: '307297-39-8',
    molecularFormula: 'C14H22N4O9',
    molecularWeight: '390,35 g/mol',
    mechanism: 'Versao sintetica da Epitalamina (extrato da glandula pineal). Ativa a enzima telomerase para alongar telomeros — as capas protetoras dos cromossomos que encurtam com a idade. Tambem regula a producao de melatonina.',
    protocol: {
      route: 'Injecao subcutanea ou intramuscular',
      standardProtocol: '10 mg diarios por 10 dias',
      alternativeProtocol: '5 mg diarios por 20 dias',
      advancedProtocol: '10 mg diarios por 20 dias',
      frequency: '2-3 ciclos por ano',
      timing: 'Variavel — alguns preferem antes de dormir para sinergia com melatonina',
      notes: 'Protocolo ciclico — surtos intensivos curtos em vez de uso continuo.'
    },
    researchHighlights: [
      'Ativa telomerase em celulas somaticas humanas (Khavinson et al.)',
      'Estendeu expectativa de vida em modelos animais em 10-15%',
      'Regula melatonina e ritmo circadiano',
      'Modulacao do sistema imunologico — restaurou funcao de celulas T em idosos',
      'Estudado extensivamente pelo Dr. Vladimir Khavinson por 35+ anos'
    ],
    contraindications: ['Cancer ativo (teorico — ativacao de telomerase)', 'Gravidez'],
    sideEffects: ['Minimos relatados', 'Possiveis alteracoes no padrao de sono inicialmente'],
    evidenceLevel: 'Moderado — estudos clinicos russos, ECRs ocidentais limitados'
  },

  {
    id: 'ghk-cu',
    name: 'GHK-Cu (Peptideo de Cobre)',
    category: 'Anti-Envelhecimento e Longevidade',
    class: 'Tripeptideo Ligante de Cobre',
    casNumber: '49557-75-7',
    molecularFormula: 'C14H22CuN6O4',
    molecularWeight: '401,91 g/mol',
    mechanism: 'Tripeptideo natural que se liga a ions de cobre. Reseta a expressao genica para um estado mais saudavel, regulando positivamente genes de reparo e negativamente genes inflamatorios. Estimula a sintese de colageno, elastina e glicosaminoglicanos.',
    protocol: {
      injectable: {
        dose: '1-2 mg diario',
        route: 'Injecao subcutanea',
        cycleDuration: '4-8 semanas'
      },
      topical: {
        dose: 'Creme ou serum a 2-4%',
        frequency: '1-2x ao dia',
        duration: 'Pode ser usado continuamente'
      },
      notes: 'Coloracao azul e normal (cobre). Injetavel para beneficios sistemicos; topico para pele. Niveis caem para ~40% aos 60 anos.'
    },
    researchHighlights: [
      'Remodela expressao genica de 4.000+ genes para perfil mais jovem',
      'Estimula producao de colageno I, III e elastina',
      'Propriedades anti-inflamatorias e antioxidantes',
      'Promove cicatrizacao de feridas e crescimento de foliculos capilares',
      'Niveis endogenos diminuem significativamente com a idade'
    ],
    contraindications: ['Alergia a cobre', 'Doenca de Wilson', 'Gravidez'],
    sideEffects: ['Descoloracao azul no local da injecao (temporaria)', 'Ardor leve (topico)'],
    evidenceLevel: 'Moderado — extenso in vitro/pre-clinico, alguns estudos humanos (principalmente topico)'
  },

  {
    id: 'nad-plus',
    name: 'NAD+ (Nicotinamida Adenina Dinucleotideo)',
    category: 'Anti-Envelhecimento e Longevidade',
    class: 'Coenzima',
    casNumber: '53-84-9',
    molecularFormula: 'C21H27N7O14P2',
    molecularWeight: '663,43 g/mol',
    mechanism: 'Coenzima essencial presente em todas as celulas vivas. Alimenta a producao de energia celular (sintese de ATP), ativa sirtuinas (genes de longevidade), habilita enzimas de reparo de DNA (PARPs) e regula o ritmo circadiano. Niveis diminuem ~50% entre 40-60 anos.',
    protocol: {
      iv: {
        dose: '250-500 mg por infusao',
        frequency: '1-2x por semana para carga, depois manutencao mensal',
        duration: 'Infusao de 2-4 horas'
      },
      subcutaneous: {
        dose: '50-100 mg diario',
        frequency: '2-3x por semana'
      },
      cycleDuration: 'Terapia de manutencao continua',
      notes: 'Infusoes IV podem causar aperto no peito, caibras e nausea — reduza a velocidade da infusao se sintomas ocorrerem. SubQ e mais conveniente mas em doses menores.'
    },
    researchHighlights: [
      'Central para metabolismo energetico celular (600+ reacoes enzimaticas)',
      'Ativa todas as 7 proteinas de longevidade sirtuinas',
      'Necessario para reparo de DNA via enzimas PARP',
      'Diminui ~50% entre 40-60 anos',
      'Pre-clinico: restaurou funcao mitocondrial em camundongos envelhecidos'
    ],
    contraindications: ['Cancer ativo (fornece energia a celulas em rapida divisao)', 'Gravidez'],
    sideEffects: ['Aperto no peito (IV)', 'Nausea (IV)', 'Caibras', 'Rubor'],
    evidenceLevel: 'Moderado — dados mecanisticos fortes, estudos humanos em andamento'
  },

  // ─────────────────────────────────────────────
  // COGNITIVO E NEUROPROTETOR
  // ─────────────────────────────────────────────
  {
    id: 'semax',
    name: 'Semax',
    category: 'Cognitivo e Neuroprotetor',
    class: 'Analogo Sintetico de ACTH(4-10)',
    casNumber: '80714-61-0',
    mechanism: 'Heptapeptideo sintetico analogo de ACTH(4-10). Aumenta a expressao de BDNF, modula sistemas serotoninergicos/dopaminergicos e fornece neuroprotecao.',
    protocol: {
      intranasal: {
        standard: '200-600 mcg diarios, 1-3x',
        highDose: '500-1000 mcg, 1-2x ao dia (solucao 1%)',
        optimal: '750-1000 mcg uma vez ao dia, manha em jejum'
      },
      subcutaneous: {
        dose: '250-500 mcg diario'
      },
      timing: 'Manha preferencial para efeitos cognitivos',
      notes: 'Intranasal e a via mais comum. Disponivel em solucoes 0,1% e 1%. Sem dependencia ou abstinencia conhecidas.'
    },
    researchHighlights: [
      'Aumenta BDNF (fator neurotrofico derivado do cerebro)',
      'Aprovado na Russia para recuperacao de AVC e disturbios cognitivos',
      'Neuroprotetor contra estresse oxidativo',
      'Modula neurotransmissao de dopamina e serotonina',
      'Sem efeitos de dependencia ou abstinencia relatados'
    ],
    contraindications: ['Gravidez', 'Psicose aguda', 'Historico de convulsoes (cautela)'],
    sideEffects: ['Irritacao nasal', 'Raro: cefaleia, tontura'],
    evidenceLevel: 'Moderado — aprovado na Russia, ECRs ocidentais limitados'
  },

  {
    id: 'selank',
    name: 'Selank',
    category: 'Cognitivo e Neuroprotetor',
    class: 'Analogo Sintetico de Tuftisina',
    casNumber: '129954-34-3',
    mechanism: 'Analogo sintetico do peptideo imunomodulador tuftisina com sequencia Pro-Gly-Pro adicionada. Ansiolitico, nootropico e imunomodulador — modula sistemas GABA, serotonina e encefalina.',
    protocol: {
      intranasal: {
        dose: '75-200 mcg por narina, 1-3x ao dia'
      },
      subcutaneous: {
        dose: '250-500 mcg diario'
      },
      duration: 'Pode ser usado a longo prazo (sem dependencia relatada)',
      timing: 'Manha e/ou noite',
      notes: 'Ansiolitico sem sedacao ou comprometimento cognitivo. Frequentemente combinado com Semax.'
    },
    researchHighlights: [
      'Aprovado na Russia para ansiedade generalizada',
      'Ansiolitico sem efeitos colaterais tipo benzodiazepina',
      'Imunomodulador — aumenta IL-6 e influencia equilibrio de celulas T-helper',
      'Modula sistema GABAergico',
      'Sem dependencia, tolerancia ou abstinencia relatadas'
    ],
    contraindications: ['Gravidez'],
    sideEffects: ['Irritacao nasal leve', 'Raro: fadiga'],
    evidenceLevel: 'Moderado — aprovado na Russia, dados ocidentais limitados'
  },

  {
    id: 'dihexa',
    name: 'Dihexa',
    category: 'Cognitivo e Neuroprotetor',
    class: 'Analogo de Angiotensina IV',
    casNumber: '1401708-83-5',
    mechanism: 'Agonista do receptor de angiotensina IV que e 10 milhoes de vezes mais potente que o BDNF na promocao de conectividade sinaptica. Estimula a via do fator de crescimento hepatocitario (HGF)/c-Met para neurogenese.',
    protocol: {
      oral: { dose: '10-20 mg diario' },
      transdermal: { dose: '20-40 mg diario' },
      cycleDuration: '4-8 semanas',
      notes: 'Extremamente potente — comece pela dose mais baixa. Dados limitados de seguranca humana. Composto de pesquisa.'
    },
    researchHighlights: [
      '10^7 vezes mais potente que BDNF na promocao de conexoes sinapticas',
      'Reverteu deficits cognitivos em animais modelo de Alzheimer',
      'Estimula HGF/c-Met para neurogenese',
      'Desenvolvido na Washington State University'
    ],
    contraindications: ['Gravidez', 'Cancer ativo (via HGF)', 'Doenca hepatica'],
    sideEffects: ['Dados limitados — aumento de pressao arterial possivel', 'Cefaleia'],
    evidenceLevel: 'Emergente — apenas pre-clinico, sem estudos humanos'
  },

  {
    id: 'cerebrolysin',
    name: 'Cerebrolisina',
    category: 'Cognitivo e Neuroprotetor',
    class: 'Mistura Peptidica Derivada de Cerebro Porcino',
    mechanism: 'Mistura de peptideos de baixo peso molecular derivada de tecido cerebral porcino. Contem fatores neurotroficos que mimetizam BDNF, GDNF, NGF e CNTF. Promove neuroplasticidade e neuroprotecao.',
    protocol: {
      cognitiveEnhancement: { dose: '5-10 mL', frequency: '5 dias/sem x 4 semanas' },
      neurodegenerative: { dose: '10-30 mL', frequency: '5 dias/sem x 4 semanas' },
      route: 'Subcutaneo ou intramuscular',
      notes: 'Aprovado em 40+ paises para AVC, TCE e Alzheimer. Nao aprovado pela FDA.'
    },
    researchHighlights: [
      'Aprovado em 40+ paises para condicoes neurologicas',
      'Multiplos ECRs em AVC e Alzheimer',
      'Acoes neurotroficas e neuroprotetoras',
      'Promove neuroplasticidade e remodelacao sinaptica'
    ],
    contraindications: ['Epilepsia', 'Insuficiencia renal grave', 'Gravidez'],
    sideEffects: ['Tontura', 'Cefaleia', 'Dor no local da injecao', 'Raro: agitacao'],
    evidenceLevel: 'Moderado — aprovado em muitos paises, revisoes de ECRs ocidentais mistas'
  },

  // ─────────────────────────────────────────────
  // IMUNOLOGICO E ANTIMICROBIANO
  // ─────────────────────────────────────────────
  {
    id: 'thymosin-alpha-1',
    name: 'Timosina Alfa-1',
    category: 'Suporte Imunologico',
    class: 'Peptideo Timico',
    casNumber: '62304-98-7',
    mechanism: 'Produzido naturalmente pelo timo. Aumenta maturacao de celulas T, funcao de celulas dendriticas e respostas de anticorpos. Modula imunidade inata e adaptativa.',
    protocol: {
      route: 'Injecao subcutanea',
      standardDose: '1,6 mg duas vezes por semana',
      acuteDose: '1,6 mg diario para condicoes agudas',
      cycleDuration: '6-12 meses conforme necessario',
      notes: 'Aprovado pela FDA como medicamento orfao (Zadaxin). A producao do timo diminui com a idade — suplementacao restaura funcao imunologica.'
    },
    researchHighlights: [
      'Aprovacao como medicamento orfao pela FDA para hepatite B',
      'Aprovado em 35+ paises para modulacao imunologica',
      'Usado como adjuvante de imunoterapia contra cancer',
      'Aumenta eficacia de vacinas em idosos e imunocomprometidos',
      'Uso clinico em hepatite, HIV e infeccoes cronicas'
    ],
    contraindications: ['Receptores de transplante de orgaos (pode promover rejeicao)', 'Gravidez'],
    sideEffects: ['Minimos — irritacao no local da injecao', 'Raro: sintomas leves tipo gripe'],
    evidenceLevel: 'Forte — medicamento orfao FDA, aprovado internacionalmente, multiplos ECRs'
  },

  {
    id: 'll-37',
    name: 'LL-37',
    category: 'Suporte Imunologico',
    class: 'Peptideo Antimicrobiano Catelicidina',
    casNumber: '154947-66-7',
    mechanism: 'Catelicidina humana — um peptideo antimicrobiano endogeno. Mata diretamente bacterias, fungos e virus ao romper membranas microbianas. Tambem modula a resposta imune e rompe biofilmes.',
    protocol: {
      generalSupport: { dose: '100-200 mcg diario', duration: '2-4 semanas' },
      activeInfection: { dose: '500 mcg 2x ao dia', duration: '2-4 semanas ate resolver' },
      route: 'Subcutaneo ou topico',
      notes: 'Particularmente util para infeccoes associadas a biofilme e SIBO.'
    },
    researchHighlights: [
      'Antimicrobiano de amplo espectro — bacterias, fungos, virus',
      'Rompe biofilmes (relevante para infeccoes cronicas)',
      'Modula inflamacao — previne choque septico em modelos',
      'Endogeno — produzido por celulas imunes, epitelios e queratinocitos'
    ],
    contraindications: ['Gravidez', 'Condicoes autoimunes (pode estimular resposta imune)'],
    sideEffects: ['Irritacao no local da injecao', 'Possivel estimulacao imunologica'],
    evidenceLevel: 'Emergente — dados mecanisticos fortes, estudos clinicos limitados'
  },

  // ─────────────────────────────────────────────
  // SAUDE SEXUAL
  // ─────────────────────────────────────────────
  {
    id: 'pt-141',
    name: 'PT-141 (Bremelanotida)',
    category: 'Saude Sexual',
    class: 'Agonista do Receptor de Melanocortina',
    casNumber: '189691-06-3',
    molecularFormula: 'C50H68N14O10',
    molecularWeight: '1025,18 g/mol',
    mechanism: 'Ativa receptores de melanocortina (MC3R/MC4R) no sistema nervoso central para aumentar desejo sexual e excitacao. Atua no cerebro — nao vascular como inibidores de PDE5.',
    protocol: {
      route: 'Injecao subcutanea',
      startingDose: '0,5-1 mg',
      standardDose: '1,75-2 mg',
      timing: '45-60 minutos antes da atividade',
      maxFrequency: '8 doses por mes, maximo 1 dose por 24 horas',
      notes: 'Aprovado pela FDA (Vyleesi) para TDSH pre-menopausa. Funciona em homens e mulheres. Nausea e comum inicialmente.'
    },
    researchHighlights: [
      'Aprovado pela FDA para transtorno do desejo sexual hipoativo (TDSH) em mulheres pre-menopausicas',
      'Funciona via SNC — nao por mecanismo vascular',
      'Eficaz em homens e mulheres',
      'Efeitos duram 6-12 horas',
      'Nao afeta pressao arterial como inibidores de PDE5'
    ],
    contraindications: [
      'Hipertensao nao controlada',
      'Doenca cardiovascular conhecida',
      'Gravidez ou amamentacao'
    ],
    sideEffects: ['Nausea (mais comum — 40%)', 'Rubor', 'Cefaleia', 'Escurecimento transitorio da pele'],
    evidenceLevel: 'Forte — Aprovado pela FDA'
  },

  {
    id: 'kisspeptin',
    name: 'Kisspeptina',
    category: 'Saude Sexual',
    class: 'Neuropeptideo Hipotalamico',
    casNumber: '374675-21-5',
    mechanism: 'Regulador mestre do eixo hipotalamico-hipofisario-gonadal (HHG). Estimula neuronios GnRH a liberar gonadotrofinas (LH, FSH), aumentando naturalmente testosterona e outros hormonios sexuais.',
    protocol: {
      route: 'Subcutaneo ou IV',
      subcutaneous: '100-200 mcg, 2-3x por semana',
      ivBolus: '0,3-1,0 nmol/kg (uso diagnostico)',
      cycleDuration: '4-8 semanas',
      notes: 'Abordagem natural para aumentar testosterona sem desligar o eixo HHG.'
    },
    researchHighlights: [
      'Regulador mestre do eixo hormonal reprodutivo',
      'Nao suprime producao hormonal endogena',
      'Estudado para tratamento de infertilidade em ambos os sexos',
      'Aumenta pulsatilidade de LH'
    ],
    contraindications: ['Canceres sensiveis a hormonios', 'Gravidez'],
    sideEffects: ['Cefaleia', 'Ondas de calor', 'Nausea'],
    evidenceLevel: 'Emergente — estudos humanos em medicina reprodutiva'
  },

  // ─────────────────────────────────────────────
  // PEPTIDEOS ADICIONAIS
  // ─────────────────────────────────────────────
  {
    id: 'ss-31',
    name: 'SS-31 (Elamipretida)',
    category: 'Anti-Envelhecimento e Longevidade',
    class: 'Peptideo Direcionado a Mitocondria',
    casNumber: '736992-21-5',
    mechanism: 'Liga-se a cardiolipina na membrana mitocondrial interna. Estabiliza estrutura das cristas, otimiza cadeia de transporte de eletrons e reduz especies reativas de oxigenio (EROs) mitocondriais.',
    protocol: {
      route: 'Injecao subcutanea',
      dose: '4-10 mg diario',
      frequency: 'Uma vez ao dia',
      cycleDuration: '4-8 semanas',
      notes: 'Composto de pesquisa. Sendo estudado para sindrome de Barth, insuficiencia cardiaca e declinio mitocondrial relacionado a idade.'
    },
    researchHighlights: [
      'Atua diretamente na membrana mitocondrial interna',
      'Reduz EROs mitocondriais ao estabilizar cardiolipina',
      'Estudos Fase II/III para sindrome de Barth e insuficiencia cardiaca',
      'Melhorou tolerancia ao exercicio em estudos clinicos'
    ],
    contraindications: ['Gravidez', 'Insuficiencia renal grave'],
    sideEffects: ['Reacoes no local da injecao', 'Cefaleia'],
    evidenceLevel: 'Moderado — estudos clinicos Fase II/III (Stealth BioTherapeutics)'
  },

  {
    id: 'vip',
    name: 'VIP (Peptideo Intestinal Vasoativo)',
    category: 'Suporte Imunologico',
    class: 'Neuropeptideo',
    casNumber: '40077-57-4',
    mechanism: 'Neuropeptideo endogeno com potentes propriedades anti-inflamatorias, imunomoduladoras e vasodilatadoras. Regula ritmo circadiano, motilidade intestinal e reduz citocinas inflamatorias.',
    protocol: {
      intranasal: {
        dose: '1 spray por narina, 4x ao dia (50 mcg/spray = 400 mcg/dia)',
        primary: true
      },
      subcutaneous: {
        dose: '50-100 mcg, 1-2x ao dia'
      },
      cycleDuration: 'Minimo 30 dias, frequentemente 3-6 meses',
      notes: 'Tratamento chave no protocolo CIRS/doenca por mofo (protocolo Dr. Shoemaker). Via nasal e primaria.'
    },
    researchHighlights: [
      'Central para protocolos de tratamento de CIRS',
      'Neuropeptideo anti-inflamatorio potente',
      'Regula pressao da arteria pulmonar',
      'Modula TGF-beta e MMP-9 (marcadores de biotoxina)'
    ],
    contraindications: ['Gravidez', 'Hipotireoidismo nao tratado'],
    sideEffects: ['Diarreia (vasodilatatorio)', 'Congestao nasal', 'Queda transitoria de pressao arterial'],
    evidenceLevel: 'Moderado — uso clinico em CIRS, ECRs limitados'
  },

  {
    id: 'melanotan-1',
    name: 'Melanotan I (Afamelanotida)',
    category: 'Bem-Estar',
    class: 'Analogo de Alfa-MSH',
    casNumber: '75921-69-6',
    mechanism: 'Analogo sintetico do hormonio alfa-estimulante de melanocitos (a-MSH). Estimula melanogenese para bronzeamento independente de UV e fotoprotecao.',
    protocol: {
      route: 'Injecao subcutanea',
      loadingPhase: '250-500 mcg diarios por 2-4 semanas',
      maintenanceTanning: '1 mg diario por 7-10 dias, depois 1 mg 2-3x por semana',
      notes: 'Menos efeitos de libido/nausea comparado ao Melanotan II. Forma aprovada pela FDA (Scenesse) para PPE.'
    },
    researchHighlights: [
      'Aprovado pela FDA (Scenesse) para protoporfiria eritropoietica (PPE)',
      'Estimula melanogenese sem exposicao UV',
      'Propriedades fotoprotetoras',
      'Mais seletivo que Melanotan II'
    ],
    contraindications: ['Melanoma/cancer de pele', 'Gravidez'],
    sideEffects: ['Nausea', 'Rubor facial', 'Escurecimento de pintas'],
    evidenceLevel: 'Forte — Aprovado pela FDA para PPE (Scenesse)'
  },

  // ─────────────────────────────────────────────
  // MAIS VENDIDOS — NOVAS ADICOES
  // ─────────────────────────────────────────────

  {
    id: 'retatrutide',
    name: 'Retatrutide (LY-3437943)',
    category: 'Controle de Peso e Metabolismo',
    class: 'Agonista Triplo GLP-1/GIP/Glucagon',
    casNumber: '2381089-83-2',
    molecularFormula: 'C225H348N48O70',
    molecularWeight: '4898.63 g/mol',
    mechanism: 'Primeiro agonista triplo de receptores hormonais que ativa GLP-1 (supressao de apetite), GIP (sensibilizacao a insulina e metabolismo de gordura) e receptores de glucagon (oxidacao direta de gordura e gasto energetico). O componente glucagon o diferencia dos agonistas duplos ao promover oxidacao hepatica de gordura e termogenese.',
    protocol: {
      route: 'Injecao subcutanea',
      titration: [
        { weeks: 'Semanas 1-4', dose: '0,5 mg semanal' },
        { weeks: 'Semanas 5-8', dose: '2 mg semanal' },
        { weeks: 'Semanas 9-12', dose: '4 mg semanal' },
        { weeks: 'Semanas 13-24', dose: '8 mg semanal' },
        { weeks: 'Semanas 25-48', dose: '8-12 mg semanal (se tolerado)' }
      ],
      timing: 'Uma vez por semana, mesmo dia da semana',
      notes: 'Titulacao lenta e essencial para minimizar efeitos GI. Tomar em jejum ou com refeicao leve.'
    },
    researchHighlights: [
      'Ensaio Fase 2: reducao media de 24,2% do peso corporal em 48 semanas (dose de 12 mg)',
      'Mecanismo de agonista triplo oferece eficacia superior vs agonistas simples/duplos',
      'Reducao significativa de gordura hepatica (potencial DHGNA/NASH)',
      'Reducao de HbA1c de 2,02% em pacientes com diabetes tipo 2',
      'Programa TRIUMPH Fase 3 em andamento (Eli Lilly)',
      'Reducao de triglicerideos de ate 42% vs placebo'
    ],
    contraindications: ['Historico pessoal ou familiar de carcinoma medular de tireoide', 'Sindrome NEM2', 'Gravidez ou amamentacao', 'Gastroparesia grave', 'Historico de pancreatite'],
    sideEffects: ['Nausea (dose-dependente, melhora com titulacao)', 'Diarreia', 'Diminuicao do apetite', 'Vomito', 'Reacoes no local da injecao'],
    evidenceLevel: 'Forte — Fase 2 concluida, Fase 3 em andamento (programa TRIUMPH da Eli Lilly)'
  },

  {
    id: 'klow80',
    name: 'KLOW80 — Blend Regenerativo',
    category: 'Recuperacao e Cicatrizacao',
    class: 'Complexo Regenerativo de 4 Fases',
    casNumber: 'Blend multipeptidico',
    mechanism: 'Sistema regenerativo sinergico de 4 fases: Fase 1 (Controle de Inflamacao) — KPV inibe via NF-kB e GHK-Cu fornece suporte antioxidante. Fase 2 (Reparo Tecidual) — TB-500 estimula angiogenese e migracao celular enquanto BPC-157 guia a cicatrizacao nos locais de lesao. Fase 3 (Remodelacao) — GHK-Cu melhora a qualidade do colageno, producao de elastina e integridade da matriz extracelular. Fase 4 (Recuperacao Sistemica) — acao combinada apoia recuperacao corporal total e recomposicao metabolica.',
    protocol: {
      route: 'Injecao subcutanea',
      reconstitution: 'Reconstituir frasco de 80mg com 2-4 mL de agua bacteriostatica',
      loadingPhase: '500 mcg diarios por 2 semanas',
      maintenancePhase: '300 mcg 3-5x por semana',
      cycleDuration: '8-12 semanas ligado, 4 semanas desligado',
      timing: 'Manha em jejum ou antes de dormir',
      notes: 'Pode ser injetado proximo ao local da lesao para recuperacao direcionada. Rotacionar locais de injecao.'
    },
    researchHighlights: [
      'BPC-157: cicatrizacao acelerada tendao-osso em modelos animais (Sikiric et al.)',
      'TB-500: promove angiogenese, regula actina para reparo de feridas',
      'KPV: potente anti-inflamatorio via inibicao de NF-kB, estudado para DII',
      'GHK-Cu: aumenta sintese de colageno I e III em 70% em estudos com fibroblastos',
      'Blend sinergico aborda todas as 4 fases da cicatrizacao tecidual simultaneamente'
    ],
    contraindications: ['Cancer ativo ou malignidade', 'Gravidez ou amamentacao', 'Infeccao sistemica ativa', 'Alergia conhecida a compostos de cobre (componente GHK-Cu)'],
    sideEffects: ['Leve irritacao no local da injecao', 'Fadiga temporaria na fase de carga', 'Raro: leve desconforto GI'],
    evidenceLevel: 'Moderado — componentes individuais bem estudados, sinergia baseada em racional mecanistico'
  }
];

// ─────────────────────────────────────────────
// INDICE DE CATEGORIAS
// ─────────────────────────────────────────────
export const protocolCategoriesPT = [
  {
    id: 'weight',
    name: 'Controle de Peso e Metabolismo',
    description: 'Agonistas GLP-1, agonistas duplos GIP/GLP-1, fragmentos de GH, peptideos mitocondriais e inibidores de recaptacao para controle de apetite e perda de gordura.',
    peptideIds: ['semaglutide', 'tirzepatide', 'retatrutide', 'aod-9604', 'mots-c', 'tesofensine']
  },
  {
    id: 'recovery',
    name: 'Recuperacao e Cicatrizacao',
    description: 'Peptideos de reparo tecidual para tendoes, ligamentos, intestino, musculos e inflamacao sistemica. Inclui peptideos individuais e protocolos de combinacao comprovados.',
    peptideIds: ['bpc-157', 'tb-500', 'kpv', 'klow80', 'wolverine-protocol', 'bpc157-tb500-combo']
  },
  {
    id: 'growth-hormone',
    name: 'Hormonio de Crescimento',
    description: 'Analogos de GHRH, mimeticos de grelina e secretagogos que estimulam a producao natural de hormonio de crescimento para sono, recuperacao, composicao corporal e anti-envelhecimento.',
    peptideIds: ['cjc-1295', 'ipamorelin', 'sermorelin', 'tesamorelin', 'mk-677']
  },
  {
    id: 'anti-aging',
    name: 'Anti-Envelhecimento e Longevidade',
    description: 'Protecao de telomeros, suporte mitocondrial, remodelacao de expressao genica e restauracao de energia celular para reversao da idade biologica.',
    peptideIds: ['epithalon', 'ghk-cu', 'nad-plus', 'ss-31']
  },
  {
    id: 'cognitive',
    name: 'Cognitivo e Neuroprotetor',
    description: 'Peptideos nootropicos e neuroprotetores para melhora cognitiva, elevacao de BDNF, neurogenese e recuperacao de lesoes cerebrais.',
    peptideIds: ['semax', 'selank', 'dihexa', 'cerebrolysin']
  },
  {
    id: 'immune',
    name: 'Suporte Imunologico e Antimicrobiano',
    description: 'Peptideos timicos, catelicidinas e neuropeptideos para modulacao imune, controle de infeccoes e rompimento de biofilmes.',
    peptideIds: ['thymosin-alpha-1', 'll-37', 'vip']
  },
  {
    id: 'sexual-health',
    name: 'Saude Sexual e Hormonal',
    description: 'Agonistas de melanocortina e peptideos hipotalamicos para aumento de libido, funcao sexual e otimizacao de hormonios reprodutivos.',
    peptideIds: ['pt-141', 'kisspeptin']
  },
  {
    id: 'wellness',
    name: 'Bem-Estar e Dermatologia',
    description: 'Fotoprotecao, bronzeamento e peptideos gerais de bem-estar.',
    peptideIds: ['melanotan-1']
  }
];

// ─────────────────────────────────────────────
// GLOSSARIO
// ─────────────────────────────────────────────
export const peptideGlossaryPT = [
  { term: 'Aminoacido', definition: 'Moleculas organicas que servem como blocos de construcao de peptideos e proteinas. Existem 20 aminoacidos padrao.' },
  { term: 'Angiogenese', definition: 'Formacao de novos vasos sanguineos a partir de existentes. Critica para cicatrizacao de feridas e reparo tecidual.' },
  { term: 'Agua Bacteriostatica', definition: 'Agua esteril contendo 0,9% de alcool benzilico para inibir crescimento bacteriano. Usada para reconstituir peptideos liofilizados para injecao.' },
  { term: 'BDNF', definition: 'Fator Neurotrofico Derivado do Cerebro. Proteina que apoia sobrevivencia neuronal, crescimento e plasticidade sinaptica. Alvo principal de peptideos nootropicos.' },
  { term: 'Biodisponibilidade', definition: 'A proporcao de uma substancia que entra na circulacao e produz efeito ativo apos administracao.' },
  { term: 'Numero CAS', definition: 'Numero de registro do Chemical Abstracts Service — identificador numerico unico para substancias quimicas.' },
  { term: 'Catelicidina', definition: 'Familia de peptideos antimicrobianos encontrados em celulas imunes. LL-37 e a unica catelicidina humana.' },
  { term: 'Ciclagem', definition: 'Alternancia de periodos de uso (ligado) e descanso (desligado) para prevenir dessensibilizacao de receptores e manter eficacia.' },
  { term: 'Desnaturacao', definition: 'Perda da estrutura 3D de um peptideo devido a calor, agitacao ou exposicao quimica — destroi a atividade biologica.' },
  { term: 'Secretagogo de GH', definition: 'Substancia que estimula a hipofise a liberar hormonio de crescimento. Inclui analogos de GHRH e mimeticos de grelina.' },
  { term: 'GHRH', definition: 'Hormonio Liberador de Hormonio de Crescimento. Peptideo hipotalamico que estimula a liberacao de GH pela hipofise anterior.' },
  { term: 'Mimetico de Grelina', definition: 'Composto que mimetiza a grelina (hormonio da fome) para estimular liberacao de GH via receptor GHSR.' },
  { term: 'GLP-1', definition: 'Peptideo Semelhante ao Glucagon-1. Hormonio incretina que aumenta secrecao de insulina, suprime glucagon e retarda esvaziamento gastrico.' },
  { term: 'GIP', definition: 'Polipeptideo Insulinotropico Dependente de Glicose. Hormonio incretina que trabalha junto com GLP-1 na regulacao de glicose.' },
  { term: 'Meia-vida', definition: 'Tempo necessario para metade da dose administrada ser eliminada do corpo. Determina frequencia de dosagem.' },
  { term: 'Eixo HHG', definition: 'Eixo Hipotalamico-Hipofisario-Gonadal. Circuito de retroalimentacao hormonal que controla hormonios reprodutivos (testosterona, estrogeno).' },
  { term: 'IGF-1', definition: 'Fator de Crescimento Semelhante a Insulina 1. Hormonio produzido principalmente pelo figado em resposta ao GH. Media muitos dos efeitos anabolicos do GH.' },
  { term: 'Intramuscular (IM)', definition: 'Injecao diretamente no tecido muscular. Usada para alguns peptideos que requerem absorcao mais profunda.' },
  { term: 'Liofilizado', definition: 'Desidratado por congelamento. Peptideos sao vendidos como po liofilizado para estabilidade e devem ser reconstituidos com agua BAC antes do uso.' },
  { term: 'Melanocortina', definition: 'Familia de hormonios peptidicos que se ligam a receptores de melanocortina (MC1R-MC5R). Regulam pigmentacao, inflamacao, funcao sexual e apetite.' },
  { term: 'NF-kB', definition: 'Fator Nuclear kappa B. Regulador mestre da expressao genica inflamatoria.' },
  { term: 'Peptideo', definition: 'Cadeia curta de aminoacidos (tipicamente 2-50) ligados por ligacoes peptidicas. Menores que proteinas mas biologicamente ativos como moleculas sinalizadoras.' },
  { term: 'Reconstituicao', definition: 'Processo de dissolver peptideo liofilizado (desidratado por congelamento) em agua bacteriostatica para criar solucao injetavel.' },
  { term: 'Subcutaneo (SubQ)', definition: 'Injecao na camada de tecido adiposo logo abaixo da pele. Via mais comum para administracao de peptideos.' },
  { term: 'Telomerase', definition: 'Enzima que adiciona repeticoes de sequencia de DNA as extremidades dos telomeros, contrabalancando o encurtamento cromossomico que ocorre a cada divisao celular.' },
  { term: 'Telomero', definition: 'Capa protetora de DNA na extremidade dos cromossomos. Encurta a cada divisao celular — considerado biomarcador do envelhecimento biologico.' },
  { term: 'Titulacao', definition: 'Aumento gradual da dose ao longo do tempo para encontrar a dose minima eficaz minimizando efeitos colaterais.' }
];

// ─────────────────────────────────────────────
// FUNCOES AUXILIARES
// ─────────────────────────────────────────────
export const getProtocolByIdPT = (id) =>
  protocolDictionaryPT.find(p => p.id === id);

export const getProtocolsByCategoryPT = (category) =>
  protocolDictionaryPT.filter(p => p.category === category);

export const getCategoryByIdPT = (id) =>
  protocolCategoriesPT.find(c => c.id === id);

export const searchProtocolsPT = (query) => {
  const q = query.toLowerCase();
  return protocolDictionaryPT.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.class && p.class.toLowerCase().includes(q)) ||
    (p.mechanism && p.mechanism.toLowerCase().includes(q))
  );
};
