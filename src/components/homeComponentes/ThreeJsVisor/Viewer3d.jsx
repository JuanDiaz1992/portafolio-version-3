import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Spinner } from "@heroui/react";
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
  const { colorPrincipal } = useColor()
  const { active } = useProgress();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!active) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setLoading(true);
    }
  }, [active]);

  return (
    <div
      className="w-full h-full rounded-3xl overflow-hidden relative"
      style={{
        background: `radial-gradient(circle at center, ${colorPrincipal} -90%, #000000 70%)`,
      }}
    >
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#0a1724]/90 backdrop-blur-md rounded-3xl transition-opacity duration-300">
          <Spinner size="xl" color="current" className="text-[#00e1ff]" />
        </div>
      )}

      <Canvas
        camera={{ position: [0.15, 1.1, 7.5], fov: 30 }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.15} color={colorPrincipal} />
        <hemisphereLight args={[0xffffff, 0x111115, 0.4]} />
        <directionalLight intensity={0.8} position={[5, 5, 4]} />
        <directionalLight
          intensity={2.2}
          position={[-6, 4, -3]}
          color="#ffffff"
        />

        {/* Luz de apoyo suave desde abajo para que las sombras negras no sean un pozo ciego */}
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
