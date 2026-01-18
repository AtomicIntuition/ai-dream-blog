import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Dream Insights by Luna Vale - AI Dream Analysis';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
        {/* Dramatic aurora gradient background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.5) 0%, transparent 50%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 50% at 20% 80%, rgba(217, 70, 239, 0.25) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            display: 'flex',
          }}
        />

        {/* Stars */}
        {[
          { top: '10%', left: '15%', size: 3 },
          { top: '20%', left: '80%', size: 2 },
          { top: '30%', left: '10%', size: 2 },
          { top: '15%', left: '60%', size: 4 },
          { top: '60%', left: '85%', size: 3 },
          { top: '70%', left: '20%', size: 2 },
          { top: '80%', left: '70%', size: 3 },
          { top: '25%', left: '40%', size: 2 },
          { top: '45%', left: '5%', size: 2 },
          { top: '55%', left: '95%', size: 2 },
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
              boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,0.8)`,
              display: 'flex',
            }}
          />
        ))}

        {/* Glowing moon */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '60px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #fef9c3 0%, #fde047 40%, #eab308 100%)',
            boxShadow: '0 0 80px rgba(234, 179, 8, 0.6), 0 0 120px rgba(234, 179, 8, 0.3)',
            display: 'flex',
          }}
        />

        {/* Main content container */}
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
          {/* Brand badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
              }}
            >
              <span style={{ fontSize: '24px', display: 'flex' }}>🌙</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'white',
                  display: 'flex',
                }}
              >
                Luna Vale
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.6)',
                  display: 'flex',
                }}
              >
                AI Dream Analyst
              </span>
            </div>
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: '82px',
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1,
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'flex',
              }}
            >
              Dream Insights
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '40px',
              display: 'flex',
            }}
          >
            Decode what your subconscious is telling you
          </div>

          {/* Feature pills */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
            }}
          >
            {[
              { icon: '🧠', text: 'AI Analysis' },
              { icon: '🔮', text: 'Dream Symbols' },
              { icon: '✨', text: 'Daily Insights' },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <span style={{ fontSize: '18px', display: 'flex' }}>{feature.icon}</span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'white',
                    display: 'flex',
                  }}
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar with handle */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 80px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 500,
              display: 'flex',
            }}
          >
            ai-dream-blog.vercel.app
          </span>
          <span
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 500,
              display: 'flex',
            }}
          >
            @CodeAI4Crypto
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
