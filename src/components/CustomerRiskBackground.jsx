import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const customerNodes = [
  { position: [-5.2, 2.7, -1.2], risk: "low" },
  { position: [-4.1, 1.1, 0.4], risk: "low" },
  { position: [-5, -1.4, -0.5], risk: "low" },
  { position: [-3.2, -2.8, 0.5], risk: "low" },
  { position: [-2.7, 3.5, -0.4], risk: "low" },

  { position: [-1.4, 1.9, 0.8], risk: "medium" },
  { position: [-0.6, 0.1, -0.6], risk: "medium" },
  { position: [-1.2, -2.1, 0.7], risk: "medium" },
  { position: [0.6, 3, -0.8], risk: "medium" },
  { position: [1, 0.8, 0.6], risk: "medium" },

  { position: [2.3, 2.8, 0.4], risk: "high" },
  { position: [3.4, 1.1, -0.7], risk: "high" },
  { position: [4.9, 2, 0.5], risk: "high" },
  { position: [2.7, -1.2, 0.7], risk: "high" },
  { position: [4.5, -2.4, -0.4], risk: "high" },
  { position: [1.7, -3.1, 0.3], risk: "high" },
];

const connections = [
  [0, 1],
  [0, 4],
  [1, 2],
  [1, 5],
  [2, 3],
  [3, 7],
  [4, 5],
  [5, 6],
  [5, 8],
  [6, 7],
  [6, 9],
  [7, 15],
  [8, 9],
  [8, 10],
  [9, 10],
  [9, 13],
  [10, 11],
  [10, 12],
  [11, 12],
  [11, 13],
  [12, 14],
  [13, 14],
  [13, 15],
  [14, 15],
];

const signalPaths = [
  [1, 5],
  [5, 6],
  [6, 9],
  [9, 10],
  [10, 11],
  [11, 13],
  [13, 14],
];

const getRiskColor = (risk) => {
  if (risk === "high") return "#fb7185";
  if (risk === "medium") return "#fbbf24";
  return "#67e8f9";
};

const getRiskEmissive = (risk) => {
  if (risk === "high") return "#e11d48";
  if (risk === "medium") return "#d97706";
  return "#0891b2";
};

const CustomerNode = ({ node, index }) => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.3 + index) * 0.12;

    ref.current.scale.setScalar(pulse);
  });

  const isHighRisk = node.risk === "high";

  return (
    <group position={node.position}>
      <mesh ref={ref}>
        <sphereGeometry args={[isHighRisk ? 0.09 : 0.065, 16, 16]} />

        <meshStandardMaterial
          color={getRiskColor(node.risk)}
          emissive={getRiskEmissive(node.risk)}
          emissiveIntensity={isHighRisk ? 2.5 : 1.2}
          roughness={0.3}
          transparent
          opacity={isHighRisk ? 0.9 : 0.65}
        />
      </mesh>

      {isHighRisk && (
        <mesh>
          <ringGeometry args={[0.14, 0.145, 28]} />

          <meshBasicMaterial
            color="#fb7185"
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

const MovingSignal = ({ start, end, delay = 0 }) => {
  const ref = useRef();

  const startVector = useMemo(() => new THREE.Vector3(...start), [start]);

  const endVector = useMemo(() => new THREE.Vector3(...end), [end]);

  useFrame((state) => {
    if (!ref.current) return;

    const progress = (state.clock.elapsedTime * 0.09 + delay) % 1;

    ref.current.position.lerpVectors(startVector, endVector, progress);

    const color = new THREE.Color("#67e8f9");
    const highRiskColor = new THREE.Color("#fb7185");

    color.lerp(highRiskColor, progress);

    ref.current.material.color.copy(color);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 12, 12]} />

      <meshBasicMaterial color="#67e8f9" transparent opacity={0.9} />
    </mesh>
  );
};

const RiskAxis = () => {
  return (
    <group position={[0, -3.9, -1]}>
      <Line
        points={[
          [-5.2, 0, 0],
          [5.2, 0, 0],
        ]}
        color="#ffffff"
        lineWidth={0.5}
        transparent
        opacity={0.07}
      />

      <mesh position={[-4.6, 0, 0]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.5} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.5} />
      </mesh>

      <mesh position={[4.6, 0, 0]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color="#fb7185" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const RiskScene = () => {
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

    const time = state.clock.elapsedTime;
    const progress = scrollRef.current;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.1 + progress * 0.32,
      0.02,
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.03 + progress * 0.08,
      0.02,
    );

    groupRef.current.position.y = Math.sin(time * 0.12) * 0.08;

    groupRef.current.position.x = Math.sin(time * 0.08) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.18} />

      <pointLight position={[-3, 2, 5]} intensity={0.7} color="#22d3ee" />

      <pointLight position={[4, 1, 4]} intensity={0.55} color="#fb7185" />

      <group ref={groupRef}>
        {connections.map(([from, to], index) => {
          const fromRisk = customerNodes[from].risk;
          const toRisk = customerNodes[to].risk;

          const highRisk = fromRisk === "high" || toRisk === "high";

          return (
            <Line
              key={`${from}-${to}-${index}`}
              points={[
                customerNodes[from].position,
                customerNodes[to].position,
              ]}
              color={highRisk ? "#fb7185" : "#67e8f9"}
              lineWidth={0.4}
              transparent
              opacity={highRisk ? 0.07 : 0.075}
            />
          );
        })}

        {customerNodes.map((node, index) => (
          <CustomerNode key={index} node={node} index={index} />
        ))}

        {signalPaths.map(([from, to], index) => (
          <MovingSignal
            key={index}
            start={customerNodes[from].position}
            end={customerNodes[to].position}
            delay={index / signalPaths.length}
          />
        ))}

        <RiskAxis />
      </group>

      <Sparkles
        count={40}
        scale={[14, 9, 8]}
        size={1}
        speed={0.1}
        opacity={0.12}
        color="#67e8f9"
      />
    </>
  );
};

const CustomerRiskBackground = () => {
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
        <RiskScene />
      </Canvas>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, transparent 0%, rgba(0,0,0,0.1) 46%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/65" />
    </div>
  );
};

export default CustomerRiskBackground;
