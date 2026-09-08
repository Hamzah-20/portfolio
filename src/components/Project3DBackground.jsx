import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const nodes = [
  [-5.2, 2.4, -2],
  [-3.6, 1.2, 0.4],
  [-2.7, 3.5, 1],
  [-1.5, 0.1, -1.2],
  [0, 2.2, 0],
  [1.9, 0.7, 1.4],
  [3.7, 2.4, -1],
  [5.2, 0.3, 0],
  [3.1, -2.2, 0.8],
  [0.4, -2.8, -1.2],
  [-2.5, -2.2, 1],
  [-4.8, -1.1, -1.4],
  [0, 0, 2.6],
  [4.4, -3.4, -1],
  [-1.1, 4.4, -2],
  [3.4, 4.1, 1.2],
];

const edges = [
  [0, 1],
  [0, 2],
  [0, 11],
  [1, 2],
  [1, 3],
  [1, 10],
  [2, 4],
  [2, 14],
  [3, 4],
  [3, 9],
  [3, 10],
  [4, 5],
  [4, 12],
  [4, 14],
  [4, 15],
  [5, 6],
  [5, 8],
  [5, 12],
  [6, 7],
  [6, 15],
  [7, 8],
  [8, 9],
  [8, 13],
  [9, 10],
  [10, 11],
  [12, 5],
  [13, 7],
  [15, 6],
];

const pulseEdges = [
  [0, 1],
  [1, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [10, 3],
  [12, 5],
];

const NetworkNode = ({ position, index }) => {
  const isCore = index === 4;

  return (
    <mesh position={position}>
      <sphereGeometry args={[isCore ? 0.16 : 0.065, 18, 18]} />

      <meshStandardMaterial
        color={isCore ? "#67e8f9" : "#9bdcff"}
        emissive={isCore ? "#22d3ee" : "#0e7490"}
        emissiveIntensity={isCore ? 3 : 1.2}
        roughness={0.25}
        metalness={0.1}
        transparent
        opacity={isCore ? 0.95 : 0.65}
      />
    </mesh>
  );
};

const MovingPulse = ({ start, end, phase = 0, speed = 0.15 }) => {
  const ref = useRef();

  const startVector = useMemo(() => new THREE.Vector3(...start), [start]);

  const endVector = useMemo(() => new THREE.Vector3(...end), [end]);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime;
    const progress = (time * speed + phase) % 1;

    ref.current.position.lerpVectors(startVector, endVector, progress);

    const pulse = 0.75 + Math.sin(time * 5 + phase * 10) * 0.25;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 12, 12]} />

      <meshBasicMaterial color="#67e8f9" transparent opacity={0.95} />
    </mesh>
  );
};

const Core = () => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <group ref={ref} position={nodes[4]}>
      <mesh>
        <sphereGeometry args={[0.14, 24, 24]} />

        <meshStandardMaterial
          color="#b6f6ff"
          emissive="#22d3ee"
          emissiveIntensity={3.5}
          roughness={0.2}
          transparent
          opacity={0.95}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.36, 24, 24]} />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.045}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const NetworkScene = () => {
  const groupRef = useRef();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const progress = scrollRef.current;

    const targetRotationY = -0.2 + progress * Math.PI * 0.55;

    const targetRotationX = 0.05 + progress * 0.18;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.025,
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.025,
    );

    groupRef.current.position.y = Math.sin(time * 0.18) * 0.12;

    groupRef.current.position.x = Math.sin(time * 0.11) * 0.08;

    const scale = 1 + Math.sin(time * 0.08) * 0.015;

    groupRef.current.scale.setScalar(scale);
  });

  return (
    <>
      <ambientLight intensity={0.15} />

      <pointLight position={[0, 2, 4]} intensity={1.4} color="#22d3ee" />

      <group ref={groupRef} rotation={[0.08, -0.2, 0]}>
        {edges.map(([from, to], index) => (
          <Line
            key={`${from}-${to}-${index}`}
            points={[nodes[from], nodes[to]]}
            color="#67e8f9"
            lineWidth={0.45}
            transparent
            opacity={0.105}
          />
        ))}

        {nodes.map((node, index) => (
          <NetworkNode key={index} position={node} index={index} />
        ))}

        {pulseEdges.map(([from, to], index) => (
          <MovingPulse
            key={`pulse-${index}`}
            start={nodes[from]}
            end={nodes[to]}
            phase={index / pulseEdges.length}
            speed={0.08 + index * 0.006}
          />
        ))}

        <Core />
      </group>

      <Sparkles
        count={45}
        scale={[14, 9, 8]}
        size={1.2}
        speed={0.12}
        opacity={0.16}
        color="#67e8f9"
      />
    </>
  );
};

const Project3DBackground = () => {
  return (
    <div
      className="
        fixed
        inset-0
        z-0
        pointer-events-none
        overflow-hidden
      "
    >
      <Canvas
        dpr={[1, 1.4]}
        camera={{
          position: [0, 0, 10],
          fov: 48,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <NetworkScene />
      </Canvas>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.68) 100%)",
        }}
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/35
          via-black/10
          to-black/60
        "
      />
    </div>
  );
};

export default Project3DBackground;
