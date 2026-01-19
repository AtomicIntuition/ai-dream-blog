import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Test with .map() calls
export default function Image() {
  const items = [
    { text: 'Item 1', color: '#8b5cf6' },
    { text: 'Item 2', color: '#06b6d4' },
    { text: 'Item 3', color: '#10b981' },
  ];

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
          gap: 20,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 800, color: 'white', display: 'flex' }}>
          Test With Map
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '12px 24px',
                backgroundColor: item.color,
                borderRadius: 8,
                color: 'white',
                fontSize: 24,
                display: 'flex',
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
