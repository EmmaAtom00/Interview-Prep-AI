import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import SpinnerLoader from "../../Components/Loader/SpinnerLoader";

const Auth = () => {
  const { user, loading } = useContext(UserContext);

  // while checking auth (API / token / session)
  if (loading) {
    return (
      <div>
        <SpinnerLoader />
      </div>
    );
  }

  // not logged in → redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // logged in → allow access
  return <Outlet />;
};

const GuestOnly = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div>
        <SpinnerLoader />
      </div>
    );
  }

  // already logged in → dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // not logged in → allow access
  return <Outlet />;
};

export { Auth, GuestOnly };
