import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useColor } from "../../../context/ColorContext";

export default function Dron(props) {
  const avionRef = useRef(null);
  const materialLucesRef = useRef(null); 
  
  const scrollInfo = useRef({ step: 1, progress: 0, lastProgress: 0 });
  const { colorPrincipal } = useColor();
  const { scene } = useGLTF("/3d/dron.glb");

  // 1. Buscamos el material llamado "luces" al cargar la escena
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.material.name === "luces") {
          materialLucesRef.current = child.material;
        }
      }
    });

    const handleScroll = (e) => {
      scrollInfo.current.step = e.detail.step;
      scrollInfo.current.progress = e.detail.progress;
    };

    window.addEventListener("plane-scroll", handleScroll);
    return () => window.removeEventListener("plane-scroll", handleScroll);
  }, [scene]);

  // 2. Escuchamos cambios del color global para actualizar el material en tiempo real
  useEffect(() => {
    if (materialLucesRef.current && colorPrincipal) {
      const deThreeColor = new THREE.Color(colorPrincipal);
      
      materialLucesRef.current.color.copy(deThreeColor);
      
      if ("emissive" in materialLucesRef.current) {
        materialLucesRef.current.emissive.copy(deThreeColor);
        materialLucesRef.current.emissiveIntensity = 3.0; 
      }
    }
  }, [colorPrincipal]);

  useFrame((state, delta) => {
    const { step, progress, lastProgress } = scrollInfo.current;
    const deltaScroll = Math.abs(progress - lastProgress);

    scrollInfo.current.lastProgress = progress;

    if (avionRef.current) {
      // 🌟 ANIMACIÓN FIJA DE FLOTAR (Física de ralentí/idle)
      const tiempo = state.clock.getElapsedTime();
      
      // Modifica la posición en Y con una onda suave de arriba a abajo
      // Math.sin(tiempo * velocidad) * amplitud
      avionRef.current.position.y = Math.sin(tiempo * 2) * 0.08;
      
      // Añade un cabeceo orgánico muy leve en el eje X para que no flote rígido
      avionRef.current.rotation.x = Math.sin(tiempo * 1.5) * 0.03;


      // LÓGICA DE ROTACIÓN POR SCROLL (Mantenida intacta)
      let targetY = avionRef.current.rotation.y; 
      let targetZ = avionRef.current.rotation.z; 

      if (progress <= 0.002 || progress >= 0.998) {
        targetY = 0;
        targetZ = 0;
      } 
      else {
        if (step === 1) {
          targetY = -1.2; 
          targetZ = 0.2;  
        } else if (step === 2) {
          targetY = 1.2;  
          targetZ = -0.2; 
        }
      }

      avionRef.current.rotation.y = THREE.MathUtils.lerp(avionRef.current.rotation.y, targetY, delta * 4);
      avionRef.current.rotation.z = THREE.MathUtils.lerp(avionRef.current.rotation.z, targetZ, delta * 4);
    }
  });

  return (
    <group ref={avionRef}>
      <primitive object={scene} {...props} />
    </group>
  );
}

useGLTF.preload("/3d/dron.glb");