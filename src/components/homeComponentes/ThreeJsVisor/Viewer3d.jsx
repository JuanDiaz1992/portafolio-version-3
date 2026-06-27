import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import Abstract from "./abstract/Abstract";
import PostProcessingEffects from "./PostProcessingEffects";
import { useColor } from "../../../context/ColorContext";

function CameraCollider() {
  const colliderRef = useRef();

  useFrame((state) => {
    if (!colliderRef.current) return;
    const camPos = state.camera.position;
    colliderRef.current.setTranslation(
      { x: camPos.x, y: camPos.y, z: camPos.z },
      true,
    );
  });

  return (
    <RigidBody ref={colliderRef} type="kinematicPosition" colliders={false}>
      <CuboidCollider args={[5.8, 5.0, 2.1]} />
    </RigidBody>
  );
}

export default function Viewer3d() {
  const { colorPrincipal } = useColor();

  return (
    <div
      className="w-full h-full md:h-112.5 lg:h-full rounded-3xl overflow-hidden relative"
      style={{
        background: `radial-gradient(circle at center, ${colorPrincipal} -90%, #000000 70%)`,
      }}
    >
      <Canvas
        camera={{ position: [0.15, 1.1, 7.5], fov: 30 }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
        /* 🌟 Sobrescribimos el div relativo inyectando 100% real al canvas */
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <ambientLight intensity={0.15} color={colorPrincipal} />
        <hemisphereLight args={[0xffffff, 0x111115, 0.4]} />
        <directionalLight intensity={0.8} position={[5, 5, 4]} />
        <directionalLight
          intensity={2.2}
          position={[-6, 4, -3]}
          color="#ffffff"
        />

        <directionalLight intensity={0.3} position={[0, -5, 2]} />
        <pointLight
          intensity={0.8}
          position={[0, 2.8, 0]}
          distance={10}
          decay={2}
        />

        <Physics gravity={[0, 0, 0]}>
          <CameraCollider />
          <Abstract colorPrincipal={colorPrincipal} />
        </Physics>

        <PostProcessingEffects />

        <Environment preset="night" environmentIntensity={0.9} />

        <OrbitControls
          enableDamping
          target={[0, 1, 0]}
          minDistance={2.8}
          maxDistance={8}
          maxPolarAngle={Math.PI / 2.2}
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
