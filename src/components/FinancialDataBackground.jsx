import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const marketPoints = [
  [-5.5, -1.8, 0],
  [-4.5, -1.1, 0.2],
  [-3.5, -1.5, -0.2],
  [-2.5, -0.4, 0.3],
  [-1.5, -0.8, -0.1],
  [-0.5, 0.4, 0.2],
  [0.5, 0.1, -0.2],
  [1.5, 1.1, 0.3],
  [2.5, 0.7, -0.1],
  [3.5, 1.8, 0.2],
  [4.5, 1.4, -0.2],
  [5.5, 2.5, 0.2],
];

const clusterPoints = [
  [-4.8, 2.8, -0.7],
  [-4.2, 2.2, -0.4],
  [-3.7, 3.1, -0.6],
  [-3.2, 2.4, -0.3],

  [-0.8, -2.7, -0.6],
  [-0.1, -2.2, -0.4],
  [0.6, -2.8, -0.7],
  [1, -2.1, -0.3],

  [3.3, -1.9, -0.6],
  [4, -2.6, -0.4],
  [4.6, -1.7, -0.7],
  [5.1, -2.4, -0.3],
];

const MarketNode = ({ position, index }) => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4 + index) * 0.12;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.055, 14, 14]} />
      <meshStandardMaterial
        color="#67e8f9"
        emissive="#0891b2"
        emissiveIntensity={2}
        transparent
        opacity={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const MovingMarketPacket = ({ delay = 0 }) => {
  const ref = useRef();

  const vectors = useMemo(
    () => marketPoints.map((point) => new THREE.Vector3(...point)),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;

    const progress = (state.clock.elapsedTime * 0.055 + delay) % 1;

    const segmentCount = vectors.length - 1;
    const scaledProgress = progress * segmentCount;
    const segment = Math.min(Math.floor(scaledProgress), segmentCount - 1);

    const localProgress = scaledProgress - segment;

    ref.current.position.lerpVectors(
      vectors[segment],
      vectors[segment + 1],
      localProgress,
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.065, 12, 12]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
    </mesh>
  );
};

const ClusterNode = ({ position, index }) => {
  const colors = ["#67e8f9", "#c084fc", "#fbbf24"];
  const color = colors[Math.floor(index / 4)];

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      <mesh>
        <ringGeometry args={[0.11, 0.115, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const FinancialGrid = () => {
  const verticalLines = useMemo(
    () =>
      Array.from({ length: 13 }, (_, index) => {
        const x = -6 + index;

        return [
          [x, -4, -1.8],
          [x, 4, -1.8],
        ];
      }),
    [],
  );

  const horizontalLines = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => {
        const y = -4 + index;

        return [
          [-6, y, -1.8],
          [6, y, -1.8],
        ];
      }),
    [],
  );

  return (
    <group>
      {verticalLines.map((points, index) => (
        <Line
          key={`v-${index}`}
          points={points}
          color="#67e8f9"
          lineWidth={0.3}
          transparent
          opacity={0.035}
        />
      ))}

      {horizontalLines.map((points, index) => (
        <Line
          key={`h-${index}`}
          points={points}
          color="#67e8f9"
          lineWidth={0.3}
          transparent
          opacity={0.035}
        />
      ))}
    </group>
  );
};

const FinancialScene = () => {
  const sceneRef = useRef();
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

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useFrame((state) => {
    if (!sceneRef.current) return;

    const progress = scrollRef.current;
    const time = state.clock.elapsedTime;

    sceneRef.current.rotation.y = THREE.MathUtils.lerp(
      sceneRef.current.rotation.y,
      -0.07 + progress * 0.18,
      0.02,
    );

    sceneRef.current.rotation.x = THREE.MathUtils.lerp(
      sceneRef.current.rotation.x,
      0.02 + progress * 0.05,
      0.02,
    );

    sceneRef.current.position.y = Math.sin(time * 0.09) * 0.07;
  });

  return (
    <>
      <ambientLight intensity={0.18} />

      <pointLight position={[0, 2, 5]} intensity={0.8} color="#22d3ee" />

      <pointLight position={[4, -2, 4]} intensity={0.35} color="#c084fc" />

      <group ref={sceneRef}>
        <FinancialGrid />

        <Line
          points={marketPoints}
          color="#67e8f9"
          lineWidth={1}
          transparent
          opacity={0.18}
        />

        {marketPoints.map((point, index) => (
          <MarketNode key={index} position={point} index={index} />
        ))}

        <MovingMarketPacket delay={0} />
        <MovingMarketPacket delay={0.33} />
        <MovingMarketPacket delay={0.66} />

        {clusterPoints.map((point, index) => (
          <ClusterNode key={index} position={point} index={index} />
        ))}
      </group>

      <Sparkles
        count={40}
        scale={[14, 9, 8]}
        size={1}
        speed={0.08}
        opacity={0.1}
        color="#67e8f9"
      />
    </>
  );
};

const FinancialDataBackground = () => {
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
        <FinancialScene />
      </Canvas>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, transparent 0%, rgba(0,0,0,0.1) 48%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/65" />
    </div>
  );
};

export default FinancialDataBackground;
