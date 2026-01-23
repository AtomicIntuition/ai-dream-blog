'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/lib/theme-colors';

interface FloatingObjectProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  geometry: 'octahedron' | 'icosahedron' | 'dodecahedron' | 'tetrahedron';
  speed: number;
  rotationSpeed: [number, number, number];
}

function FloatingObject({
  position,
  rotation,
  scale,
  geometry,
  speed,
  rotationSpeed,
}: FloatingObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const initialY = position[1];
  const initialX = position[0];
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const timeRef = useRef(timeOffset);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Clamp delta for consistency
      const dt = Math.min(delta, 0.1);
      timeRef.current += dt * speed;
      const t = timeRef.current;

      // Smooth floating motion
      meshRef.current.position.y = initialY + Math.sin(t) * 0.4;
      meshRef.current.position.x = initialX + Math.cos(t * 0.7) * 0.25;

      // Smooth rotation using delta time
      meshRef.current.rotation.x += rotationSpeed[0] * dt * 0.3;
      meshRef.current.rotation.y += rotationSpeed[1] * dt * 0.3;
      meshRef.current.rotation.z += rotationSpeed[2] * dt * 0.3;
    }
  });

  const GeometryComponent = useMemo(() => {
    switch (geometry) {
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />;
      default:
        return <octahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {GeometryComponent}
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.3}
        samples={8}
        thickness={0.5}
        chromaticAberration={0.06}
        anisotropy={0.2}
        distortion={0.15}
        distortionScale={0.15}
        temporalDistortion={0.05}
        iridescence={0.8}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
        color={new THREE.Color(colors.primaryHex)}
        transmission={0.95}
        roughness={0.05}
        ior={1.5}
      />
    </mesh>
  );
}

interface FloatingObjectsProps {
  count?: number;
}

export function FloatingObjects({ count = 12 }: FloatingObjectsProps) {
  const objects = useMemo(() => {
    const geometries: FloatingObjectProps['geometry'][] = [
      'octahedron',
      'icosahedron',
      'dodecahedron',
      'tetrahedron',
    ];

    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 12,
        -8 - Math.random() * 18,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: 0.25 + Math.random() * 0.5,
      geometry: geometries[Math.floor(Math.random() * geometries.length)],
      speed: 0.4 + Math.random() * 0.3,
      rotationSpeed: [
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5,
      ] as [number, number, number],
    }));
  }, [count]);

  return (
    <group>
      {objects.map((props, index) => (
        <FloatingObject key={index} {...props} />
      ))}
    </group>
  );
}
