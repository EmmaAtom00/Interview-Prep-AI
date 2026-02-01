import React from "react";
import { LuSparkles } from "react-icons/lu";

const HeroContent = ({ handleCTA }) => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
        <div className="flex items-center justify-start mb-2">
          <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            <LuSparkles /> AI Powered
          </div>
        </div>

        <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
          Ace Interviews with <br />
          <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
            AI Powered
          </span>{" "}
          Learning
        </h1>
      </div>

      <div className="w-full md:w-1/2">
        <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
          Get role-specific questions, expand answers when you need them, dive
          deeper into concepts, and organize everything your way. From
          preparation to mastery, your ultimate interview toolkit is here.
        </p>

        <button
          onClick={handleCTA}
          className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroContent;
