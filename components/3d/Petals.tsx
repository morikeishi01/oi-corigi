'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PetalsProps {
  count?: number;
}

export default function Petals({ count = 40 }: PetalsProps) {
  const mesh = useRef<THREE.InstancedMesh>(null!);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 4,
      speed: 0.3 + Math.random() * 0.7,
      rotSpeed: (Math.random() - 0.5) * 2,
      size: 0.08 + Math.random() * 0.12,
    }));
  }, [count]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    data.forEach((p, i) => {
      p.y -= p.speed * delta;
      if (p.y < -5) { p.y = 5; p.x = (Math.random() - 0.5) * 10; }
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.z += p.rotSpeed * delta;
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.3, 0.4]} />
      <meshBasicMaterial color="#FFB7C5" side={THREE.DoubleSide} transparent opacity={0.7} />
    </instancedMesh>
  );
}