import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, whatsapp, source, lang } = req.body;

  if (!name || !whatsapp) {
    return res.status(400).json({ error: 'Name and WhatsApp are required' });
  }

  try {
    const lead = {
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      source: source || 'ebook-lead',
      lang: lang || 'en',
      capturedAt: new Date().toISOString(),
      downloaded: true,
    };

    // Append to a daily leads file for easy export
    const today = new Date().toISOString().split('T')[0];
    const blobPath = `leads/${today}.json`;

    // Try to load existing leads for today
    let leads = [];
    try {
      const { blobs } = await list({ prefix: blobPath, limit: 1 });
      if (blobs && blobs.length > 0) {
        const existing = await fetch(blobs[0].url);
        if (existing.ok) {
          leads = await existing.json();
        }
      }
    } catch (e) {
      // No existing file, start fresh
    }

    leads.push(lead);

    await put(blobPath, JSON.stringify(leads, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });

    // Also store individual lead for easy lookup
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    await put(`leads/individual/${id}.json`, JSON.stringify(lead), {
      access: 'public',
      contentType: 'application/json',
    });

    return res.status(200).json({ success: true, id });
  } catch (err) {
    console.error('Lead capture error:', err);
    return res.status(500).json({ error: 'Failed to save lead' });
  }
}
