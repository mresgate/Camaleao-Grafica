// src/components/canvas/FloatingProducts.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Card({ position, rotation, color = "#00C26B" }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 8 + rotation[0];
      meshRef.current.rotation.y = Math.sin(t / 4) / 8 + rotation[1];
      meshRef.current.position.y = Math.sin(t / 1.5) / 10 + position[1];
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <boxGeometry args={[2, 1.2, 0.05]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2} 
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function Flyer({ position, rotation, color = "#22c55e" }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t / 3) / 10 + rotation[2];
      meshRef.current.position.y = Math.cos(t / 2) / 12 + position[1];
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <boxGeometry args={[1.5, 2.2, 0.02]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.3} 
          roughness={0.5} 
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingProducts() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Card position={[-3, 1.5, 0]} rotation={[0.4, 0.5, 0]} color="#00C26B" />
        <Card position={[4, -1, 1]} rotation={[-0.2, -0.4, 0.2]} color="#00C26B" />
        <Flyer position={[2.5, 2, -1]} rotation={[0.2, -0.3, 0.5]} color="#22c55e" />
        <Flyer position={[-4, -2, 0]} rotation={[-0.5, 0.2, -0.2]} color="#8b5cf6" />

        <Environment preset="city" />
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
      </Canvas>
    </div>
  );
}
