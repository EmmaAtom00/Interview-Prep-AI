import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import HERO_IMG from "../../assets/hero-img3.png";
import Header from "../../Components/Layouts/Header";
import HeroContent from "../../Components/Layouts/HeroContent";
import SectionOne from "../../Components/Layouts/SectionOne";
import Features from "../../Components/Layouts/Features";
import { APP_FEATURES } from "../../Utils/data";
import Login from "../Auth/Login";
import SIgnUp from "../Auth/SIgnUp";
import Modal from "../../Components/Modal";
import { UserContext } from "../../Context/userContext";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-[#FFFCEF] relative overflow-hidden">
        <div className="w-full h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0 z-0" />

        <div className="container mx-auto px-4 pt-6 pb-[280px] relative z-10">
          <Header setOpenAuthModal={setOpenAuthModal} user={user} />
          <HeroContent handleCTA={handleCTA} />
        </div>
      </div>

      <SectionOne HERO_IMG={HERO_IMG} />
      <Features APP_FEATURES={APP_FEATURES} />

      <div className="bg-gray-50 text-secondary text-center p-5 mt-5">
        Made with ❤️ by Emmanuel Olarewaju
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SIgnUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
