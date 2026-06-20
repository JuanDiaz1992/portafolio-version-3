import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingCubes({ count = 20 }) {
  const groupRef = useRef();
  const safeRadius = 0.8;

  // Generamos los datos aleatorios de los cubos una sola vez para ahorrar memoria
  const cubesData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      let posX, posY, posZ;
      let isInsideRobot = true;

      while (isInsideRobot) {
        posX = THREE.MathUtils.randFloatSpread(5);
        posY = THREE.MathUtils.randFloatSpread(4) + 1;
        posZ = THREE.MathUtils.randFloatSpread(4) - 2;

        const distanceXZ = Math.sqrt(posX * posX + posZ * posZ);
        if (distanceXZ > safeRadius || posY > 2.5 || posY < -0.2) {
          isInsideRobot = false;
        }
      }

      data.push({
        position: [posX, posY, posZ],
        rotation: [Math.random() * 2, Math.random() * 2, Math.random() * 2],
        rotSpeedX: THREE.MathUtils.randFloat(0.005, 0.02),
        rotSpeedY: THREE.MathUtils.randFloat(0.005, 0.02),
      });
    }
    return data;
  }, [count]);

  // Animamos la rotación de los cubos en cada frame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((cube, index) => {
        cube.rotation.x += cubesData[index].rotSpeedX;
        cube.rotation.y += cubesData[index].rotSpeedY;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {cubesData.map((data, i) => (
        <mesh key={i} position={data.position} defaultRotation={data.rotation}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#FF9E42" roughness={0.784} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}