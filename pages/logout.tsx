import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

const logout = () => {
  const { logout } = useAuthContext();
  useEffect(() => {
    logout();
  }, []);

  return <div>Logging you out...</div>;
};

export default logout;
