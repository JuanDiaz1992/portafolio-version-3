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
  const acumuladorX = useRef(0);
  useFrame((state, delta) => {
    const { step, progress, lastProgress } = scrollInfo.current;

    // 1. Control de seguridad: Si no hay datos válidos, saltamos el frame para no romper la GPU
    if (
      progress === undefined ||
      lastProgress === undefined ||
      isNaN(progress) ||
      isNaN(lastProgress)
    ) {
      return;
    }

    // Calculamos el delta con seguridad
    let deltaScroll = progress - lastProgress;

    // Si el salto es absurdamente gigante (un bug del evento), lo frenamos
    if (Math.abs(deltaScroll) > 0.1) deltaScroll = 0;

    scrollInfo.current.lastProgress = progress;

    if (avionRef.current) {
      const tiempo = state.clock.getElapsedTime();

      // Animación fija original
      avionRef.current.position.y = Math.sin(tiempo * 2) * 0.08;
      const cabeceoBaseFijo = Math.sin(tiempo * 1.5) * 0.03;

      // Aplicamos el acumulador de scroll con protección anti-NaN
      if (Math.abs(deltaScroll) > 0 && !isNaN(deltaScroll)) {
        acumuladorX.current += deltaScroll * 6.0;
      }

      // Validamos que el acumulador no se haya corrompido
      if (isNaN(acumuladorX.current)) {
        acumuladorX.current = 0;
      }

      acumuladorX.current = THREE.MathUtils.lerp(
        acumuladorX.current,
        0,
        delta * 4.0,
      );
      const contraRebote = Math.cos(tiempo * 12) * acumuladorX.current * 0.2;

      let targetX = cabeceoBaseFijo - acumuladorX.current * 0.4 + contraRebote;

      // Lógica original de pasos Y / Z
      let targetY = avionRef.current.rotation.y;
      let targetZ = avionRef.current.rotation.z;

      if (progress <= 0.002 || progress >= 0.998) {
        targetY = 0;
        targetZ = 0;
        targetX = 0;
      } else {
        if (step === 1) {
          targetY = -1.2;
          targetZ = 0.2;
        } else if (step === 2) {
          targetY = 1.2;
          targetZ = -0.2;
        }
      }

      // Aplicamos los lerps validando que delta no sea un salto extraño de carga
      const unionesDelta = Math.min(delta, 0.1); // Evita picos de lag en los lerps
      avionRef.current.rotation.x = THREE.MathUtils.lerp(
        avionRef.current.rotation.x,
        targetX,
        unionesDelta * 8,
      );
      avionRef.current.rotation.y = THREE.MathUtils.lerp(
        avionRef.current.rotation.y,
        targetY,
        unionesDelta * 4,
      );
      avionRef.current.rotation.z = THREE.MathUtils.lerp(
        avionRef.current.rotation.z,
        targetZ,
        unionesDelta * 4,
      );
    }
  });
  return (
    <group ref={avionRef}>
      <primitive object={scene} {...props} />
    </group>
  );
}

useGLTF.preload("/3d/dron.glb");
