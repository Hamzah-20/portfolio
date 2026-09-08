import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

//import { Room } from "./Room";

import { AILabRoom } from "./AILabRoom";
import AILabLights from "./AILabLights";
import AIMonitors from "./AIMonitors";
// import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense } from "react";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      {/* deep blue ambient */}
      <ambientLight intensity={0.6} color="#8bdcf5" />
      {/* Configure OrbitControls to disable panning and control zoom based on device type */}
      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={!isTablet} // Disables zoom on tablets
        maxDistance={20} // Maximum distance for zooming out
        minDistance={5} // Minimum distance for zooming in
        minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
      />

      <Suspense fallback={null}>
        {/* <HeroLights /> */}
        <AILabLights />
        <Particles count={100} />
        <group
          scale={isMobile ? 0.72 : isTablet ? 0.9 : 1.18}
          position={[0.45, -3.25, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <AILabRoom />
          <AIMonitors />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
