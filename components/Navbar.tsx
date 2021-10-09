import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-[5.4rem] px-6 py-4 border-b border-bgVariant1">
      <Logo />
      <ProfileSection />
    </div>
  );
};

const ProfileSection = () => {
  const { user } = useAuthContext();

  return (
    <div className="flex items-center gap-2">
      <img
        src={user?.avatarUrl}
        alt=""
        className="h-9 w-9 rounded-full object-contain"
      />
      <img
        src="/icons/caret_down.svg"
        alt=""
        className="h-[0.8rem] w-[0.8rem]"
      />
    </div>
  );
};
