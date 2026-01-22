import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { videoColors } from '../lib/theme-colors';

interface NeuralBrainProps {
  startFrame?: number;
  size?: number;
}

interface Node {
  x: number;
  y: number;
  layer: number;
}

interface Connection {
  from: number;
  to: number;
}

/**
 * 2D Neural network visualization with animated connections
 */
export function NeuralBrain({ startFrame = 0, size = 300 }: NeuralBrainProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Generate neural network structure
  const layers = [4, 6, 6, 4]; // Nodes per layer
  const nodes: Node[] = [];
  const connections: Connection[] = [];

  // Create nodes
  layers.forEach((nodeCount, layerIndex) => {
    const layerX = (layerIndex / (layers.length - 1)) * 0.8 + 0.1; // 10%-90% of width

    for (let i = 0; i < nodeCount; i++) {
      const nodeY = ((i + 0.5) / nodeCount) * 0.8 + 0.1; // 10%-90% of height
      nodes.push({ x: layerX * size, y: nodeY * size, layer: layerIndex });
    }
  });

  // Create connections between adjacent layers
  let nodeIndex = 0;
  for (let l = 0; l < layers.length - 1; l++) {
    const currentLayerStart = nodeIndex;
    const currentLayerEnd = nodeIndex + layers[l];
    const nextLayerStart = currentLayerEnd;
    const nextLayerEnd = nextLayerStart + layers[l + 1];

    for (let i = currentLayerStart; i < currentLayerEnd; i++) {
      for (let j = nextLayerStart; j < nextLayerEnd; j++) {
        connections.push({ from: i, to: j });
      }
    }

    nodeIndex = currentLayerEnd;
  }

  // Animation progress
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 20 },
  });

  // Pulsing effect
  const pulseFrame = (frame - startFrame) % 60;
  const pulse = interpolate(pulseFrame, [0, 30, 60], [0.5, 1, 0.5]);

  // Signal propagation (which connections are "active")
  const signalPosition = interpolate(
    (frame - startFrame) % 90,
    [0, 90],
    [0, layers.length - 1]
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        opacity: progress,
        transform: `scale(${0.8 + progress * 0.2})`,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Connections */}
        {connections.map((conn, index) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];

          // Check if this connection is in the "active" zone
          const midLayer = (fromNode.layer + toNode.layer) / 2;
          const distanceFromSignal = Math.abs(midLayer - signalPosition);
          const isActive = distanceFromSignal < 0.5;

          const opacity = isActive ? 0.8 : 0.2;
          const strokeWidth = isActive ? 2 : 1;

          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={isActive ? videoColors.accentPurple : videoColors.textMuted}
              strokeWidth={strokeWidth}
              opacity={opacity * progress}
              style={{
                filter: isActive ? `drop-shadow(0 0 4px ${videoColors.accentPurple})` : 'none',
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, index) => {
          // Delay each node's appearance based on layer
          const nodeDelay = node.layer * 5;
          const nodeProgress = spring({
            frame: frame - startFrame - nodeDelay,
            fps,
            config: { damping: 15 },
          });

          // Check if node is in active zone
          const distanceFromSignal = Math.abs(node.layer - signalPosition);
          const isActive = distanceFromSignal < 0.5;

          const nodeSize = isActive ? 8 * (1 + pulse * 0.2) : 6;
          const nodeColor = isActive ? videoColors.primary : videoColors.secondary;

          return (
            <g key={index}>
              {/* Glow effect for active nodes */}
              {isActive && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize * 2}
                  fill={videoColors.primary}
                  opacity={0.2 * pulse}
                />
              )}

              {/* Main node */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeSize * nodeProgress}
                fill={nodeColor}
                style={{
                  filter: isActive ? `drop-shadow(0 0 8px ${nodeColor})` : 'none',
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center brain icon */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.1,
        }}
      >
        <svg
          width={size * 0.4}
          height={size * 0.4}
          viewBox="0 0 24 24"
          fill="none"
          stroke={videoColors.textMuted}
          strokeWidth={0.5}
        >
          <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Simple rotating circle with neural effect
 */
export function NeuralRing({ startFrame = 0, size = 200 }: NeuralBrainProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15 },
  });

  const rotation = interpolate(frame - startFrame, [0, 300], [0, 360]);

  // Create points around a circle
  const pointCount = 12;
  const points = Array.from({ length: pointCount }, (_, i) => {
    const angle = (i / pointCount) * Math.PI * 2;
    const radius = size * 0.4;
    return {
      x: size / 2 + Math.cos(angle) * radius,
      y: size / 2 + Math.sin(angle) * radius,
    };
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        opacity: progress,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg width={size} height={size}>
        {/* Connections to center */}
        {points.map((point, i) => (
          <line
            key={`center-${i}`}
            x1={point.x}
            y1={point.y}
            x2={size / 2}
            y2={size / 2}
            stroke={videoColors.secondary}
            strokeWidth={1}
            opacity={0.3}
          />
        ))}

        {/* Connections between adjacent points */}
        {points.map((point, i) => {
          const nextPoint = points[(i + 1) % pointCount];
          return (
            <line
              key={`edge-${i}`}
              x1={point.x}
              y1={point.y}
              x2={nextPoint.x}
              y2={nextPoint.y}
              stroke={videoColors.primary}
              strokeWidth={2}
              opacity={0.6}
            />
          );
        })}

        {/* Points */}
        {points.map((point, i) => {
          const pulseOffset = (frame - startFrame + i * 5) % 30;
          const scale = interpolate(pulseOffset, [0, 15, 30], [1, 1.3, 1]);

          return (
            <circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r={6 * scale}
              fill={videoColors.primary}
              style={{
                filter: `drop-shadow(0 0 4px ${videoColors.primary})`,
              }}
            />
          );
        })}

        {/* Center point */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={10}
          fill={videoColors.accentPurple}
          style={{
            filter: `drop-shadow(0 0 10px ${videoColors.accentPurple})`,
          }}
        />
      </svg>
    </div>
  );
}
