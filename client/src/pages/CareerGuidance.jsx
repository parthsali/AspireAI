import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Scene from "../components/Scene";
import ChatInput from "../components/ChatInput";
import axios from "axios";

const CareerGuidance = () => {
  const [guidanceHtml, setGuidanceHtml] = useState(""); // State for guidance HTML
  const [loading, setLoading] = useState(false); // State for loading animation

  const handlePromptSubmit = async (prompt) => {
    const userDetails = JSON.parse(localStorage.getItem("user"));

    const reqBody = {
      name: userDetails.firstName,
      prompt,
      user: userDetails,
    };

    console.log("Request body:", reqBody);
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post(`http://localhost:8000/chat`, reqBody);

      console.log(response.data);

      const guidance = response.data.guidance; // Assuming this is HTML content

      console.log("Guidance HTML:", guidance);
      setGuidanceHtml(guidance); // Set the HTML response
    } catch (error) {
      console.error(
        "Error during chat request:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false); // Reset loading to false
    }
  };

  return (
    <>
      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        camera={{
          position: [0, 0.5, 6],
          fov: 50,
        }}
      >
        <Scene />
      </Canvas>

      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl">
        {loading ? (
          <div className="flex justify-center items-center h-[300px] bg-white bg-opacity-80 rounded-lg shadow-md mb-4">
            <div className="loader border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full w-10 h-10 animate-spin" />
          </div>
        ) : (
          guidanceHtml && (
            <div
              className="bg-white h-[300px] overflow-y-auto bg-opacity-80 p-4 rounded-lg shadow-md mb-4"
              dangerouslySetInnerHTML={{ __html: guidanceHtml }} // Render HTML directly
            />
          )
        )}
        <ChatInput onSubmit={handlePromptSubmit} />
      </div>
    </>
  );
};

export default CareerGuidance;
