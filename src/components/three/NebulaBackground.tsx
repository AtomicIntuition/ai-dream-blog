'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors, hexToVec3 } from '@/lib/theme-colors';

// Vertex shader
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader with volumetric fog effect
const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform vec2 resolution;
  uniform float isDark;

  varying vec2 vUv;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Fractal brownian motion
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspectRatio = resolution.x / resolution.y;
    uv.x *= aspectRatio;

    // Create multiple layers of noise
    float slowTime = time * 0.05;

    // Layer 1: Large scale nebula clouds
    vec3 p1 = vec3(uv * 2.0, slowTime * 0.3);
    float noise1 = fbm(p1);

    // Layer 2: Medium detail
    vec3 p2 = vec3(uv * 4.0 + 100.0, slowTime * 0.5);
    float noise2 = fbm(p2);

    // Layer 3: Small detail wisps
    vec3 p3 = vec3(uv * 8.0 + 200.0, slowTime * 0.7);
    float noise3 = fbm(p3);

    // Combine layers
    float nebula = noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.1;
    nebula = (nebula + 1.0) * 0.5; // Normalize to 0-1

    // Create color gradient based on noise
    vec3 finalColor;

    if (isDark > 0.5) {
      // Dark themes: more dramatic colors
      float t1 = smoothstep(0.3, 0.7, nebula);
      float t2 = smoothstep(0.5, 0.9, nebula);

      finalColor = mix(color1, color2, t1);
      finalColor = mix(finalColor, color3, t2 * 0.5);

      // Add subtle radial gradient
      float radial = 1.0 - length(vUv - 0.5) * 1.2;
      radial = smoothstep(0.0, 0.8, radial);
      finalColor *= 0.3 + radial * 0.7;

      // Intensity
      finalColor *= 0.15;
    } else {
      // Light theme: very subtle
      float t1 = smoothstep(0.4, 0.6, nebula);
      finalColor = mix(color1 * 0.05, color2 * 0.08, t1);
      finalColor += color3 * noise3 * 0.02;

      // Very subtle radial
      float radial = 1.0 - length(vUv - 0.5) * 0.8;
      radial = smoothstep(0.2, 1.0, radial);
      finalColor *= radial;
    }

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function NebulaBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
      color1: { value: new THREE.Vector3(...hexToVec3(colors.primary)) },
      color2: { value: new THREE.Vector3(...hexToVec3(colors.secondary)) },
      color3: { value: new THREE.Vector3(...hexToVec3(colors.tertiary)) },
      isDark: { value: theme === 'obsidian' || theme === 'dusk' ? 1.0 : 0.0 },
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Update uniforms when theme changes
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = clock.getElapsedTime();
      material.uniforms.resolution.value.set(viewport.width, viewport.height);
      material.uniforms.color1.value.set(...hexToVec3(colors.primary));
      material.uniforms.color2.value.set(...hexToVec3(colors.secondary));
      material.uniforms.color3.value.set(...hexToVec3(colors.tertiary));
      material.uniforms.isDark.value = theme === 'obsidian' || theme === 'dusk' ? 1.0 : 0.0;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -30]}>
      <planeGeometry args={[viewport.width * 3, viewport.height * 3]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
