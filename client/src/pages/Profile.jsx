import { useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experiences: [{ title: "", description: "" }],
    projects: [{ title: "", description: "" }],
    skills: [""],
    interests: [""],
  });

  useEffect(() => {
    // Fetch user data from the API when the component is mounted
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth_token: localStorage.getItem("auth_token") || "",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          console.log(data);
        } else {
          alert(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        alert("Error fetching user data");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-5">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            {userData.firstName} {userData.lastName}
          </h1>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-600">{userData.phone}</p>
        </div>

        {/* Past Experiences */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Past Experiences
          </h2>
          {userData.experiences.length > 0 ? (
            userData.experiences.map((exp, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  {exp.title}
                </h3>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No past experiences added</p>
          )}
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Projects</h2>
          {userData.projects.length > 0 ? (
            userData.projects.map((proj, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  {proj.title}
                </h3>
                <p className="text-gray-600">{proj.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No projects added</p>
          )}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills</h2>
          {userData.skills.length > 0 ? (
            <ul className="list-disc list-inside">
              {userData.skills.map((skill, index) => (
                <li key={index} className="text-gray-600">
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No skills added</p>
          )}
        </div>

        {/* Interests */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Interests
          </h2>
          {userData.interests.length > 0 ? (
            <ul className="list-disc list-inside">
              {userData.interests.map((interest, index) => (
                <li key={index} className="text-gray-600">
                  {interest}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No interests added</p>
          )}
        </div>
      </div>
    </div>
  );
}
