import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // List all daily lead files
    const { blobs } = await list({ prefix: 'leads/', limit: 100 });

    // Filter to only daily aggregate files (not individual/)
    const dailyBlobs = blobs.filter(b => !b.pathname.includes('individual/'));

    // Fetch all daily files and merge leads
    const allLeads = [];
    for (const blob of dailyBlobs) {
      try {
        const response = await fetch(blob.url);
        if (response.ok) {
          const dayLeads = await response.json();
          if (Array.isArray(dayLeads)) {
            allLeads.push(...dayLeads);
          }
        }
      } catch (e) {
        // Skip corrupted files
      }
    }

    // Sort newest first
    allLeads.sort((a, b) => new Date(b.capturedAt) - new Date(a.capturedAt));

    return res.status(200).json({ leads: allLeads, total: allLeads.length });
  } catch (err) {
    console.error('List leads error:', err);
    return res.status(500).json({ error: 'Failed to fetch leads' });
  }
}
