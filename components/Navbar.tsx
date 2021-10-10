import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Logo } from "./Logo";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-[4rem] px-6 py-4 border-b border-bgVariant1">
      <div className="flex items-center justify-between h-[4rem] pb-1">
        <Logo />
        <div className="pl-6 pt-1">
          <Link href="colleges" passHref>
            <p className="font-bold">Universities</p>
          </Link>
        </div>
        <div className="pl-6 pt-1">
          <Link href="colleges" passHref>
            <p className="font-bold">Create a New University</p>
          </Link>
        </div>
      </div>
      <ProfileSection />
    </div>
  );
};

const ProfileSection = () => {
  const { user } = useAuthContext();

  return user ? (
    <div className="flex items-center gap-2">
      <div className="pr-4">
        <Link href={`/logout`} passHref>
          <p className="font-bold">Logout</p>
        </Link>
      </div>
      <div className="pr-4">
        <Link href={`/user/${user.username}`} passHref>
          <img
            src={user.avatarUrl}
            alt=""
            className="h-7 w-7 rounded-full object-contain mr-2"
          />
        </Link>
      </div>
    </div>
  ) : (
    <>
      <div className="flex items-center gap-2">
        <div className="pr-4">
          <Link href={`/login`} passHref>
            <p className="mr-2">Login</p>
          </Link>
        </div>
      </div>
    </>
  );
};
