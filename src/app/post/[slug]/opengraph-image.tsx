import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Dream Insights Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 3600; // Revalidate every hour

const API_URL = 'https://dream-analysis-t3ub.onrender.com';

const categoryColors: Record<string, string> = {
  'dream-stories': '#8b5cf6',
  'dream-science': '#06b6d4',
  'sleep-tips': '#10b981',
  'symbolism': '#f59e0b',
};

const categoryLabels: Record<string, string> = {
  'dream-stories': '✨ Dream Story',
  'dream-science': '🧠 Dream Science',
  'sleep-tips': '😴 Sleep Tips',
  'symbolism': '🔮 Dream Symbolism',
};

const categoryEmojis: Record<string, string> = {
  'dream-stories': '✨',
  'dream-science': '🧠',
  'sleep-tips': '😴',
  'symbolism': '🔮',
};

export default async function Image({ params }: { params: { slug: string } }) {
  let title = 'Dream Insights';
  let excerpt = 'Explore the depths of your subconscious mind';
  let category = 'dream-stories';

  try {
    const url = `${API_URL}/api/blog/posts/${params.slug}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data?.post) {
        title = json.data.post.title || title;
        excerpt = json.data.post.excerpt || excerpt;
        category = json.data.post.category || category;
      }
    } else {
      console.error(`[OG] API response not ok: ${res.status} for ${url}`);
    }
  } catch (e) {
    console.error(`[OG] API fetch failed for ${params.slug}:`, e);
    // Use defaults - silently fall back if API is slow/down
  }

  const gradientColor = categoryColors[category] || categoryColors['dream-stories'];
  const categoryLabel = categoryLabels[category] || 'Dream Story';
  const emoji = categoryEmojis[category] || '✨';
  
  // Determine text color based on background brightness
  const isDarkBg = ['#06b6d4', '#8b5cf6', '#10b981'].includes(gradientColor);
  const buttonTextColor = gradientColor === '#f59e0b' ? '#1a1a1a' : '#ffffff';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '50px 60px',
        }}
      >
        {/* Animated background orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: `radial-gradient(circle, ${gradientColor}30 0%, transparent 70%)`,
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-200px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, #8b5cf630 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${gradientColor}20 0%, transparent 70%)`,
            borderRadius: '50%',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 10,
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          {/* Header: Category Badge and Author */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            {/* Category Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: gradientColor,
                color: buttonTextColor,
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '20px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                boxShadow: `0 8px 32px ${gradientColor}40`,
              }}
            >
              {emoji}
              {categoryLabel.replace(emoji, '').trim()}
            </div>

            {/* Author Badge - LARGER - Matching app branding */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                position: 'relative',
              }}
            >
              {/* Main author avatar with gradient */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                  fontSize: '28px',
                }}
              >
                ✨
                {/* AI Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#10b981',
                    border: '2px solid #0f0f23',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: '900',
                    color: '#ffffff',
                  }}
                >
                  AI
                </div>
              </div>
              {/* Name and title */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff' }}>
                  Luna Vale
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)' }}>
                  Dream Analyst
                </div>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: '52px',
              fontWeight: '800',
              color: '#ffffff',
              margin: '0 0 20px 0',
              lineHeight: '1.25',
              letterSpacing: '-1px',
            }}
          >
            {title}
          </h1>

          {/* Subtitle/Excerpt */}
          <p
            style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0 0 40px 0',
              lineHeight: '1.6',
              maxWidth: '90%',
            }}
          >
            {excerpt}
          </p>

          {/* Footer - positioned at bottom */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '30px',
              borderTop: `2px solid ${gradientColor}40`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: gradientColor,
                fontSize: '18px',
                fontWeight: '700',
                letterSpacing: '0.5px',
              }}
            >
              𝕏
              <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>@CodeAI4Crypto</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: gradientColor,
                color: buttonTextColor,
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '700',
                boxShadow: `0 4px 16px ${gradientColor}50`,
              }}
            >
              📖 Read Analysis
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
