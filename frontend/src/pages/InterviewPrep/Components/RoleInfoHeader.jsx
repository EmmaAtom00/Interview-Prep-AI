import React from "react";
import moment from "moment";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  lastUpdate,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between bg-white rounded-xl shadow-xs p-6 gap-6 relative overflow-hidden">
      {/* Left Block - Session Details */}
      <div className="flex-1 flex flex-col gap-3 z-10">
        <h1 className="text-3xl font-extrabold text-gray-900">{role}</h1>
        {topicsToFocus && (
          <p className="text-gray-500 text-sm">{topicsToFocus}</p>
        )}

        <div className="flex gap-3 mt-3 flex-wrap">
          <div className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium text-gray-800 cursor-pointer hover:bg-gray-200 transition">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </div>
          <div className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium text-gray-800 cursor-pointer hover:bg-gray-200 transition">
            Q&A: {questions}
          </div>
          {lastUpdate && (
            <div className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium text-gray-800 cursor-pointer hover:bg-gray-200 transition">
              Last Updated: {lastUpdate}
            </div>
          )}
        </div>
      </div>

      {/* Right Block - Glassmorphism Layers */}
      <div className="relative w-full md:w-1/3 h-40 md:h-48 flex items-center justify-center">
        {/* Layer 1 */}
        <div className="absolute w-32 h-32 rounded-full bg-[#ff6b6b]/40 blur-3xl animate-pulse"></div>
        {/* Layer 2 */}
        <div className="absolute w-40 h-40 rounded-full bg-[#6b6bff]/30 blur-2xl animate-pulse delay-200"></div>
        {/* Layer 3 */}
        <div className="absolute w-28 h-28 rounded-full bg-[#6bffb3]/30 blur-3xl animate-pulse delay-400"></div>
        {/* Layer 4 */}
        <div className="absolute w-36 h-36 rounded-full bg-[#ffde6b]/30 blur-2xl animate-pulse delay-600"></div>

        {/* Optional overlay content */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
          <p className="text-white text-center text-sm font-medium">
            Session Highlights
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
