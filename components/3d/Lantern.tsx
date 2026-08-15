'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LanternProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Lantern({ position = [0, 0, 0], scale = 0.5 }: LanternProps) {
  const group = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
      group.current.position.y += Math.sin(Date.now() * 0.001) * 0.002;
    }
  });

  return (
    <group ref={group} position={position} scale={[scale, scale, scale]}>
      {/* Top cap */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.1, 16]} />
        <meshBasicMaterial color="#D4A574" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.8, 16]} />
        <meshBasicMaterial color="#FF6B6B" transparent opacity={0.7} />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.1, 16]} />
        <meshBasicMaterial color="#D4A574" />
      </mesh>
      {/* Light glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}