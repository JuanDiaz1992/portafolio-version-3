import React, { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

// 1. Sub-componente Físico para cada pieza individual
function JackFisico({ scene, color, position, scale, materialType, ...props }) {
  const rigidBodyRef = useRef();

  // Guardamos un desfase único para cada pieza para que no floten todas exactamente al mismo tiempo
  const seedRandom = useMemo(() => Math.random() * 10, []);

  // Clonamos e inyectamos propiedades físicas y estéticas basadas en m_Glow y el acabado asignado
  const clon = useMemo(() => {
    const sceneClone = scene.clone();
    sceneClone.traverse((child) => {
      if (child.isMesh) {
        if (child.material && child.material.name === "m_Glow") {
          child.material = child.material.clone();

          // 1. Forzamos un blanco puro real en lugar de hex inválidos
          let colorFinal =
            color === "#fffff" || color === "#ffffff" ? "#ffffff" : color;
          child.material.color = new THREE.Color(colorFinal);

          // --- 🌟 CONFIGURACIÓN FIEL A LA REFERENCIA 🌟 ---
          if (materialType === "metal") {
            // 💎 Tu material original "metal" actúa como la pasta/acrílico ultra brillante
            child.material.metalness = 0.0; // 0 metalizado -> Plástico/Pasta pura
            child.material.roughness = 0.02; // Superficie ultra pulida (espejo/cerámica de lujo)
            child.material.emissiveIntensity = 0;
          } else if (materialType === "plastic") {
            child.material.metalness = 0.0;
            child.material.roughness = 0.25; // Plástico satinado
            child.material.emissiveIntensity = 0;
          } else {
            child.material.metalness = 0.0;
            child.material.roughness = 0.95; // Súper opaco y elegante (Matte original)
            child.material.emissiveIntensity = 0;
          }

          child.material.needsUpdate = true;
        }
      }
    });
    return sceneClone;
  }, [scene, color, materialType]);

  // 🌟 EFECTO DE ENTRADA: Impulso inicial hacia adelante (Z positivo) en cuanto nacen
  useEffect(() => {
    if (!rigidBodyRef.current) return;

    const timeout = setTimeout(() => {
      const fuerzaZ = 75.0 + Math.random() * 35.0; 
      const dispersionX = (Math.random() - 0.5) * 15.0;
      const dispersionY = (Math.random() - 0.5) * 15.0;

      rigidBodyRef.current.applyImpulse({ x: dispersionX, y: dispersionY, z: fuerzaZ }, true);

      rigidBodyRef.current.applyTorqueImpulse(
        {
          x: (Math.random() - 0.5) * 20.0,
          y: (Math.random() - 0.5) * 20.0,
          z: (Math.random() - 0.5) * 20.0,
        },
        true
      );
    }, Math.random() * 150);

    return () => clearTimeout(timeout);
  }, []);

  // Efecto Imán Inteligente con Dispersión + Órbitas 3D individuales
  useFrame((state) => {
    if (!rigidBodyRef.current) return;

    const t = state.clock.getElapsedTime();
    const currentPos = rigidBodyRef.current.translation();
    const posVector = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z);
    const centroGravedad = new THREE.Vector3(0, 0.5, 0);

    const direction = centroGravedad.clone().sub(posVector);
    const distancia = direction.length();

    // 1. 🛑 SISTEMA DE RECHAZO/DISPERSIÓN DE NÚCLEO
    const distanciaMinimaDeseada = 1.8;
    let fuerzaAtraccion = 0.35 * (distancia - distanciaMinimaDeseada);

    direction.normalize().multiplyScalar(fuerzaAtraccion);
    rigidBodyRef.current.applyImpulse(direction, true);

    // 2. 🌊 TURBULENCIA INDIVIDUAL
    const movimientoX = Math.sin(t * 0.8 + seedRandom) * Math.cos(t * 0.4 + seedRandom) * 0.05;
    const movimientoY = Math.cos(t * 0.9 + seedRandom * 2) * 0.06;
    const movimientoZ = Math.sin(t * 0.5 + seedRandom) * 0.05;

    rigidBodyRef.current.applyImpulse({ x: movimientoX, y: movimientoY, z: movimientoZ }, true);

    // Un micro-giro constante flotante
    rigidBodyRef.current.applyTorqueImpulse(
      {
        x: Math.sin(t * 0.3 + seedRandom) * 0.001,
        y: Math.cos(t * 0.2 + seedRandom) * 0.0015,
        z: Math.sin(t * 0.4 - seedRandom) * 0.001,
      },
      true,
    );
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (!rigidBodyRef.current) return;

    const currentPos = rigidBodyRef.current.translation();
    const bodyCenter = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z);
    const mouseHitPoint = e.point;
    const empujeDireccion = bodyCenter.sub(mouseHitPoint);

    empujeDireccion.x = empujeDireccion.x * 1.0;
    empujeDireccion.y = empujeDireccion.y * 0.6;
    empujeDireccion.z = empujeDireccion.z * 0.15;

    const fuerzaImpacto = 35.0;
    empujeDireccion.normalize().multiplyScalar(fuerzaImpacto);

    rigidBodyRef.current.applyImpulse(empujeDireccion, true);

    rigidBodyRef.current.applyTorqueImpulse(
      {
        x: (Math.random() - 0.5) * 1.0,
        y: (Math.random() - 0.5) * 4.5,
        z: (Math.random() - 0.5) * 1.0,
      },
      true,
    );
  };

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      scale={scale}
      colliders="hull"
      restitution={0.6}
      linearDamping={1.5}
      angularDamping={2.0}
      onPointerOver={handlePointerOver}
    >
      <primitive object={clon} />
    </RigidBody>
  );
}

// 2. Componente Principal que se inyecta en tu Viewer3d
export default function Abstract() {
  const { scene } = useGLTF("/3d/abstract.glb");

  const CANTIDAD_ITEMS = 12;
  const coloresDisponibles = ["#ffffff", "#8b5cf6", "#222222"];
  const tiposMateriales = ["metal", "plastic", "matte"];

  const jacksAleatorios = useMemo(() => {
    const items = [];
    for (let i = 0; i < CANTIDAD_ITEMS; i++) {
      // Nacimiento compacto al fondo del eje Z
      const x = (Math.random() - 0.5) * 2.0; 
      const y = (Math.random() - 0.5) * 2.0 + 1.5;
      const z = -10.0 - (Math.random() * 4.0);

      const colorBalanceado = coloresDisponibles[i % coloresDisponibles.length];
      let tipoBalanceado = tiposMateriales[i % tiposMateriales.length];

      // 🌟 REGLA ESTRICTA DE EXCEPCIÓN ÚNICA:
      // Forzamos que SOLO la primera blanca (i === 0) y SOLO la primera negra (i === 2) hereden el "metal" (pasta brillante).
      // A todas las demás piezas blancas y negras que salgan en los ciclos siguientes, les quitamos el "metal" y les ponemos "matte" (opaco).
      if (i === 0 || i === 2) {
        tipoBalanceado = "metal"; // Estas dos serán las únicas pastas brillantes
      } else if (tipoBalanceado === "metal") {
        tipoBalanceado = "matte"; // Las demás posiciones "metal" se vuelven opacas para mantener el contraste mate original
      }

      items.push({
        id: i,
        position: [x, y, z],
        color: colorBalanceado,
        materialType: tipoBalanceado,
      });
    }
    return items;
  }, [CANTIDAD_ITEMS]);

  return (
    <>
      {jacksAleatorios.map((jack) => (
        <JackFisico
          key={jack.id}
          scene={scene}
          color={jack.color}
          position={jack.position}
          materialType={jack.materialType}
          scale={3.2}
        />
      ))}
    </>
  );
}

useGLTF.preload("/3d/abstract.glb");