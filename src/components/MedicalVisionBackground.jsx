import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const ScanGrid = () => {
  const groupRef = useRef();

  const verticalLines = useMemo(() => {
    return Array.from({ length: 13 }, (_, index) => {
      const x = -6 + index;
      return [
        [x, -4, 0],
        [x, 4, 0],
      ];
    });
  }, []);

  const horizontalLines = useMemo(() => {
    return Array.from({ length: 9 }, (_, index) => {
      const y = -4 + index;
      return [
        [-6, y, 0],
        [6, y, 0],
      ];
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.08) * 0.02;
  });

  return (
    <group ref={groupRef} position={[0, 0, -1.8]}>
      {verticalLines.map((points, index) => (
        <Line
          key={`v-${index}`}
          points={points}
          color="#67e8f9"
          lineWidth={0.35}
          transparent
          opacity={0.07}
        />
      ))}

      {horizontalLines.map((points, index) => (
        <Line
          key={`h-${index}`}
          points={points}
          color="#67e8f9"
          lineWidth={0.35}
          transparent
          opacity={0.045}
        />
      ))}
    </group>
  );
};

const ScanBeam = () => {
  const beamRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const progress = (time * 0.12) % 1;
    const y = THREE.MathUtils.lerp(3.8, -3.8, progress);

    if (beamRef.current) {
      beamRef.current.position.y = y;
    }

    if (glowRef.current) {
      glowRef.current.position.y = y;
    }
  });

  return (
    <>
      <mesh ref={glowRef} position={[0, 3.8, -0.9]}>
        <planeGeometry args={[12, 0.5]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.025}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={beamRef} position={[0, 3.8, -0.8]}>
        <planeGeometry args={[12, 0.025]} />
        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
};

const DiagnosticPoint = ({ position, delay }) => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const pulse = 0.75 + Math.sin(state.clock.elapsedTime * 1.8 + delay) * 0.25;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.65} />
      </mesh>

      <mesh>
        <ringGeometry args={[0.09, 0.095, 28]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.14}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const VisionFrame = () => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.05;

    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.025;
  });

  return (
    <group ref={ref} position={[0, 0, -0.4]}>
      <Line
        points={[
          [-3.8, 2.6, 0],
          [-3.8, 3.2, 0],
          [-3.2, 3.2, 0],
        ]}
        color="#67e8f9"
        lineWidth={1}
        transparent
        opacity={0.18}
      />

      <Line
        points={[
          [3.8, 2.6, 0],
          [3.8, 3.2, 0],
          [3.2, 3.2, 0],
        ]}
        color="#67e8f9"
        lineWidth={1}
        transparent
        opacity={0.16}
      />

      <Line
        points={[
          [-3.8, -2.6, 0],
          [-3.8, -3.2, 0],
          [-3.2, -3.2, 0],
        ]}
        color="#67e8f9"
        lineWidth={1}
        transparent
        opacity={0.12}
      />

      <Line
        points={[
          [3.8, -2.6, 0],
          [3.8, -3.2, 0],
          [3.2, -3.2, 0],
        ]}
        color="#67e8f9"
        lineWidth={1}
        transparent
        opacity={0.12}
      />
    </group>
  );
};

const MedicalScene = () => {
  const sceneRef = useRef();
  const scrollRef = useRef(0);

  const diagnosticPoints = useMemo(
    () => [
      [-4.8, 2.2, 0.2],
      [-3.2, 0.4, -0.3],
      [-2.2, -2.6, 0.5],
      [-0.7, 2.8, -0.5],
      [1.1, 1.3, 0.4],
      [2.8, -0.8, -0.2],
      [4.7, 2.4, 0.3],
      [4.1, -2.8, -0.4],
      [0.2, -2.1, 0.6],
    ],
    [],
  );

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
      -0.06 + progress * 0.18,
      0.02,
    );

    sceneRef.current.position.x = Math.sin(time * 0.1) * 0.08;

    sceneRef.current.position.y = Math.cos(time * 0.08) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.15} />

      <pointLight position={[0, 0, 5]} intensity={1} color="#22d3ee" />

      <group ref={sceneRef}>
        <ScanGrid />
        <VisionFrame />
        <ScanBeam />

        {diagnosticPoints.map((point, index) => (
          <DiagnosticPoint key={index} position={point} delay={index * 0.7} />
        ))}
      </group>

      <Sparkles
        count={55}
        scale={[14, 9, 8]}
        size={1}
        speed={0.08}
        opacity={0.12}
        color="#7dd3fc"
      />
    </>
  );
};

const MedicalVisionBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        dpr={[1, 1.35]}
        camera={{
          position: [0, 0, 9],
          fov: 46,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <MedicalScene />
      </Canvas>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, transparent 0%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/65" />
    </div>
  );
};

export default MedicalVisionBackground;
