import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  RenderPass,
  BloomEffect,
  EffectPass,
  SMAAEffect,
  DepthOfFieldEffect,
} from "postprocessing";
import * as THREE from "three";

export default function PostProcessingEffects() {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef(null);
  const dofRef = useRef(null);

  // Gestionamos la creación y DESTRUCCIÓN del compositor de forma segura
  useEffect(() => {
    let comp;
    try {
      const frameBufferType = THREE.HalfFloatType || THREE.UnsignedByteType;
      comp = new EffectComposer(gl, {
        frameBufferType,
      });

      // 1. Añadir pase de renderizado base
      const renderPass = new RenderPass(scene, camera);
      comp.addPass(renderPass);

      // 2. Configurar el Bloom (Efecto neón/brillo)
      const bloom = new BloomEffect({
        intensity: 0.5,
        luminanceThreshold: 4.15,
        luminanceSmoothing: 5.9,
        mipmapBlur: true,
      });

      const dof = new DepthOfFieldEffect(camera, {
        focusDistance: 0.01, // Arranca super cerca (fondo borroso)
        focalLength: 0.5, // Enfoque ultra selectivo cinematográfico
        bokehScale: 3.0,
      });
      dofRef.current = dof;
      const smaa = new SMAAEffect();

      comp.addPass(new EffectPass(camera, bloom, smaa, dof));
      comp.setSize(size.width, size.height);
      composerRef.current = comp;
    } catch (err) {
      console.error("Error al inicializar PostProcessing:", err);
      composerRef.current = null;
    }

    return () => {
      if (comp) {
        comp.dispose();
      }
    };
  }, [gl, scene, camera]);

  // Actualizar el tamaño del compositor cuando la ventana cambie
  useEffect(() => {
    if (composerRef.current) {
      composerRef.current.setSize(size.width, size.height);
    }
  }, [size]);

  // Ciclo de renderizado limpio
  useFrame((state, delta) => {
    if (!composerRef.current) return;

    // 🎬 🌟 ANIMACIÓN DIRECTA DEL BOKEH
    if (dofRef.current) {
      const t = state.clock.getElapsedTime(); // Tiempo en segundos

      if (t < 3.5) {
        // 1. Al principio, fijamos un foco inicial para que el centro se mantenga decente
        dofRef.current.target = new THREE.Vector3(0, 0.8, 2.2); // Apunta directo al centro de tus piezas
      } else {
        // 2. PASADOS LOS 3.5 SEGUNDOS: Desintegramos el radio de desenfoque a 0
        // Usamos lerp para que la transición de 3.0 a 0 no sea un golpe brusco, sino suave
        dofRef.current.bokehScale = THREE.MathUtils.lerp(
          dofRef.current.bokehScale,
          0.0, // 🎯 Destino: Cero desenfoque (Nitidez absoluta)
          delta * 2.5, // ⚡ Velocidad de la transición
        );
      }
    }

    // Tu renderizado manual de siempre
    state.gl.autoClear = false;
    gl.clear();
    composerRef.current.render(delta);
  }, 1); // Prioridad 1 para tomar el control del render principal

  return null;
}
