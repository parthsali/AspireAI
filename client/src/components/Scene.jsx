import { OrbitControls, useHelper, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import * as THREE from "three";

import { useRef } from "react";

const Scene = () => {
  const texture = useTexture("textures/first.jpg");
  const viewport = useThree((state) => state.viewport);
  const pointRef = useRef();

  useHelper(pointRef, THREE.PointLightHelper, "red");

  return (
    <>
      <OrbitControls
        maxAzimuthAngle={THREE.MathUtils.degToRad(10)}
        minAzimuthAngle={-THREE.MathUtils.degToRad(10)}
        maxPolarAngle={THREE.MathUtils.degToRad(82)}
        minPolarAngle={THREE.MathUtils.degToRad(78)}
        enableZoom={false}
      />
      <Avatar position={[0, -4.6, 2]} scale={3.3} />
      <Environment preset="dawn" />
      <pointLight
        ref={pointRef}
        position={[1, -3, 2]}
        intensity={1}
        color={0x0c3cb3}
      />
      <pointLight position={[-1, -3, 2]} intensity={1} color={0xefefef} />
      <mesh>
        <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};

export default Scene;
