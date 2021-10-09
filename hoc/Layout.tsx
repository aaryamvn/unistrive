import { useRouter } from "next/router";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useAuthContext } from "../contexts/AuthContext";

export const Layout = ({
  children,
  includeNav = true,
  containerClassName = "",
}) => {
  return (
    <div>
      {includeNav && <Navbar />}
      <div
        className={`w-screen ${
          includeNav && "h-[calc(100vh-5.4rem)]"
        } ${containerClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
