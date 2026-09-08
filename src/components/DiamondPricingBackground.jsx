import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const priceCurve = [
  [-5.5, -2.2, -0.3],
  [-4.6, -1.8, 0.1],
  [-3.7, -1.3, -0.2],
  [-2.8, -0.7, 0.2],
  [-1.9, -1, -0.1],
  [-1, 0, 0.3],
  [0, 0.4, -0.1],
  [1, 1.1, 0.2],
  [2, 0.8, -0.2],
  [3, 1.6, 0.3],
  [4, 2, -0.1],
  [5.3, 2.8, 0.2],
];

const diamondNodes = [
  [-4.8, 2.7, -0.6],
  [-3.6, 1.8, 0.4],
  [-2.3, 3, -0.3],
  [-0.8, 2.1, 0.5],
  [0.7, 3, -0.4],
  [2.1, 2.2, 0.3],
  [3.7, 3.1, -0.5],
  [4.8, 1.9, 0.3],
  [-4.2, -2.8, -0.5],
  [-2.3, -2.4, 0.2],
  [2.5, -2.5, -0.4],
  [4.4, -2.8, 0.3],
];

const DiamondNode = ({ position, index }) => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.x += 0.002;
    ref.current.rotation.y += 0.003;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.08;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.12, 0]} />

      <meshStandardMaterial
        color="#b6f6ff"
        emissive="#22d3ee"
        emissiveIntensity={1.8}
        roughness={0.15}
        metalness={0.25}
        transparent
        opacity={0.65}
      />
    </mesh>
  );
};

const MovingPriceSignal = ({ delay = 0 }) => {
  const ref = useRef();

  const vectors = useMemo(
    () => priceCurve.map((point) => new THREE.Vector3(...point)),
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
      <sphereGeometry args={[0.06, 12, 12]} />

      <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
    </mesh>
  );
};

const PricingGrid = () => {
  const verticalLines = useMemo(
    () =>
      Array.from({ length: 13 }, (_, index) => {
        const x = -6 + index;

        return [
          [x, -4, -2],
          [x, 4, -2],
        ];
      }),
    [],
  );

  const horizontalLines = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => {
        const y = -4 + index;

        return [
          [-6, y, -2],
          [6, y, -2],
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

const PricingScene = () => {
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

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = scrollRef.current;
    const time = state.clock.elapsedTime;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.08 + progress * 0.2,
      0.02,
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.03 + progress * 0.05,
      0.02,
    );

    groupRef.current.position.y = Math.sin(time * 0.1) * 0.07;
  });

  return (
    <>
      <ambientLight intensity={0.2} />

      <pointLight position={[0, 2, 5]} intensity={0.9} color="#67e8f9" />

      <group ref={groupRef}>
        <PricingGrid />

        <Line
          points={priceCurve}
          color="#67e8f9"
          lineWidth={1}
          transparent
          opacity={0.16}
        />

        {priceCurve.map((point, index) => (
          <mesh key={index} position={point}>
            <sphereGeometry args={[0.045, 12, 12]} />

            <meshBasicMaterial color="#67e8f9" transparent opacity={0.55} />
          </mesh>
        ))}

        {diamondNodes.map((position, index) => (
          <DiamondNode key={index} position={position} index={index} />
        ))}

        <MovingPriceSignal delay={0} />
        <MovingPriceSignal delay={0.33} />
        <MovingPriceSignal delay={0.66} />
      </group>

      <Sparkles
        count={48}
        scale={[14, 9, 8]}
        size={1}
        speed={0.08}
        opacity={0.12}
        color="#b6f6ff"
      />
    </>
  );
};

const DiamondPricingBackground = () => {
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
        <PricingScene />
      </Canvas>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, transparent 0%, rgba(0,0,0,0.10) 48%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/65" />
    </div>
  );
};

export default DiamondPricingBackground;
