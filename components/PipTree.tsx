import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const Tree = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.4, 0.6, 2, 8]} />
        <meshStandardMaterial color="#5c4033" roughness={0.8} />
      </mesh>

      {/* Leaves Layers */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[2.5, 2, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.4} />
      </mesh>
      <mesh position={[0, 3.8, 0]}>
        <coneGeometry args={[2, 2, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.4} />
      </mesh>
      <mesh position={[0, 5, 0]}>
        <coneGeometry args={[1.5, 1.8, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.4} />
      </mesh>

      {/* Ornaments */}
      <mesh position={[1.2, 2.2, 0.8]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ff0000" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[-1, 2.8, 0.8]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0.5, 3.5, 1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ff0000" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[-0.5, 4.2, 0.8]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Star */}
      <mesh position={[0, 6, 0]}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const PipTree = () => {
  return (
    <div className="w-full h-full min-h-[500px] bg-gradient-to-b from-gray-900 to-blue-900">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          castShadow
        />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={100} scale={10} size={4} speed={0.4} opacity={0.5} color="#fff" />
        
        <Tree />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default PipTree;
