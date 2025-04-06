
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { MousePosition, calculateNormalizedPosition, calculateRotation } from '../utils/mouseTracking';

// Заменим компонент
const Object3D: React.FC<{ mouseRotation: MousePosition }> = ({ mouseRotation }) => {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF('/LOGO.glb');

  // Устанавливаем начальную трансформацию один раз
  useEffect(() => {
    if (gltf.scene) {
      // Повернуть модель при загрузке
      gltf.scene.rotation.set(Math.PI / 2, 0, 0); // подстрой под себя
      gltf.scene.scale.set(1, 1, 1); // если модель слишком большая/маленькая
      gltf.scene.position.set(0, -0.5, 0); // если нужно сдвинуть
    }
  }, [gltf]);

  // Мышиная и автоматическая анимация
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (mouseRotation.x - groupRef.current.rotation.x) * 0.1;
      groupRef.current.rotation.y += (mouseRotation.y - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={0.35} position={[0, 0, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const Model3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseRotation, setMouseRotation] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const elementRect = containerRef.current.getBoundingClientRect();
        const normalizedPosition = calculateNormalizedPosition(e.clientX, e.clientY, elementRect);
        const rotation = calculateRotation(normalizedPosition, 0.5); // Adjust sensitivity
        setMouseRotation(rotation);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[400px]"
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Object3D mouseRotation={mouseRotation} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Model3D;
