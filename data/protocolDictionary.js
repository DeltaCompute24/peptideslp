// Peptide Protocol Dictionary — E-Book Data
// Sources: PubMed, PMC, PeptidesInsider, BeWellLifestyleCenters, PeptideFox
// For educational and research purposes only

export const reconstitutionGuide = {
  title: 'Peptide Reconstitution & Administration Guide',

  supplies: [
    'Lyophilized peptide vial',
    'Bacteriostatic water (BAC water with 0.9% benzyl alcohol)',
    'U-100 insulin syringes (29-31G, ½ inch)',
    'Alcohol prep pads',
    'Sharps disposal container'
  ],

  steps: [
    { step: 1, action: 'Wash hands thoroughly and prepare a clean workspace.' },
    { step: 2, action: 'Remove flip-top caps from both the peptide vial and BAC water vial.' },
    { step: 3, action: 'Swab rubber stoppers on both vials with alcohol prep pads.' },
    { step: 4, action: 'Draw the desired volume of BAC water into a syringe (typically 1–2.5 mL).' },
    { step: 5, action: 'Insert needle into peptide vial at an angle, letting water run down the side of the vial — do NOT spray directly onto the powder.' },
    { step: 6, action: 'Gently swirl the vial until powder fully dissolves. NEVER shake — shaking denatures the peptide chains.' },
    { step: 7, action: 'Label the vial with: peptide name, concentration (mg/mL), reconstitution date.' },
    { step: 8, action: 'Refrigerate at 2–8°C (36–46°F). Use within 30 days.' }
  ],

  dosingFormula: {
    concentration: 'Peptide Amount (mcg) ÷ BAC Water Volume (mL) = Concentration (mcg/mL)',
    injectionVolume: 'Target Dose (mcg) ÷ Concentration (mcg/mL) = Volume to Inject (mL)',
    example: {
      peptideAmount: '5mg (5000 mcg)',
      bacWaterVolume: '2 mL',
      concentration: '2500 mcg/mL',
      targetDose: '500 mcg',
      volumeToInject: '0.2 mL (20 units on U-100 syringe)'
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
    'Lower abdomen — 4 quadrants, 2 inches from navel',
    'Outer thighs — mid-section, alternating legs',
    'Rotate sites systematically to prevent lipodystrophy'
  ],

  injectionTechnique: [
    'Clean injection site with alcohol pad, let dry completely.',
    'Pinch a small fold of skin.',
    'Insert needle at 45–90° angle into subcutaneous tissue.',
    'Inject slowly and steadily.',
    'Remove needle and apply gentle pressure if needed.'
  ],

  storage: {
    unreconstituted: 'Store at -20°C (freezer) for long-term or 2–8°C (fridge) for short-term.',
    reconstituted: 'Refrigerate at 2–8°C. Use within 30 days. Never freeze reconstituted peptides.',
    protection: 'Keep away from direct light. Store in original box or wrap in foil.',
    placement: 'Use main compartment of fridge — avoid door (temperature fluctuations).'
  }
};

export const protocolDictionary = [
  // ─────────────────────────────────────────────
  // WEIGHT MANAGEMENT & METABOLIC
  // ─────────────────────────────────────────────
  {
    id: 'semaglutide',
    name: 'Semaglutide',
    category: 'Weight Management',
    class: 'GLP-1 Receptor Agonist',
    casNumber: '910463-68-2',
    molecularFormula: 'C187H291N45O59',
    molecularWeight: '4113.58 g/mol',
    mechanism: 'Binds GLP-1 receptors to regulate appetite, slow gastric emptying, and enhance insulin secretion. Mimics the incretin hormone GLP-1.',
    protocol: {
      route: 'Subcutaneous injection',
      titration: [
        { weeks: '1–4', dose: '0.25 mg weekly' },
        { weeks: '5–8', dose: '0.5 mg weekly' },
        { weeks: '9–12', dose: '1.0 mg weekly' },
        { weeks: '13+', dose: '1.7–2.4 mg weekly' }
      ],
      timing: 'Same day each week, any time of day',
      cycleDuration: '12–16 weeks minimum, often ongoing',
      notes: 'Take with food if nausea occurs. Increase fiber and water for constipation.'
    },
    researchHighlights: [
      'FDA-approved for weight management (Wegovy) and T2DM (Ozempic)',
      'STEP trials: 15–20% average body weight reduction over 68 weeks',
      'Cardiovascular risk reduction demonstrated in SELECT trial',
      'Superior to liraglutide in head-to-head comparisons'
    ],
    contraindications: [
      'Personal/family history of medullary thyroid carcinoma',
      'Multiple Endocrine Neoplasia syndrome type 2 (MEN2)',
      'Pregnancy or breastfeeding',
      'Severe gastroparesis',
      'History of pancreatitis'
    ],
    sideEffects: ['Nausea', 'Diarrhea', 'Constipation', 'Injection site reactions', 'Fatigue'],
    evidenceLevel: 'Strong — FDA-approved, multiple Phase III RCTs'
  },

  {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    category: 'Weight Management',
    class: 'Dual GIP/GLP-1 Receptor Agonist',
    casNumber: '2023788-19-2',
    molecularFormula: 'C225H348N48O68',
    molecularWeight: '4813.50 g/mol',
    mechanism: 'Dual agonist activating both GIP and GLP-1 receptors for enhanced metabolic effects — improved insulin sensitivity, appetite suppression, and superior fat reduction vs single-receptor agonists.',
    protocol: {
      route: 'Subcutaneous injection',
      titration: [
        { weeks: '1–4', dose: '2.5 mg weekly' },
        { weeks: '5–8', dose: '5 mg weekly' },
        { weeks: '9–12', dose: '7.5 mg weekly' },
        { weeks: '13–16', dose: '10 mg weekly' },
        { weeks: '17+', dose: '12.5–15 mg weekly' }
      ],
      timing: 'Same day each week',
      cycleDuration: '12–20 weeks minimum',
      notes: 'Superior weight loss vs semaglutide in clinical trials. Slower titration reduces GI side effects.'
    },
    researchHighlights: [
      'SURMOUNT trial: 20–25% average body weight reduction',
      'Dual mechanism provides superior efficacy over GLP-1-only agents',
      'Significant improvements in glycemic control',
      'Improved cardiovascular markers and lipid profiles'
    ],
    contraindications: [
      'Personal/family history of medullary thyroid carcinoma',
      'MEN2 syndrome',
      'Pregnancy or breastfeeding',
      'History of pancreatitis'
    ],
    sideEffects: ['Nausea', 'Diarrhea', 'Decreased appetite', 'Vomiting', 'Constipation'],
    evidenceLevel: 'Strong — FDA-approved, Phase III RCTs'
  },

  {
    id: 'aod-9604',
    name: 'AOD-9604',
    category: 'Weight Management',
    class: 'Growth Hormone Fragment',
    casNumber: '221231-10-3',
    molecularFormula: 'C78H123N23O23S2',
    molecularWeight: '1815.12 g/mol',
    mechanism: 'Modified fragment (amino acids 177–191) of human growth hormone. Targets fat metabolism specifically without affecting blood sugar, growth, or IGF-1 levels.',
    protocol: {
      route: 'Subcutaneous injection',
      dose: '250–500 mcg daily',
      timing: 'Morning on empty stomach (fasted)',
      cycleDuration: '12–16 weeks',
      notes: 'No effect on IGF-1 or insulin. Can be combined with other fat-loss peptides.'
    },
    researchHighlights: [
      'Targets fat metabolism without anabolic/growth effects',
      'Does not affect blood glucose or insulin levels',
      'Shows cartilage repair potential in preclinical studies',
      'GRAS status for food use in some jurisdictions'
    ],
    contraindications: ['Pregnancy or breastfeeding', 'Active cancer'],
    sideEffects: ['Mild injection site irritation', 'Headache (rare)'],
    evidenceLevel: 'Moderate — preclinical strong, limited human RCTs'
  },

  {
    id: 'mots-c',
    name: 'MOTS-C',
    category: 'Weight Management',
    class: 'Mitochondrial-Derived Peptide',
    casNumber: '1627580-64-6',
    molecularFormula: 'C121H200N42O32S2',
    molecularWeight: '2174.52 g/mol',
    mechanism: 'Mitochondrial-derived peptide that activates AMPK pathway, enhancing fatty acid oxidation, glucose uptake, and metabolic homeostasis. Acts as an exercise mimetic.',
    protocol: {
      route: 'Subcutaneous or intramuscular injection',
      dose: '5–10 mg, 3x weekly',
      timing: 'Morning or pre-workout',
      cycleDuration: '4–8 weeks',
      notes: 'Often called an "exercise mimetic." May enhance physical performance alongside metabolic benefits.'
    },
    researchHighlights: [
      'Encoded in mitochondrial DNA — endogenous peptide',
      'Activates AMPK signaling pathway',
      'Improves insulin sensitivity in preclinical models',
      'Levels decline with age — correlates with metabolic decline'
    ],
    contraindications: ['Pregnancy or breastfeeding', 'Active cancer'],
    sideEffects: ['Injection site redness', 'Mild fatigue initially'],
    evidenceLevel: 'Emerging — preclinical data strong, human trials limited'
  },

  {
    id: 'tesofensine',
    name: 'Tesofensine',
    category: 'Weight Management',
    class: 'Triple Reuptake Inhibitor',
    casNumber: '195875-84-4',
    mechanism: 'Triple monoamine reuptake inhibitor (serotonin, dopamine, norepinephrine) that suppresses appetite and increases metabolic rate via central nervous system modulation.',
    protocol: {
      route: 'Oral',
      startingDose: '0.25 mg daily',
      therapeuticDose: '0.5–1 mg daily',
      cycleDuration: '12–16 weeks, then break',
      notes: 'Monitor blood pressure and mood closely. Not a peptide per se, but commonly included in peptide therapy protocols.'
    },
    researchHighlights: [
      'Phase II trials showed ~10% body weight loss at 0.5mg',
      'Greater efficacy than most single-mechanism weight loss drugs',
      'Appetite suppression + metabolism increase dual action'
    ],
    contraindications: [
      'Uncontrolled hypertension',
      'History of cardiovascular events',
      'MAOI use',
      'Anxiety disorders (may exacerbate)'
    ],
    sideEffects: ['Dry mouth', 'Insomnia', 'Elevated heart rate', 'Mood changes', 'Constipation'],
    evidenceLevel: 'Moderate — Phase II complete, Phase III ongoing'
  },

  // ─────────────────────────────────────────────
  // RECOVERY & HEALING
  // ─────────────────────────────────────────────
  {
    id: 'bpc-157',
    name: 'BPC-157 (Body Protection Compound)',
    category: 'Recovery & Healing',
    class: 'Gastric Pentadecapeptide',
    casNumber: '137525-51-0',
    molecularFormula: 'C62H98N16O22',
    molecularWeight: '1419.56 g/mol',
    mechanism: 'Naturally derived from gastric juice. Promotes angiogenesis, upregulates growth factor receptors, modulates nitric oxide system, and accelerates tissue healing across multiple organ systems.',
    protocol: {
      route: 'Subcutaneous injection or oral',
      dose: '250–500 mcg daily (split AM/PM if desired)',
      reconstitution: '10mg vial + 3 mL BAC water = 3.33 mg/mL',
      frequency: '1–2x daily',
      cycleDuration: '4–8 weeks (acute) or 12+ weeks (chronic)',
      cyclePattern: '6–8 weeks on, 2–4 weeks off',
      notes: 'Inject near injury site for local effect, or abdomen for systemic. Oral form available for gut-specific healing.'
    },
    researchHighlights: [
      'Systemic healing peptide — works on tendons, ligaments, muscles, gut, nerves',
      'Promotes angiogenesis and blood vessel formation',
      'Anti-inflammatory via multiple pathways',
      'Gastric origin — stable in gastric acid (oral bioavailability)',
      'Preclinical: accelerated healing in 100+ studies across tissue types'
    ],
    contraindications: ['Pregnancy or breastfeeding', 'Active cancer (theoretical — promotes angiogenesis)'],
    sideEffects: ['Minimal reported side effects', 'Mild injection site irritation', 'Rare: dizziness, nausea'],
    evidenceLevel: 'Moderate — extensive preclinical data, limited human RCTs (1 human case series for knee pain)'
  },

  {
    id: 'tb-500',
    name: 'TB-500 (Thymosin Beta-4 Fragment)',
    category: 'Recovery & Healing',
    class: 'Thymosin Peptide',
    casNumber: '77591-33-4',
    molecularFormula: 'C212H350N56O78S',
    molecularWeight: '4963.44 g/mol',
    mechanism: 'Derivative of Thymosin Beta-4. Promotes cell migration, blood vessel formation, and collagen deposition. Upregulates actin for cellular repair and reduces inflammation systemically.',
    protocol: {
      route: 'Subcutaneous injection',
      loadingPhase: '2–5 mg/week split into 2 injections (Mon/Thu) for 4–6 weeks',
      maintenancePhase: '2 mg once weekly',
      reconstitution: '10mg vial + 3 mL BAC water = 3.33 mg/mL',
      cycleDuration: '8–12 weeks total',
      notes: 'Systemic peptide — does not need to be injected near injury site. Best combined with BPC-157 for synergistic healing.'
    },
    researchHighlights: [
      'Promotes angiogenesis and cell migration',
      'Reduces inflammation and fibrosis',
      'Cardiovascular protection in preclinical models',
      'Synergistic with BPC-157 for accelerated recovery'
    ],
    contraindications: ['Active cancer', 'Pregnancy or breastfeeding', 'Banned in competitive sports (WADA)'],
    sideEffects: ['Injection site redness', 'Mild headache', 'Lethargy (temporary)'],
    evidenceLevel: 'Moderate — preclinical strong, human orthopedic data lacking'
  },

  {
    id: 'kpv',
    name: 'KPV',
    category: 'Recovery & Healing',
    class: 'Anti-Inflammatory Tripeptide',
    casNumber: '867021-83-8',
    molecularFormula: 'C18H34N6O5',
    molecularWeight: '414.50 g/mol',
    mechanism: 'C-terminal tripeptide fragment of alpha-MSH. Potent anti-inflammatory that inhibits NF-κB pathway and modulates inflammatory cytokines. Crosses the blood-brain barrier.',
    protocol: {
      route: 'Oral (gut) or subcutaneous (systemic)',
      oralDose: '200–500 mcg, 1–3x daily',
      subqDose: '200–500 mcg daily',
      cycleDuration: '4–8 weeks',
      notes: 'Oral for gut inflammation (IBD, SIBO). SubQ for systemic anti-inflammatory effects.'
    },
    researchHighlights: [
      'Potent NF-κB pathway inhibitor',
      'Preclinical efficacy in colitis models',
      'Antimicrobial properties',
      'Crosses blood-brain barrier — potential neuroinflammation benefits'
    ],
    contraindications: ['Pregnancy or breastfeeding'],
    sideEffects: ['Minimal reported side effects'],
    evidenceLevel: 'Emerging — preclinical data, no human RCTs'
  },

  // ─────────────────────────────────────────────
  // COMBINED HEALING PROTOCOLS
  // ─────────────────────────────────────────────
  {
    id: 'wolverine-protocol',
    name: 'Wolverine Protocol (Advanced Healing Stack)',
    category: 'Recovery & Healing',
    class: 'Multi-Peptide Stack',
    mechanism: 'Synergistic combination targeting local repair (BPC-157), systemic healing (TB-500), collagen/skin (GHK-Cu), immune support (Thymosin Alpha-1), and growth hormone optimization (CJC/Ipamorelin).',
    protocol: {
      components: [
        { peptide: 'BPC-157', dose: '500 mcg daily', timing: 'Morning' },
        { peptide: 'TB-500', dose: '2.5 mg 2x/week (Mon & Thu)', timing: 'Morning' },
        { peptide: 'GHK-Cu', dose: '2 mg daily', timing: 'Morning' },
        { peptide: 'Thymosin Alpha-1', dose: '1.6 mg 2x/week', timing: 'Variable' },
        { peptide: 'CJC-1295/Ipamorelin', dose: '200/200 mcg nightly', timing: 'Bedtime (fasted)' }
      ],
      cycleDuration: '6–8 weeks on, 4-week minimum break',
      notes: 'Requires multiple daily injections. Blood work monitoring recommended before, during, and after cycle.'
    },
    evidenceLevel: 'Anecdotal — based on combining individually-studied peptides'
  },

  {
    id: 'bpc157-tb500-combo',
    name: 'BPC-157 + TB-500 Recovery Stack',
    category: 'Recovery & Healing',
    class: 'Dual Peptide Stack',
    mechanism: 'BPC-157 provides local tissue repair and gut healing while TB-500 promotes systemic cell migration and angiogenesis. Together they address both local and systemic healing pathways.',
    protocol: {
      optionA: {
        label: 'Standard (Daily + 2x/week)',
        bpc157: '250–500 mcg daily',
        tb500: '2.5 mg 2x/week (Mon/Thu)',
        duration: '6–8 weeks'
      },
      optionB: {
        label: 'Simplified (Alternating)',
        monday: 'BPC-157 — 0.35 mL',
        thursday: 'TB-500 — 0.35 mL',
        duration: '6–8 weeks'
      },
      expectedTimeline: [
        { weeks: '1–2', effect: 'Anti-inflammatory effects begin' },
        { weeks: '3–4', effect: 'Active tissue healing' },
        { weeks: '5–6', effect: 'Significant recovery progress' },
        { weeks: '7–8', effect: 'Healing consolidation and completion' }
      ]
    },
    evidenceLevel: 'Anecdotal — widely used clinical combination'
  },

  // ─────────────────────────────────────────────
  // GROWTH HORMONE RELEASING
  // ─────────────────────────────────────────────
  {
    id: 'cjc-1295',
    name: 'CJC-1295',
    category: 'Growth Hormone',
    class: 'GHRH Analog',
    casNumber: '863288-34-0',
    molecularFormula: 'C165H269N47O46',
    molecularWeight: '3649.30 g/mol',
    mechanism: 'Growth hormone-releasing hormone (GHRH) analog that extends the duration of GH pulses without increasing pulse amplitude. Stimulates pituitary to release GH naturally.',
    protocol: {
      withoutDAC: {
        route: 'Subcutaneous injection',
        dose: '100–300 mcg per injection',
        frequency: '1–3x daily',
        timing: 'Empty stomach, best before bedtime',
        notes: 'Short-acting. Almost always combined with Ipamorelin for synergy.'
      },
      withDAC: {
        route: 'Subcutaneous injection',
        dose: '1–2 mg weekly',
        frequency: '1–2x weekly',
        notes: 'Drug Affinity Complex extends half-life. Provides sustained GH elevation.'
      },
      cycleDuration: '3–6 months for optimal results'
    },
    researchHighlights: [
      'GHRH analog — extends natural GH pulse duration',
      'Synergistic with ghrelin mimetics (Ipamorelin, GHRP-6)',
      'Does not desensitize GH axis at recommended doses',
      'Improves sleep architecture, recovery, and body composition'
    ],
    contraindications: ['Active cancer', 'Pregnancy', 'Pituitary disorders'],
    sideEffects: ['Flushing', 'Headache', 'Injection site irritation', 'Water retention'],
    evidenceLevel: 'Moderate — clinical studies exist, not FDA-approved for this use'
  },

  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    category: 'Growth Hormone',
    class: 'Selective Ghrelin Mimetic (GHSR Agonist)',
    casNumber: '170851-70-4',
    molecularFormula: 'C38H49N9O5',
    molecularWeight: '711.86 g/mol',
    mechanism: 'Selective growth hormone secretagogue that stimulates GH release via ghrelin receptors WITHOUT elevating cortisol or prolactin — the cleanest GH secretagogue available.',
    protocol: {
      route: 'Subcutaneous injection',
      dose: '200–300 mcg per injection',
      frequency: '2–3x daily (morning, post-workout, bedtime)',
      timing: 'Empty stomach (2+ hours fasted, 30 min before food)',
      cycleDuration: '8–12 weeks on, 8 weeks off',
      notes: 'Best combined with CJC-1295 for amplified GH release. Most selective GHSR agonist.'
    },
    researchHighlights: [
      'Most selective GH secretagogue — no cortisol/prolactin increase',
      'Dose-dependent GH release',
      'Improves bone mineral density in studies',
      'Synergistic with GHRH analogs (CJC-1295)'
    ],
    contraindications: ['Active cancer', 'Pregnancy', 'Pituitary tumors'],
    sideEffects: ['Mild hunger increase', 'Injection site redness', 'Rare: headache, dizziness'],
    evidenceLevel: 'Moderate — clinical studies, not FDA-approved'
  },

  {
    id: 'sermorelin',
    name: 'Sermorelin',
    category: 'Growth Hormone',
    class: 'GHRH Analog (29 amino acids)',
    casNumber: '86168-78-7',
    molecularFormula: 'C149H246N44O42S',
    molecularWeight: '3357.96 g/mol',
    mechanism: 'Bioidentical GHRH fragment (first 29 amino acids). Stimulates pituitary to produce and release growth hormone following the body\'s natural pulsatile rhythm.',
    protocol: {
      route: 'Subcutaneous injection',
      dose: '200–500 mcg before bed',
      frequency: 'Daily',
      timing: 'Before bed on empty stomach — aligns with natural GH surge',
      cycleDuration: '3–6 months minimum',
      notes: 'Was FDA-approved for pediatric GH deficiency testing. Works with the body\'s natural GH rhythm.'
    },
    researchHighlights: [
      'Bioidentical to endogenous GHRH(1-29)',
      'Previously FDA-approved (Geref) for GH deficiency diagnosis',
      'Restores youthful GH pulsatility pattern',
      'Extensive safety data from clinical use history'
    ],
    contraindications: ['Active cancer', 'Pregnancy'],
    sideEffects: ['Injection site irritation', 'Flushing', 'Headache', 'Dizziness'],
    evidenceLevel: 'Strong — previously FDA-approved, clinical use history'
  },

  {
    id: 'tesamorelin',
    name: 'Tesamorelin',
    category: 'Growth Hormone',
    class: 'GHRH Analog (44 amino acids + trans-3-hexenoic acid)',
    casNumber: '218949-48-5',
    mechanism: 'Synthetic GHRH analog with enhanced stability. FDA-approved for reducing excess abdominal fat in HIV-associated lipodystrophy. Potent stimulator of endogenous GH production.',
    protocol: {
      route: 'Subcutaneous injection',
      fdaApproved: '2 mg once daily',
      wellnessProtocol: [
        { week: '1', dose: '1.5 mg', frequency: '5x/week (Mon–Fri)' },
        { weeks: '2–5', dose: '1.75 mg', frequency: '5x/week' },
        { weeks: '6–10', dose: '2 mg', frequency: '5x/week' }
      ],
      timing: 'Evening, empty stomach',
      notes: 'FDA-approved — strongest regulatory evidence of any GH secretagogue.'
    },
    researchHighlights: [
      'FDA-approved for lipodystrophy (Egrifta)',
      'Reduces visceral adipose tissue specifically',
      'Improves body composition without supraphysiologic GH',
      'Does not impair glucose metabolism in most patients'
    ],
    contraindications: ['Active cancer', 'Pregnancy', 'Pituitary pathology', 'History of hypersensitivity'],
    sideEffects: ['Injection site reactions', 'Joint pain', 'Peripheral edema', 'Muscle pain'],
    evidenceLevel: 'Strong — FDA-approved'
  },

  {
    id: 'mk-677',
    name: 'MK-677 (Ibutamoren)',
    category: 'Growth Hormone',
    class: 'Non-Peptide Ghrelin Mimetic',
    casNumber: '159752-10-0',
    mechanism: 'Oral ghrelin receptor agonist that stimulates GH secretion. Not a true peptide but commonly used in peptide therapy protocols for its convenient oral dosing.',
    protocol: {
      route: 'Oral',
      dose: '10–25 mg daily',
      timing: 'Evening (may cause drowsiness)',
      cycleDuration: 'Can be used long-term (studies up to 2 years)',
      notes: 'May significantly increase appetite. Monitor blood glucose — can elevate fasting glucose.'
    },
    researchHighlights: [
      'Oral bioavailability — no injections needed',
      'Sustained IGF-1 elevation for 24+ hours',
      'Improved sleep quality in clinical studies',
      'Increased bone mineral density over 12 months'
    ],
    contraindications: ['Diabetes (uncontrolled)', 'Active cancer', 'Pregnancy'],
    sideEffects: ['Increased appetite', 'Water retention', 'Elevated fasting glucose', 'Drowsiness', 'Numbness/tingling'],
    evidenceLevel: 'Moderate — Phase II clinical data, not FDA-approved'
  },

  // ─────────────────────────────────────────────
  // ANTI-AGING & LONGEVITY
  // ─────────────────────────────────────────────
  {
    id: 'epithalon',
    name: 'Epithalon (Epitalon)',
    category: 'Anti-Aging & Longevity',
    class: 'Tetrapeptide (Pineal-Derived)',
    casNumber: '307297-39-8',
    molecularFormula: 'C14H22N4O9',
    molecularWeight: '390.35 g/mol',
    mechanism: 'Synthetic version of Epithalamin (pineal gland extract). Activates telomerase enzyme to elongate telomeres — the protective caps on chromosomes that shorten with age. Also regulates melatonin production.',
    protocol: {
      route: 'Subcutaneous or intramuscular injection',
      standardProtocol: '10 mg daily for 10 days',
      alternativeProtocol: '5 mg daily for 20 days',
      advancedProtocol: '10 mg daily for 20 days',
      frequency: '2–3 cycles per year',
      timing: 'Variable — some prefer before bed for melatonin synergy',
      notes: 'Cycled protocol — short intensive bursts rather than continuous use.'
    },
    researchHighlights: [
      'Activates telomerase in human somatic cells (Khavinson et al.)',
      'Extended lifespan in animal models by 10–15%',
      'Regulates melatonin and circadian rhythm',
      'Immune system modulation — restored T-cell function in elderly subjects',
      'Studied extensively by Dr. Vladimir Khavinson over 35+ years'
    ],
    contraindications: ['Active cancer (theoretical — telomerase activation)', 'Pregnancy'],
    sideEffects: ['Minimal reported', 'Possible sleep pattern changes initially'],
    evidenceLevel: 'Moderate — Russian clinical studies, limited Western RCTs'
  },

  {
    id: 'ghk-cu',
    name: 'GHK-Cu (Copper Peptide)',
    category: 'Anti-Aging & Longevity',
    class: 'Copper-Binding Tripeptide',
    casNumber: '49557-75-7',
    molecularFormula: 'C14H22CuN6O4',
    molecularWeight: '401.91 g/mol',
    mechanism: 'Naturally occurring tripeptide that binds copper ions. Resets gene expression to a healthier state, upregulating repair genes and downregulating inflammatory genes. Stimulates collagen, elastin, and glycosaminoglycan synthesis.',
    protocol: {
      injectable: {
        dose: '1–2 mg daily',
        route: 'Subcutaneous injection',
        cycleDuration: '4–8 weeks'
      },
      topical: {
        dose: '2–4% cream or serum',
        frequency: '1–2x daily',
        duration: 'Can be used continuously'
      },
      notes: 'Blue coloring is normal (copper). Injectable for systemic benefits; topical for skin-specific. Levels drop to ~40% by age 60.'
    },
    researchHighlights: [
      'Remodels gene expression of 4,000+ genes toward a younger profile',
      'Stimulates collagen I, III, and elastin production',
      'Anti-inflammatory and antioxidant properties',
      'Promotes wound healing and hair follicle growth',
      'Endogenous levels decline significantly with age'
    ],
    contraindications: ['Copper allergy', 'Wilson\'s disease', 'Pregnancy'],
    sideEffects: ['Blue discoloration at injection site (temporary)', 'Mild stinging (topical)'],
    evidenceLevel: 'Moderate — extensive in vitro/preclinical, some human studies (primarily topical)'
  },

  {
    id: 'nad-plus',
    name: 'NAD+ (Nicotinamide Adenine Dinucleotide)',
    category: 'Anti-Aging & Longevity',
    class: 'Coenzyme',
    casNumber: '53-84-9',
    molecularFormula: 'C21H27N7O14P2',
    molecularWeight: '663.43 g/mol',
    mechanism: 'Essential coenzyme present in all living cells. Powers cellular energy production (ATP synthesis), activates sirtuins (longevity genes), enables DNA repair enzymes (PARPs), and regulates circadian rhythm. Levels decline ~50% between ages 40–60.',
    protocol: {
      iv: {
        dose: '250–500 mg per infusion',
        frequency: '1–2x weekly for loading, then monthly maintenance',
        duration: '2–4 hour infusion'
      },
      subcutaneous: {
        dose: '50–100 mg daily',
        frequency: '2–3x weekly'
      },
      cycleDuration: 'Ongoing maintenance therapy',
      notes: 'IV infusions can cause chest tightness, cramping, and nausea — slow infusion rate if symptoms occur. SubQ is more convenient but smaller doses.'
    },
    researchHighlights: [
      'Central to cellular energy metabolism (600+ enzymatic reactions)',
      'Activates all 7 sirtuin longevity proteins',
      'Required for DNA repair via PARP enzymes',
      'Declines ~50% between ages 40–60',
      'Preclinical: restored mitochondrial function in aged mice'
    ],
    contraindications: ['Active cancer (supplies energy to rapidly dividing cells)', 'Pregnancy'],
    sideEffects: ['Chest tightness (IV)', 'Nausea (IV)', 'Cramping', 'Flushing'],
    evidenceLevel: 'Moderate — strong mechanistic data, human trials ongoing'
  },

  // ─────────────────────────────────────────────
  // COGNITIVE & NEUROPROTECTIVE
  // ─────────────────────────────────────────────
  {
    id: 'semax',
    name: 'Semax',
    category: 'Cognitive & Neuroprotective',
    class: 'Synthetic ACTH(4-10) Analog',
    casNumber: '80714-61-0',
    mechanism: 'Synthetic heptapeptide analog of ACTH(4-10). Enhances BDNF expression, modulates serotonin/dopamine systems, and provides neuroprotection. Developed by the Institute of Molecular Genetics (Russian Academy of Sciences).',
    protocol: {
      intranasal: {
        standard: '200–600 mcg daily, 1–3x',
        highDose: '500–1000 mcg, 1–2x daily (1% solution)',
        optimal: '750–1000 mcg once daily fasted AM'
      },
      subcutaneous: {
        dose: '250–500 mcg daily'
      },
      timing: 'Morning preferred for cognitive effects',
      notes: 'Intranasal is most common route. Available in 0.1% and 1% solutions. No known dependency or withdrawal.'
    },
    researchHighlights: [
      'Increases BDNF (brain-derived neurotrophic factor)',
      'Approved in Russia for stroke recovery and cognitive disorders',
      'Neuroprotective against oxidative stress',
      'Modulates dopamine and serotonin neurotransmission',
      'No reported addiction or withdrawal effects'
    ],
    contraindications: ['Pregnancy', 'Acute psychosis', 'History of seizures (caution)'],
    sideEffects: ['Nasal irritation', 'Rare: headache, dizziness'],
    evidenceLevel: 'Moderate — approved in Russia, limited Western RCTs'
  },

  {
    id: 'selank',
    name: 'Selank',
    category: 'Cognitive & Neuroprotective',
    class: 'Synthetic Tuftsin Analog',
    casNumber: '129954-34-3',
    mechanism: 'Synthetic analog of the immunomodulatory peptide tuftsin with added Pro-Gly-Pro sequence. Anxiolytic, nootropic, and immunomodulatory — modulates GABA, serotonin, and enkephalin systems.',
    protocol: {
      intranasal: {
        dose: '75–200 mcg per nostril, 1–3x daily'
      },
      subcutaneous: {
        dose: '250–500 mcg daily'
      },
      duration: 'Can be used long-term (no dependency reported)',
      timing: 'Morning and/or evening',
      notes: 'Anxiolytic without sedation or cognitive impairment. Often combined with Semax.'
    },
    researchHighlights: [
      'Approved in Russia for generalized anxiety',
      'Anxiolytic without benzodiazepine-like side effects',
      'Immunomodulatory — enhances IL-6 and influences T-helper cell balance',
      'Modulates GABA-ergic system',
      'No dependency, tolerance, or withdrawal reported'
    ],
    contraindications: ['Pregnancy'],
    sideEffects: ['Mild nasal irritation', 'Rare: fatigue'],
    evidenceLevel: 'Moderate — approved in Russia, limited Western data'
  },

  {
    id: 'dihexa',
    name: 'Dihexa',
    category: 'Cognitive & Neuroprotective',
    class: 'Angiotensin IV Analog',
    casNumber: '1401708-83-5',
    mechanism: 'Angiotensin IV receptor agonist that is 10 million times more potent than BDNF at promoting synaptic connectivity. Stimulates hepatocyte growth factor (HGF) / c-Met pathway for neurogenesis.',
    protocol: {
      oral: { dose: '10–20 mg daily' },
      transdermal: { dose: '20–40 mg daily' },
      cycleDuration: '4–8 weeks',
      notes: 'Extremely potent — start at lowest dose. Limited human safety data. Research compound.'
    },
    researchHighlights: [
      '10^7 times more potent than BDNF in promoting synaptic connections',
      'Reversed cognitive deficits in Alzheimer\'s-model animals',
      'Stimulates HGF/c-Met for neurogenesis',
      'Developed at Washington State University'
    ],
    contraindications: ['Pregnancy', 'Active cancer (HGF pathway)', 'Liver disease'],
    sideEffects: ['Limited data — increased blood pressure possible', 'Headache'],
    evidenceLevel: 'Emerging — preclinical only, no human trials'
  },

  {
    id: 'cerebrolysin',
    name: 'Cerebrolysin',
    category: 'Cognitive & Neuroprotective',
    class: 'Porcine Brain-Derived Peptide Mixture',
    mechanism: 'Low-molecular-weight peptide mixture derived from porcine brain tissue. Contains neurotrophic factors that mimic BDNF, GDNF, NGF, and CNTF. Promotes neuroplasticity and neuroprotection.',
    protocol: {
      cognitiveEnhancement: { dose: '5–10 mL', frequency: '5 days/week × 4 weeks' },
      neurodegenerative: { dose: '10–30 mL', frequency: '5 days/week × 4 weeks' },
      route: 'Subcutaneous or intramuscular',
      notes: 'Approved in 40+ countries for stroke, TBI, and Alzheimer\'s. Not FDA-approved.'
    },
    researchHighlights: [
      'Approved in 40+ countries for neurological conditions',
      'Multiple RCTs in stroke and Alzheimer\'s',
      'Neurotrophic and neuroprotective actions',
      'Promotes neuroplasticity and synaptic remodeling'
    ],
    contraindications: ['Epilepsy', 'Severe renal impairment', 'Pregnancy'],
    sideEffects: ['Dizziness', 'Headache', 'Injection site pain', 'Rare: agitation'],
    evidenceLevel: 'Moderate — approved in many countries, mixed Western RCT reviews'
  },

  // ─────────────────────────────────────────────
  // IMMUNE & ANTIMICROBIAL
  // ─────────────────────────────────────────────
  {
    id: 'thymosin-alpha-1',
    name: 'Thymosin Alpha-1',
    category: 'Immune Support',
    class: 'Thymic Peptide',
    casNumber: '62304-98-7',
    mechanism: 'Naturally produced by the thymus gland. Enhances T-cell maturation, dendritic cell function, and antibody responses. Modulates both innate and adaptive immunity.',
    protocol: {
      route: 'Subcutaneous injection',
      standardDose: '1.6 mg twice weekly',
      acuteDose: '1.6 mg daily for acute conditions',
      cycleDuration: '6–12 months as needed',
      notes: 'FDA-approved as orphan drug (Zadaxin). Thymus output declines with age — supplementation restores immune function.'
    },
    researchHighlights: [
      'FDA orphan drug approval for hepatitis B',
      'Approved in 35+ countries for immune modulation',
      'Used as cancer immunotherapy adjuvant',
      'Enhances vaccine efficacy in elderly and immunocompromised',
      'Clinical use in hepatitis, HIV, and chronic infections'
    ],
    contraindications: ['Organ transplant recipients (may promote rejection)', 'Pregnancy'],
    sideEffects: ['Minimal — injection site irritation', 'Rare: mild flu-like symptoms'],
    evidenceLevel: 'Strong — FDA orphan drug, approved internationally, multiple RCTs'
  },

  {
    id: 'll-37',
    name: 'LL-37',
    category: 'Immune Support',
    class: 'Cathelicidin Antimicrobial Peptide',
    casNumber: '154947-66-7',
    mechanism: 'Human cathelicidin — an endogenous antimicrobial peptide. Directly kills bacteria, fungi, and viruses by disrupting microbial membranes. Also modulates immune response and disrupts biofilms.',
    protocol: {
      generalSupport: { dose: '100–200 mcg daily', duration: '2–4 weeks' },
      activeInfection: { dose: '500 mcg 2x daily', duration: '2–4 weeks until resolved' },
      route: 'Subcutaneous or topical',
      notes: 'Particularly useful for biofilm-associated infections and SIBO.'
    },
    researchHighlights: [
      'Broad-spectrum antimicrobial — bacteria, fungi, viruses',
      'Disrupts biofilms (relevant for chronic infections)',
      'Modulates inflammation — prevents septic shock in models',
      'Endogenous — produced by immune cells, epithelia, and keratinocytes'
    ],
    contraindications: ['Pregnancy', 'Autoimmune conditions (may stimulate immune response)'],
    sideEffects: ['Injection site irritation', 'Possible immune stimulation'],
    evidenceLevel: 'Emerging — strong mechanistic data, limited clinical trials'
  },

  // ─────────────────────────────────────────────
  // SEXUAL HEALTH
  // ─────────────────────────────────────────────
  {
    id: 'pt-141',
    name: 'PT-141 (Bremelanotide)',
    category: 'Sexual Health',
    class: 'Melanocortin Receptor Agonist',
    casNumber: '189691-06-3',
    molecularFormula: 'C50H68N14O10',
    molecularWeight: '1025.18 g/mol',
    mechanism: 'Activates melanocortin receptors (MC3R/MC4R) in the central nervous system to enhance sexual desire and arousal. Works on the brain — not vascular like PDE5 inhibitors.',
    protocol: {
      route: 'Subcutaneous injection',
      startingDose: '0.5–1 mg',
      standardDose: '1.75–2 mg',
      timing: '45–60 minutes before activity',
      maxFrequency: '8 doses per month, max 1 dose per 24 hours',
      notes: 'FDA-approved (Vyleesi) for premenopausal HSDD. Works in both men and women. Nausea is common initially.'
    },
    researchHighlights: [
      'FDA-approved for hypoactive sexual desire disorder (HSDD) in premenopausal women',
      'Works via CNS — not vascular mechanism',
      'Effective in both men and women',
      'Effects last 6–12 hours',
      'Does not affect blood pressure like PDE5 inhibitors'
    ],
    contraindications: [
      'Uncontrolled hypertension',
      'Known cardiovascular disease',
      'Pregnancy or breastfeeding'
    ],
    sideEffects: ['Nausea (most common — 40%)', 'Flushing', 'Headache', 'Transient skin darkening'],
    evidenceLevel: 'Strong — FDA-approved'
  },

  {
    id: 'kisspeptin',
    name: 'Kisspeptin',
    category: 'Sexual Health',
    class: 'Hypothalamic Neuropeptide',
    casNumber: '374675-21-5',
    mechanism: 'Master regulator of the hypothalamic-pituitary-gonadal (HPG) axis. Stimulates GnRH neurons to release gonadotropins (LH, FSH), naturally boosting testosterone and other sex hormones.',
    protocol: {
      route: 'Subcutaneous or IV',
      subcutaneous: '100–200 mcg, 2–3x weekly',
      ivBolus: '0.3–1.0 nmol/kg (diagnostic use)',
      cycleDuration: '4–8 weeks',
      notes: 'Natural approach to boosting testosterone without shutting down HPG axis.'
    },
    researchHighlights: [
      'Master regulator of reproductive hormone axis',
      'Does not suppress endogenous hormone production',
      'Studied for infertility treatment in both sexes',
      'Enhances LH pulsatility'
    ],
    contraindications: ['Hormone-sensitive cancers', 'Pregnancy'],
    sideEffects: ['Headache', 'Hot flashes', 'Nausea'],
    evidenceLevel: 'Emerging — human studies in reproductive medicine'
  },

  // ─────────────────────────────────────────────
  // ADDITIONAL PEPTIDES
  // ─────────────────────────────────────────────
  {
    id: 'ss-31',
    name: 'SS-31 (Elamipretide)',
    category: 'Anti-Aging & Longevity',
    class: 'Mitochondria-Targeted Peptide',
    casNumber: '736992-21-5',
    mechanism: 'Targets and binds to cardiolipin on the inner mitochondrial membrane. Stabilizes cristae structure, optimizes electron transport chain, and reduces mitochondrial reactive oxygen species (ROS).',
    protocol: {
      route: 'Subcutaneous injection',
      dose: '4–10 mg daily',
      frequency: 'Once daily',
      cycleDuration: '4–8 weeks',
      notes: 'Research compound. Being studied for Barth syndrome, heart failure, and age-related mitochondrial decline.'
    },
    researchHighlights: [
      'Directly targets inner mitochondrial membrane',
      'Reduces mitochondrial ROS by stabilizing cardiolipin',
      'Phase II/III trials for Barth syndrome and heart failure',
      'Improved exercise tolerance in clinical studies'
    ],
    contraindications: ['Pregnancy', 'Severe renal impairment'],
    sideEffects: ['Injection site reactions', 'Headache'],
    evidenceLevel: 'Moderate — Phase II/III clinical trials (Stealth BioTherapeutics)'
  },

  {
    id: 'vip',
    name: 'VIP (Vasoactive Intestinal Peptide)',
    category: 'Immune Support',
    class: 'Neuropeptide',
    casNumber: '40077-57-4',
    mechanism: 'Endogenous neuropeptide with potent anti-inflammatory, immunomodulatory, and vasodilatory properties. Regulates circadian rhythm, gut motility, and reduces inflammatory cytokines.',
    protocol: {
      intranasal: {
        dose: '1 spray each nostril, 4x daily (50 mcg/spray = 400 mcg/day)',
        primary: true
      },
      subcutaneous: {
        dose: '50–100 mcg, 1–2x daily'
      },
      cycleDuration: '30 days minimum, often 3–6 months',
      notes: 'Key treatment in CIRS/mold illness (Dr. Shoemaker protocol). Nasal route is primary.'
    },
    researchHighlights: [
      'Central to CIRS treatment protocols',
      'Potent anti-inflammatory neuropeptide',
      'Regulates pulmonary artery pressure',
      'Modulates TGF-beta and MMP-9 (biotoxin markers)'
    ],
    contraindications: ['Pregnancy', 'Untreated hypothyroidism'],
    sideEffects: ['Diarrhea (vasodilatory)', 'Nasal congestion', 'Transient blood pressure drop'],
    evidenceLevel: 'Moderate — clinical use in CIRS, limited RCTs'
  },

  {
    id: 'melanotan-1',
    name: 'Melanotan I (Afamelanotide)',
    category: 'Wellness',
    class: 'Alpha-MSH Analog',
    casNumber: '75921-69-6',
    mechanism: 'Synthetic analog of alpha-melanocyte-stimulating hormone (α-MSH). Stimulates melanogenesis for UV-independent tanning and photoprotection.',
    protocol: {
      route: 'Subcutaneous injection',
      loadingPhase: '250–500 mcg daily for 2–4 weeks',
      maintenanceTanning: '1 mg daily for 7–10 days, then 1 mg 2–3x weekly',
      notes: 'Less libido/nausea effects compared to Melanotan II. FDA-approved form (Scenesse) for EPP.'
    },
    researchHighlights: [
      'FDA-approved (Scenesse) for erythropoietic protoporphyria (EPP)',
      'Stimulates melanogenesis without UV exposure',
      'Photoprotective properties',
      'More selective than Melanotan II'
    ],
    contraindications: ['Melanoma/skin cancer', 'Pregnancy'],
    sideEffects: ['Nausea', 'Facial flushing', 'Mole darkening'],
    evidenceLevel: 'Strong — FDA-approved for EPP (Scenesse)'
  },

  // ─────────────────────────────────────────────
  // TOP SELLERS — NEW ADDITIONS
  // ─────────────────────────────────────────────

  {
    id: 'retatrutide',
    name: 'Retatrutide (LY-3437943)',
    category: 'Weight Management & Metabolic',
    class: 'Triple GLP-1/GIP/Glucagon Agonist',
    casNumber: '2381089-83-2',
    molecularFormula: 'C225H348N48O70',
    molecularWeight: '4898.63 g/mol',
    mechanism: 'First-in-class triple hormone receptor agonist activating GLP-1 (appetite suppression), GIP (insulin sensitization and fat metabolism), and glucagon receptors (direct fat oxidation and energy expenditure). The glucagon component differentiates it from dual agonists by promoting hepatic fat oxidation and thermogenesis.',
    protocol: {
      route: 'Subcutaneous injection',
      titration: [
        { weeks: 'Weeks 1-4', dose: '0.5 mg weekly' },
        { weeks: 'Weeks 5-8', dose: '2 mg weekly' },
        { weeks: 'Weeks 9-12', dose: '4 mg weekly' },
        { weeks: 'Weeks 13-24', dose: '8 mg weekly' },
        { weeks: 'Weeks 25-48', dose: '8-12 mg weekly (if tolerated)' }
      ],
      timing: 'Once weekly, same day each week',
      notes: 'Slow titration is critical to minimize GI side effects. Take on an empty stomach or with a light meal.'
    },
    researchHighlights: [
      'Phase 2 trial: 24.2% mean body weight reduction at 48 weeks (12 mg dose)',
      'Triple agonist mechanism provides superior efficacy vs single/dual agonists',
      'Significant reduction in liver fat (NAFLD/NASH potential)',
      'HbA1c reduction of 2.02% in type 2 diabetes patients',
      'Phase 3 TRIUMPH program underway (Eli Lilly)',
      'Triglyceride reduction of up to 42% vs placebo'
    ],
    contraindications: ['Personal or family history of medullary thyroid carcinoma', 'MEN2 syndrome', 'Pregnancy or breastfeeding', 'Severe gastroparesis', 'History of pancreatitis'],
    sideEffects: ['Nausea (dose-dependent, improves with titration)', 'Diarrhea', 'Decreased appetite', 'Vomiting', 'Injection site reactions'],
    evidenceLevel: 'Strong — Phase 2 completed, Phase 3 ongoing (Eli Lilly TRIUMPH program)'
  },

  {
    id: 'klow80',
    name: 'KLOW80 — Regenerative Blend',
    category: 'Recovery & Healing',
    class: '4-Phase Regenerative Complex',
    casNumber: 'Multi-peptide blend',
    mechanism: 'Synergistic 4-phase regenerative system: Phase 1 (Inflammation Control) — KPV inhibits NF-kB pathway and GHK-Cu provides antioxidant support. Phase 2 (Tissue Repair) — TB-500 stimulates angiogenesis and cell migration while BPC-157 guides healing at injury sites. Phase 3 (Remodeling) — GHK-Cu improves collagen quality, elastin production, and extracellular matrix integrity. Phase 4 (Systemic Recovery) — combined action supports whole-body recovery and metabolic recomposition.',
    protocol: {
      route: 'Subcutaneous injection',
      reconstitution: 'Reconstitute 80mg vial with 2-4 mL bacteriostatic water',
      loadingPhase: '500 mcg daily for 2 weeks',
      maintenancePhase: '300 mcg 3-5x per week',
      cycleDuration: '8-12 weeks on, 4 weeks off',
      timing: 'Morning on empty stomach or before bed',
      notes: 'Can be injected near injury sites for targeted recovery. Rotate injection sites.'
    },
    researchHighlights: [
      'BPC-157: accelerated tendon-to-bone healing in animal models (Sikiric et al.)',
      'TB-500: promotes angiogenesis, upregulates actin for wound repair',
      'KPV: potent anti-inflammatory via NF-kB inhibition, studied for IBD',
      'GHK-Cu: increases collagen I & III synthesis by 70% in fibroblast studies',
      'Synergistic blend addresses all 4 phases of tissue healing simultaneously'
    ],
    contraindications: ['Active cancer or malignancy', 'Pregnancy or breastfeeding', 'Active systemic infection', 'Known copper allergy (GHK-Cu component)'],
    sideEffects: ['Mild injection site irritation', 'Temporary fatigue during loading phase', 'Rare: mild GI discomfort'],
    evidenceLevel: 'Moderate — individual components well-studied, blend synergy based on mechanistic rationale'
  }
];

// ─────────────────────────────────────────────
// CATEGORY INDEX
// ─────────────────────────────────────────────
export const protocolCategories = [
  {
    id: 'weight',
    name: 'Weight Management & Metabolic',
    description: 'GLP-1 agonists, GIP/GLP-1 dual agonists, GH fragments, mitochondrial peptides, and reuptake inhibitors for appetite control and fat loss.',
    peptideIds: ['semaglutide', 'tirzepatide', 'retatrutide', 'aod-9604', 'mots-c', 'tesofensine']
  },
  {
    id: 'recovery',
    name: 'Recovery & Healing',
    description: 'Tissue repair peptides for tendons, ligaments, gut, muscles, and systemic inflammation. Includes single peptides and proven stacking protocols.',
    peptideIds: ['bpc-157', 'tb-500', 'kpv', 'klow80', 'wolverine-protocol', 'bpc157-tb500-combo']
  },
  {
    id: 'growth-hormone',
    name: 'Growth Hormone Releasing',
    description: 'GHRH analogs, ghrelin mimetics, and secretagogues that stimulate natural growth hormone production for sleep, recovery, body composition, and anti-aging.',
    peptideIds: ['cjc-1295', 'ipamorelin', 'sermorelin', 'tesamorelin', 'mk-677']
  },
  {
    id: 'anti-aging',
    name: 'Anti-Aging & Longevity',
    description: 'Telomere protection, mitochondrial support, gene expression remodeling, and cellular energy restoration for biological age reversal.',
    peptideIds: ['epithalon', 'ghk-cu', 'nad-plus', 'ss-31']
  },
  {
    id: 'cognitive',
    name: 'Cognitive & Neuroprotective',
    description: 'Nootropic and neuroprotective peptides for cognitive enhancement, BDNF elevation, neurogenesis, and brain injury recovery.',
    peptideIds: ['semax', 'selank', 'dihexa', 'cerebrolysin']
  },
  {
    id: 'immune',
    name: 'Immune Support & Antimicrobial',
    description: 'Thymic peptides, cathelicidins, and neuropeptides for immune modulation, infection control, and biofilm disruption.',
    peptideIds: ['thymosin-alpha-1', 'll-37', 'vip']
  },
  {
    id: 'sexual-health',
    name: 'Sexual Health & Hormonal',
    description: 'Melanocortin agonists and hypothalamic peptides for libido enhancement, sexual function, and reproductive hormone optimization.',
    peptideIds: ['pt-141', 'kisspeptin']
  },
  {
    id: 'wellness',
    name: 'Wellness & Dermatology',
    description: 'Photoprotection, tanning, and general wellness peptides.',
    peptideIds: ['melanotan-1']
  }
];

// ─────────────────────────────────────────────
// GLOSSARY
// ─────────────────────────────────────────────
export const peptideGlossary = [
  { term: 'Amino Acid', definition: 'Organic molecules that serve as building blocks of peptides and proteins. 20 standard amino acids exist.' },
  { term: 'Angiogenesis', definition: 'Formation of new blood vessels from existing ones. Critical for wound healing and tissue repair.' },
  { term: 'Bacteriostatic Water (BAC Water)', definition: 'Sterile water containing 0.9% benzyl alcohol to inhibit bacterial growth. Used to reconstitute lyophilized peptides for injection.' },
  { term: 'BDNF', definition: 'Brain-Derived Neurotrophic Factor. Protein that supports neuron survival, growth, and synaptic plasticity. Key target for nootropic peptides.' },
  { term: 'Bioavailability', definition: 'The proportion of a substance that enters circulation and produces an active effect after administration.' },
  { term: 'CAS Number', definition: 'Chemical Abstracts Service registry number — a unique numerical identifier for chemical substances.' },
  { term: 'Cathelicidin', definition: 'Family of antimicrobial peptides found in immune cells. LL-37 is the only human cathelicidin.' },
  { term: 'Cycling', definition: 'Alternating periods of peptide use (on) and rest (off) to prevent receptor desensitization and maintain efficacy.' },
  { term: 'Denaturation', definition: 'Loss of a peptide\'s 3D structure due to heat, shaking, or chemical exposure — destroys biological activity.' },
  { term: 'GH Secretagogue', definition: 'Substance that stimulates the pituitary gland to release growth hormone. Includes GHRH analogs and ghrelin mimetics.' },
  { term: 'GHRH', definition: 'Growth Hormone-Releasing Hormone. Hypothalamic peptide that stimulates GH release from the anterior pituitary.' },
  { term: 'Ghrelin Mimetic', definition: 'Compound that mimics ghrelin (the hunger hormone) to stimulate GH release via the GHSR receptor.' },
  { term: 'GLP-1', definition: 'Glucagon-Like Peptide-1. Incretin hormone that enhances insulin secretion, suppresses glucagon, and slows gastric emptying.' },
  { term: 'GIP', definition: 'Glucose-dependent Insulinotropic Polypeptide. Incretin hormone that works alongside GLP-1 for glucose regulation.' },
  { term: 'Half-life', definition: 'Time required for half the administered dose to be eliminated from the body. Determines dosing frequency.' },
  { term: 'HPTA/HPG Axis', definition: 'Hypothalamic-Pituitary-Gonadal Axis. Hormonal feedback loop controlling reproductive hormones (testosterone, estrogen).' },
  { term: 'IGF-1', definition: 'Insulin-like Growth Factor 1. Hormone produced primarily by the liver in response to GH. Mediates many of GH\'s anabolic effects.' },
  { term: 'Intramuscular (IM)', definition: 'Injection directly into muscle tissue. Used for some peptides requiring deeper tissue absorption.' },
  { term: 'Lyophilized', definition: 'Freeze-dried. Peptides are sold as lyophilized powder for stability and must be reconstituted with BAC water before use.' },
  { term: 'Melanocortin', definition: 'Family of peptide hormones that bind melanocortin receptors (MC1R–MC5R). Regulate pigmentation, inflammation, sexual function, and appetite.' },
  { term: 'NF-κB', definition: 'Nuclear Factor kappa-light-chain-enhancer of activated B cells. Master regulator of inflammatory gene expression.' },
  { term: 'Peptide', definition: 'Short chain of amino acids (typically 2–50) linked by peptide bonds. Smaller than proteins but biologically active as signaling molecules.' },
  { term: 'Reconstitution', definition: 'Process of dissolving lyophilized (freeze-dried) peptide powder in bacteriostatic water to create an injectable solution.' },
  { term: 'Subcutaneous (SubQ)', definition: 'Injection into the fatty tissue layer just beneath the skin. Most common route for peptide administration.' },
  { term: 'Telomerase', definition: 'Enzyme that adds DNA sequence repeats to telomere ends, counteracting chromosomal shortening that occurs with cell division.' },
  { term: 'Telomere', definition: 'Protective DNA cap at the end of chromosomes. Shortens with each cell division — considered a biomarker of biological aging.' },
  { term: 'Titration', definition: 'Gradually increasing dose over time to find the minimum effective dose while minimizing side effects.' }
];

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────
export const getProtocolById = (id) =>
  protocolDictionary.find(p => p.id === id);

export const getProtocolsByCategory = (category) =>
  protocolDictionary.filter(p => p.category === category);

export const getCategoryById = (id) =>
  protocolCategories.find(c => c.id === id);

export const searchProtocols = (query) => {
  const q = query.toLowerCase();
  return protocolDictionary.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.class && p.class.toLowerCase().includes(q)) ||
    (p.mechanism && p.mechanism.toLowerCase().includes(q))
  );
};

export const getGlossaryTerm = (term) =>
  peptideGlossary.find(g => g.term.toLowerCase() === term.toLowerCase());
