import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { followUniversity } from "../../firestore/users/followUniversity";
import { Button } from "../Button";

export const SidePanel = () => {
  return (
    <div className="w-[19.5rem]">
      <div className="rounded-md bg-bgVariant1 p-5 flex flex-col gap-4">
        <h3 className="capitalize font-bold text-muted1 text-md truncate">
          Relevant Universities
        </h3>
        <University
          id="jhbgjhsd"
          name="Harvard"
          followerCount={69}
          studentCount={420}
          logoUrl="https://media.designrush.com/inspirations/129681/conversions/_1523543112_460_harvard-preview.jpg"
        />
      </div>
    </div>
  );
};

const University = ({
  id,
  name,
  logoUrl,
  followerCount,
  studentCount,
  isFinalUniOfList = false,
}) => {
  return (
    <div
      className={`flex items-center justify-between w-full ${
        !isFinalUniOfList && "pb-2 border-b border-bgVariant2"
      }`}
    >
      <div className="flex items-center gap-2">
        <img
          src={logoUrl}
          alt=""
          className="h-10 w-10 object-cover rounded-md"
        />

        <div className="flex flex-col">
          <h3 className="font-bold text-lg truncate">{name}</h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1">
              {followerCount} <h5 className="font-semibold">Followers</h5>
            </span>

            <span className="flex items-center gap-1">
              {studentCount} <h5 className="font-semibold">Students</h5>
            </span>
          </div>
        </div>
      </div>

      {/* Follow Button */}
      <FollowUniversityButton uniName={name} />
    </div>
  );
};

const FollowUniversityButton = ({ uniName }) => {
  const { user } = useAuthContext();

  return (
    <Button
      bg="bg-transparent"
      height="h-[1.5rem]"
      className="!rounded-full hover:opacity-[0.7] transition-all text-xs border border-bgVariant2"
      onClick={() => followUniversity(user.id, uniName)}
    >
      Follow
    </Button>
  );
};
