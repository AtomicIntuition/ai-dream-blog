import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Test with async function and API call
export default async function Image() {
  let title = 'Default Title';

  try {
    const res = await fetch('https://dream-analysis-t3ub.onrender.com/api/blog/posts/garden-of-forgotten-hurts-dream-healing-1768831266984', {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data?.post) {
        title = json.data.post.title;
      }
    }
  } catch (e) {
    console.error('Fetch error:', e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050510',
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 800, color: 'white', display: 'flex', textAlign: 'center', padding: 40 }}>
          {title}
        </div>
      </div>
    ),
    { ...size }
  );
}
