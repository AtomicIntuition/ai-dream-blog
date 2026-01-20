import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Dream Insights Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const API_URL = 'https://dream-analysis-t3ub.onrender.com';

const categoryColors: Record<string, string> = {
  'dream-stories': 'rgba(139, 92, 246, 0.5)',
  'dream-science': 'rgba(6, 182, 212, 0.5)',
  'sleep-tips': 'rgba(16, 185, 129, 0.5)',
  'symbolism': 'rgba(245, 158, 11, 0.5)',
};

const categoryLabels: Record<string, string> = {
  'dream-stories': 'Dream Story',
  'dream-science': 'Dream Science',
  'sleep-tips': 'Sleep Tips',
  'symbolism': 'Dream Symbolism',
};

export default async function Image({ params }: { params: { slug: string } }) {
  let title = 'Dream Insights';
  let category = 'dream-stories';

  try {
    const res = await fetch(`${API_URL}/api/blog/posts/${params.slug}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data?.post) {
        title = json.data.post.title || title;
        category = json.data.post.category || category;
      }
    }
  } catch (e) {
    // Use defaults
  }

  const gradientColor = categoryColors[category] || categoryColors['dream-stories'];
  const categoryLabel = categoryLabels[category] || 'Dream Story';
  // Shorter title limit to prevent overflow
  const displayTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#050510',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Aurora gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${gradientColor} 0%, transparent 50%)`,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse 60% 40% at 90% 60%, rgba(217, 70, 239, 0.2) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Content wrapper with fixed sections */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '40px 60px',
            zIndex: 10,
          }}
        >
          {/* Top row - fixed height */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 60,
              marginBottom: 30,
            }}
          >
            {/* Category badge */}
            <div
              style={{
                padding: '10px 20px',
                background: gradientColor,
                borderRadius: 50,
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: 'white', textTransform: 'uppercase', letterSpacing: 1 }}>
                {categoryLabel}
              </span>
            </div>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 22 }}>🌙</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>Luna Vale</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>AI Dream Analyst</span>
              </div>
            </div>
          </div>

          {/* Title section - takes remaining space */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: title.length > 45 ? 44 : 52,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.2,
                display: 'flex',
              }}
            >
              {displayTitle}
            </div>
          </div>

          {/* Footer - fixed height */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 50,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 15,
              marginTop: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>ai-dream-blog.vercel.app</span>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>@CodeAI4Crypto</span>
            </div>
            <div
              style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 8,
                display: 'flex',
              }}
            >
              <span style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>Read Full Analysis →</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
