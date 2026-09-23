'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

function ParticleNetwork({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const { mouse, camera } = useThree();
  
  const particleCount = isMobile ? 1200 : 4000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const type = Math.random();
      let x, y, z;
      
      if (type > 0.4) {
        // Inner core
        const r = 2.5 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
      } else {
        // Outer rings
        const r = 2 + 3 * Math.random();
        const theta = Math.random() * 2 * Math.PI;
        x = r * Math.cos(theta);
        y = (Math.random() - 0.5) * 0.3;
        z = r * Math.sin(theta);
      }
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.03;
      pointsRef.current.rotation.x -= delta * 0.015;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.1;
      coreRef.current.rotation.x += delta * 0.1;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.05;
      outerRef.current.rotation.z -= delta * 0.05;
    }

    // Interactive Camera Parallax
    const targetX = state.mouse.x * 0.6;
    const targetY = state.mouse.y * 0.6;
    
    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, 6), 0.02);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#93c5fd"
          size={isMobile ? 0.02 : 0.012}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Geometric Wireframe Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          wireframe 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Geometric Wireframe Outer */}
      <mesh ref={outerRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color="#60a5fa" 
          wireframe 
          transparent 
          opacity={0.08} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMounted || prefersReducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="w-full h-full absolute right-0 top-0 flex items-center justify-center opacity-80 pointer-events-none lg:pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        dpr={isMobile ? [1, 1.5] : [1, 2]} 
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ParticleNetwork isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
