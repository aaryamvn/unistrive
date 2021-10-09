import React from "react";
import { UniversityEntity } from "../../entities/UniversityEntity";
import { CreatePostButton } from "./CreatePostButton";

export const UniDetailsSection = ({
  university,
}: {
  university: UniversityEntity;
}) => {
  return (
    <div className="w-[19.5rem] rounded-md bg-bgVariant1 p-5 flex flex-col gap-4">
      {/* ABOUT */}
      <div className="flex flex-col gap-1">
        <h3 className="capitalize font-bold text-muted1 text-md truncate">
          About {university?.name}
        </h3>
        <p className="font-regular text-muted1 text-sm">
          {university?.bio ||
            `Looks like ${university?.name} hasn't put up a bio yet!`}
        </p>
      </div>

      {/* MEMBERS */}
      <div className="flex items-center gap-10 pb-4 border-b border-bgVariant2">
        <span className="flex flex-col font-semibold">
          <h4 className="text-md">{university?.followerIds.length || 0}</h4>
          <h5 className="text-xs">Followers</h5>
        </span>

        <span className="flex flex-col font-semibold">
          <h4 className="text-md">{university?.studentIds.length || 0}</h4>
          <h5 className="text-xs">Students</h5>
        </span>

        <span className="flex flex-col font-semibold">
          <h4 className="text-md">🦄</h4>
          <h5 className="text-xs">Applicants</h5>
        </span>
      </div>

      {/* CREATE POST BUTTON */}
      <div className="flex items-center justify-between">
        <CreatePostButton />
      </div>
    </div>
  );
};
