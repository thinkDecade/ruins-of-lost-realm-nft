"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

export function ThreeScene() {
  return (
    <Canvas className="absolute inset-0">
      <Stars radius={100} depth={50} count={5000} factor={4} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
