import { useRef } from "react";
import { Mesh, Group } from "three";
import { useFrame } from "@react-three/fiber";

export const RocketModel = () => {
  const noseConeRef = useRef<Mesh>(null);
  const bodyRef = useRef<Mesh>(null);
  const finsRef = useRef<Group>(null);

  // Gentle rotation animation
  useFrame((state) => {
    if (bodyRef.current) {
      bodyRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Nose Cone */}
      <mesh ref={noseConeRef} position={[0, 3, 0]}>
        <coneGeometry args={[0.5, 2, 8]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Body Tube */}
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 16]} />
        <meshStandardMaterial color="#1E293B" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Fins */}
      <group ref={finsRef} position={[0, -1.5, 0]}>
        {[0, 120, 240].map((rotation, index) => (
          <mesh
            key={index}
            rotation={[0, (rotation * Math.PI) / 180, 0]}
            position={[0.7, 0, 0]}
          >
            <boxGeometry args={[0.1, 1.5, 1]} />
            <meshStandardMaterial color="#10B981" metalness={0.5} roughness={0.3} />
          </mesh>
        ))}
      </group>
      
      {/* Motor */}
      <mesh position={[0, -2.2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.6, 12]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Thrust effect */}
      <mesh position={[0, -2.8, 0]}>
        <coneGeometry args={[0.2, 0.8, 8]} />
        <meshStandardMaterial 
          color="#FF6B35" 
          emissive="#FF6B35" 
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};