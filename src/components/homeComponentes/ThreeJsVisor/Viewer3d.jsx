import { useRef, useState, useEffect } from "react"; 
import { Canvas, useFrame } from "@react-three/fiber"; 
import { OrbitControls, Environment, useProgress } from "@react-three/drei";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier"; 
import { Spinner } from "@heroui/react"; 
import Abstract from "./abstract/Abstract";
import PostProcessingEffects from "./PostProcessingEffects"; 

// 🌟 El escudo invisible que sigue a la cámara en 3D
function CameraCollider() {
  const colliderRef = useRef();

  useFrame((state) => {
    if (!colliderRef.current) return;
    const camPos = state.camera.position;
    colliderRef.current.setTranslation({ x: camPos.x, y: camPos.y, z: camPos.z }, true);
  });

  return (
    <RigidBody ref={colliderRef} type="kinematicPosition" colliders={false}>
      <BallCollider args={[1.2]} />
    </RigidBody>
  );
}

export default function Viewer3d() {
  const { active } = useProgress();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cuando el recurso termine de descargar, le damos unos milisegundos extras
    // para que el motor de físicas despierte e impulse los objetos en la oscuridad.
    if (!active) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800); // 👈 Ajusta este tiempo si quieres que la cortina dure un poco más o menos
      return () => clearTimeout(timer);
    } else {
      setLoading(true);
    }
  }, [active]);

  return (
    <div 
      className="w-full h-full rounded-3xl overflow-hidden relative"
      style={{
        background: "radial-gradient(circle at center, #131a26 0%, #000000 75%)"
      }}
    >
      {/* 🌀 Cortina HTML real superpuesta por encima del Canvas */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#0a1724]/90 backdrop-blur-md rounded-3xl transition-opacity duration-300">
          <Spinner size="xl" color="current" className="text-[#00e1ff]" />
        </div>
      )}

      <Canvas
        camera={{ position: [0.15, 1.1, 4.2], fov: 60 }}
        gl={{
          antialias: false, 
          powerPreference: "high-performance"
        }}
      >
        {/* Luces originales intactas */}
        <ambientLight intensity={0.4} />
        <hemisphereLight args={[0xffffff, 0x22293a, 0.75]} />
        <directionalLight intensity={1.2} position={[2, 4, 5]} />
        <directionalLight intensity={0.5} position={[-4, 1.5, 2]} />
        <directionalLight intensity={0.5} position={[-3, 6, -5]} />
        <directionalLight intensity={0.5} position={[0, 1, 4]} />
        <pointLight intensity={0.8} position={[0, 2.8, 0]} distance={10} decay={2} />

        {/* ENVOLTORIO DE FÍSICAS */}
        <Physics gravity={[0, 0, 0]}>
          <CameraCollider />
          <Abstract />
        </Physics>

        {/* Filtro de resplandor */}
        <PostProcessingEffects />

        <Environment preset="night" />

        {/* Controles del Mouse */}
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