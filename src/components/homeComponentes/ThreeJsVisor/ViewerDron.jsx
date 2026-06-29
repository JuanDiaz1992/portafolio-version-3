import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Dron from "./Dron";
import PostProcessingReutilizable from "./PostProcessingReutilizable";

export default function ViewerDron({ progress = 0 }) {
  return (
    <div className="w-full h-full bg-transparent relative">
      <Canvas
        camera={{ position: [0, 1, 3], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        resize={{ scroll: false }}
        className="w-full h-full absolute inset-0"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 4]} intensity={1.5} />

        <Suspense fallback={null}>
          <Dron scale={1} progress={progress} />
          <Environment preset="night" environmentIntensity={0.9} />
        </Suspense>
        <PostProcessingReutilizable />
      </Canvas>
    </div>
  );
}
