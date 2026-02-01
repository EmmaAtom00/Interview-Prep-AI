import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Inputs/Input";
import SpinnerLoader from "../../Components/Loader/SpinnerLoader";
import { API_PATHS } from "../../Utils/apiPaths";
import axiosInstance from "../../Utils/axiosInstance";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;
    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Add API call or navigation logic here
    try {
      console.log("here genrating questions");

      const aiResponse = await axiosInstance.post(
        API_PATHS.ai.generateQuestions,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 5,
        },
      );

      //   Should be array like [{question, answes}, ...]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.sessions.create, {
        ...formData,
        questions: generatedQuestions,
      });
      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data.message) {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] h-[80vh] overflow-y-auto p-7 flex flex-col custom-scrollbar">
      <h3 className="text-xl font-semibold mb-2">
        Start a New Interview Journey
      </h3>
      <p className="text-sm text-slate-600 mb-6">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleCreateSession}>
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="(e.g., 1 year, 3 years, 5+ years)"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="(e.g., React, JavaScript, System Design, Accessibility)"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          placeholder="Briefly describe what you want to focus on in this session"
          type="text"
        />

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        <button
          className="btn btn-primary justify-center mt-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
