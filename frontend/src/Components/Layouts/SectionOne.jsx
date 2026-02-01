import React from "react";

const SectionOne = ({ HERO_IMG }) => {
  return (
    <div className="w-full min-h-full relative z-10">
      <section className="flex items-center justify-center -mt-36">
        <img
          src={HERO_IMG}
          alt="Hero"
          className="w-[80vw] rounded-lg"
        />
      </section>
    </div>
  );
};

export default SectionOne;
