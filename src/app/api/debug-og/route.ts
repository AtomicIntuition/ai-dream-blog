export const runtime = 'edge';

export async function GET() {
  const API_URL = 'https://dream-analysis-t3ub.onrender.com';
  const slug = 'house-psyche-built-letting-go-dreams-architectural-blueprints';

  try {
    const res = await fetch(`${API_URL}/api/blog/posts/${slug}`, {
      method: 'GET',
    });

    const data = await res.json();

    return Response.json(
      {
        status: res.status,
        ok: res.ok,
        data: data,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        error: error?.message || 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
