import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Dream Insights Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 300; // 5 minutes

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dream-analysis-t3ub.onrender.com';

const categoryColors: Record<string, { primary: string; glow: string; bg: string }> = {
  'dream-stories': {
    primary: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.4)',
    bg: 'rgba(139, 92, 246, 0.15)',
  },
  'dream-science': {
    primary: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    bg: 'rgba(6, 182, 212, 0.15)',
  },
  'sleep-tips': {
    primary: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    bg: 'rgba(16, 185, 129, 0.15)',
  },
  'symbolism': {
    primary: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    bg: 'rgba(245, 158, 11, 0.15)',
  },
};

const categoryEmojis: Record<string, string> = {
  'dream-stories': '✨',
  'dream-science': '🧠',
  'sleep-tips': '😴',
  'symbolism': '🔮',
};

const categoryLabels: Record<string, string> = {
  'dream-stories': 'Dream Story',
  'dream-science': 'Dream Science',
  'sleep-tips': 'Sleep Tips',
  'symbolism': 'Dream Symbolism',
};

// Smart title truncation for OG images
function truncateTitle(title: string, maxLength: number = 70): string {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength - 3) + '...';
}

// Smart excerpt truncation
function truncateExcerpt(excerpt: string, maxLength: number = 120): string {
  if (excerpt.length <= maxLength) return excerpt;
  return excerpt.substring(0, maxLength - 3) + '...';
}

export default async function Image({ params }: { params: { slug: string } }) {
  let title = 'Dream Insights';
  let excerpt = 'Explore the depths of your subconscious mind';
  let category = 'dream-stories';

  try {
    const url = `${API_URL}/api/blog/posts/${params.slug}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
      headers: {
        'user-agent': 'DreamInsightsOGBot/1.0',
      },
    }).finally(() => clearTimeout(timeout));
    
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data?.post) {
        title = json.data.post.title || title;
        excerpt = json.data.post.excerpt || excerpt;
        category = json.data.post.category || category;
      }
    }
  } catch (e) {
    // Use defaults - fallback gracefully
  }

  const colors = categoryColors[category] || categoryColors['dream-stories'];
  const emoji = categoryEmojis[category] || '✨';
  const categoryLabel = categoryLabels[category] || 'Dream Story';
  
  const displayTitle = truncateTitle(title);
  const displayExcerpt = truncateExcerpt(excerpt);

  // Dynamic font sizing based on title length
  const titleFontSize = displayTitle.length > 50 ? 56 : displayTitle.length > 35 ? 64 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #16213e 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Multiple dream orbs for depth */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-150px',
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-250px',
            left: '-150px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${colors.bg} 0%, transparent 60%)`,
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '20%',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 60%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />

        {/* Floating Stars - Multiple sizes */}
        {[...Array(25)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const x = Math.random() * 1200;
          const y = Math.random() * 630;
          const opacity = Math.random() * 0.6 + 0.3;
          return (
            <div
              key={`star-${i}`}
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: `${size}px`,
                height: `${size}px`,
                background: '#ffffff',
                borderRadius: '50%',
                opacity: opacity,
                boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`,
              }}
            />
          );
        })}

        {/* Large Twinkling Stars */}
        {[...Array(8)].map((_, i) => {
          const x = Math.random() * 1200;
          const y = Math.random() * 630;
          return (
            <div
              key={`bigstar-${i}`}
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: '4px',
                height: '4px',
                background: '#ffffff',
                borderRadius: '50%',
                opacity: 0.8,
                boxShadow: `
                  0 0 8px rgba(255, 255, 255, 0.9),
                  0 0 16px ${colors.primary}40,
                  0 0 24px ${colors.primary}20
                `,
              }}
            />
          );
        })}

        {/* Cloud-like shapes */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '200px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '100px',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '8%',
            width: '180px',
            height: '70px',
            background: 'rgba(139, 92, 246, 0.08)',
            borderRadius: '100px',
            filter: 'blur(35px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '15%',
            width: '150px',
            height: '60px',
            background: 'rgba(6, 182, 212, 0.06)',
            borderRadius: '100px',
            filter: 'blur(30px)',
          }}
        />

        {/* Subtle grid overlay for texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            opacity: 0.3,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 10,
            height: '100%',
            padding: '60px 80px',
            justifyContent: 'center',
          }}
        >
          {/* Top bar: Category */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginBottom: '32px',
            }}
          >
            {/* Category Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)`,
                padding: '14px 28px',
                borderRadius: '30px',
                fontSize: '22px',
                fontWeight: '700',
                color: '#ffffff',
                boxShadow: `0 8px 32px ${colors.glow}`,
                border: `1px solid ${colors.primary}80`,
              }}
            >
              <span style={{ fontSize: '24px' }}>{emoji}</span>
              <span>{categoryLabel}</span>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '90%',
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: titleFontSize,
                fontWeight: '800',
                color: '#ffffff',
                margin: '0 0 20px 0',
                lineHeight: '1.15',
                letterSpacing: '-2px',
                textShadow: `0 4px 20px ${colors.glow}`,
                display: 'flex',
              }}
            >
              {displayTitle}
            </h1>

            {/* Author & Twitter Info - Right under title */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
                flexWrap: 'wrap',
              }}
            >
              {/* Author Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                  }}
                >
                  ✨
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff' }}>Luna Vale</span>
              </div>

              {/* Twitter Handle */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                <span style={{ fontSize: '18px' }}>𝕏</span>
                <span>@CodeAI4Crypto</span>
              </div>
            </div>

            {/* Excerpt */}
            {displayExcerpt && (
              <p
                style={{
                  fontSize: '24px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: 0,
                  lineHeight: '1.5',
                  maxWidth: '85%',
                  fontWeight: '400',
                }}
              >
                {displayExcerpt}
              </p>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
