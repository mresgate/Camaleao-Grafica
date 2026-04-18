// src/components/canvas/FloatingProducts.jsx
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function ImageCard({ position, rotation, textureUrl, speed = 1.5 }) {
  const meshRef = useRef();
  
  // Carrega a textura da imagem
  const texture = useTexture(textureUrl);
  texture.colorSpace = THREE.SRGBColorSpace;

  // Tamanho do retângulo baseado nos flyers anteriores (vertical)
  const args = [1.5, 2.2, 0.05];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 8 + rotation[0];
      meshRef.current.rotation.y = Math.sin(t / 4) / 8 + rotation[1];
      meshRef.current.position.y = Math.sin(t / 1.5) / 10 + position[1];
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <boxGeometry args={args} />
        {/* Aplica a textura apenas na face frontal (índice 4), e verde nas laterais/traseira */}
        <meshStandardMaterial attach="material-0" color="#00C26B" /> {/* Direita */}
        <meshStandardMaterial attach="material-1" color="#00C26B" /> {/* Esquerda */}
        <meshStandardMaterial attach="material-2" color="#00C26B" /> {/* Cima */}
        <meshStandardMaterial attach="material-3" color="#00C26B" /> {/* Baixo */}
        <meshStandardMaterial attach="material-4" map={texture} roughness={0.4} metalness={0.1} /> {/* Frente */}
        <meshStandardMaterial attach="material-5" color="#00C26B" /> {/* Atrás */}
      </mesh>
    </Float>
  );
}

export default function FloatingProducts() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.95 }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00C26B" />
        
        <Suspense fallback={null}>
          {/* Retângulos movidos para as laterais (X mais afastado) para não cobrir o texto */}
          <ImageCard 
            position={[-4.8, 1.5, -0.5]} 
            rotation={[0.1, 0.4, -0.1]} 
            textureUrl="/banner-servicos.jpg" 
          />
          <ImageCard 
            position={[5.0, 1.2, -1]} 
            rotation={[-0.1, -0.3, 0.1]} 
            textureUrl="/banner-domingo.jpg" 
          />
          <ImageCard 
            position={[4.5, -1.8, 0.5]} 
            rotation={[-0.2, -0.5, -0.2]} 
            textureUrl="/banner-entrega.jpg" 
          />
        </Suspense>

        <Environment preset="city" />
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
      </Canvas>
    </div>
  );
}
