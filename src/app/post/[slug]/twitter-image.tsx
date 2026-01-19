import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const alt = 'Dream Insights Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Production API URL - must be hardcoded for edge runtime
const API_URL = 'https://dream-analysis-t3ub.onrender.com';

// Category styling
const categoryStyles: Record<string, { icon: string; gradient: string; accentColor: string }> = {
  'dream-stories': {
    icon: '🌙',
    gradient: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.6) 0%, transparent 50%)',
    accentColor: 'rgba(139, 92, 246, 0.4)',
  },
  'dream-science': {
    icon: '🧠',
    gradient: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.6) 0%, transparent 50%)',
    accentColor: 'rgba(6, 182, 212, 0.4)',
  },
  'sleep-tips': {
    icon: '✨',
    gradient: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.6) 0%, transparent 50%)',
    accentColor: 'rgba(16, 185, 129, 0.4)',
  },
  'symbolism': {
    icon: '🔮',
    gradient: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245, 158, 11, 0.5) 0%, transparent 50%)',
    accentColor: 'rgba(245, 158, 11, 0.4)',
  },
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
  let subtitle = '';

  try {
    // Direct fetch with no caching to ensure fresh data
    const res = await fetch(`${API_URL}/api/blog/posts/${params.slug}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data?.post) {
        const post = json.data.post;
        title = post.title || title;
        category = post.category || category;
        subtitle = post.subtitle || post.excerpt?.substring(0, 100) || '';
      }
    }
  } catch (e) {
    // Log error but continue with defaults - image will still render
    console.error('Twitter Image: Failed to fetch post data:', e);
  }

  const style = categoryStyles[category] || categoryStyles['dream-stories'];
  const categoryLabel = categoryLabels[category] || 'Dream Insights';

  // Truncate title if too long
  const displayTitle = title.length > 80 ? title.substring(0, 77) + '...' : title;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#050510',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Category-specific aurora gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: style.gradient,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 40% at 90% 60%, rgba(217, 70, 239, 0.2) 0%, transparent 50%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 50% 50% at 10% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            display: 'flex',
          }}
        />

        {/* Stars */}
        {[
          { top: '8%', left: '12%', size: 3 },
          { top: '15%', left: '85%', size: 2 },
          { top: '25%', left: '8%', size: 2 },
          { top: '12%', left: '55%', size: 3 },
          { top: '65%', left: '90%', size: 2 },
          { top: '75%', left: '15%', size: 2 },
          { top: '85%', left: '75%', size: 2 },
        ].map((star, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: 'white',
              borderRadius: '50%',
              top: star.top,
              left: star.left,
              boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,0.7)`,
              display: 'flex',
            }}
          />
        ))}

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '50px 70px',
            zIndex: 10,
          }}
        >
          {/* Top: Category badge + Luna Vale */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            {/* Category badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                background: style.accentColor,
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <span style={{ fontSize: '22px', display: 'flex' }}>{style.icon}</span>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'flex',
                }}
              >
                {categoryLabel}
              </span>
            </div>

            {/* Luna Vale badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                }}
              >
                <span style={{ fontSize: '20px', display: 'flex' }}>🌙</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '16px', fontWeight: 600, color: 'white', display: 'flex' }}>
                  Luna Vale
                </span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'flex' }}>
                  AI Dream Analyst
                </span>
              </div>
            </div>
          </div>

          {/* Center: Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '1000px',
            }}
          >
            <div
              style={{
                fontSize: title.length > 50 ? '52px' : '62px',
                fontWeight: 800,
                letterSpacing: '-1px',
                lineHeight: 1.1,
                color: 'white',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {displayTitle}
            </div>
            {subtitle && (
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.3,
                  display: 'flex',
                  maxWidth: '900px',
                }}
              >
                {subtitle.length > 100 ? subtitle.substring(0, 97) + '...' : subtitle}
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.6)',
                  display: 'flex',
                }}
              >
                ai-dream-blog.vercel.app
              </span>
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.4)',
                  display: 'flex',
                }}
              />
              <span
                style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.6)',
                  display: 'flex',
                }}
              >
                @CodeAI4Crypto
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            >
              <span style={{ fontSize: '14px', color: 'white', fontWeight: 500, display: 'flex' }}>
                Read Full Analysis →
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
