import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export const Layout = ({ children }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  return <div className="">{children}</div>;
};
