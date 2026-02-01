import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";


const Header = ({ setOpenAuthModal, user }) => {
  return (
    <header className="flex justify-between items-center mb-16">
      <div className="text-xl text-black font-bold">Interview Prep AI</div>

      {user ? (
        <ProfileInfoCard/>
      ) : (
        <button
          className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
          onClick={() => setOpenAuthModal(true)}
        >
          Login / Sign Up
        </button>
      )}
    </header>
  );
};

export default Header;
