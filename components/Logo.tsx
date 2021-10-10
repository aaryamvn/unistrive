import React from "react";
import Link from "next/link";

export const Logo = ({ size = "text-[1.5rem]" }) => {
  return (
    <Link href="/">
      <a>
        <h1
          className={`${size} font-bold`}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          unistrive.
        </h1>
      </a>
    </Link>
  );
};
