import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { UniversityEntity } from "../../entities/UniversityEntity";
import { FollowUniversityButton } from "./FollowUniversityButton";

type Banner = {
  bannerUrl: string;
  profileUrl: string;
  name: string;
  email: string;
}

export const BannerSection = ({
  university,
}: {
  university?: UniversityEntity;
  userProfile?: boolean,
}) => {
  const { user } = useAuthContext();
  let banner: Banner;

  if (!university) {
    if(!user) {
      return <p> Not found </p>;
    }

    banner = {
      bannerUrl: "",
      profileUrl: user.avatarUrl,
      name: user.displayName,
      email: user.email,
    };
  } else {
    banner = {
      bannerUrl: university.bannerUrl,
      profileUrl: university.logoUrl,
      name: university.name,
      email: university.email,
    };
  }


  return (
    <div className="w-screen">
      <img
        src={
          banner.bannerUrl ||
          "https://media.istockphoto.com/photos/university-sign-in-fall-picture-id182240679?b=1&k=20&m=182240679&s=170667a&w=0&h=B5nYT957nFgQbNzHqjZZr0VUhwWX-Dh3fTq-jBzU7qI="
        }
        alt=""
        className="w-screen h-[10rem] object-cover"
      />

      <div className="bg-bgVariant1 py-5">
        <div className="mx-auto w-[59.5rem] flex flex-col gap-3">
          <div className="flex gap-7">
            <img
              src={banner.profileUrl}
              alt=""
              className="h-[5rem] w-[5rem] object-cover rounded-md"
            />
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex flex-col">
                <h1 className="text-[2.5rem] font-bold leading-tight">
                  {banner.name}
                </h1>
                <span className="text-[1rem] font-regular text-muted1">
                  {banner.email}
                </span>
              </div>
              { university && <FollowUniversityButton university={university} /> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
