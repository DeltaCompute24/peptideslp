// Generate composite product images (spec card + AI vial photo)
// Run with: node scripts/generateProductImages.js
// Requires: npm install canvas

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const DEST = path.join(__dirname, '..', 'public', 'images', 'peptides');

const products = [
  {
    file: 'semaglutide-vial.png',
    ref: '156-089-PS',
    name: 'Semaglutide',
    subtitle: 'GLP-1 receptor agonist',
    cas: '910463-68-2',
    formula: 'C187H291N45O59',
    mw: '4113.58 g/mol',
    purity: '99% HPLC',
    concentration: '2.5 MG',
  },
  {
    file: 'tirzepatide-vial.png',
    ref: '162-044-PS',
    name: 'Tirzepatide',
    subtitle: 'Dual GLP-1/GIP agonist',
    cas: '2023788-19-2',
    formula: 'C225H348N48O68',
    mw: '4813.50 g/mol',
    purity: '99% HPLC',
    concentration: '5 MG',
  },
  {
    file: 'aod-9604-vial.png',
    ref: '134-071-PS',
    name: 'AOD-9604',
    subtitle: 'GH fragment peptide',
    cas: '221231-10-3',
    formula: 'C78H123N23O23S2',
    mw: '1815.12 g/mol',
    purity: '98% HPLC',
    concentration: '5 MG',
  },
  {
    file: 'epithalon-vial.png',
    ref: '152-091-PS',
    name: 'Epithalon',
    subtitle: 'Telomerase activator',
    cas: '307297-39-8',
    formula: 'C14H22N4O9',
    mw: '390.35 g/mol',
    purity: '99% HPLC',
    concentration: '10 MG',
  },
  {
    file: 'ghk-cu-vial.png',
    ref: '155-073-PS',
    name: 'GHK-Cu',
    subtitle: 'Copper peptide',
    cas: '49557-75-7',
    formula: 'C14H22CuN6O4',
    mw: '401.91 g/mol',
    purity: '99% HPLC',
    concentration: '50 MG',
  },
  {
    file: 'nad-plus-vial.png',
    ref: '167-101-PS',
    name: 'NAD+',
    subtitle: 'Coenzyme',
    cas: '53-84-9',
    formula: 'C21H27N7O14P2',
    mw: '663.43 g/mol',
    purity: '99% HPLC',
    concentration: '500 MG',
  },
  {
    file: 'pt-141-vial.png',
    ref: '158-067-PS',
    name: 'PT-141',
    subtitle: 'Bremelanotide',
    cas: '189691-06-3',
    formula: 'C50H68N14O10',
    mw: '1025.18 g/mol',
    purity: '99% HPLC',
    concentration: '10 MG',
  },
  {
    file: 'sermorelin-vial.png',
    ref: '129-054-PS',
    name: 'Sermorelin',
    subtitle: 'GHRH analog',
    cas: '86168-78-7',
    formula: 'C149H246N44O42S',
    mw: '3357.96 g/mol',
    purity: '98% HPLC',
    concentration: '5 MG',
  },
  {
    file: 'ipamorelin-vial.png',
    ref: '147-088-PS',
    name: 'Ipamorelin',
    subtitle: 'Ghrelin mimetic',
    cas: '170851-70-4',
    formula: 'C38H49N9O5',
    mw: '711.86 g/mol',
    purity: '99% HPLC',
    concentration: '5 MG',
  },
  {
    file: 'mots-c-vial.png',
    ref: '145-092-PS',
    name: 'MOTS-C',
    subtitle: 'Mitochondrial peptide',
    cas: '1627580-64-6',
    formula: 'C121H200N42O32S2',
    mw: '2174.52 g/mol',
    purity: '99% HPLC',
    concentration: '10 MG',
  },
  {
    file: 'bpc-157-vial.png',
    ref: '141-077-PS',
    name: 'BPC-157',
    subtitle: 'Body Protection Compound',
    cas: '137525-51-0',
    formula: 'C62H98N16O22',
    mw: '1419.56 g/mol',
    purity: '99% HPLC',
    concentration: '5 MG',
  },
  {
    file: 'tb-500-vial.png',
    ref: '138-065-PS',
    name: 'TB-500',
    subtitle: 'Thymosin Beta-4',
    cas: '77591-33-4',
    formula: 'C212H350N56O78S',
    mw: '4963.44 g/mol',
    purity: '99% HPLC',
    concentration: '5 MG',
  },
  {
    file: 'recovery-blend-vial.png',
    ref: '143-114-PS',
    name: 'Recovery Blend',
    subtitle: 'BPC-157 + TB-500 + KPV',
    cas: 'Blend',
    formula: 'Multi-peptide',
    mw: 'Total 30mg',
    purity: '99% HPLC',
    concentration: '30 MG',
    isBlend: true,
  },
  {
    file: 'cjc-ipamorelin-blend-vial.png',
    ref: '111-033-PS',
    name: 'CJC/Ipamorelin',
    subtitle: 'Growth Optimization Blend',
    cas: 'Blend',
    formula: 'Multi-peptide',
    mw: 'Total 10mg',
    purity: '99% HPLC',
    concentration: '10 MG',
    isBlend: true,
  },
];

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Draw the BioSync molecular logo (flipped — nodes extend left)
function drawLogo(ctx, cx, cy, size, color) {
  const s = size / 100;
  const nodes = [
    { x: 48, y: 50, r: 19 },  // center (bigger)
    { x: 80, y: 24, r: 8 },
    { x: 84, y: 66, r: 8 },
    { x: 20, y: 18, r: 7 },
    { x: 14, y: 54, r: 7 },
    { x: 28, y: 82, r: 8 },
  ];
  // Lines from center to outer nodes
  ctx.strokeStyle = color;
  ctx.lineWidth = 3 * s;
  ctx.lineCap = 'round';
  for (let i = 1; i < nodes.length; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + (nodes[0].x - 50) * s, cy + (nodes[0].y - 50) * s);
    ctx.lineTo(cx + (nodes[i].x - 50) * s, cy + (nodes[i].y - 50) * s);
    ctx.stroke();
  }
  // Circles
  ctx.fillStyle = color;
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(cx + (n.x - 50) * s, cy + (n.y - 50) * s, n.r * s, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawSpecCard(ctx, x, y, w, h, product) {
  // Card shadow
  ctx.shadowColor = 'rgba(0,0,0,0.18)';
  ctx.shadowBlur = 36;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 8;

  // White card
  roundedRect(ctx, x, y, w, h, 14);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.shadowColor = 'transparent';

  // Subtle border
  roundedRect(ctx, x, y, w, h, 14);
  ctx.strokeStyle = '#e2e5e9';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Teal header bar — taller for better proportions
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + 14, y);
  ctx.lineTo(x + w - 14, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + 14);
  ctx.lineTo(x + w, y + 74);
  ctx.lineTo(x, y + 74);
  ctx.lineTo(x, y + 14);
  ctx.quadraticCurveTo(x, y, x + 14, y);
  ctx.closePath();
  ctx.fillStyle = '#0d9488';
  ctx.fill();
  ctx.restore();

  // Logo icon in header
  drawLogo(ctx, x + 44, y + 37, 52, '#ffffff');

  // BioSync Peptide text in header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px Georgia, "Times New Roman", serif';
  ctx.fillText('BioSync Peptide', x + 80, y + 47);

  const lx = x + 40;
  const rx = x + w - 40;
  let cy = y + 108;

  // REF badge
  roundedRect(ctx, lx, cy - 18, 50, 26, 4);
  ctx.strokeStyle = '#999';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = '#666';
  ctx.font = 'bold 13px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('REF', lx + 11, cy);
  ctx.fillStyle = '#222';
  ctx.font = 'bold 18px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(product.ref, lx + 62, cy + 1);
  cy += 64;

  // Product name — large bold
  ctx.fillStyle = '#0a0a0a';
  ctx.font = 'bold 52px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(product.name, lx, cy);
  cy += 38;

  // Subtitle — bold italic
  ctx.fillStyle = '#222';
  ctx.font = 'bold italic 22px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(product.subtitle, lx, cy);
  cy += 52;

  // CAS # — bold label, regular value
  ctx.fillStyle = '#222';
  ctx.font = 'bold 20px "Helvetica Neue", Arial, sans-serif';
  const casLabel = 'CAS #: ';
  ctx.fillText(casLabel, lx, cy);
  const casLabelW = ctx.measureText(casLabel).width;
  ctx.font = '20px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(product.cas + '  |', lx + casLabelW, cy);
  cy += 34;

  // Formula label
  ctx.font = 'bold 20px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('Formula:', lx, cy);
  cy += 38;

  // Formula with subscripts — indented (or plain text for blends)
  ctx.fillStyle = '#222';
  const indent = lx + 20;
  if (product.isBlend || !product.formula.match(/[0-9]/)) {
    ctx.font = '20px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(product.formula + '  |', indent, cy);
  } else {
    let fx = indent;
    for (let i = 0; i < product.formula.length; i++) {
      const ch = product.formula[i];
      if (ch >= '0' && ch <= '9') {
        ctx.font = '16px "Helvetica Neue", Arial, sans-serif';
        ctx.fillText(ch, fx, cy + 6);
        fx += ctx.measureText(ch).width;
      } else {
        ctx.font = '24px "Helvetica Neue", Arial, sans-serif';
        ctx.fillText(ch, fx, cy);
        fx += ctx.measureText(ch).width;
      }
    }
    ctx.font = '20px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('  |', fx, cy);
  }
  cy += 38;

  // M.W. — bold label, regular value
  ctx.fillStyle = '#222';
  ctx.font = 'bold 20px "Helvetica Neue", Arial, sans-serif';
  const mwLabel = 'M.W.: ';
  ctx.fillText(mwLabel, lx, cy);
  const mwLabelW = ctx.measureText(mwLabel).width;
  ctx.font = '20px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(product.mw + '  |', lx + mwLabelW, cy);
  cy += 34;

  // PURITY — bold label, regular value
  ctx.font = 'bold 20px "Helvetica Neue", Arial, sans-serif';
  const purLabel = 'PURITY ';
  ctx.fillText(purLabel, lx, cy);
  const purLabelW = ctx.measureText(purLabel).width;
  ctx.font = '20px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(product.purity, lx + purLabelW, cy);
  cy += 60;

  // RUO badge — bigger
  roundedRect(ctx, lx, cy - 4, 58, 32, 4);
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#444';
  ctx.font = 'bold 16px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('RUO', lx + 12, cy + 18);
  ctx.fillStyle = '#111';
  ctx.font = 'bold 20px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('Research use only', lx + 70, cy + 19);
  cy += 52;

  // Website
  ctx.fillStyle = '#222';
  ctx.font = 'bold 16px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('www.biosyncpeptide.com', lx, cy);
}

async function generateImage(product, vialImg) {
  const W = 900;
  const H = 700;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Light background
  ctx.fillStyle = '#f0f2f5';
  ctx.fillRect(0, 0, W, H);

  const cardW = 460;
  const cardX = 20;
  const cardH = 660;

  // 1) Draw vial photo FIRST — CENTERED in the right portion of canvas
  if (vialImg) {
    const drawH = 620;
    const drawW = (vialImg.width / vialImg.height) * drawH;
    // Right slot starts after card ends, center vial in that space
    const slotLeft = cardX + cardW - 40; // allow slight overlap
    const slotRight = W;
    const slotCenterX = (slotLeft + slotRight) / 2;
    const vx = slotCenterX - drawW / 2;
    const vy = (H - drawH) / 2;
    ctx.drawImage(vialImg, vx, vy, drawW, drawH);

    // Overlay label content onto the blank vial label
    // Label area: roughly 42%-72% of vial height, centered horizontally
    const labelCX = vx + drawW * 0.50;
    // Label area: top ~45%, bottom ~72% of vial height
    const barY = vy + drawH * 0.435;  // brand bar at very top of label
    const labelW = drawW * 0.25;
    const labelMidY = vy + drawH * 0.58; // vertical center of label

    // --- Teal brand bar at top edge of label ---
    ctx.fillStyle = '#0d9488';
    const barLeft = labelCX - labelW / 2 + 4; // trim left edge in
    ctx.fillRect(barLeft, barY, labelW - 4, 26);

    // Logo in brand bar — molecular dots
    ctx.fillStyle = '#ffffff';
    // Center node
    ctx.beginPath();
    ctx.arc(barLeft + 14, barY + 13, 5, 0, Math.PI * 2);
    ctx.fill();
    // Outer nodes
    ctx.beginPath();
    ctx.arc(barLeft + 24, barY + 6, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(barLeft + 25, barY + 18, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(barLeft + 6, barY + 5, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(barLeft + 4, barY + 18, 2, 0, Math.PI * 2);
    ctx.fill();
    // Lines from center
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.8;
    const cx0 = barLeft + 14, cy0 = barY + 13;
    [[24,6],[25,18],[6,5],[4,18]].forEach(([dx,dy]) => {
      ctx.beginPath();
      ctx.moveTo(cx0, cy0);
      ctx.lineTo(barLeft + dx, barY + dy);
      ctx.stroke();
    });

    // Brand text in bar
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px Georgia, serif';
    ctx.fillText('BioSync Peptide', barLeft + 30, barY + 16);

    // --- Product text centered in label area ---
    // Product name — auto-scale for long names
    ctx.fillStyle = '#1a1a3e';
    let nameFontSize = 20;
    ctx.font = `bold ${nameFontSize}px "Helvetica Neue", Arial, sans-serif`;
    let nameW = ctx.measureText(product.name).width;
    const maxNameW = labelW - 10;
    while (nameW > maxNameW && nameFontSize > 10) {
      nameFontSize -= 1;
      ctx.font = `bold ${nameFontSize}px "Helvetica Neue", Arial, sans-serif`;
      nameW = ctx.measureText(product.name).width;
    }
    ctx.fillText(product.name, labelCX - nameW / 2, labelMidY - 20);

    // Subtitle italic
    ctx.fillStyle = '#444';
    ctx.font = 'italic 8px "Helvetica Neue", Arial, sans-serif';
    const subLine = product.subtitle;
    ctx.fillText(subLine, labelCX - ctx.measureText(subLine).width / 2, labelMidY - 4);

    // Concentration
    ctx.fillStyle = '#1a1a3e';
    ctx.font = 'bold 16px "Helvetica Neue", Arial, sans-serif';
    const concW = ctx.measureText(product.concentration).width;
    ctx.fillText(product.concentration, labelCX - concW / 2, labelMidY + 18);

    // Purity
    ctx.fillStyle = '#0d7377';
    ctx.font = 'bold 7px "Helvetica Neue", Arial, sans-serif';
    const purText = 'PURITY ' + product.purity;
    ctx.fillText(purText, labelCX - ctx.measureText(purText).width / 2, labelMidY + 32);

    // RUO small
    ctx.fillStyle = '#888';
    ctx.font = '6px "Helvetica Neue", Arial, sans-serif';
    const ruo = 'Research use only';
    ctx.fillText(ruo, labelCX - ctx.measureText(ruo).width / 2, labelMidY + 44);
  }

  // 2) Draw spec card ON TOP — left side
  drawSpecCard(ctx, cardX, 20, cardW, cardH, product);

  // Save
  const outPath = path.join(DEST, product.file);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated: ${product.file} (${buffer.length} bytes)`);
}

// Use a blank-label vial photo for all products — overlay product text per item
const SHARED_VIAL_PATH = '/tmp/blank-vial.png';

async function main() {
  if (!fs.existsSync(DEST)) {
    fs.mkdirSync(DEST, { recursive: true });
  }

  let vialImg = null;
  if (fs.existsSync(SHARED_VIAL_PATH)) {
    vialImg = await loadImage(SHARED_VIAL_PATH);
    console.log('Loaded shared vial photo for all products');
  } else {
    console.log('Warning: No vial photo found at ' + SHARED_VIAL_PATH);
  }

  for (const product of products) {
    await generateImage(product, vialImg);
  }

  console.log(`\nAll ${products.length} composite images generated in ${DEST}`);
}

main().catch(console.error);
