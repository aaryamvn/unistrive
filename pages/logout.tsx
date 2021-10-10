import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

const Logout = () => {
  const { logout } = useAuthContext();
  useEffect(() => {
    logout();
  }, [logout]);

  return <div>Logging you out...</div>;
};

export default Logout;
