import { put, head } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

const BLOB_URL_FILE = 'site-config-data.json';

export default async function handler(req: Request) {
  // Manejo de CORS / Métodos
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const blob = await put(BLOB_URL_FILE, JSON.stringify(body), {
        access: 'public',
        addRandomSuffix: false,
      });

      return new Response(JSON.stringify({ success: true, url: blob.url }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  if (req.method === 'GET') {
    try {
      // Intentar obtener la URL del Blob existente
      const blobDetails = await head(BLOB_URL_FILE);
      if (blobDetails && blobDetails.url) {
        const response = await fetch(blobDetails.url);
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify(null), { status: 404 });
    } catch {
      return new Response(JSON.stringify(null), { status: 200 });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}