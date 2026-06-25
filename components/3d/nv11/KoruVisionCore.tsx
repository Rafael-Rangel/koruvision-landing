"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Stars } from "@react-three/drei";
import * as THREE from "three";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { ProductCommandCenter } from "@/components/product/ProductCommandCenter";
import { smoothrange } from "@/lib/motion-system";

interface KoruCoreMeshProps {
  mouse: { x: number; y: number };
  scrollProgress: number;
}

function KoruCoreMesh({ mouse, scrollProgress }: KoruCoreMeshProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const open = smoothrange(scrollProgress, 0.35, 0.75);

  useFrame((state) => {
    const mx = (mouse.x - 0.5) * 2;
    const my = (mouse.y - 0.5) * 2;
    if (coreRef.current) {
      coreRef.current.rotation.y = THREE.MathUtils.lerp(coreRef.current.rotation.y, mx * 0.35 + state.clock.elapsedTime * 0.08, 0.06);
      coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, -my * 0.22, 0.06);
      coreRef.current.scale.setScalar(1 - open * 0.12);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.15;
      ringRef.current.rotation.x = Math.PI / 2 + my * 0.1;
      ringRef.current.scale.setScalar(1.15 + open * 0.2);
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#FFC233" />
      <pointLight position={[-3, -2, 2]} intensity={0.6} color="#8B5CF6" />
      <Stars radius={40} depth={30} count={1200} factor={2} saturation={0} fade speed={0.4} />
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
        <Sphere ref={coreRef} args={[1.1, 64, 64]}>
          <MeshDistortMaterial
            color="#5B21B6"
            emissive="#FFC233"
            emissiveIntensity={0.35 + open * 0.25}
            roughness={0.15}
            metalness={0.65}
            distort={0.28 + open * 0.15}
            speed={2.5}
          />
        </Sphere>
      </Float>
      <Torus ref={ringRef} args={[1.55, 0.04, 16, 100]}>
        <meshStandardMaterial color="#E8ECF8" emissive="#8B5CF6" emissiveIntensity={0.8} metalness={0.9} roughness={0.2} />
      </Torus>
    </>
  );
}

interface KoruVisionCoreProps {
  scrollProgress?: number;
  className?: string;
}

export function KoruVisionCore({ scrollProgress = 0, className = "" }: KoruVisionCoreProps) {
  const { stageRef, mouse, onMove, onLeave } = usePointerParallax({ maxTiltX: 10, maxTiltY: 14 });
  const crmOpacity = smoothrange(scrollProgress, 0.55, 0.85);
  const crmY = (1 - crmOpacity) * 80;

  return (
    <div
      ref={stageRef}
      className={`koru-vision-core ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ perspective: "1200px" }}
    >
      <div className="koru-vision-core__glow" aria-hidden />
      <div className="koru-vision-core__canvas">
        <Suspense fallback={<div className="koru-vision-core__fallback" aria-hidden />}>
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
            <KoruCoreMesh mouse={mouse} scrollProgress={scrollProgress} />
          </Canvas>
        </Suspense>
      </div>
      <div
        className="koru-vision-core__crm"
        style={{ opacity: crmOpacity, transform: `translateY(${crmY}px) scale(${0.88 + crmOpacity * 0.12})` }}
      >
        <ProductCommandCenter compact />
      </div>
    </div>
  );
}
