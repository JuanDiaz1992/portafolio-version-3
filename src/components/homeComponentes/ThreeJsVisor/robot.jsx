import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Robot() {
  // 1. Cargamos el modelo GLB (Ya trae su textura adentro)
  const { scene, animations, nodes } = useGLTF("/3d/Robot-final.glb");
  // 2. Extraemos las animaciones del modelo
  const { actions } = useAnimations(animations, scene);

  // Referencias a los huesos para moverlos con el mouse
  const cabezaRef = useRef();
  const cuelloRef = useRef();
  const torsoRef = useRef();

  // Asignamos el orden de rotación a los huesos y calibramos el metal una vez listo el modelo
  useEffect(() => {
    console.log("Nodos del modelo:", nodes);
    
    // --- CONTROL DE HUESOS ---
    if (nodes.Bone010) {
      cabezaRef.current = nodes.Bone010;
      cabezaRef.current.rotation.order = "YXZ";
    }
    if (nodes.Bone001) {
      cuelloRef.current = nodes.Bone001;
      cuelloRef.current.rotation.order = "YXZ";
    }
    if (nodes.Bone) {
      torsoRef.current = nodes.Bone;
      torsoRef.current.rotation.order = "YXZ";
    }

    // --- 🌟 CONFIGURACIÓN DEL MATERIAL QUE YA VIENE ADENTRO ---
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Buscamos tu material pre-cargado por su nombre exacto de Blender
        if (child.material.name === "Robot RAW") {
          // NO tocamos el .map porque ya viene con tu textura horneada
          if (child.material.map) {
            child.material.roughnessMap = child.material.map;
          }
          // Le devolvemos los reflejos físicos al material nativo
          child.material.metalness = 0.5;   // Sube el brillo metálico
          child.material.roughness = 0.5;  // Hace los reflejos pulidos y nítidos
          child.material.needsUpdate = true;
        }
      }
    });

    // --- EFECTO EMISSIVE (Ojos/Luces) ---
    if (nodes.Cube012 && nodes.Cube012.material) {
      nodes.Cube012.material.emissive = new THREE.Color("#00f3ff");
      nodes.Cube012.material.emissiveIntensity = 8.0;
    }

    // Reproducir todas las animaciones automáticamente
    Object.values(actions).forEach((action) => action.play());
  }, [nodes, actions, scene]); // Limpiamos la dependencia de la textura externa

  // 3. El ciclo de animación para seguir el mouse
  useFrame((state) => {
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    const rotationLimitX = 0.9;
    const rotationLimitY = 1.5;
    const lerpFactor = 0.05;

    if (cabezaRef.current) {
      const targetY = mouseX * rotationLimitY;
      const targetX = -mouseY * rotationLimitX;

      const clampedY = Math.max(-rotationLimitY, Math.min(rotationLimitY, targetY));
      const clampedX = Math.max(-rotationLimitX, Math.min(rotationLimitX, targetX));

      const targetQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(clampedX, clampedY, 0, "YXZ"),
      );
      cabezaRef.current.quaternion.slerp(targetQuat, lerpFactor);

      if (cuelloRef.current) {
        const neckQuat = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(clampedX * 0.4, clampedY * 0.4, 0, "YXZ"),
        );
        cuelloRef.current.quaternion.slerp(neckQuat, lerpFactor);
      }

      if (torsoRef.current) {
        const torsoQuat = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(clampedX * 0.25, clampedY * 0.1, 0, "YXZ"),
        );
        torsoRef.current.quaternion.slerp(torsoQuat, lerpFactor);
      }
    }
  });

  return <primitive object={scene} position={[0, 0, 0]} />;
}

// Pre-cargamos el modelo
useGLTF.preload("/3d/Robot-final.glb");