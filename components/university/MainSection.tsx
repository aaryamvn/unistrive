import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Post } from "../Post";

export const MainSection = () => {
  const { user } = useAuthContext();
  return (
    <div className="w-[40rem]">
      <Post
        content="So I recently decided that I wanted to create a 2d game in python using only the console for graphics, my project was however stopped because I couldn't clear the screen without flashing (using os.system), I later experienced the same problem again with another project, so I decided to do something about it."
        creator={user}
        title="ConsoleDraw (A Python Module to Draw to the Console Without Flashing!)"
        universityName="Harvard"
        universityLogoUrl="https://1000logos.net/wp-content/uploads/2017/02/Harvard-symbol.jpg"
        upvotesAmt={69}
      />
    </div>
  );
};
