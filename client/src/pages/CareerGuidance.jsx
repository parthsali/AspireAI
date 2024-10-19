import { Canvas } from "@react-three/fiber";
import Scene from "../components/Scene";

const CareerGuidance = () => {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{
        position: [0, 0.5, 6],
        fov: 50,
      }}
    >
      <Scene />
    </Canvas>
  );
};

export default CareerGuidance;
