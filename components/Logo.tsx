import React from "react";

export const Logo = ({ size = "text-[1.5rem]" }) => {
  return (
    <h1
      className={`${size} font-bold`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      unistrive.
    </h1>
  );
};
