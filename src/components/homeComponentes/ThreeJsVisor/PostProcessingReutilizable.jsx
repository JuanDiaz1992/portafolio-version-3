import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  SMAAEffect,
} from "postprocessing";
import * as THREE from "three";

export default function PostProcessingReutilizable() {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef(null);

  useEffect(() => {
    let comp;
    try {
      const frameBufferType = THREE.HalfFloatType || THREE.UnsignedByteType;
      comp = new EffectComposer(gl, {
        frameBufferType,
      });

      // 1. Pase de renderizado base
      const renderPass = new RenderPass(scene, camera);
      comp.addPass(renderPass);

      // 2. Antialiasing de alta calidad para suavizar los bordes del modelo
      const smaa = new SMAAEffect();

      // Añadimos solo el suavizado de bordes (Adios Bloom y adios niebla)
      comp.addPass(new EffectPass(camera, smaa));
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

  // Actualizar tamaño si se redimensiona la pantalla
  useEffect(() => {
    if (composerRef.current) {
      composerRef.current.setSize(size.width, size.height);
    }
  }, [size]);

  // Ciclo de renderizado principal
  useFrame((state, delta) => {
    if (!composerRef.current) return;

    state.gl.autoClear = false;
    gl.clear();
    composerRef.current.render(delta);
  }, 1); 

  return null;
}