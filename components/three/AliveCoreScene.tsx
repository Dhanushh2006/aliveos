"use client";

import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type LivingCoreProps = {
  active: boolean;
  onActivate: () => void;
};

function LivingCore({ active, onActivate }: LivingCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const group = groupRef.current;
    const light = lightRef.current;

    if (!group) return;

    const scrollProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    const targetRotationX =
  pointer.y * 0.45 +
  scrollProgress * 0.22;

const targetRotationY =
  pointer.x * 0.62 +
  elapsed * 0.08;
    const breath = 1 + Math.sin(elapsed * 1.45) * 0.045 + (active ? 0.08 : 0);

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotationX, 0.055);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotationY, 0.06);
    group.rotation.z = Math.sin(elapsed * 0.33) * 0.06;
    group.position.x = THREE.MathUtils.lerp(
    group.position.x,
    pointer.x * 0.42,
    0.055,
);

group.position.y = THREE.MathUtils.lerp(
    group.position.y,
    pointer.y * 0.34,
    0.055,
);
    group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, breath, 0.08));

    if (light) {
      light.position.x = THREE.MathUtils.lerp(light.position.x, pointer.x * viewport.width * 0.35, 0.08);
      light.position.y = THREE.MathUtils.lerp(light.position.y, pointer.y * viewport.height * 0.35 + 1.4, 0.08);
      const pointerStrength =
  Math.abs(pointer.x) + Math.abs(pointer.y);

light.intensity = THREE.MathUtils.lerp(
  light.intensity,
  (active ? 8.5 : 6.2) + pointerStrength,
  0.08
);
    }if (ringOneRef.current) {
  ringOneRef.current.rotation.y += 0.0028;
  ringOneRef.current.rotation.x += 0.0012;

  ringOneRef.current.rotation.z =
    THREE.MathUtils.lerp(
      ringOneRef.current.rotation.z,
      pointer.x * 0.22,
      0.05
    );
}

if (ringTwoRef.current) {
  ringTwoRef.current.rotation.x -= 0.0035;
  ringTwoRef.current.rotation.z += 0.0018;

  ringTwoRef.current.rotation.y =
    THREE.MathUtils.lerp(
      ringTwoRef.current.rotation.y,
      pointer.y * 0.28,
      0.05
    );
}

  });

  return (
    <group ref={groupRef} onClick={onActivate}>
      <pointLight ref={lightRef} position={[1.8, 2.2, 2.6]} intensity={5.4} color="#8be9ff" />
      <mesh scale={0.72}>
  <icosahedronGeometry args={[1.38, 7]} />
  <meshStandardMaterial
    color="#ffffff"
    emissive="#67e8f9"
    emissiveIntensity={2.8}
    roughness={0.05}
    metalness={0.2}
  />
</mesh><mesh castShadow receiveShadow>
  <icosahedronGeometry args={[1.38, 10]} />
  <MeshDistortMaterial
    color="#dffcff"
    emissive="#22d3ee"
    emissiveIntensity={0.45}
    roughness={0.08}
    metalness={0.82}
    clearcoat={1}
    clearcoatRoughness={0.03}
    transmission={0.92}
    thickness={0.8}
    distort={0.16}
    speed={1.2}
  />
</mesh>
      <mesh scale={1.17}>
        <icosahedronGeometry args={[1.38, 3]} />
        <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh
  ref={ringOneRef}
  scale={1.78}
  rotation={[0.42, 0.18, 0.08]}
>
        <torusGeometry args={[1.18, 0.006, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
      <mesh
  ref={ringTwoRef}
  scale={2.12}
  rotation={[1.12, -0.3, 0.26]}
>
        <torusGeometry args={[1.18, 0.005, 8, 160]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

function seededNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function ParticleField() {
  const particles = useMemo(() => {
    const points = [];

    for (let i = 0; i < 450; i += 1) {
      const radius = 2.4 + seededNoise(i + 1) * 3.6;
      const theta = seededNoise(i + 101) * Math.PI * 2;
      const phi = Math.acos(2 * seededNoise(i + 201) - 1);
      points.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ),
      );
    }

    return points;
  }, []);

  return (
    <group>
      {particles.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[
    index % 7 === 0 ? 0.014 : 0.006, 8, 8]} />
          <meshBasicMaterial color={index % 4 === 0 ? "#a7f3d0" : "#bae6fd"} transparent opacity={0.78} />
        </mesh>
      ))}
      <Sparkles count={120} scale={8} size={2.2} speed={0.45} opacity={0.46} color="#e0faff" />
    </group>
  );
}

function SceneContent() {
  const [active, setActive] = useState(false);

  return (
    <>
      <color attach="background" args={["#050506"]} />
      <fog attach="fog" args={["#050506", 6, 11]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[-3, 4, 5]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[4, -1, 2]} intensity={1.2} color="#34d399" />
      <ParticleField />
      <LivingCore active={active} onActivate={() => setActive((value) => !value)} /><EffectComposer>
  <Bloom
    intensity={1.35}
    luminanceThreshold={0.2}
    luminanceSmoothing={0.9}
    mipmapBlur
  />
</EffectComposer>
    </>
    
  );
}

export function AliveCoreScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      shadows={false}
      className="absolute inset-0"
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}

