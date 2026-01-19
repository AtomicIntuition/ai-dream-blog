import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Test with gradients and multiple divs (like the real OG image)
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
        }}
      >
        {/* Gradient overlay */}
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

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 800, color: 'white', display: 'flex' }}>
            Test With Gradients
          </div>
          <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.7)', display: 'flex', marginTop: 20 }}>
            This should work
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
