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
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #16213e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Aurora gradients */}
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

        {/* Floating Stars */}
        {[...Array(30)].map((_, i) => {
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
        {[...Array(10)].map((_, i) => {
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
                  0 0 16px rgba(139, 92, 246, 0.4),
                  0 0 24px rgba(139, 92, 246, 0.2)
                `,
              }}
            />
          );
        })}

        {/* Cloud-like shapes */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '220px',
            height: '90px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '100px',
            filter: 'blur(45px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '10%',
            width: '200px',
            height: '80px',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '100px',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '55%',
            right: '20%',
            width: '170px',
            height: '70px',
            background: 'rgba(6, 182, 212, 0.08)',
            borderRadius: '100px',
            filter: 'blur(35px)',
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
            position: 'relative',
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
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
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
              textShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
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

          {/* Author & Twitter Info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '32px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              <span style={{ fontSize: '20px' }}>𝕏</span>
              <span>@CodeAI4Crypto</span>
            </div>
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
                backdropFilter: 'blur(10px)',
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
                backdropFilter: 'blur(10px)',
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
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ fontSize: 18 }}>✨</span>
              <span style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>Daily Insights</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
