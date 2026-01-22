'use client';

import { useState, useEffect } from 'react';

export type GPUTier = 'high' | 'medium' | 'low';

interface GPUDetectionResult {
  tier: GPUTier;
  isMobile: boolean;
  supportsWebGL2: boolean;
  isLoading: boolean;
}

/**
 * Detects GPU capabilities and returns appropriate rendering tier
 * - High: Desktop GPU, full 3D with 1000+ particles and bloom
 * - Medium: Laptop, 500 particles, no bloom
 * - Low: Mobile or low-power, CSS gradient fallback only
 */
export function useGPUDetection(): GPUDetectionResult {
  const [result, setResult] = useState<GPUDetectionResult>({
    tier: 'medium',
    isMobile: false,
    supportsWebGL2: true,
    isLoading: true,
  });

  useEffect(() => {
    const detectGPU = () => {
      // Check if mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

      // Check WebGL2 support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      const supportsWebGL2 = !!gl;

      // If no WebGL2 or mobile, return low tier
      if (!supportsWebGL2 || isMobile) {
        setResult({
          tier: 'low',
          isMobile,
          supportsWebGL2,
          isLoading: false,
        });
        return;
      }

      // Try to get GPU info
      let tier: GPUTier = 'medium';

      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          const rendererLower = renderer.toLowerCase();

          // High-end GPU detection
          const isHighEnd =
            rendererLower.includes('nvidia') ||
            rendererLower.includes('geforce') ||
            rendererLower.includes('quadro') ||
            rendererLower.includes('radeon rx') ||
            rendererLower.includes('radeon pro') ||
            (rendererLower.includes('apple') && rendererLower.includes('m1')) ||
            (rendererLower.includes('apple') && rendererLower.includes('m2')) ||
            (rendererLower.includes('apple') && rendererLower.includes('m3')) ||
            (rendererLower.includes('apple') && rendererLower.includes('m4'));

          // Low-end detection
          const isLowEnd =
            rendererLower.includes('intel hd') ||
            rendererLower.includes('intel uhd') ||
            rendererLower.includes('mesa') ||
            rendererLower.includes('swiftshader') ||
            rendererLower.includes('llvmpipe');

          if (isHighEnd) {
            tier = 'high';
          } else if (isLowEnd) {
            tier = 'low';
          }
        }

        // Performance heuristics - check max texture size and other limits
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        const maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);

        // If limits are particularly high, bump up tier
        if (maxTextureSize >= 16384 && maxVertexAttribs >= 32 && tier === 'medium') {
          tier = 'high';
        }

        // If limits are low, bump down
        if (maxTextureSize < 4096) {
          tier = 'low';
        }
      }

      // Check for battery/power saver mode via connection or battery API
      if ('connection' in navigator) {
        const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
        if (conn?.saveData) {
          tier = 'low';
        }
      }

      setResult({
        tier,
        isMobile,
        supportsWebGL2,
        isLoading: false,
      });
    };

    // Delay detection slightly to ensure DOM is ready
    const timeoutId = setTimeout(detectGPU, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return result;
}

/**
 * Get particle count based on GPU tier
 */
export function getParticleCount(tier: GPUTier): number {
  switch (tier) {
    case 'high':
      return 1000;
    case 'medium':
      return 500;
    case 'low':
      return 0; // CSS fallback only
  }
}

/**
 * Check if post-processing effects should be enabled
 */
export function shouldEnableBloom(tier: GPUTier): boolean {
  return tier === 'high';
}

/**
 * Get floating object count based on GPU tier
 */
export function getFloatingObjectCount(tier: GPUTier): number {
  switch (tier) {
    case 'high':
      return 15;
    case 'medium':
      return 8;
    case 'low':
      return 0;
  }
}
