'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Petals from './Petals';
import Lantern from './Lantern';

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 4]} intensity={0.8} color="#FFB7C5" />
          <pointLight position={[-2, -1, 3]} intensity={0.4} color="#C4B5FD" />
          <Petals count={40} />
          <Lantern position={[1.5, 1.2, -1]} scale={0.4} />
          <Lantern position={[-1.8, -0.5, -2]} scale={0.3} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}