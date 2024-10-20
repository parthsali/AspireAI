import { useState, useEffect } from "react";
import axios from "axios";

const Roadmap = () => {
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user")); 
    const reqBody = {
      name: userDetails?.firstName || "User",
      prompt: "Create a personalized career roadmap based on the user's data.",
      user: userDetails,
    };

    const fetchRoadmap = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.post(
          "http://localhost:8000/roadmap",
          reqBody
        );

        setRoadmap(response.data.roadmap);
        localStorage.setItem("roadmap", response.data.roadmap);
      } catch (err) {
        setError("Failed to fetch the roadmap. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const roadmap = localStorage.getItem("roadmap");
    if (roadmap) {
      setRoadmap(roadmap);
    } else {
      fetchRoadmap();
    }
  }, []);

  return (
    <div className="my-12 min-h-screen flex flex-col items-center justify-center  p-6">
      <h1 className="text-3xl font-bold text-gray-800 mt-6">
        Your Career Roadmap
      </h1>
      {loading && <p className="text-blue-600">Loading roadmap...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && roadmap && (
        <div className="w-full max-w-2xl bg-white p-6 text-gray-800 rounded-lg">
          <div
            className="roadmap-content leading-relaxed"
            dangerouslySetInnerHTML={{ __html: roadmap }}
          />
        </div>
      )}

      {!loading && !roadmap && !error && (
        <p className="text-gray-600">
          No roadmap available. Try refreshing the page.
        </p>
      )}
    </div>
  );
};

export default Roadmap;
