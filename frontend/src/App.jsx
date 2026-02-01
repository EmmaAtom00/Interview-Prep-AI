import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Auth/Login";
import SIgnUp from "./pages/Auth/SIgnUp";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import LandingPage from "./pages/InterviewPrep/LandingPage";
import { UserProvider } from "./Context/userContext";
import { Auth, GuestOnly } from "./pages/Auth/Auth";

const App = () => {
  return (
    <UserProvider>
      <div className="">
        <Router>
          <Routes>
            {/* Default Route */}

            <Route element={<GuestOnly />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SIgnUp />} />
            </Route>

            <Route element={<Auth />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/interview-prep/:sessionId"
                element={<InterviewPrep />}
              />
            </Route>
          </Routes>
        </Router>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
