'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  /** Intensity of the mouse parallax effect (0-1) */
  intensity?: number;
  /** Smoothing factor for camera movement (lower = smoother) */
  smoothing?: number;
  /** Whether to enable the effect */
  enabled?: boolean;
}

export function CameraRig({
  intensity = 0.15,
  smoothing = 0.05,
  enabled = true,
}: CameraRigProps) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  // Track mouse position
  useFrame(({ pointer }) => {
    if (!enabled) return;

    // Update target based on mouse position
    targetRef.current.x = pointer.x * intensity;
    targetRef.current.y = pointer.y * intensity;

    // Smoothly interpolate current position towards target
    mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * smoothing;
    mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * smoothing;

    // Apply subtle camera movement
    camera.position.x = mouseRef.current.x * 2;
    camera.position.y = mouseRef.current.y * 1.5;

    // Subtle camera rotation for depth effect
    camera.rotation.y = mouseRef.current.x * 0.1;
    camera.rotation.x = -mouseRef.current.y * 0.1;

    // Always look slightly towards center
    camera.lookAt(
      mouseRef.current.x * 0.5,
      mouseRef.current.y * 0.3,
      -10
    );
  });

  return null;
}

/**
 * Component that provides gentle auto-animation when mouse is not moving
 * Can be used as a fallback or in combination with CameraRig
 */
export function AutoCameraAnimation({
  enabled = true,
  speed = 0.3,
  amplitude = 0.5,
}: {
  enabled?: boolean;
  speed?: number;
  amplitude?: number;
}) {
  const { camera } = useThree();
  const timeOffset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (!enabled) return;

    const t = clock.getElapsedTime() * speed + timeOffset.current;

    // Gentle figure-8 motion
    camera.position.x = Math.sin(t) * amplitude;
    camera.position.y = Math.sin(t * 2) * amplitude * 0.5;

    // Very subtle rotation
    camera.rotation.y = Math.sin(t * 0.5) * 0.05;
    camera.rotation.x = Math.cos(t * 0.3) * 0.03;
  });

  return null;
}

/**
 * Floating group that responds to mouse movement
 * Can be used to wrap objects for parallax effect
 */
interface ParallaxGroupProps {
  children: React.ReactNode;
  intensity?: number;
  smoothing?: number;
}

export function ParallaxGroup({
  children,
  intensity = 0.5,
  smoothing = 0.08,
}: ParallaxGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;

    // Smooth mouse tracking
    mouseRef.current.x += (pointer.x * intensity - mouseRef.current.x) * smoothing;
    mouseRef.current.y += (pointer.y * intensity - mouseRef.current.y) * smoothing;

    // Apply to group rotation
    groupRef.current.rotation.y = mouseRef.current.x * 0.3;
    groupRef.current.rotation.x = -mouseRef.current.y * 0.2;
  });

  return <group ref={groupRef}>{children}</group>;
}
