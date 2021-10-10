import React from "react";
import { useAuthContext } from "../contexts/AuthContext";

const logout = () => {
  const { logout } = useAuthContext();
  logout();

  return <div>Logging you out...</div>;
};

export default logout;
