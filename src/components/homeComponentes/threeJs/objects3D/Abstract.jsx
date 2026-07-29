import { useMemo, useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useColor } from "../../../../context/ColorContext";

// 1. Sub-componente Físico para cada pieza individual
function JackFisico({ scene, color, position, scale, materialType, }) {
  const rigidBodyRef = useRef();

  // Guardamos un desfase único para cada pieza para que no floten todas exactamente al mismo tiempo
  const [seedRandom] = useState(() => Math.random() * 10);

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
            child.material.metalness = 0.1; // 0 metalizado -> Plástico/Pasta pura
            child.material.roughness = 1.1; // Superficie ultra pulida (espejo/cerámica de lujo)
            child.material.emissiveIntensity = 0;
          } else if (materialType === "plastic") {
            child.material.metalness = 0.0;
            child.material.roughness = 0.22; // Plástico satinado
            child.material.emissiveIntensity = 0;
          } else {
            child.material.metalness = 0.0;
            child.material.roughness = 0.65; // Súper opaco y elegante (Matte original)
            child.material.emissiveIntensity = 0;
          }

          child.material.needsUpdate = true;
        }
      }
    });
    return sceneClone;
  }, [scene, color, materialType]);

  // 🌟 EFECTO DE ENTRADA: Impulso inicial hacia adelante (Z positivo) en cuanto nacen
// 🚀 EFECTO DE ENTRADA: Viajar agrupadas y explotar solo al chocar con la cámara
  useEffect(() => {
    if (!rigidBodyRef.current) return;

    const timeout = setTimeout(() => {
      // 1. Obtenemos la posición donde nació esta pieza al fondo
      const currentPos = rigidBodyRef.current.translation();
      const posPieza = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z);
      
      // 2. Apuntamos al centro del lente de la cámara
      const posCamara = new THREE.Vector3(0.15, 1.1, 4.2);

      // 3. Calculamos la dirección perfecta (Línea recta sin desvíos laterales)
      const direccionHaciaCamara = new THREE.Vector3()
        .subVectors(posCamara, posPieza)
        .normalize(); 

      // 4. Potencia del disparo hacia adelante
      const potenciaImpulso = 85.0 + Math.random() * 20.0;
      const impulsoFinal = direccionHaciaCamara.multiplyScalar(potenciaImpulso);

      // 5. Aplicamos la fuerza directa (Eliminamos dispersionX y dispersionY)
      rigidBodyRef.current.applyImpulse(
        { x: impulsoFinal.x, y: impulsoFinal.y, z: impulsoFinal.z },
        true,
      );

      // 6. Mantenemos la rotación loca para que el bloque ruede de forma orgánica mientras viaja
      rigidBodyRef.current.applyTorqueImpulse(
        {
          x: (Math.random() - 0.5) * 25.0,
          y: (Math.random() - 0.5) * 25.0,
          z: (Math.random() - 0.5) * 25.0,
        },
        true,
      );
    }, Math.random() * 150); // Tiempos de salida ligeramente escalonados para que vayan compactas pero no clonadas

    return () => clearTimeout(timeout);
  }, []);

  // Efecto Imán Inteligente con Dispersión + Órbitas 3D individuales
  useFrame((state) => {
    if (!rigidBodyRef.current) return;

    const t = state.clock.getElapsedTime();
    const currentPos = rigidBodyRef.current.translation();
    const posVector = new THREE.Vector3(
      currentPos.x,
      currentPos.y,
      currentPos.z,
    );
    const centroGravedad = new THREE.Vector3(0, 1.0, 1.2);

    const direction = centroGravedad.clone().sub(posVector);
    const distancia = direction.length();

    // 1. 🛑 SISTEMA DE RECHAZO/DISPERSIÓN DE NÚCLEO
    const distanciaMinimaDeseada = 1.8;
    let fuerzaAtraccion = 0.35 * (distancia - distanciaMinimaDeseada);

    direction.normalize().multiplyScalar(fuerzaAtraccion);
    rigidBodyRef.current.applyImpulse(direction, true);

    // 2. 🌊 TURBULENCIA INDIVIDUAL
    const movimientoX =
      Math.sin(t * 0.8 + seedRandom) * Math.cos(t * 0.4 + seedRandom) * 0.05;
    const movimientoY = Math.cos(t * 0.9 + seedRandom * 2) * 0.06;
    const movimientoZ = Math.sin(t * 0.5 + seedRandom) * 0.05;

    rigidBodyRef.current.applyImpulse(
      { x: movimientoX, y: movimientoY, z: movimientoZ },
      true,
    );

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
    const bodyCenter = new THREE.Vector3(
      currentPos.x,
      currentPos.y,
      currentPos.z,
    );
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

// 2. Componente Principal Corregido: Estructura fija que no se reinicia con el clic
export default function Abstract() {
  const { colorPrincipal } = useColor()
  const { scene } = useGLTF("/3d/abstract.glb");

  // 1. 🧊 GENERAMOS LA ESTRUCTURA Y POSICIONES UNA SOLA VEZ AL CARGAR
  const estructuraBase = useMemo(() => {
    const items = [];

    const generarPosicionAlFondo = () => [
      (Math.random() - 0.5) * 1.8,
      (Math.random() - 0.5) * 1.8 + 1.5,
      -25.0 - Math.random() * 4.0
    ];

    // ⚪ 4 BLANCAS
    for (let i = 0; i < 4; i++) {
      items.push({
        id: `blanco-${i}`,
        position: generarPosicionAlFondo(),
        colorFijo: "#ffffff",
        esDinamico: false,
        materialType: i === 0 ? "metal" : (i % 2 === 0 ? "plastic" : "matte"),
      });
    }

    // 🎨 4 DE COLOR (Marcadas como dinámicas)
    for (let i = 0; i < 4; i++) {
      items.push({
        id: `color-${i}`,
        position: generarPosicionAlFondo(),
        colorFijo: null,
        esDinamico: true, // 👈 Esta bandera nos avisará que debe cambiar
        materialType: i % 3 === 0 ? "metal" : (i % 3 === 1 ? "plastic" : "matte"),
      });
    }

    // ⚫ 4 NEGRAS
    for (let i = 0; i < 4; i++) {
      items.push({
        id: `negro-${i}`,
        position: generarPosicionAlFondo(),
        colorFijo: "#222222",
        esDinamico: false,
        materialType: i === 0 ? "metal" : (i % 2 === 0 ? "plastic" : "matte"),
      });
    }

    return items;
  }, []); // 🔒 Array vacío: JAMÁS se vuelve a calcular ni a reiniciar

  return (
    <>
      {estructuraBase.map((jack) => {
        // 2. 🎨 ASIGNAMOS EL COLOR EN CALIENTE DURANTE EL RENDER
        // Si la pieza es dinámica usa el estado actual, si no, usa su color fijo (blanco/negro)
        const colorActual = jack.esDinamico ? colorPrincipal : jack.colorFijo;

        return (
          <JackFisico
            key={jack.id}
            scene={scene}
            color={colorActual} // 👈 Cambia el color pero NO la física ni la posición
            position={jack.position}
            materialType={jack.materialType}
            scale={3.2}
          />
        );
      })}
    </>
  );
}

useGLTF.preload("/3d/abstract.glb");