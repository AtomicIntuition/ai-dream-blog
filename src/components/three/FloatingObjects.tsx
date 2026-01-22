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
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() + timeOffset;

      // Gentle floating motion
      meshRef.current.position.y = initialY + Math.sin(t * speed) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(t * speed * 0.7) * 0.3;

      // Slow rotation
      meshRef.current.rotation.x += rotationSpeed[0] * 0.01;
      meshRef.current.rotation.y += rotationSpeed[1] * 0.01;
      meshRef.current.rotation.z += rotationSpeed[2] * 0.01;
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
        samples={16}
        thickness={0.5}
        chromaticAberration={0.1}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.2}
        temporalDistortion={0.1}
        iridescence={1}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
        color={new THREE.Color(colors.primaryHex)}
        transmission={0.95}
        roughness={0.1}
        ior={1.5}
      />
    </mesh>
  );
}

interface FloatingObjectsProps {
  count?: number;
}

export function FloatingObjects({ count = 15 }: FloatingObjectsProps) {
  const objects = useMemo(() => {
    const geometries: FloatingObjectProps['geometry'][] = [
      'octahedron',
      'icosahedron',
      'dodecahedron',
      'tetrahedron',
    ];

    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15,
        -10 - Math.random() * 20,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.7,
      geometry: geometries[Math.floor(Math.random() * geometries.length)],
      speed: 0.3 + Math.random() * 0.4,
      rotationSpeed: [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
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
