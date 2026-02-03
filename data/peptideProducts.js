// Pharmaceutical-grade peptide product catalog
// Based on BioSync Peptide vial specifications

export const peptideProducts = [
  // Weight Loss Peptides
  {
    id: 1,
    name: 'Semaglutide',
    category: 'weight',
    type: 'single',
    tagline: 'Revolutionary Weight Management',
    description: 'A GLP-1 receptor agonist that regulates appetite, slows gastric emptying, and promotes significant, sustainable weight loss. FDA-approved and clinically proven.',
    benefits: ['Appetite regulation', 'Blood sugar control', 'Cardiovascular benefits', 'Sustainable results'],
    icon: 'scale',
    image: '/images/peptides/blend-vial-3.png',

    // Pharmaceutical specifications
    specifications: {
      casNumber: '910463-68-2',
      molecularFormula: 'C187H291N45O59',
      molecularWeight: '4113.58 g/mol',
      purity: '99%',
      concentration: '2.5mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    // Clinical information
    dosage: {
      starting: '0.25mg weekly',
      maintenance: '1.0-2.4mg weekly',
      titration: 'Increase by 0.25-0.5mg every 4 weeks',
      administration: 'Subcutaneous injection',
      duration: '12-16 weeks minimum'
    },

    researchData: [
      'FDA-approved for weight management',
      '15-20% average body weight reduction in clinical trials',
      'STEP trial results show sustained results over 68 weeks',
      'Cardiovascular risk reduction demonstrated'
    ],

    contraindications: [
      'Personal or family history of medullary thyroid carcinoma',
      'Multiple Endocrine Neoplasia syndrome type 2',
      'Pregnancy or breastfeeding',
      'Severe gastroparesis'
    ],

    batchNumber: '156-089-PS',
    researchUseOnly: true,
    inStock: true,
    featured: true
  },

  {
    id: 2,
    name: 'Tirzepatide',
    category: 'weight',
    type: 'single',
    tagline: 'Dual-Action Weight Loss',
    description: 'The most advanced weight loss peptide combining GLP-1 and GIP receptor activation for enhanced metabolic effects and superior fat reduction.',
    benefits: ['Dual hormone action', 'Enhanced metabolism', 'Improved insulin sensitivity', 'Greater efficacy'],
    icon: 'target',
    image: '/images/peptides/blend-vial-3.png',

    specifications: {
      casNumber: '2023788-19-2',
      molecularFormula: 'C225H348N48O68',
      molecularWeight: '4813.50 g/mol',
      purity: '99%',
      concentration: '5mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      starting: '2.5mg weekly',
      maintenance: '5-15mg weekly',
      titration: 'Increase by 2.5mg every 4 weeks',
      administration: 'Subcutaneous injection',
      duration: '12-20 weeks minimum'
    },

    researchData: [
      'Dual GLP-1 and GIP receptor agonist',
      '20-25% average body weight reduction',
      'SURMOUNT trial series demonstrates superior efficacy',
      'Improved glycemic control and cardiovascular markers'
    ],

    contraindications: [
      'Personal or family history of medullary thyroid carcinoma',
      'Multiple Endocrine Neoplasia syndrome type 2',
      'Pregnancy or breastfeeding',
      'Pancreatitis history'
    ],

    batchNumber: '162-044-PS',
    researchUseOnly: true,
    inStock: true,
    featured: true
  },

  {
    id: 7,
    name: 'AOD-9604',
    category: 'weight',
    type: 'single',
    tagline: 'Targeted Fat Burning',
    description: 'A modified growth hormone fragment that specifically targets fat metabolism without affecting blood sugar or promoting tissue growth.',
    benefits: ['Targeted fat loss', 'No blood sugar impact', 'Abdominal fat reduction', 'Cartilage repair'],
    icon: 'flame',
    image: '/images/peptides/blend-vial-3.png',

    specifications: {
      casNumber: '221231-10-3',
      molecularFormula: 'C78H123N23O23S2',
      molecularWeight: '1815.12 g/mol',
      purity: '98%',
      concentration: '5mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      starting: '300mcg daily',
      maintenance: '500mcg daily',
      titration: 'Increase gradually based on tolerance',
      administration: 'Subcutaneous injection',
      duration: '12 weeks minimum'
    },

    batchNumber: '134-071-PS',
    researchUseOnly: true,
    inStock: true
  },

  {
    id: 13,
    name: 'MOTS-C',
    category: 'weight',
    type: 'single',
    tagline: 'Metabolic Optimizer',
    description: 'A mitochondrial-derived peptide that regulates metabolic homeostasis, enhances insulin sensitivity, and promotes fat oxidation for targeted weight management.',
    benefits: ['Accelerates metabolism', 'Targeted fat loss', 'Energy enhancement', 'Metabolic balance'],
    icon: 'metabolism',
    image: '/images/peptides/mots-c-vial.png',

    specifications: {
      casNumber: '1627580-64-6',
      molecularFormula: 'C121H200N42O32S2',
      molecularWeight: '2174.52 g/mol',
      purity: '99%',
      concentration: '10mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      starting: '5mg 3x weekly',
      maintenance: '10mg 3x weekly',
      titration: 'Increase based on response',
      administration: 'Subcutaneous or intramuscular injection',
      duration: '8-12 weeks'
    },

    batchNumber: '145-092-PS',
    researchUseOnly: true,
    inStock: true
  },

  // Recovery & Healing Blends
  {
    id: 100,
    name: 'Recovery Blend',
    category: 'recovery',
    type: 'blend',
    tagline: 'The Ultimate Healing Stack',
    description: 'Professional recovery blend combining three powerful healing peptides for accelerated tissue repair, reduced inflammation, and enhanced recovery.',
    benefits: ['Accelerated healing', 'Reduced inflammation', 'Tissue regeneration', 'Gut health support'],
    icon: 'healing',
    image: '/images/peptides/recovery-blend-vial.png',

    composition: [
      {
        name: 'BPC-157',
        dosage: '10mg',
        casNumber: '137525-51-0',
        molecularFormula: 'C62H98N16O22',
        molecularWeight: '1419.56 g/mol'
      },
      {
        name: 'TB-500',
        dosage: '10mg',
        casNumber: '77591-33-4',
        molecularFormula: 'C212H350N56O78S',
        molecularWeight: '4963.44 g/mol'
      },
      {
        name: 'KPV',
        dosage: '10mg',
        casNumber: '867021-83-8',
        molecularFormula: 'C18H34N6O5',
        molecularWeight: '414.50 g/mol'
      }
    ],

    specifications: {
      totalAmount: '30mg (Blend)',
      purity: '99%',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      typical: '1 vial per week',
      administration: 'Subcutaneous injection',
      splitDosing: 'Can be divided into 2-3 doses weekly',
      duration: '6-8 weeks for acute injuries, 12+ weeks for chronic conditions'
    },

    researchData: [
      'BPC-157: Gastric peptide promoting systemic healing',
      'TB-500: Thymosin Beta-4 for cell migration and regeneration',
      'KPV: Anti-inflammatory tripeptide for gut and systemic inflammation'
    ],

    batchNumber: '143-114-PS',
    researchUseOnly: true,
    inStock: true,
    featured: true,
    priceRemoved: 349
  },

  {
    id: 3,
    name: 'BPC-157',
    category: 'recovery',
    type: 'single',
    tagline: 'The Wolverine Peptide',
    description: 'A naturally-derived gastric peptide renowned for accelerating tissue repair, reducing inflammation, and promoting healing of muscles, tendons, and gut lining.',
    benefits: ['Accelerated healing', 'Gut health restoration', 'Anti-inflammatory', 'Tendon & ligament repair'],
    icon: 'healing',
    image: '/images/peptides/recovery-blend-vial.png',

    specifications: {
      casNumber: '137525-51-0',
      molecularFormula: 'C62H98N16O22',
      molecularWeight: '1419.56 g/mol',
      purity: '99%',
      concentration: '5mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      typical: '250-500mcg twice daily',
      administration: 'Subcutaneous or intramuscular injection',
      duration: '4-8 weeks for acute injuries, 12+ weeks for chronic conditions'
    },

    batchNumber: '141-077-PS',
    researchUseOnly: true,
    inStock: true,
    priceRemoved: 149
  },

  {
    id: 4,
    name: 'TB-500',
    category: 'recovery',
    type: 'single',
    tagline: 'Cellular Regeneration',
    description: 'Thymosin Beta-4 promotes cell migration, blood vessel formation, and collagen deposition for comprehensive tissue repair and enhanced flexibility.',
    benefits: ['Cell regeneration', 'Improved flexibility', 'Wound healing', 'Reduced scarring'],
    icon: 'cell',
    image: '/images/peptides/recovery-blend-vial.png',

    specifications: {
      casNumber: '77591-33-4',
      molecularFormula: 'C212H350N56O78S',
      molecularWeight: '4963.44 g/mol',
      purity: '99%',
      concentration: '5mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      loading: '2-2.5mg twice weekly for 4 weeks',
      maintenance: '2mg once weekly',
      administration: 'Subcutaneous or intramuscular injection',
      duration: '8-12 weeks'
    },

    batchNumber: '138-065-PS',
    researchUseOnly: true,
    inStock: true,
    priceRemoved: 179
  },

  // Anti-Aging & Growth Hormone
  {
    id: 101,
    name: 'Growth Optimization Blend',
    category: 'antiaging',
    type: 'blend',
    tagline: 'Natural GH Amplification',
    description: 'Synergistic combination of CJC-1295 and Ipamorelin for optimal growth hormone release, improved sleep quality, lean muscle gain, and enhanced recovery.',
    benefits: ['Natural GH release', 'Improved sleep quality', 'Lean muscle gain', 'Fat metabolism', 'Enhanced recovery'],
    icon: 'hormone',
    image: '/images/peptides/growth-blend-vial.png',

    composition: [
      {
        name: 'CJC-1295 (no DAC)',
        dosage: '5mg',
        casNumber: '863288-34-0',
        molecularFormula: 'C165H269N47O46',
        molecularWeight: '3649.30 g/mol'
      },
      {
        name: 'Ipamorelin',
        dosage: '5mg',
        casNumber: '170851-70-4',
        molecularFormula: 'C38H49N9O5',
        molecularWeight: '711.86 g/mol'
      }
    ],

    specifications: {
      totalAmount: '10mg (Blend)',
      purity: '99%',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      typical: '1 vial (5mg each) before bed',
      frequency: '5-7 days per week',
      administration: 'Subcutaneous injection',
      duration: '3-6 months for optimal results'
    },

    researchData: [
      'CJC-1295: GHRH analog extending GH pulses',
      'Ipamorelin: Selective ghrelin mimetic without cortisol/prolactin elevation',
      'Synergistic combination for sustained GH elevation',
      'Improves sleep architecture and recovery markers'
    ],

    batchNumber: '111-033-PS',
    researchUseOnly: true,
    inStock: true,
    featured: true,
    priceRemoved: 299
  },

  {
    id: 6,
    name: 'Sermorelin',
    category: 'antiaging',
    type: 'single',
    tagline: 'Restore Your Youth',
    description: "Stimulates the pituitary gland to naturally produce growth hormone, working with your body's rhythm for safer, gradual anti-aging benefits.",
    benefits: ['Natural hormone production', 'Enhanced recovery', 'Mental clarity', 'Skin elasticity'],
    icon: 'youth',
    image: '/images/peptides/growth-blend-vial.png',

    specifications: {
      casNumber: '86168-78-7',
      molecularFormula: 'C149H246N44O42S',
      molecularWeight: '3357.96 g/mol',
      purity: '98%',
      concentration: '5mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      typical: '200-500mcg before bed',
      frequency: 'Daily',
      administration: 'Subcutaneous injection',
      duration: '3-6 months minimum'
    },

    batchNumber: '129-054-PS',
    researchUseOnly: true,
    inStock: true,
    priceRemoved: 199
  },

  {
    id: 12,
    name: 'Ipamorelin',
    category: 'antiaging',
    type: 'single',
    tagline: 'Selective Growth Hormone Release',
    description: 'A selective growth hormone secretagogue that stimulates natural GH production without affecting cortisol or prolactin levels, ideal for anti-aging and muscle building.',
    benefits: ['Lean muscle growth', 'Improved sleep quality', 'Enhanced fat burning', 'Faster recovery'],
    icon: 'muscle',
    image: '/images/peptides/growth-blend-vial.png',

    specifications: {
      casNumber: '170851-70-4',
      molecularFormula: 'C38H49N9O5',
      molecularWeight: '711.86 g/mol',
      purity: '99%',
      concentration: '5mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      typical: '200-300mcg 2-3 times daily',
      timing: 'Pre-workout and before bed optimal',
      administration: 'Subcutaneous injection',
      duration: '3-6 months'
    },

    batchNumber: '147-088-PS',
    researchUseOnly: true,
    inStock: true,
    priceRemoved: 179
  },

  {
    id: 10,
    name: 'Epithalon',
    category: 'antiaging',
    type: 'single',
    tagline: 'Longevity Peptide',
    description: 'Activates telomerase to protect and lengthen telomeres—the cellular markers of biological age—promoting longevity at the DNA level.',
    benefits: ['Telomere protection', 'Cellular longevity', 'Sleep improvement', 'Immune support'],
    icon: 'hourglass',
    image: '/images/peptides/blend-vial-3.png',

    specifications: {
      casNumber: '307297-39-8',
      molecularFormula: 'C14H22N4O9',
      molecularWeight: '390.35 g/mol',
      purity: '99%',
      concentration: '10mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      typical: '5-10mg per cycle',
      protocol: '10 days on, 10 days off',
      administration: 'Subcutaneous injection before bed',
      duration: '3-4 cycles, repeat 2-4x per year'
    },

    batchNumber: '152-091-PS',
    researchUseOnly: true,
    inStock: true,
    priceRemoved: 229
  },

  {
    id: 11,
    name: 'GHK-Cu',
    category: 'antiaging',
    type: 'single',
    tagline: 'The Blue Repair Peptide',
    description: 'Copper peptide that binds to copper ions to activate cellular regeneration, stimulating repair pathways that restore youthfulness and vitality from within.',
    benefits: ['Collagen & elastin boost', 'Skin repair & healing', 'Hair growth stimulation', 'Reduces fine lines'],
    icon: 'copper',
    image: '/images/peptides/blend-vial-3.png',

    specifications: {
      casNumber: '49557-75-7',
      molecularFormula: 'C14H22CuN6O4',
      molecularWeight: '401.91 g/mol',
      purity: '99%',
      concentration: '50mg/vial',
      appearance: 'Blue lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      topical: '1-2mg/mL in serum',
      injectable: '1-2mg subcutaneously 2-3x weekly',
      administration: 'Topical or subcutaneous',
      duration: '3-6 months for visible results'
    },

    batchNumber: '155-073-PS',
    researchUseOnly: true,
    inStock: true,
    priceRemoved: 169
  },

  // Wellness Peptides
  {
    id: 8,
    name: 'NAD+',
    category: 'wellness',
    type: 'single',
    tagline: 'Cellular Energy Revival',
    description: 'Essential coenzyme that powers cellular energy production, DNA repair, and metabolic function—declining with age but restorable through therapy.',
    benefits: ['Cellular rejuvenation', 'Mental clarity', 'Energy boost', 'DNA repair'],
    icon: 'energy',
    image: '/images/peptides/blend-vial-3.png',

    specifications: {
      casNumber: '53-84-9',
      molecularFormula: 'C21H27N7O14P2',
      molecularWeight: '663.43 g/mol',
      purity: '99%',
      concentration: '500mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      iv: '250-500mg per infusion',
      subcutaneous: '50-100mg daily',
      frequency: '2-3x weekly',
      administration: 'IV infusion or subcutaneous',
      duration: 'Ongoing maintenance therapy'
    },

    batchNumber: '167-101-PS',
    researchUseOnly: true,
    inStock: true,
    priceRemoved: 399
  },

  {
    id: 9,
    name: 'PT-141',
    category: 'wellness',
    type: 'single',
    tagline: 'Sexual Wellness',
    description: 'Bremelanotide works directly on the nervous system to enhance libido and sexual function in both men and women, addressing desire at its source.',
    benefits: ['Enhanced libido', 'Works on desire', 'Fast-acting', 'Non-hormonal approach'],
    icon: 'heart',
    image: '/images/peptides/blend-vial-3.png',

    specifications: {
      casNumber: '189691-06-3',
      molecularFormula: 'C50H68N14O10',
      molecularWeight: '1025.18 g/mol',
      purity: '99%',
      concentration: '10mg/vial',
      appearance: 'White lyophilized powder',
      storage: '2-8°C, protect from light',
      solubility: 'Water soluble'
    },

    dosage: {
      typical: '1-2mg as needed',
      timing: '45-60 minutes before activity',
      administration: 'Subcutaneous injection',
      duration: 'Effects last 6-12 hours'
    },

    batchNumber: '158-067-PS',
    researchUseOnly: true,
    inStock: true,
    priceRemoved: 199
  }
];

// Helper functions
export const getProductById = (id) => {
  return peptideProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category) => {
  return peptideProducts.filter(product => product.category === category);
};

export const getProductsByType = (type) => {
  return peptideProducts.filter(product => product.type === type);
};

export const getFeaturedProducts = () => {
  return peptideProducts.filter(product => product.featured);
};

export const getInStockProducts = () => {
  return peptideProducts.filter(product => product.inStock);
};

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return peptideProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.tagline.toLowerCase().includes(lowerQuery)
  );
};
