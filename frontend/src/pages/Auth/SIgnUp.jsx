import { useContext, useState } from "react";
import Input from "../../Components/Inputs/Input";
import ProfilePhotoSelector from "../../Components/Inputs/ProfilePhotoSelector";
import { UserContext } from "../../Context/userContext";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
import { useNavigate } from "react-router-dom";
import uploadImage from "../../Utils/uploadImage";

const SIgnUp = ({ setCurrentPage, modal }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let profileImageUrl = "";

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.auth.register, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      console.log(response);

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }

      // On successful signup, switch to login page
      // setCurrentPage("login");
    } catch (err) {
      console.log(err);

      if (err.response && err.response.data.message) {
        setError(
          err.response.data.message || "Failed to sign up. Please try again.",
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center ${!modal&&"mx-auto my-auto shadow-sm h-fit mt-3 bg-slate-50"}`}>
      <h3 className="text-xl font-semibold">Create an Account</h3>
      <p className="text-sm text-slate-600 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          <Input
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary justify-center"
          >
            {loading ? "Signing Up..." : "SIGN UP"}
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <button
              type="button"
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              Log in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SIgnUp;
