import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const getHeartPosition = (t, r) => {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  const z = 8 * Math.sin(r); 
  return new THREE.Vector3(x * 0.1, y * 0.1, z * 0.1); 
};

const Shards = ({ isHolding }) => {
  const pointsRef = useRef();
  const progress = useRef(0); 

  const particleCount = 2000;
  const { positions, targets } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const targets = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.random() * Math.PI * 2;
      const targetPos = getHeartPosition(t, r);
      
      targets[i * 3] = targetPos.x;
      targets[i * 3 + 1] = targetPos.y;
      targets[i * 3 + 2] = targetPos.z;

      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return { positions, targets };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Smoothly assemble or disassemble based on user holding
    if (isHolding && progress.current < 1) {
      progress.current += delta * 0.4; 
    } else if (!isHolding && progress.current > 0) {
      progress.current -= delta * 0.8; 
    }

    progress.current = THREE.MathUtils.clamp(progress.current, 0, 1);

    const currentPositions = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      currentPositions[idx] = THREE.MathUtils.lerp(positions[idx], targets[idx], progress.current);
      currentPositions[idx + 1] = THREE.MathUtils.lerp(positions[idx + 1], targets[idx + 1], progress.current);
      currentPositions[idx + 2] = THREE.MathUtils.lerp(positions[idx + 2], targets[idx + 2], progress.current);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.12} 
        color="#ffb3c6" 
        transparent 
        opacity={0.9} 
      />
    </points>
  );
};

export default function HealingHeart() {
  const [isHolding, setIsHolding] = useState(false);

  return (
    <div 
      className="w-full h-[500px] md:h-[600px] cursor-pointer relative select-none touch-none focus:outline-none"
      onPointerDown={() => setIsHolding(true)}
      onPointerUp={() => setIsHolding(false)}
      onPointerLeave={() => setIsHolding(false)}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <Shards isHolding={isHolding} />
        <Sparkles count={80} scale={10} size={2} speed={0.4} color="#ffffff" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute bottom-4 w-full text-center pointer-events-none">
        <p className="text-[#edd2f7] tracking-[0.2em] uppercase text-xs font-bold animate-pulse drop-shadow-md">
          Click and hold In The Center of the Screen
        </p>
      </div>
    </div>
  );
}