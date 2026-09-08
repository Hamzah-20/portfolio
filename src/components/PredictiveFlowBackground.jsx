import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const rootNode = [0, 2.8, 0];

const branches = {
  timeSeries: {
    color: "#67e8f9",
    points: [
      [0, 2.8, 0],
      [-1.2, 1.6, 0.2],
      [-2.4, 0.4, -0.2],
      [-3.8, -1.1, 0.4],
      [-4.8, -2.7, -0.4],
    ],
  },
  classification: {
    color: "#fbbf24",
    points: [
      [0, 2.8, 0],
      [0, 1.4, -0.2],
      [0, 0, 0.3],
      [0, -1.4, -0.3],
      [0, -3, 0.2],
    ],
  },
  regression: {
    color: "#c084fc",
    points: [
      [0, 2.8, 0],
      [1.3, 1.6, -0.2],
      [2.6, 0.3, 0.3],
      [3.8, -1.2, -0.2],
      [4.9, -2.7, 0.3],
    ],
  },
};

const backgroundNodes = [
  [-5.2, 3.5, -1.4],
  [-4.1, 2.3, 0.7],
  [-2.6, 3.8, -0.5],
  [2.5, 3.6, 0.6],
  [4.2, 2.4, -0.8],
  [5.3, 3.3, 0.4],
  [-5.1, -0.2, 0.2],
  [5, 0.1, -0.2],
  [-3.5, -3.7, -0.6],
  [3.6, -3.8, 0.5],
];

const FlowNode = ({ position, color, size = 0.07 }) => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const pulse =
      1 + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.1;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />

      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.8}
        roughness={0.25}
      />
    </mesh>
  );
};

const MovingPacket = ({ points, color, speed = 0.06, phase = 0 }) => {
  const ref = useRef();

  const vectors = useMemo(
    () => points.map((point) => new THREE.Vector3(...point)),
    [points],
  );

  useFrame((state) => {
    if (!ref.current) return;

    const time = (state.clock.elapsedTime * speed + phase) % 1;

    const totalSegments = vectors.length - 1;
    const scaled = time * totalSegments;

    const segment = Math.min(Math.floor(scaled), totalSegments - 1);

    const localProgress = scaled - segment;

    ref.current.position.lerpVectors(
      vectors[segment],
      vectors[segment + 1],
      localProgress,
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 12, 12]} />

      <meshBasicMaterial color={color} transparent opacity={0.95} />
    </mesh>
  );
};

const Branch = ({ branch, phase }) => {
  return (
    <>
      <Line
        points={branch.points}
        color={branch.color}
        lineWidth={0.7}
        transparent
        opacity={0.12}
      />

      {branch.points.map((point, index) => (
        <FlowNode
          key={index}
          position={point}
          color={branch.color}
          size={index === branch.points.length - 1 ? 0.1 : 0.055}
        />
      ))}

      <MovingPacket points={branch.points} color={branch.color} phase={phase} />
    </>
  );
};

const PredictionScene = () => {
  const groupRef = useRef();
  const scrollRef = useRef(0);

  useEffect(() => {
    const updateScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const progress = scrollRef.current;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.08 + progress * 0.22,
      0.02,
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.03 + progress * 0.07,
      0.02,
    );

    groupRef.current.position.y = Math.sin(time * 0.1) * 0.08;

    groupRef.current.position.x = Math.sin(time * 0.08) * 0.06;
  });

  return (
    <>
      <ambientLight intensity={0.18} />

      <pointLight position={[0, 2, 5]} intensity={0.9} color="#67e8f9" />

      <group ref={groupRef}>
        <FlowNode position={rootNode} color="#ffffff" size={0.13} />

        <Branch branch={branches.timeSeries} phase={0} />

        <Branch branch={branches.classification} phase={0.33} />

        <Branch branch={branches.regression} phase={0.66} />

        {backgroundNodes.map((node, index) => (
          <FlowNode key={index} position={node} color="#67e8f9" size={0.03} />
        ))}
      </group>

      <Sparkles
        count={45}
        scale={[14, 9, 8]}
        size={1}
        speed={0.08}
        opacity={0.12}
        color="#67e8f9"
      />
    </>
  );
};

const PredictiveFlowBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        dpr={[1, 1.35]}
        camera={{
          position: [0, 0, 9.5],
          fov: 46,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <PredictionScene />
      </Canvas>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, transparent 0%, rgba(0,0,0,0.10) 46%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/65" />
    </div>
  );
};

export default PredictiveFlowBackground;
