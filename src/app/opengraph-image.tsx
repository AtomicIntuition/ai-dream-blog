import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Dream Insights by Luna Vale - AI Dream Analysis';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.5) 0%, transparent 50%)',
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
            background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
            padding: '60px 80px',
            zIndex: 10,
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 24 }}>✨</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>Luna Vale</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>AI Dream Analyst</span>
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              marginBottom: 16,
              display: 'flex',
            }}
          >
            Dream Insights
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: 32,
              display: 'flex',
            }}
          >
            Decode what your subconscious is telling you
          </div>

          {/* Features */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div
              style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 50,
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 18 }}>🧠</span>
              <span style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>AI Analysis</span>
            </div>
            <div
              style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 50,
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 18 }}>🔮</span>
              <span style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>Dream Symbols</span>
            </div>
            <div
              style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 50,
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 18 }}>✨</span>
              <span style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>Daily Insights</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 80px',
          }}
        >
          <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
            ai-dream-blog.vercel.app
          </span>
          <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
            @CodeAI4Crypto
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
