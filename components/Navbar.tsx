import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-[4rem] px-6 py-4 border-b border-bgVariant1">
      <Logo />
      <ProfileSection />
    </div>
  );
};

const ProfileSection = () => {
  const { user } = useAuthContext();

  return user ? (
    <div className="flex items-center gap-2">
      <img
        src={user.avatarUrl}
        alt=""
        className="h-7 w-7 rounded-full object-contain"
      />
      <img
        src="/icons/caret_down.svg"
        alt=""
        className="h-[0.6rem] w-[0.6rem]"
      />
    </div>
  ) : (
    <></>
  );
};
