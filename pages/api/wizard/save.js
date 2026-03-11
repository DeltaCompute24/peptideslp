import { put } from '@vercel/blob';

function generateSlug(clientName, protocolName) {
  const clean = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 30);

  const nameSlug = clean(clientName);
  const protoSlug = clean(protocolName);
  const id = Math.random().toString(36).substring(2, 6);
  return `${nameSlug}-${protoSlug}-${id}`.replace(/-+/g, '-');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { protocol } = req.body;

  if (!protocol || !protocol.clientName || !protocol.products) {
    return res.status(400).json({ error: 'Invalid protocol data' });
  }

  try {
    const slug = generateSlug(protocol.clientName, protocol.protocolName || 'protocol');

    const record = {
      ...protocol,
      slug,
      createdAt: new Date().toISOString(),
      version: 1,
    };

    // Store as JSON file in Vercel Blob
    await put(`protocols/${slug}.json`, JSON.stringify(record), {
      access: 'public',
      contentType: 'application/json',
    });

    return res.status(200).json({ slug, url: `/protocol/${slug}` });
  } catch (err) {
    console.error('Save protocol error:', err);
    return res.status(500).json({ error: 'Failed to save protocol' });
  }
}
