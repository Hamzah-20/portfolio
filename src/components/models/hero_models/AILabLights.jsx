import * as THREE from "three";

const AILabLights = () => (
  <>
    {/* Main monitor / desk light */}
    <spotLight
      position={[2, 5, 6]}
      angle={0.15}
      penumbra={0.2}
      intensity={100}
      color="#e6fbff"
    />

    {/* Cyan overhead light */}
    <spotLight
      position={[4, 5, 4]}
      angle={0.3}
      penumbra={0.5}
      intensity={40}
      color="#22d3ee"
    />

    {/* Deep blue side fill */}
    <spotLight
      position={[-3, 5, 5]}
      angle={0.4}
      penumbra={1}
      intensity={60}
      color="#2563eb"
    />

    {/* Soft cyan area light */}
    <primitive
      object={new THREE.RectAreaLight("#0891b2", 8, 3, 2)}
      position={[1, 3, 4]}
      rotation={[-Math.PI / 4, Math.PI / 4, 0]}
      intensity={15}
    />

    {/* Atmospheric fill */}
    <pointLight position={[0, 1, 0]} intensity={10} color="#06b6d4" />

    <pointLight position={[1, 2, -2]} intensity={10} color="#1d4ed8" />
  </>
);

export default AILabLights;
