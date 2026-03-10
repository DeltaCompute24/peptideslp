// BioSync Peptides - Sample Case Booklet PDF Generator
// Generates a professionally formatted print booklet for pharmacies/clinics
import jsPDF from 'jspdf';

// Brand colors
const TEAL = [13, 148, 136];
const DARK = [12, 25, 41];
const WHITE = [255, 255, 255];
const LIGHT_GRAY = [245, 247, 250];
const MID_GRAY = [140, 150, 165];

// Page dimensions (A5)
const PW = 148;
const PH = 210;
const MARGIN = 12;

// Language strings
const strings = {
  en: {
    tagline: 'Pharmaceutical-Grade Peptide Therapy',
    catalog: 'PRODUCT CATALOG',
    guide: 'Sample Case Reference Guide',
    footer: 'For Healthcare Professional Use Only',
    scienceOf: 'THE SCIENCE OF',
    peptideTherapy: 'PEPTIDE THERAPY',
    intro: 'Peptide therapy represents one of the most rapidly advancing frontiers in regenerative and precision medicine. These short-chain amino acid sequences act as highly specific signaling molecules, targeting cellular receptors to trigger precise biological responses with minimal side effects compared to traditional pharmaceuticals.',
    stats: [
      { number: '7,000+', label: 'Known natural peptides\nin the human body' },
      { number: '80+', label: 'FDA-approved peptide\ntherapeutics globally' },
      { number: '$50B+', label: 'Projected peptide drug\nmarket by 2030' },
      { number: '150+', label: 'Peptide drugs in active\nclinical trials' }
    ],
    researchFrontiers: 'Current Research Frontiers',
    areas: [
      { title: 'Metabolic & Weight Management', text: 'GLP-1 receptor agonists (Semaglutide, Tirzepatide) have revolutionized obesity treatment, demonstrating 15-25% body weight reduction in landmark trials (STEP, SURMOUNT). Mitochondrial peptides like MOTS-C show promise for metabolic optimization at the cellular level.' },
      { title: 'Tissue Repair & Recovery', text: 'BPC-157 (Body Protection Compound) and Thymosin Beta-4 (TB-500) demonstrate remarkable tissue healing properties. Research shows accelerated recovery of tendons, ligaments, muscles, and gut lining through enhanced angiogenesis and cell migration pathways.' },
      { title: 'Growth Hormone Optimization', text: 'Growth hormone secretagogues (CJC-1295, Ipamorelin) stimulate natural GH release without the risks of exogenous hormone administration. Clinical data shows improved body composition, sleep quality, and recovery with favorable safety profiles.' },
      { title: 'Longevity & Cellular Health', text: 'Epigenetic peptides like Epithalon (telomerase activator) and GHK-Cu (copper peptide) target fundamental aging mechanisms. NAD+ precursors restore cellular energy pathways essential for DNA repair, immune function, and metabolic resilience.' }
    ],
    disclaimer: 'All BioSync peptides are manufactured in ISO-certified facilities with >98% purity verified by third-party HPLC analysis. Products are intended for research and clinical use under physician supervision.',
    catRecovery: 'RECOVERY & HEALING',
    catWeight: 'WEIGHT MANAGEMENT',
    catAntiaging: 'ANTI-AGING & OPTIMIZATION',
    catWellness: 'WELLNESS',
    footerLine: 'For Research & Clinical Use Only  |  biosyncpeptides.com',
    techRef: 'Technical & Dosing Reference',
    specifications: 'SPECIFICATIONS',
    dosingProtocol: 'DOSING PROTOCOL',
    researchHighlights: 'RESEARCH HIGHLIGHTS',
    contraindications: 'CONTRAINDICATIONS',
    type: 'Type',
    blend: 'BLEND',
    totalAmount: 'Total Amount',
    casNumber: 'CAS Number',
    formula: 'Formula',
    molWeight: 'Mol. Weight',
    concentration: 'Concentration',
    purity: 'Purity',
    appearance: 'Appearance',
    storage: 'Storage',
    batch: 'Batch #',
    fileName: 'BioSync-Peptides-Product-Booklet.pdf'
  },
  pt: {
    tagline: 'Terapia Peptidica de Grau Farmaceutico',
    catalog: 'CATALOGO DE PRODUTOS',
    guide: 'Guia de Referencia do Kit de Amostras',
    footer: 'Apenas para Uso de Profissionais de Saude',
    scienceOf: 'A CIENCIA DA',
    peptideTherapy: 'TERAPIA PEPTIDICA',
    intro: 'A terapia peptidica representa uma das fronteiras que mais avancam na medicina regenerativa e de precisao. Essas sequencias de aminoacidos de cadeia curta atuam como moleculas de sinalizacao altamente especificas, direcionando receptores celulares para desencadear respostas biologicas precisas com efeitos colaterais minimos em comparacao com farmacos tradicionais.',
    stats: [
      { number: '7.000+', label: 'Peptideos naturais\nno corpo humano' },
      { number: '80+', label: 'Peptideos aprovados\npelo FDA globalmente' },
      { number: '$50B+', label: 'Mercado projetado de\npeptideos ate 2030' },
      { number: '150+', label: 'Farmacos peptidicos em\nensaios clinicos ativos' }
    ],
    researchFrontiers: 'Fronteiras da Pesquisa Atual',
    areas: [
      { title: 'Metabolismo e Controle de Peso', text: 'Agonistas do receptor GLP-1 (Semaglutida, Tirzepatida) revolucionaram o tratamento da obesidade, demonstrando reducao de 15-25% do peso corporal em ensaios clinicos marcantes (STEP, SURMOUNT). Peptideos mitocondriais como MOTS-C mostram promessa para otimizacao metabolica a nivel celular.' },
      { title: 'Reparo Tecidual e Recuperacao', text: 'BPC-157 (Composto de Protecao Corporal) e Timosina Beta-4 (TB-500) demonstram propriedades notaveis de cicatrizacao tecidual. Pesquisas mostram recuperacao acelerada de tendoes, ligamentos, musculos e revestimento intestinal atraves de angiogenese e vias de migracao celular aprimoradas.' },
      { title: 'Otimizacao do Hormonio de Crescimento', text: 'Secretagogos do hormonio de crescimento (CJC-1295, Ipamorelina) estimulam a liberacao natural de GH sem os riscos da administracao de hormonios exogenos. Dados clinicos mostram melhora na composicao corporal, qualidade do sono e recuperacao com perfis de seguranca favoraveis.' },
      { title: 'Longevidade e Saude Celular', text: 'Peptideos epigeneticos como Epithalon (ativador da telomerase) e GHK-Cu (peptideo de cobre) visam mecanismos fundamentais do envelhecimento. Precursores de NAD+ restauram vias de energia celular essenciais para reparo do DNA, funcao imunologica e resiliencia metabolica.' }
    ],
    disclaimer: 'Todos os peptideos BioSync sao fabricados em instalacoes certificadas ISO com pureza >98% verificada por analise HPLC de terceiros. Produtos destinados a pesquisa e uso clinico sob supervisao medica.',
    catRecovery: 'RECUPERACAO E CICATRIZACAO',
    catWeight: 'CONTROLE DE PESO',
    catAntiaging: 'ANTI-ENVELHECIMENTO E OTIMIZACAO',
    catWellness: 'BEM-ESTAR',
    footerLine: 'Apenas para Pesquisa e Uso Clinico  |  biosyncpeptides.com',
    techRef: 'Referencia Tecnica e Dosagem',
    specifications: 'ESPECIFICACOES',
    dosingProtocol: 'PROTOCOLO DE DOSAGEM',
    researchHighlights: 'DESTAQUES DA PESQUISA',
    contraindications: 'CONTRAINDICACOES',
    type: 'Tipo',
    blend: 'BLEND',
    totalAmount: 'Quantidade Total',
    casNumber: 'Numero CAS',
    formula: 'Formula',
    molWeight: 'Peso Mol.',
    concentration: 'Concentracao',
    purity: 'Pureza',
    appearance: 'Aparencia',
    storage: 'Armazenamento',
    batch: 'Lote #',
    fileName: 'BioSync-Catalogo-Produtos-Peptideos.pdf'
  }
};

// Product translations for PT
const productTranslationsPT = {
  3: { // BPC-157
    tagline: 'O Peptideo Wolverine',
    description: 'Um peptideo gastrico de origem natural reconhecido por acelerar o reparo tecidual, reduzir a inflamacao e promover a cicatrizacao de musculos, tendoes e revestimento intestinal.',
    benefits: ['Cicatrizacao acelerada', 'Restauracao intestinal', 'Anti-inflamatorio', 'Reparo de tendoes'],
    researchData: [
      'Peptideo gastrico que promove cicatrizacao sistemica',
      'Demonstra reparo acelerado de tendoes e ligamentos em estudos',
      'Propriedades neuroprotetoras e de protecao intestinal',
      'Perfil de seguranca favoravel em pesquisas pre-clinicas'
    ],
    contraindications: null
  },
  13: { // MOTS-C
    tagline: 'Otimizador Metabolico',
    description: 'Um peptideo derivado mitocondrial que regula a homeostase metabolica, melhora a sensibilidade a insulina e promove a oxidacao de gordura para controle de peso direcionado.',
    benefits: ['Acelera metabolismo', 'Perda de gordura', 'Mais energia', 'Equilibrio metabolico'],
    researchData: null,
    contraindications: null
  },
  100: { // Recovery Blend
    tagline: 'O Stack de Cicatrizacao Definitivo',
    description: 'Blend profissional de recuperacao que combina tres peptideos poderosos de cicatrizacao para reparo tecidual acelerado, reducao de inflamacao e recuperacao aprimorada.',
    benefits: ['Cicatrizacao acelerada', 'Menos inflamacao', 'Regeneracao tecidual', 'Saude intestinal'],
    researchData: [
      'BPC-157: Peptideo gastrico que promove cicatrizacao sistemica',
      'TB-500: Timosina Beta-4 para migracao celular e regeneracao',
      'KPV: Tripeptideo anti-inflamatorio para inflamacao intestinal e sistemica'
    ],
    contraindications: null
  },
  101: { // Growth Optimization Blend
    tagline: 'Amplificacao Natural do GH',
    description: 'Combinacao sinergica de CJC-1295 e Ipamorelina para liberacao otima de hormonio de crescimento, melhora na qualidade do sono, ganho de massa magra e recuperacao aprimorada.',
    benefits: ['Liberacao natural de GH', 'Melhora do sono', 'Massa magra', 'Metabolismo', 'Recuperacao'],
    researchData: [
      'CJC-1295: Analogo de GHRH que estende os pulsos de GH',
      'Ipamorelina: Mimetico seletivo de grelina sem elevacao de cortisol/prolactina',
      'Combinacao sinergica para elevacao sustentada do GH',
      'Melhora a arquitetura do sono e marcadores de recuperacao'
    ],
    contraindications: null
  }
};

// Dosing key translations
const doseKeysPT = {
  'Starting': 'Inicial',
  'Maintenance': 'Manutencao',
  'Titration': 'Titulacao',
  'Administration': 'Administracao',
  'Duration': 'Duracao',
  'Typical': 'Tipica',
  'Loading': 'Carga',
  'Frequency': 'Frequencia',
  'Split dosing': 'Dose fracionada',
  'Split Dosing': 'Dose Fracionada',
  'Timing': 'Horario',
  'Iv': 'IV',
  'Subcutaneous': 'Subcutaneo',
  'Protocol': 'Protocolo',
  'Topical': 'Topico',
  'Injectable': 'Injetavel'
};

// Helper: load image as base64
async function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Helper: draw rounded rect
function roundedRect(doc, x, y, w, h, r, fillColor, strokeColor) {
  if (fillColor) {
    doc.setFillColor(...fillColor);
    doc.roundedRect(x, y, w, h, r, r, 'F');
  }
  if (strokeColor) {
    doc.setDrawColor(...strokeColor);
    doc.roundedRect(x, y, w, h, r, r, 'S');
  }
}

// Helper: centered text
function centerText(doc, text, y, size, color, font = 'helvetica', style = 'bold') {
  doc.setFont(font, style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
  doc.text(text, PW / 2, y, { align: 'center' });
}

// Helper: wrap text within width
function wrapText(doc, text, maxWidth) {
  return doc.splitTextToSize(text, maxWidth);
}

// ======== PAGE BUILDERS ========

function buildCoverPage(doc, t) {
  // Full dark background
  doc.setFillColor(...DARK);
  doc.rect(0, 0, PW, PH, 'F');

  // Decorative teal accent strip at top
  doc.setFillColor(...TEAL);
  doc.rect(0, 0, PW, 5, 'F');

  // Subtle molecular pattern lines
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.15);
  const points = [
    [18, 40], [38, 30], [58, 42], [78, 28], [98, 38], [118, 28], [138, 40]
  ];
  for (let i = 0; i < points.length - 1; i++) {
    doc.line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
  }
  points.forEach(([x, y]) => {
    doc.setFillColor(255, 255, 255);
    doc.circle(x, y, 2, 'F');
  });

  // Logo area - molecular icon
  const cx = PW / 2;
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(1.2);
  const nodes = [[cx, 65], [cx - 15, 78], [cx + 15, 78], [cx - 8, 89], [cx + 8, 89]];
  doc.line(nodes[0][0], nodes[0][1], nodes[1][0], nodes[1][1]);
  doc.line(nodes[0][0], nodes[0][1], nodes[2][0], nodes[2][1]);
  doc.line(nodes[1][0], nodes[1][1], nodes[3][0], nodes[3][1]);
  doc.line(nodes[2][0], nodes[2][1], nodes[4][0], nodes[4][1]);
  doc.line(nodes[3][0], nodes[3][1], nodes[4][0], nodes[4][1]);
  nodes.forEach(([x, y], i) => {
    doc.setFillColor(...(i === 0 ? TEAL : [20, 60, 80]));
    doc.circle(x, y, i === 0 ? 4.5 : 3, 'F');
  });

  // Brand name
  centerText(doc, 'BIOSYNC', 112, 34, WHITE);
  centerText(doc, 'PEPTIDES', 124, 22, TEAL);

  // Tagline
  centerText(doc, t.tagline, 138, 9, MID_GRAY, 'helvetica', 'normal');

  // Divider line
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.8);
  doc.line(35, 146, 113, 146);

  // Subtitle
  centerText(doc, t.catalog, 158, 11, WHITE, 'helvetica', 'normal');
  centerText(doc, t.guide, 167, 8, MID_GRAY, 'helvetica', 'normal');

  // Bottom info bar
  doc.setFillColor(20, 40, 60);
  doc.rect(0, PH - 28, PW, 28, 'F');
  centerText(doc, t.footer, PH - 16, 7, MID_GRAY, 'helvetica', 'normal');
  centerText(doc, 'biosyncpeptides.com', PH - 8, 7, TEAL, 'helvetica', 'normal');
}

function buildSciencePage(doc, t) {
  doc.addPage();

  // Light background
  doc.setFillColor(...LIGHT_GRAY);
  doc.rect(0, 0, PW, PH, 'F');

  // Teal header bar
  doc.setFillColor(...DARK);
  doc.rect(0, 0, PW, 38, 'F');
  doc.setFillColor(...TEAL);
  doc.rect(0, 38, PW, 2, 'F');

  centerText(doc, t.scienceOf, 18, 8, MID_GRAY, 'helvetica', 'normal');
  centerText(doc, t.peptideTherapy, 30, 16, WHITE);

  let y = 48;
  const contentWidth = PW - MARGIN * 2;

  // Intro paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...DARK);
  const introLines = wrapText(doc, t.intro, contentWidth);
  doc.text(introLines, MARGIN, y);
  y += introLines.length * 3.8 + 5;

  // Key stats boxes — 2x2 grid for A5
  const boxW = (contentWidth - 6) / 2;
  const boxH = 18;
  t.stats.forEach((stat, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = MARGIN + col * (boxW + 6);
    const by = y + row * (boxH + 4);
    roundedRect(doc, bx, by, boxW, boxH, 2, WHITE, null);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...TEAL);
    doc.text(stat.number, bx + 6, by + 11);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(...MID_GRAY);
    doc.text(stat.label.replace('\n', ' '), bx + 6, by + 16);
  });
  y += (boxH + 4) * 2 + 4;

  // Research areas section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text(t.researchFrontiers, MARGIN, y);
  y += 2;
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y, MARGIN + 40, y);
  y += 5;

  t.areas.forEach((area) => {
    roundedRect(doc, MARGIN, y, contentWidth, 26, 2, WHITE, null);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...TEAL);
    doc.text(area.title, MARGIN + 4, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(...DARK);
    const lines = wrapText(doc, area.text, contentWidth - 8);
    doc.text(lines, MARGIN + 4, y + 11);
    y += 29;
  });

  // Bottom note
  y += 1;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(5.5);
  doc.setTextColor(...MID_GRAY);
  const noteLines = wrapText(doc, t.disclaimer, contentWidth);
  doc.text(noteLines, MARGIN, y);

  // Page number
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MID_GRAY);
  doc.text('2', PW / 2, PH - 7, { align: 'center' });
}

function buildProductFront(doc, product, productImage, pageNum, t, ptData) {
  doc.addPage();

  // Category color bar at top
  doc.setFillColor(...TEAL);
  doc.rect(0, 0, PW, 3, 'F');

  // Category label
  const catLabel = product.category === 'recovery' ? t.catRecovery
    : product.category === 'weight' ? t.catWeight
    : product.category === 'antiaging' ? t.catAntiaging
    : t.catWellness;

  doc.setFillColor(...DARK);
  doc.rect(0, 3, PW, 16, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...TEAL);
  doc.text(catLabel, MARGIN, 13);

  // BioSync small logo text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(...MID_GRAY);
  doc.text('BIOSYNC PEPTIDES', PW - MARGIN, 13, { align: 'right' });

  // Product image - scaled for A5
  const imgW = 85;
  const imgH = 85;
  const imgX = (PW - imgW) / 2;
  if (productImage) {
    try {
      doc.addImage(productImage, 'PNG', imgX, 26, imgW, imgH);
    } catch (e) {
      roundedRect(doc, imgX, 26, imgW, imgH, 4, LIGHT_GRAY, MID_GRAY);
      centerText(doc, product.name, 70, 12, MID_GRAY, 'helvetica', 'normal');
    }
  } else {
    roundedRect(doc, imgX, 26, imgW, imgH, 4, LIGHT_GRAY, MID_GRAY);
    centerText(doc, product.name, 70, 12, MID_GRAY, 'helvetica', 'normal');
  }

  let y = 118;

  // Product name
  centerText(doc, product.name.toUpperCase(), y, 20, DARK);
  y += 8;

  // Tagline
  const tagline = ptData ? ptData.tagline : product.tagline;
  centerText(doc, tagline, y, 10, TEAL, 'helvetica', 'normal');
  y += 8;

  // Divider
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.6);
  doc.line(40, y, 108, y);
  y += 6;

  // Description
  const description = ptData ? ptData.description : product.description;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...DARK);
  const descLines = wrapText(doc, description, PW - MARGIN * 2 - 10);
  doc.text(descLines, PW / 2, y, { align: 'center', maxWidth: PW - MARGIN * 2 - 10 });
  y += descLines.length * 4 + 6;

  // Benefits tags — wrap into 2 rows if needed on A5
  const benefits = ptData ? ptData.benefits : (product.benefits || []);
  if (benefits && benefits.length) {
    const tagH = 8;
    const tagPadding = 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);

    // Split into rows that fit within page width
    const maxRowW = PW - MARGIN * 2;
    let rows = [[]];
    let currentRowW = 0;
    benefits.forEach(b => {
      const w = doc.getTextWidth(b) + tagPadding * 2;
      if (currentRowW + w + 3 > maxRowW && rows[rows.length - 1].length > 0) {
        rows.push([]);
        currentRowW = 0;
      }
      rows[rows.length - 1].push({ text: b, width: w });
      currentRowW += w + 3;
    });

    rows.forEach(row => {
      const rowW = row.reduce((sum, t) => sum + t.width + 3, -3);
      let tx = (PW - rowW) / 2;
      row.forEach(tag => {
        roundedRect(doc, tx, y, tag.width, tagH, 2, null, TEAL);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(...TEAL);
        doc.text(tag.text, tx + tag.width / 2, y + 5.5, { align: 'center' });
        tx += tag.width + 3;
      });
      y += tagH + 3;
    });
  }

  // Type badge
  if (product.type === 'blend') {
    const badgeW = 28;
    roundedRect(doc, (PW - badgeW) / 2, y, badgeW, 7, 2, TEAL, null);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(...WHITE);
    doc.text(t.blend, PW / 2, y + 5, { align: 'center' });
  }

  // Footer bar
  doc.setFillColor(...DARK);
  doc.rect(0, PH - 14, PW, 14, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(...MID_GRAY);
  doc.text(t.footerLine, PW / 2, PH - 5, { align: 'center' });

  // Page number
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MID_GRAY);
  doc.text(String(pageNum), PW - MARGIN, PH - 5, { align: 'right' });
}

function buildProductBack(doc, product, pageNum, t, ptData, lang) {
  doc.addPage();

  // Subtle header
  doc.setFillColor(...LIGHT_GRAY);
  doc.rect(0, 0, PW, PH, 'F');
  doc.setFillColor(...TEAL);
  doc.rect(0, 0, PW, 3, 'F');

  const contentWidth = PW - MARGIN * 2;
  let y = 14;

  // Product name header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...DARK);
  doc.text(product.name.toUpperCase(), MARGIN, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MID_GRAY);
  doc.text(t.techRef, PW - MARGIN, y, { align: 'right' });
  y += 3;
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, y, MARGIN + 35, y);
  y += 6;

  // Two-column layout
  const colW = (contentWidth - 6) / 2;
  const leftX = MARGIN;
  const rightX = MARGIN + colW + 6;

  // LEFT COLUMN: Specifications
  let ly = y;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...TEAL);
  doc.text(t.specifications, leftX, ly);
  ly += 5;

  const specs = product.specifications || {};
  const specEntries = [];
  if (product.type === 'blend' && product.composition) {
    specEntries.push([t.type, 'Blend']);
    specEntries.push([t.totalAmount, specs.totalAmount || '—']);
    product.composition.forEach(comp => {
      specEntries.push([comp.name, `${comp.dosage}`]);
    });
  } else {
    if (specs.casNumber) specEntries.push([t.casNumber, specs.casNumber]);
    if (specs.molecularFormula) specEntries.push([t.formula, specs.molecularFormula]);
    if (specs.molecularWeight) specEntries.push([t.molWeight, specs.molecularWeight]);
    if (specs.concentration) specEntries.push([t.concentration, specs.concentration]);
  }
  if (specs.purity) specEntries.push([t.purity, specs.purity]);
  if (specs.appearance) specEntries.push([t.appearance, specs.appearance]);
  if (specs.storage) specEntries.push([t.storage, specs.storage]);
  if (product.batchNumber) specEntries.push([t.batch, product.batchNumber]);

  specEntries.forEach(([label, value], i) => {
    const bgColor = i % 2 === 0 ? WHITE : [238, 242, 248];
    roundedRect(doc, leftX, ly, colW, 7.5, 1, bgColor, null);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(...DARK);
    doc.text(label, leftX + 3, ly + 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(...MID_GRAY);
    let val = value || '—';
    if (val.length > 22) val = val.substring(0, 20) + '...';
    doc.text(val, leftX + colW - 3, ly + 5, { align: 'right' });
    ly += 7.5;
  });

  // RIGHT COLUMN: Dosing Protocol
  let ry = y;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...TEAL);
  doc.text(t.dosingProtocol, rightX, ry);
  ry += 5;

  const dosage = product.dosage || {};
  const doseEntries = Object.entries(dosage).map(([key, val]) => {
    let label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
    if (lang === 'pt' && doseKeysPT[label]) {
      label = doseKeysPT[label];
    }
    return [label, val];
  });

  doseEntries.forEach(([label, value], i) => {
    const bgColor = i % 2 === 0 ? WHITE : [238, 242, 248];
    const lineH = 10;
    roundedRect(doc, rightX, ry, colW, lineH, 1, bgColor, null);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(...DARK);
    doc.text(label, rightX + 3, ry + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(60, 60, 60);
    const valLines = wrapText(doc, String(value), colW - 6);
    doc.text(valLines[0], rightX + 3, ry + 8);
    ry += lineH;
  });

  // Research Data section (full width below)
  const bottomY = Math.max(ly, ry) + 6;
  let by = bottomY;

  const researchData = ptData && ptData.researchData ? ptData.researchData
    : product.researchData;
  if (researchData && researchData.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...TEAL);
    doc.text(t.researchHighlights, MARGIN, by);
    by += 5;

    roundedRect(doc, MARGIN, by, contentWidth, researchData.length * 8 + 4, 2, WHITE, null);
    by += 4;

    researchData.forEach((item) => {
      doc.setFillColor(...TEAL);
      doc.circle(MARGIN + 5, by + 1, 1.2, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(...DARK);
      const lines = wrapText(doc, item, contentWidth - 12);
      doc.text(lines[0], MARGIN + 9, by + 2.5);
      by += 8;
    });
  }

  // Contraindications (if available)
  const contras = product.contraindications;
  if (contras && contras.length) {
    by += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(180, 60, 60);
    doc.text(t.contraindications, MARGIN, by);
    by += 5;

    roundedRect(doc, MARGIN, by, contentWidth, contras.length * 7 + 3, 2, [255, 245, 245], null);
    by += 3;

    contras.forEach((item) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(140, 50, 50);
      doc.text('!  ' + item, MARGIN + 4, by + 3.5);
      by += 7;
    });
  }

  // Footer
  doc.setFillColor(...DARK);
  doc.rect(0, PH - 14, PW, 14, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(...MID_GRAY);
  doc.text(t.footerLine, PW / 2, PH - 5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MID_GRAY);
  doc.text(String(pageNum), PW - MARGIN, PH - 5, { align: 'right' });
}

// ======== MAIN EXPORT ========
export async function generateBookletPDF(products, lang = 'en') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });
  const t = strings[lang] || strings.en;

  // 1. Cover page
  buildCoverPage(doc, t);

  // 2. Science / inside cover page
  buildSciencePage(doc, t);

  // 3-10. Product pages (front + back for each)
  let pageNum = 3;
  for (const product of products) {
    let productImage = null;
    if (product.image) {
      productImage = await loadImage(product.image);
    }
    const ptData = lang === 'pt' ? productTranslationsPT[product.id] : null;
    buildProductFront(doc, product, productImage, pageNum, t, ptData);
    pageNum++;
    buildProductBack(doc, product, pageNum, t, ptData, lang);
    pageNum++;
  }

  doc.save(t.fileName);
}
