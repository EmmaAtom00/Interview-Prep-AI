import React from "react";

const Features = ({ APP_FEATURES }) => {
  return (
    <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
      <div className="container mx-auto px-4 pt-10 pb-20">
        <section className="mt-5">
          <h2 className="text-2xl font-medium text-center mb-12">
            Features That Make You Shine
          </h2>

          <div className="flex flex-col items-center gap-8">
            {/* First 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  className="bg-[#FFFEF8] p-8 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                  key={feature.id}
                >
                  <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Remaining cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {APP_FEATURES.slice(3).map((feature) => (
                <div className="bg-[#FFFEF8] p-8 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100" key={feature.id}>
                  <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Features;
