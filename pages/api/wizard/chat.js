import Anthropic from '@anthropic-ai/sdk';
import { peptideProducts } from '../../../data/peptideProducts';
import { protocolDictionary, reconstitutionGuide, protocolCategories } from '../../../data/protocolDictionary';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Build the knowledge base for the system prompt
function buildKnowledgeBase() {
  const products = peptideProducts.map(p => ({
    name: p.name,
    category: p.category,
    type: p.type,
    tagline: p.tagline,
    description: p.description,
    benefits: p.benefits,
    specifications: p.specifications,
    dosage: p.dosage,
    contraindications: p.contraindications,
    researchData: p.researchData,
    composition: p.composition,
    concentration: p.specifications?.concentration || p.specifications?.totalAmount,
  }));

  const protocols = protocolDictionary.map(p => ({
    name: p.name,
    category: p.category,
    class: p.class,
    mechanism: p.mechanism,
    protocol: p.protocol,
    researchHighlights: p.researchHighlights,
    contraindications: p.contraindications,
    sideEffects: p.sideEffects,
    evidenceLevel: p.evidenceLevel,
  }));

  return JSON.stringify({ products, protocols, reconstitutionGuide, protocolCategories }, null, 0);
}

const SYSTEM_PROMPT = `You are the BioSync Peptides Protocol Advisor — a knowledgeable, professional peptide therapy consultant. You help clients build personalized peptide protocols based on their goals, constraints, and existing inventory.

## Your Knowledge Base
${buildKnowledgeBase()}

## Your Behavior
- Be warm, professional, and confident. You represent BioSync Peptides.
- Ask clarifying questions to understand the client's goals, health context, current peptides, and constraints.
- Recommend specific BioSync products with exact dosing protocols, timing, and cycle durations.
- When the client mentions they have a specific amount of a product, calculate exactly how long it will last at the recommended dosing.
- Always include reconstitution instructions when recommending injectable peptides.
- Mention relevant contraindications and side effects — be transparent but not alarmist.
- Reference research data when discussing efficacy.
- If the user's goals span multiple categories (e.g., weight loss + recovery), build a comprehensive multi-peptide protocol.

## Protocol Building Flow
1. Understand goals (what they want to achieve)
2. Understand constraints (budget, existing inventory, experience level, health conditions)
3. Recommend products and dosing
4. Refine based on feedback
5. When the client confirms they're satisfied, output the FINAL protocol in a structured format

## Final Protocol Format
When the client confirms the protocol is complete, output EXACTLY this JSON block wrapped in \`\`\`protocol tags:

\`\`\`protocol
{
  "clientName": "their name or alias",
  "protocolName": "descriptive protocol name",
  "duration": "total weeks",
  "goals": ["goal1", "goal2"],
  "products": [
    {
      "name": "Product Name",
      "dosage": "exact dose",
      "frequency": "how often",
      "timing": "when to take",
      "route": "administration route",
      "duration": "how long",
      "reconstitution": "instructions if applicable",
      "notes": "any special notes"
    }
  ],
  "weeklySchedule": {
    "monday": ["Product A - dose", "Product B - dose"],
    "tuesday": ["Product A - dose"],
    ...etc
  },
  "importantNotes": ["note1", "note2"],
  "disclaimer": "This protocol is for research purposes only. Not intended for human use. Consult a healthcare provider."
}
\`\`\`

IMPORTANT: Only output the protocol JSON when the client explicitly confirms they are satisfied and want to finalize. Do NOT output it prematurely.

## Tone
Speak like a knowledgeable advisor at a premium peptide clinic. Use clear language, not overly technical. Format responses with markdown for readability.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array required' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  try {
    // Set up streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Claude API error:', err);
    // If headers already sent, try to send error in stream
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}
