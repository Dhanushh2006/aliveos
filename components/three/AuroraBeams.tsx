"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function AuroraBeams() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.12) * 0.08;

    group.current.rotation.y += 0.0008;
  });

  return (
    <group ref={group}>
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          rotation={[
            0,
            (Math.PI * 2 * i) / 6,
            Math.PI / 2,
          ]}
        >
          <planeGeometry args={[0.6, 5]} />

          <meshBasicMaterial
            color={i % 2 === 0 ? "#67e8f9" : "#a855f7"}
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}