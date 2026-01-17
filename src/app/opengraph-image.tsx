import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Dream Insights - AI-Powered Dream Analysis Blog';
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
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0a1e 0%, #1a1035 25%, #0d1f3c 50%, #1a1035 75%, #0f0a1e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Aurora effect - top */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-25%',
            width: '150%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, transparent 60%)',
            display: 'flex',
          }}
        />

        {/* Aurora effect - right */}
        <div
          style={{
            position: 'absolute',
            top: '0%',
            right: '-25%',
            width: '80%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.25) 0%, transparent 55%)',
            display: 'flex',
          }}
        />

        {/* Aurora effect - bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '-30%',
            left: '10%',
            width: '80%',
            height: '80%',
            background: 'radial-gradient(ellipse at center, rgba(244, 114, 182, 0.2) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              display: 'flex',
            }}
          />
        ))}

        {/* Moon */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '80px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%)',
            boxShadow: '0 0 60px rgba(251, 191, 36, 0.4)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: '40px',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(34, 211, 238, 0.8) 100%)',
              marginBottom: '30px',
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
            }}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              style={{ display: 'flex' }}
            >
              <path
                d="M12 3C7.03 3 3 7.03 3 12C3 14.76 4.23 17.23 6.18 18.88C6.6 15.65 9.04 13 12 13C14.96 13 17.4 15.65 17.82 18.88C19.77 17.23 21 14.76 21 12C21 7.03 16.97 3 12 3Z"
                fill="white"
              />
              <circle cx="12" cy="9" r="3" fill="white" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c4b5fd 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '16px',
              display: 'flex',
            }}
          >
            Dream Insights
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '28px',
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
              display: 'flex',
            }}
          >
            AI-Powered Dream Analysis & Interpretation
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: '200px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), rgba(34, 211, 238, 0.8), transparent)',
              marginTop: '30px',
              borderRadius: '2px',
              display: 'flex',
            }}
          />

          {/* Bottom text */}
          <div
            style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginTop: '30px',
              display: 'flex',
            }}
          >
            Decode the language of your subconscious
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
