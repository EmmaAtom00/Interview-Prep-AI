import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    <div className="flex items-center">
      {user?.profileImageUrl &&
      (() => {
        try {
          return (new URL(user.profileImageUrl), true);
        } catch {
          return false;
        }
      })() ? (
        <img
          src={user.profileImageUrl}
          alt="profile image"
          className="w-11 h-11 bg-gray-300 rounded-full mr-3"
        />
      ) : (
        <LuUser className="w-11 h-11 bg-gray-300 rounded-full mr-3" />
      )}

      <div className="">
        <div className="text-[15px] text-black font-bold leading-3">
          {user?.name || ""}
        </div>
        <button
          onClick={handleLogout}
          className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
