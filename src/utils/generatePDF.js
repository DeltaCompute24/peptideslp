import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Color palette
const TEAL = [13, 148, 136];
const DARK = [12, 25, 41];
const GRAY = [100, 116, 139];
const LIGHT_GRAY = [241, 245, 249];
const WHITE = [255, 255, 255];
const RED = [220, 38, 38];
const AMBER = [146, 64, 14];
const GREEN = [22, 101, 52];

function addPageNumber(doc, pageNum, totalLabel) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setFontSize(7.5);
  doc.setTextColor(...GRAY);
  doc.text(`${pageNum}`, w / 2, h - 10, { align: 'center' });
  doc.text('BIOSYNC PEPTIDES', 20, h - 10);
  doc.text(totalLabel, w - 20, h - 10, { align: 'right' });
}

function addSectionHeader(doc, y, title, subtitle) {
  const w = doc.internal.pageSize.getWidth();
  // Teal bar
  doc.setFillColor(...TEAL);
  doc.rect(20, y, w - 40, 0.8, 'F');
  y += 6;
  doc.setFontSize(16);
  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 20, y);
  if (subtitle) {
    y += 5;
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.setFont('helvetica', 'normal');
    doc.text(subtitle, 20, y);
  }
  return y + 8;
}

function checkPageBreak(doc, y, needed, pageNum, footerLabel) {
  const h = doc.internal.pageSize.getHeight();
  if (y + needed > h - 20) {
    addPageNumber(doc, pageNum[0], footerLabel);
    doc.addPage();
    pageNum[0]++;
    return 25;
  }
  return y;
}

function wrapText(doc, text, maxWidth) {
  return doc.splitTextToSize(text || '', maxWidth);
}

function safeSetOpacity(doc, opacity) {
  try {
    if (doc.GState) {
      doc.setGState(new doc.GState({ opacity }));
    }
  } catch (e) {
    // GState not available in this jsPDF version — skip transparency
  }
}

export function generateEbookPDF(protocolDictionary, protocolCategories, reconstitutionGuide, peptideGlossary, lang = 'pt') {
  const doc = new jsPDF('p', 'mm', 'a4');
  const w = doc.internal.pageSize.getWidth(); // 210
  const contentW = w - 40; // 170
  const pageNum = [1];
  const isPT = lang === 'pt';

  const footerLabel = isPT ? 'Dicionario de Protocolos de Peptideos' : 'Peptide Protocol Dictionary';

  // ═══════════════════════════════════════════
  // COVER PAGE
  // ═══════════════════════════════════════════
  doc.setFillColor(...DARK);
  doc.rect(0, 0, w, doc.internal.pageSize.getHeight(), 'F');

  // Decorative teal circle
  doc.setFillColor(13, 148, 136);
  safeSetOpacity(doc, 0.08);
  doc.circle(160, 80, 80, 'F');
  doc.circle(50, 220, 60, 'F');
  safeSetOpacity(doc, 1);

  // Top accent line
  doc.setFillColor(...TEAL);
  doc.rect(20, 30, 50, 1.2, 'F');

  // Brand
  doc.setFontSize(11);
  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.text('BIOSYNC PEPTIDES', 20, 42);

  // Title
  doc.setFontSize(36);
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  const title1 = isPT ? 'Dicionario' : 'The Complete';
  const title2 = isPT ? 'Completo de' : 'Peptide Protocol';
  const title3 = isPT ? 'Protocolos' : 'Dictionary';
  doc.text(title1, 20, 75);
  doc.text(title2, 20, 90);
  doc.text(title3, 20, 105);

  // Subtitle
  doc.setFontSize(11);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  const sub = isPT
    ? 'Protocolos baseados em evidencias, guias de dosagem e dados'
    : 'Evidence-based protocols, dosing guides, and scientific data';
  const sub2 = isPT
    ? 'cientificos para 27 peptideos em 8 categorias terapeuticas.'
    : 'for 27 peptides across 8 therapeutic categories.';
  doc.text(sub, 20, 120);
  doc.text(sub2, 20, 126);

  // Stats boxes
  const stats = isPT
    ? [['27', 'Peptideos'], ['8', 'Categorias'], ['100+', 'Estudos']]
    : [['27', 'Peptides'], ['8', 'Categories'], ['100+', 'Studies']];

  stats.forEach((s, i) => {
    const bx = 20 + i * 58;
    doc.setFillColor(255, 255, 255);
    safeSetOpacity(doc, 0.06);
    doc.roundedRect(bx, 140, 50, 28, 3, 3, 'F');
    safeSetOpacity(doc, 1);
    doc.setFontSize(20);
    doc.setTextColor(...TEAL);
    doc.setFont('helvetica', 'bold');
    doc.text(s[0], bx + 25, 154, { align: 'center' });
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.setFont('helvetica', 'normal');
    doc.text(s[1], bx + 25, 162, { align: 'center' });
  });

  // Disclaimer
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  const disc = isPT
    ? 'Apenas para fins educacionais e de pesquisa. Nao constitui aconselhamento medico.'
    : 'For educational and research purposes only. Not medical advice.';
  doc.text(disc, 20, 260);
  doc.text('2026 BioSync Peptides. All rights reserved.', 20, 265);

  addPageNumber(doc, pageNum[0], footerLabel);
  doc.addPage();
  pageNum[0]++;

  // ═══════════════════════════════════════════
  // TABLE OF CONTENTS
  // ═══════════════════════════════════════════
  let y = 25;
  doc.setFillColor(...TEAL);
  doc.rect(20, y, 50, 1, 'F');
  y += 8;
  doc.setFontSize(22);
  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'Sumario' : 'Table of Contents', 20, y);
  y += 12;

  protocolCategories.forEach((cat, i) => {
    y = checkPageBreak(doc, y, 18, pageNum, footerLabel);
    // Category number + name
    doc.setFontSize(8);
    doc.setTextColor(...TEAL);
    doc.setFont('helvetica', 'bold');
    doc.text(`${isPT ? 'CAPITULO' : 'CHAPTER'} ${i + 1}`, 20, y);
    y += 5;
    doc.setFontSize(12);
    doc.setTextColor(...DARK);
    doc.text(cat.name, 20, y);
    y += 4;
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    doc.setFont('helvetica', 'normal');
    const descLines = wrapText(doc, cat.description, contentW);
    doc.text(descLines, 20, y);
    y += descLines.length * 3.5 + 2;
    // Peptide names
    doc.setFontSize(7.5);
    doc.setTextColor(...TEAL);
    const names = cat.peptideIds.map(pid => {
      const p = protocolDictionary.find(pr => pr.id === pid);
      return p ? p.name.split(' (')[0].split(' —')[0] : pid;
    }).join('  |  ');
    doc.text(names, 20, y);
    y += 8;
  });

  // Appendices
  y += 4;
  doc.setFontSize(8);
  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'APENDICE A' : 'APPENDIX A', 20, y);
  y += 5;
  doc.setFontSize(12);
  doc.setTextColor(...DARK);
  doc.text(isPT ? 'Guia de Reconstituicao e Administracao' : 'Reconstitution & Administration Guide', 20, y);
  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'APENDICE B' : 'APPENDIX B', 20, y);
  y += 5;
  doc.setFontSize(12);
  doc.setTextColor(...DARK);
  doc.text(isPT ? 'Glossario' : 'Glossary', 20, y);

  addPageNumber(doc, pageNum[0], footerLabel);
  doc.addPage();
  pageNum[0]++;

  // ═══════════════════════════════════════════
  // PROTOCOL PAGES — BY CATEGORY
  // ═══════════════════════════════════════════
  protocolCategories.forEach((cat, catIdx) => {
    // Category title page
    y = 25;
    doc.setFillColor(...TEAL);
    doc.rect(20, y, contentW, 0.8, 'F');
    y += 8;

    doc.setFontSize(9);
    doc.setTextColor(...TEAL);
    doc.setFont('helvetica', 'bold');
    doc.text(`${isPT ? 'CAPITULO' : 'CHAPTER'} ${catIdx + 1}`, 20, y);
    y += 7;

    doc.setFontSize(20);
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'bold');
    doc.text(cat.name, 20, y);
    y += 6;

    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.setFont('helvetica', 'normal');
    const catDesc = wrapText(doc, cat.description, contentW);
    doc.text(catDesc, 20, y);
    y += catDesc.length * 4 + 10;

    // Each protocol in this category
    const protocols = cat.peptideIds
      .map(pid => protocolDictionary.find(pr => pr.id === pid))
      .filter(Boolean);

    protocols.forEach((protocol) => {
      y = checkPageBreak(doc, y, 60, pageNum, footerLabel);

      // Protocol name header
      doc.setFillColor(...LIGHT_GRAY);
      doc.roundedRect(20, y - 3, contentW, 10, 2, 2, 'F');
      doc.setFontSize(13);
      doc.setTextColor(...DARK);
      doc.setFont('helvetica', 'bold');
      doc.text(protocol.name, 24, y + 4);
      y += 12;

      // Class + Evidence badge
      if (protocol.class || protocol.evidenceLevel) {
        doc.setFontSize(8);
        doc.setTextColor(...TEAL);
        doc.setFont('helvetica', 'bold');
        let badgeText = '';
        if (protocol.class) badgeText += protocol.class;
        if (protocol.evidenceLevel) {
          if (badgeText) badgeText += '  |  ';
          badgeText += protocol.evidenceLevel;
        }
        doc.text(badgeText, 24, y);
        y += 6;
      }

      // Molecular data row
      const molData = [];
      if (protocol.casNumber) molData.push(['CAS', protocol.casNumber]);
      if (protocol.molecularFormula) molData.push([isPT ? 'Formula' : 'Formula', protocol.molecularFormula]);
      if (protocol.molecularWeight) molData.push([isPT ? 'Peso Mol.' : 'Mol. Wt.', protocol.molecularWeight]);

      if (molData.length > 0) {
        y = checkPageBreak(doc, y, 12, pageNum, footerLabel);
        doc.setFontSize(7);
        molData.forEach((item, i) => {
          const bx = 24 + i * 57;
          doc.setTextColor(...GRAY);
          doc.setFont('helvetica', 'normal');
          doc.text(item[0], bx, y);
          doc.setTextColor(...DARK);
          doc.setFont('helvetica', 'bold');
          doc.text(item[1], bx, y + 3.5);
        });
        y += 10;
      }

      // Mechanism
      if (protocol.mechanism) {
        y = checkPageBreak(doc, y, 20, pageNum, footerLabel);
        doc.setFontSize(9);
        doc.setTextColor(...TEAL);
        doc.setFont('helvetica', 'bold');
        doc.text(isPT ? 'Mecanismo de Acao' : 'Mechanism of Action', 24, y);
        y += 5;
        doc.setFontSize(8.5);
        doc.setTextColor(...DARK);
        doc.setFont('helvetica', 'normal');
        const mechLines = wrapText(doc, protocol.mechanism, contentW - 8);
        doc.text(mechLines, 24, y);
        y += mechLines.length * 3.8 + 4;
      }

      // Dosing Protocol
      if (protocol.protocol) {
        y = checkPageBreak(doc, y, 25, pageNum, footerLabel);
        doc.setFontSize(9);
        doc.setTextColor(...TEAL);
        doc.setFont('helvetica', 'bold');
        doc.text(isPT ? 'Protocolo de Dosagem' : 'Dosing Protocol', 24, y);
        y += 5;

        const proto = protocol.protocol;

        // Titration table
        if (proto.titration && Array.isArray(proto.titration)) {
          const tableData = proto.titration.map(step => [
            step.weeks || step.week || '',
            step.dose + (step.frequency ? `, ${step.frequency}` : '')
          ]);
          autoTable(doc, {
            startY: y,
            margin: { left: 24, right: 20 },
            head: [[isPT ? 'Periodo' : 'Period', isPT ? 'Dose' : 'Dose']],
            body: tableData,
            styles: { fontSize: 8, cellPadding: 2.5, textColor: DARK, lineColor: LIGHT_GRAY, lineWidth: 0.3 },
            headStyles: { fillColor: TEAL, textColor: WHITE, fontStyle: 'bold', fontSize: 7.5 },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            theme: 'grid'
          });
          y = doc.lastAutoTable.finalY + 4;
        }

        // Wellness protocol table
        if (proto.wellnessProtocol && Array.isArray(proto.wellnessProtocol)) {
          const tableData = proto.wellnessProtocol.map(step => [
            step.weeks || step.week || '',
            step.dose + (step.frequency ? `, ${step.frequency}` : '')
          ]);
          autoTable(doc, {
            startY: y,
            margin: { left: 24, right: 20 },
            head: [[isPT ? 'Periodo' : 'Period', isPT ? 'Dose' : 'Dose']],
            body: tableData,
            styles: { fontSize: 8, cellPadding: 2.5, textColor: DARK, lineColor: LIGHT_GRAY, lineWidth: 0.3 },
            headStyles: { fillColor: TEAL, textColor: WHITE, fontStyle: 'bold', fontSize: 7.5 },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            theme: 'grid'
          });
          y = doc.lastAutoTable.finalY + 4;
        }

        // Components table (for stacks)
        if (proto.components && Array.isArray(proto.components)) {
          const tableData = proto.components.map(c => [c.peptide, c.dose, c.timing]);
          autoTable(doc, {
            startY: y,
            margin: { left: 24, right: 20 },
            head: [['Peptideo', isPT ? 'Dose' : 'Dose', isPT ? 'Horario' : 'Timing']],
            body: tableData,
            styles: { fontSize: 8, cellPadding: 2.5, textColor: DARK, lineColor: LIGHT_GRAY, lineWidth: 0.3 },
            headStyles: { fillColor: TEAL, textColor: WHITE, fontStyle: 'bold', fontSize: 7.5 },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            theme: 'grid'
          });
          y = doc.lastAutoTable.finalY + 4;
        }

        // Expected timeline
        if (proto.expectedTimeline && Array.isArray(proto.expectedTimeline)) {
          const tableData = proto.expectedTimeline.map(t => [
            `${isPT ? 'Sem.' : 'Wk'} ${t.weeks}`, t.effect
          ]);
          autoTable(doc, {
            startY: y,
            margin: { left: 24, right: 20 },
            head: [[isPT ? 'Periodo' : 'Period', isPT ? 'Efeito Esperado' : 'Expected Effect']],
            body: tableData,
            styles: { fontSize: 8, cellPadding: 2.5, textColor: GREEN, lineColor: [187, 247, 208], lineWidth: 0.3 },
            headStyles: { fillColor: [22, 101, 52], textColor: WHITE, fontStyle: 'bold', fontSize: 7.5 },
            alternateRowStyles: { fillColor: [240, 253, 244] },
            theme: 'grid'
          });
          y = doc.lastAutoTable.finalY + 4;
        }

        // Simple protocol fields
        const simpleFields = [];
        Object.entries(proto).forEach(([key, val]) => {
          if (typeof val === 'string') {
            const label = formatKeyPDF(key, isPT);
            simpleFields.push([label, val]);
          }
        });

        // Sub-objects (withoutDAC, withDAC, injectable, topical, etc.)
        Object.entries(proto).forEach(([key, val]) => {
          if (typeof val === 'object' && val !== null && !Array.isArray(val) && key !== 'optionA' && key !== 'optionB') {
            Object.entries(val).forEach(([k, v]) => {
              if (typeof v === 'string' || typeof v === 'boolean') {
                const label = `${formatKeyPDF(key, isPT)} - ${formatKeyPDF(k, isPT)}`;
                simpleFields.push([label, String(v)]);
              }
            });
          }
        });

        // Options A/B
        ['optionA', 'optionB'].forEach(optKey => {
          if (proto[optKey]) {
            Object.entries(proto[optKey]).forEach(([k, v]) => {
              if (typeof v === 'string') {
                const label = `${proto[optKey].label || optKey} - ${formatKeyPDF(k, isPT)}`;
                simpleFields.push([label, v]);
              }
            });
          }
        });

        if (simpleFields.length > 0) {
          y = checkPageBreak(doc, y, simpleFields.length * 5 + 5, pageNum, footerLabel);
          autoTable(doc, {
            startY: y,
            margin: { left: 24, right: 20 },
            body: simpleFields,
            styles: { fontSize: 8, cellPadding: 2.5, textColor: DARK, lineColor: LIGHT_GRAY, lineWidth: 0.2 },
            columnStyles: {
              0: { fontStyle: 'bold', cellWidth: 50, textColor: GRAY },
              1: { cellWidth: 'auto' }
            },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            theme: 'plain'
          });
          y = doc.lastAutoTable.finalY + 4;
        }
      }

      // Research Highlights
      if (protocol.researchHighlights && protocol.researchHighlights.length > 0) {
        y = checkPageBreak(doc, y, 15, pageNum, footerLabel);
        doc.setFontSize(9);
        doc.setTextColor(...TEAL);
        doc.setFont('helvetica', 'bold');
        doc.text(isPT ? 'Destaques da Pesquisa' : 'Research Highlights', 24, y);
        y += 5;

        protocol.researchHighlights.forEach(r => {
          y = checkPageBreak(doc, y, 8, pageNum, footerLabel);
          doc.setFontSize(8);
          doc.setTextColor(...GREEN);
          doc.setFont('helvetica', 'bold');
          doc.text('+', 24, y);
          doc.setTextColor(...DARK);
          doc.setFont('helvetica', 'normal');
          const lines = wrapText(doc, r, contentW - 14);
          doc.text(lines, 30, y);
          y += lines.length * 3.5 + 1.5;
        });
        y += 2;
      }

      // Contraindications
      if (protocol.contraindications && protocol.contraindications.length > 0) {
        y = checkPageBreak(doc, y, 12, pageNum, footerLabel);
        doc.setFontSize(9);
        doc.setTextColor(...RED);
        doc.setFont('helvetica', 'bold');
        doc.text(isPT ? 'Contraindicacoes' : 'Contraindications', 24, y);
        y += 5;

        protocol.contraindications.forEach(c => {
          y = checkPageBreak(doc, y, 6, pageNum, footerLabel);
          doc.setFontSize(8);
          doc.setTextColor(153, 27, 27);
          doc.setFont('helvetica', 'normal');
          doc.text(`-  ${c}`, 26, y);
          y += 4;
        });
        y += 2;
      }

      // Side Effects
      if (protocol.sideEffects && protocol.sideEffects.length > 0) {
        y = checkPageBreak(doc, y, 10, pageNum, footerLabel);
        doc.setFontSize(9);
        doc.setTextColor(...AMBER);
        doc.setFont('helvetica', 'bold');
        doc.text(isPT ? 'Efeitos Colaterais' : 'Side Effects', 24, y);
        y += 5;
        doc.setFontSize(8);
        doc.setTextColor(...AMBER);
        doc.setFont('helvetica', 'normal');
        doc.text(protocol.sideEffects.join('  |  '), 26, y);
        y += 6;
      }

      // Divider between protocols
      y += 2;
      doc.setDrawColor(...LIGHT_GRAY);
      doc.setLineWidth(0.3);
      doc.line(20, y, w - 20, y);
      y += 8;
    });

    addPageNumber(doc, pageNum[0], footerLabel);
    if (catIdx < protocolCategories.length - 1) {
      doc.addPage();
      pageNum[0]++;
    }
  });

  // ═══════════════════════════════════════════
  // APPENDIX A — RECONSTITUTION GUIDE
  // ═══════════════════════════════════════════
  doc.addPage();
  pageNum[0]++;
  y = 25;

  y = addSectionHeader(doc, y,
    isPT ? 'Guia de Reconstituicao e Administracao' : 'Reconstitution & Administration Guide',
    isPT ? 'APENDICE A' : 'APPENDIX A'
  );

  // Supplies
  doc.setFontSize(10);
  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'Materiais Necessarios' : 'Required Supplies', 24, y);
  y += 5;

  reconstitutionGuide.supplies.forEach((s, i) => {
    doc.setFontSize(8.5);
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'normal');
    doc.text(`${i + 1}.  ${s}`, 28, y);
    y += 4.5;
  });
  y += 4;

  // Steps
  doc.setFontSize(10);
  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'Etapas de Reconstituicao' : 'Reconstitution Steps', 24, y);
  y += 6;

  reconstitutionGuide.steps.forEach((s) => {
    y = checkPageBreak(doc, y, 14, pageNum, footerLabel);

    const isWarning = s.step === 6;
    if (isWarning) {
      doc.setFillColor(254, 243, 199);
      doc.roundedRect(24, y - 3, contentW - 8, 12, 1.5, 1.5, 'F');
    }

    // Step number circle
    doc.setFillColor(isWarning ? 245 : 13, isWarning ? 158 : 148, isWarning ? 11 : 136);
    doc.circle(30, y + 1.5, 3.5, 'F');
    doc.setFontSize(8);
    doc.setTextColor(...WHITE);
    doc.setFont('helvetica', 'bold');
    doc.text(String(s.step), 30, y + 2.5, { align: 'center' });

    // Step text
    doc.setFontSize(8.5);
    doc.setTextColor(...(isWarning ? [146, 64, 14] : DARK));
    doc.setFont('helvetica', 'normal');
    const lines = wrapText(doc, s.action, contentW - 24);
    doc.text(lines, 38, y + 1);
    y += Math.max(lines.length * 3.8, 6) + 4;
  });
  y += 4;

  // Dosing Formula
  y = checkPageBreak(doc, y, 35, pageNum, footerLabel);
  doc.setFontSize(10);
  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'Calculo de Dosagem' : 'Dosing Calculation', 24, y);
  y += 6;

  // Formula box
  doc.setFillColor(...DARK);
  doc.roundedRect(24, y, contentW - 8, 18, 2, 2, 'F');
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'FORMULA' : 'FORMULA', 28, y + 5);
  doc.setFontSize(8);
  doc.setTextColor(...WHITE);
  doc.setFont('courier', 'normal');
  doc.text(isPT
    ? 'Concentracao = Quantidade (mcg) / Volume Agua (mL)'
    : 'Concentration = Peptide Amount (mcg) / BAC Water (mL)', 28, y + 10);
  doc.text(isPT
    ? 'Vol. Injecao = Dose Alvo (mcg) / Concentracao (mcg/mL)'
    : 'Injection Vol = Target Dose (mcg) / Concentration (mcg/mL)', 28, y + 14.5);
  y += 22;

  // Example box
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(24, y, contentW - 8, 14, 2, 2, 'F');
  doc.setFontSize(7);
  doc.setTextColor(...GREEN);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'EXEMPLO' : 'EXAMPLE', 28, y + 4.5);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(isPT
    ? '5mg peptideo + 2 mL agua BAC = 2.500 mcg/mL    |    Dose: 500 mcg / 2.500 = 0,2 mL (20 unid.)'
    : '5mg peptide + 2 mL BAC water = 2,500 mcg/mL    |    Dose: 500 mcg / 2,500 = 0.2 mL (20 units)',
    28, y + 10);
  y += 20;

  // Syringe conversion table
  y = checkPageBreak(doc, y, 30, pageNum, footerLabel);
  doc.setFontSize(10);
  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'Conversao de Seringa (U-100)' : 'Syringe Conversion (U-100)', 24, y);
  y += 4;

  const syringeData = reconstitutionGuide.syringeConversion.map(row => [
    `${row.units} ${isPT ? 'unid.' : 'units'}`,
    `${row.mL} mL`,
    `${(row.mL * 2500).toFixed(0)} mcg`
  ]);

  autoTable(doc, {
    startY: y,
    margin: { left: 24, right: 20 },
    head: [[isPT ? 'Unidades' : 'Units', 'mL', isPT ? 'Se 2.500 mcg/mL' : 'If 2,500 mcg/mL']],
    body: syringeData,
    styles: { fontSize: 8.5, cellPadding: 3, textColor: DARK, lineColor: LIGHT_GRAY, lineWidth: 0.3 },
    headStyles: { fillColor: TEAL, textColor: WHITE, fontStyle: 'bold' },
    columnStyles: { 2: { textColor: TEAL, fontStyle: 'bold' } },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    theme: 'grid'
  });
  y = doc.lastAutoTable.finalY + 8;

  // Injection sites
  y = checkPageBreak(doc, y, 25, pageNum, footerLabel);
  doc.setFontSize(10);
  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'Locais e Tecnica de Injecao' : 'Injection Sites & Technique', 24, y);
  y += 5;

  reconstitutionGuide.injectionSites.forEach(s => {
    doc.setFontSize(8.5);
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'normal');
    doc.text(`-  ${s}`, 28, y);
    y += 4.5;
  });
  y += 3;

  reconstitutionGuide.injectionTechnique.forEach((t, i) => {
    y = checkPageBreak(doc, y, 6, pageNum, footerLabel);
    doc.setFontSize(8.5);
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'normal');
    doc.text(`${i + 1}.  ${t}`, 28, y);
    y += 4.5;
  });
  y += 4;

  // Storage
  y = checkPageBreak(doc, y, 25, pageNum, footerLabel);
  doc.setFontSize(10);
  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.text(isPT ? 'Diretrizes de Armazenamento' : 'Storage Guidelines', 24, y);
  y += 5;

  Object.entries(reconstitutionGuide.storage).forEach(([key, val]) => {
    y = checkPageBreak(doc, y, 10, pageNum, footerLabel);
    doc.setFontSize(7.5);
    doc.setTextColor(...TEAL);
    doc.setFont('helvetica', 'bold');
    doc.text(key.toUpperCase(), 28, y);
    y += 3.5;
    doc.setFontSize(8.5);
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'normal');
    const lines = wrapText(doc, val, contentW - 16);
    doc.text(lines, 28, y);
    y += lines.length * 3.5 + 3;
  });

  addPageNumber(doc, pageNum[0], footerLabel);

  // ═══════════════════════════════════════════
  // APPENDIX B — GLOSSARY
  // ═══════════════════════════════════════════
  doc.addPage();
  pageNum[0]++;
  y = 25;

  y = addSectionHeader(doc, y,
    isPT ? 'Glossario' : 'Glossary',
    isPT ? 'APENDICE B' : 'APPENDIX B'
  );

  const glossaryData = peptideGlossary.map(item => [item.term, item.definition]);

  autoTable(doc, {
    startY: y,
    margin: { left: 24, right: 20 },
    head: [[isPT ? 'Termo' : 'Term', isPT ? 'Definicao' : 'Definition']],
    body: glossaryData,
    styles: { fontSize: 8, cellPadding: 3.5, textColor: DARK, lineColor: LIGHT_GRAY, lineWidth: 0.2, overflow: 'linebreak' },
    headStyles: { fillColor: TEAL, textColor: WHITE, fontStyle: 'bold' },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 42, textColor: [15, 118, 110] },
      1: { cellWidth: 'auto' }
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    theme: 'grid',
    didDrawPage: () => {
      addPageNumber(doc, pageNum[0], footerLabel);
    }
  });

  // Final page number
  addPageNumber(doc, pageNum[0], footerLabel);

  // ═══════════════════════════════════════════
  // BACK COVER
  // ═══════════════════════════════════════════
  doc.addPage();
  pageNum[0]++;
  const h = doc.internal.pageSize.getHeight();
  doc.setFillColor(...DARK);
  doc.rect(0, 0, w, h, 'F');

  doc.setFillColor(13, 148, 136);
  safeSetOpacity(doc, 0.06);
  doc.circle(105, 120, 90, 'F');
  safeSetOpacity(doc, 1);

  doc.setFontSize(11);
  doc.setTextColor(...TEAL);
  doc.setFont('helvetica', 'bold');
  doc.text('BIOSYNC PEPTIDES', w / 2, 100, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(...WHITE);
  doc.text(isPT ? 'Dicionario de Protocolos' : 'Protocol Dictionary', w / 2, 115, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(180, 180, 180);
  doc.setFont('helvetica', 'normal');
  doc.text(isPT
    ? 'Apenas para fins educacionais e de pesquisa.'
    : 'For educational and research purposes only.',
    w / 2, 130, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('biosyncpeptides.com', w / 2, 145, { align: 'center' });
  doc.text('2026 BioSync Peptides', w / 2, 150, { align: 'center' });

  return doc;
}

function formatKeyPDF(key, isPT) {
  const translations = {
    route: isPT ? 'Via' : 'Route',
    dose: isPT ? 'Dose' : 'Dose',
    timing: isPT ? 'Horario' : 'Timing',
    cycleDuration: isPT ? 'Duracao do Ciclo' : 'Cycle Duration',
    cyclePattern: isPT ? 'Padrao do Ciclo' : 'Cycle Pattern',
    frequency: isPT ? 'Frequencia' : 'Frequency',
    notes: isPT ? 'Observacoes' : 'Notes',
    reconstitution: isPT ? 'Reconstituicao' : 'Reconstitution',
    startingDose: isPT ? 'Dose Inicial' : 'Starting Dose',
    therapeuticDose: isPT ? 'Dose Terapeutica' : 'Therapeutic Dose',
    standardDose: isPT ? 'Dose Padrao' : 'Standard Dose',
    acuteDose: isPT ? 'Dose Aguda' : 'Acute Dose',
    maxFrequency: isPT ? 'Frequencia Maxima' : 'Max Frequency',
    fdaApproved: isPT ? 'Aprovado FDA' : 'FDA Approved',
    loadingPhase: isPT ? 'Fase de Carga' : 'Loading Phase',
    maintenancePhase: isPT ? 'Fase de Manutencao' : 'Maintenance Phase',
    standardProtocol: isPT ? 'Protocolo Padrao' : 'Standard Protocol',
    alternativeProtocol: isPT ? 'Protocolo Alternativo' : 'Alternative Protocol',
    advancedProtocol: isPT ? 'Protocolo Avancado' : 'Advanced Protocol',
    oralDose: isPT ? 'Dose Oral' : 'Oral Dose',
    subqDose: isPT ? 'Dose SubQ' : 'SubQ Dose',
    duration: isPT ? 'Duracao' : 'Duration',
    withoutDAC: isPT ? 'Sem DAC' : 'Without DAC',
    withDAC: isPT ? 'Com DAC' : 'With DAC',
    injectable: isPT ? 'Injetavel' : 'Injectable',
    topical: isPT ? 'Topico' : 'Topical',
    iv: 'IV',
    subcutaneous: isPT ? 'Subcutaneo' : 'Subcutaneous',
    intranasal: 'Intranasal',
    standard: isPT ? 'Padrao' : 'Standard',
    highDose: isPT ? 'Dose Alta' : 'High Dose',
    optimal: isPT ? 'Otimo' : 'Optimal',
    cognitiveEnhancement: isPT ? 'Melhora Cognitiva' : 'Cognitive Enhancement',
    neurodegenerative: isPT ? 'Neurodegenerativo' : 'Neurodegenerative',
    generalSupport: isPT ? 'Suporte Geral' : 'General Support',
    activeInfection: isPT ? 'Infeccao Ativa' : 'Active Infection',
    oral: 'Oral',
    transdermal: 'Transdermal',
    loadingPhase: isPT ? 'Fase de Carga' : 'Loading Phase',
    maintenanceTanning: isPT ? 'Manutencao Bronzeamento' : 'Maintenance Tanning',
    primary: isPT ? 'Primario' : 'Primary',
    ivBolus: isPT ? 'Bolus IV' : 'IV Bolus',
    label: isPT ? 'Opcao' : 'Option',
    bpc157: 'BPC-157',
    tb500: 'TB-500',
    monday: isPT ? 'Segunda' : 'Monday',
    thursday: isPT ? 'Quinta' : 'Thursday'
  };
  return translations[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();
}
