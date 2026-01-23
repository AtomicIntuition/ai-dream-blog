'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  /** Intensity of the mouse parallax effect (0-1) */
  intensity?: number;
  /** Smoothing factor - higher = smoother but more lag (0.01-0.1 recommended) */
  smoothing?: number;
  /** Whether to enable the effect */
  enabled?: boolean;
}

// Utility for smooth interpolation that's frame-rate independent
function damp(current: number, target: number, smoothing: number, delta: number): number {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-smoothing * delta * 60));
}

export function CameraRig({
  intensity = 0.12,
  smoothing = 3,
  enabled = true,
}: CameraRigProps) {
  const { camera } = useThree();
  const currentRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  useFrame(({ pointer }, delta) => {
    if (!enabled) return;

    // Clamp delta to prevent huge jumps after tab switch
    const dt = Math.min(delta, 0.1);

    // Target position based on mouse
    const targetX = pointer.x * intensity * 2;
    const targetY = pointer.y * intensity * 1.5;

    // Smooth interpolation using exponential decay (frame-rate independent)
    currentRef.current.x = damp(currentRef.current.x, targetX, smoothing, dt);
    currentRef.current.y = damp(currentRef.current.y, targetY, smoothing, dt);

    // Apply position
    camera.position.x = currentRef.current.x;
    camera.position.y = currentRef.current.y;

    // Smooth rotation
    const targetRotY = pointer.x * 0.08;
    const targetRotX = -pointer.y * 0.06;

    currentRef.current.rotY = damp(currentRef.current.rotY, targetRotY, smoothing, dt);
    currentRef.current.rotX = damp(currentRef.current.rotX, targetRotX, smoothing, dt);

    camera.rotation.y = currentRef.current.rotY;
    camera.rotation.x = currentRef.current.rotX;

    // Look toward center with subtle offset
    camera.lookAt(
      currentRef.current.x * 0.3,
      currentRef.current.y * 0.2,
      -10
    );
  });

  return null;
}

/**
 * Gentle auto-animation for idle state
 */
export function AutoCameraAnimation({
  enabled = true,
  speed = 0.2,
  amplitude = 0.3,
}: {
  enabled?: boolean;
  speed?: number;
  amplitude?: number;
}) {
  const { camera } = useThree();
  const timeOffset = useRef(Math.random() * Math.PI * 2);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!enabled) return;

    // Clamp delta
    const dt = Math.min(delta, 0.1);
    timeRef.current += dt * speed;
    const t = timeRef.current + timeOffset.current;

    // Gentle figure-8 motion
    camera.position.x = Math.sin(t) * amplitude;
    camera.position.y = Math.sin(t * 2) * amplitude * 0.4;

    // Very subtle rotation
    camera.rotation.y = Math.sin(t * 0.5) * 0.03;
    camera.rotation.x = Math.cos(t * 0.3) * 0.02;
  });

  return null;
}

/**
 * Floating group for parallax effect on child objects
 */
interface ParallaxGroupProps {
  children: React.ReactNode;
  intensity?: number;
  smoothing?: number;
}

export function ParallaxGroup({
  children,
  intensity = 0.4,
  smoothing = 2.5,
}: ParallaxGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentRef = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current) return;

    const dt = Math.min(delta, 0.1);

    // Target rotation
    const targetX = pointer.x * intensity;
    const targetY = pointer.y * intensity;

    // Smooth damping
    currentRef.current.x = damp(currentRef.current.x, targetX, smoothing, dt);
    currentRef.current.y = damp(currentRef.current.y, targetY, smoothing, dt);

    // Apply rotation
    groupRef.current.rotation.y = currentRef.current.x * 0.25;
    groupRef.current.rotation.x = -currentRef.current.y * 0.15;
  });

  return <group ref={groupRef}>{children}</group>;
}
