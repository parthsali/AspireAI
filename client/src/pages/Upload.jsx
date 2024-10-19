import { useState } from "react";
import Dropzone from "../components/Dropzone";
import { XIcon } from "@heroicons/react/solid";

const Upload = () => {
  const [pastExperiences, setPastExperiences] = useState([
    { title: "", description: "" },
  ]);
  const [projects, setProjects] = useState([{ title: "", description: "" }]);
  const [skills, setSkills] = useState([""]);
  const [interests, setInterests] = useState([""]);

  const handleAddExperience = () => {
    setPastExperiences([...pastExperiences, { title: "", description: "" }]);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: "", description: "" }]);
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleAddInterest = () => {
    setInterests([...interests, ""]);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...pastExperiences];
    newExperiences[index][field] = value;
    setPastExperiences(newExperiences);
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleInterestChange = (index, value) => {
    const newInterests = [...interests];
    newInterests[index] = value;
    setInterests(newInterests);
  };

  const handleRemoveSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleRemoveInterest = (index) => {
    const newInterests = interests.filter((_, i) => i !== index);
    setInterests(newInterests);
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = pastExperiences.filter((_, i) => i !== index);
    setPastExperiences(newExperiences);
  };

  const handleRemoveProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              {/* <span className="sr-only">Your Company</span>
                                                <img
                                                        alt=""
                                                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                                        className="h-8 w-auto"
                                                /> */}
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Upload Your Resume
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Fill in the details below to upload your resume.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <div className="dropzone border-dashed border-4 border-blue-400 p-6 text-center bg-white rounded-lg shadow-md mb-6">
            <Dropzone />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              OR
            </h2>
          </div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold">
                  First Name
                </label>
                <input className="mt-1 p-2 border border-gray-300 rounded w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Last Name
                </label>
                <input className="mt-1 p-2 border border-gray-300 rounded w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="mt-1 p-2 border border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-red-500"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddSkill}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
              >
                Add Skill
              </button>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={interest}
                      onChange={(e) =>
                        handleInterestChange(index, e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(index)}
                      className="text-red-500"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddInterest}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
              >
                Add Interest
              </button>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Past Experiences
              </label>
              {pastExperiences.map((experience, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={experience.title}
                    onChange={(e) =>
                      handleExperienceChange(index, "title", e.target.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded w-full mb-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={experience.description}
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
                    className="text-red-500 mt-2"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddExperience}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Experience
              </button>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Projects
              </label>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={project.title}
                    onChange={(e) =>
                      handleProjectChange(index, "title", e.target.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded w-full mb-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(index, "description", e.target.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="text-red-500 mt-2"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddProject}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Project
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
