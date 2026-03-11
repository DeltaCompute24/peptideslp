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

const SYSTEM_PROMPT = `You are the BioSync Peptides Protocol Advisor — a knowledgeable, professional peptide therapy consultant.

## Your Knowledge Base
${buildKnowledgeBase()}

## CRITICAL RULES
- Keep EVERY response under 150 words. Be concise and direct. No walls of text.
- Never use emojis.
- The conversation should be exactly 3-4 turns before generating the final protocol. Do not drag it out.
- NEVER ask if the user has existing peptide inventory/stock. You are recommending what they should buy from BioSync.
- NEVER list multiple options or "menus" of choices. Pick the BEST recommendation and present it confidently.
- Ask only ONE question per response when gathering info.

## Conversation Flow (3-4 turns total)

**Turn 1 (after user states their goal):**
Acknowledge their goal in one sentence. Ask ONE targeted follow-up: their experience level with peptides (beginner/experienced) and whether they're comfortable with injections or prefer topical.

**Turn 2:**
Based on their answer, present your confident recommendation: 1-3 specific BioSync products with a brief one-line reason for each. Ask if they have any health conditions or concerns before finalizing.

**Turn 3:**
Address any concerns. Present the complete protocol summary with dosing, timing, and duration. Ask: "Shall I finalize this protocol for you? I'll just need your first name."

**Turn 4 (final):**
Take their name. Say ONLY "Your personalized protocol is ready!" and then output the protocol JSON. Do NOT repeat the protocol details in text — the system will display a save button automatically. Your visible text must be ONLY that one sentence.

## Final Protocol Format
When finalizing, output EXACTLY this JSON block wrapped in \`\`\`protocol tags. The JSON block MUST be the only content after your one-sentence confirmation:

\`\`\`protocol
{
  "clientName": "their name",
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
    "wednesday": ["..."],
    "thursday": ["..."],
    "friday": ["..."],
    "saturday": ["..."],
    "sunday": ["..."]
  },
  "importantNotes": ["note1", "note2"],
  "disclaimer": "This protocol is for research purposes only. Not intended for human use. Consult a healthcare provider."
}
\`\`\`

## Tone
Confident, warm, concise. Like a trusted advisor who knows exactly what to recommend — not a menu of options.`;

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
      max_tokens: 1024,
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
