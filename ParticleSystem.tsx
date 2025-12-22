
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GestureState } from './types';

interface ParticleSystemProps {
  state: GestureState;
}

const PARTICLE_COUNT = 8000;

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ state }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const targetPositions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  const currentPositions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  const velocities = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  
  // Color smoothing
  const lerpColor = useRef(new THREE.Color('#ffffff'));
  const targetColor = useMemo(() => new THREE.Color(state.color), [state.color]);

  // Generate shape positions
  const generateShape = (shape: string, expansion: number) => {
    const scale = 2 + expansion * 3;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let x = 0, y = 0, z = 0;

      if (shape === 'heart') {
        const t = Math.random() * Math.PI * 2;
        const p = Math.random() * Math.PI * 2;
        // Parametric heart
        x = 16 * Math.pow(Math.sin(t), 3);
        y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        z = (Math.random() - 0.5) * 5;
        const s = scale * 0.15;
        x *= s; y *= s; z *= s;
      } else if (shape === 'flower') {
        const t = Math.random() * Math.PI * 2;
        const r = Math.sin(4 * t) * scale;
        x = r * Math.cos(t);
        y = r * Math.sin(t);
        z = (Math.random() - 0.5) * scale * 0.5;
      } else if (shape === 'saturn') {
        if (i < PARTICLE_COUNT * 0.6) {
          // Sphere core
          const phi = Math.acos(-1 + (2 * i) / (PARTICLE_COUNT * 0.6));
          const theta = Math.sqrt(PARTICLE_COUNT * 0.6 * Math.PI) * phi;
          x = scale * 0.5 * Math.cos(theta) * Math.sin(phi);
          y = scale * 0.5 * Math.sin(theta) * Math.sin(phi);
          z = scale * 0.5 * Math.cos(phi);
        } else {
          // Ring
          const angle = Math.random() * Math.PI * 2;
          const dist = scale * (0.8 + Math.random() * 0.4);
          x = dist * Math.cos(angle);
          z = dist * Math.sin(angle);
          y = (Math.random() - 0.5) * 0.2;
        }
      } else if (shape === 'fireworks') {
        const mag = Math.random() * scale * 2;
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        x = mag * Math.sin(theta) * Math.cos(phi);
        y = mag * Math.sin(theta) * Math.sin(phi);
        z = mag * Math.cos(theta);
      } else if (shape === 'spiral') {
        // Galaxy spiral
        const arm = Math.floor(Math.random() * 3); // 3 spiral arms
        const t = Math.random() * 4;
        const angle = t * Math.PI + (arm * Math.PI * 2 / 3);
        const r = t * scale * 0.5;
        x = r * Math.cos(angle) + (Math.random() - 0.5) * 0.5;
        y = (Math.random() - 0.5) * 0.3 * scale;
        z = r * Math.sin(angle) + (Math.random() - 0.5) * 0.5;
      } else if (shape === 'star') {
        // 5-pointed star
        const points = 5;
        const t = Math.random() * Math.PI * 2;
        const innerR = scale * 0.4;
        const outerR = scale * 1.2;
        const angle = Math.floor(t / (Math.PI * 2 / (points * 2))) * (Math.PI * 2 / (points * 2));
        const isOuter = Math.floor(t / (Math.PI / points)) % 2 === 0;
        const r = isOuter ? outerR * Math.random() : innerR * Math.random();
        x = r * Math.cos(t);
        y = r * Math.sin(t);
        z = (Math.random() - 0.5) * scale * 0.3;
      } else if (shape === 'wave') {
        // Wave pattern
        const waveX = (Math.random() - 0.5) * scale * 3;
        const waveZ = (Math.random() - 0.5) * scale * 2;
        x = waveX;
        y = Math.sin(waveX * 2) * Math.cos(waveZ * 2) * scale * 0.5;
        z = waveZ;
      } else {
        // Sphere (Default)
        const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
        const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
        x = scale * Math.cos(theta) * Math.sin(phi);
        y = scale * Math.sin(theta) * Math.sin(phi);
        z = scale * Math.cos(phi);
      }

      targetPositions[i * 3] = x;
      targetPositions[i * 3 + 1] = y;
      targetPositions[i * 3 + 2] = z;
    }
  };

  useEffect(() => {
    generateShape(state.shape, state.expansion);
  }, [state.shape, state.expansion]);

  useFrame((stateFrame, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Smooth color transition
    lerpColor.current.lerp(targetColor, 0.05);
    (pointsRef.current.material as THREE.PointsMaterial).color.copy(lerpColor.current);

    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      // Smoothly move towards target
      const diff = targetPositions[i] - positions[i];
      positions[i] += diff * 0.05;
      
      // Add some subtle noise/swimming motion
      positions[i] += Math.sin(stateFrame.clock.elapsedTime * 2 + i) * 0.005;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.1;
    pointsRef.current.rotation.x += delta * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={currentPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
};
