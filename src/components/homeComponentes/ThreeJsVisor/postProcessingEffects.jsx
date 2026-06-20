import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, RenderPass, BloomEffect, EffectPass } from 'postprocessing';
import * as THREE from 'three';

export default function PostProcessingEffects() {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef(null);

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

      comp.addPass(new EffectPass(camera, bloom));
      comp.setSize(size.width, size.height);
      composerRef.current = comp;
    } catch (err) {
      console.error('Error al inicializar PostProcessing:', err);
      composerRef.current = null;
    }

    // 🌟 LO CRUCIAL: Cuando el componente se actualice o desmonte, 
    // liberamos la memoria de la GPU para evitar el cuadro blanco.
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
    
    // Desactivamos el autoClear automático del Canvas para que no choque con el Bloom
    state.gl.autoClear = false;
    
    // Limpiamos manualmente antes de que el compositor dibuje
    gl.clear();
    composerRef.current.render(delta);
  }, 1); // Prioridad 1 para tomar el control del render principal

  return null;
}