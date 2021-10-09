import React from "react";
import { UniversityEntity } from "../../entities/UniversityEntity";

export const UniDetailsSection = ({
  university,
}: {
  university: UniversityEntity;
}) => {
  return (
    <div className="w-[19.5rem] rounded-md bg-bgVariant1 p-5 flex flex-col gap-4">
      {/* ABOUT */}
      <div className="flex flex-col gap-1">
        <h3 className="capitalize font-bold text-muted1 text-md">
          About The University
        </h3>
        <p className="font-regular text-muted1 text-sm">
          {university?.bio ||
            `Looks like this university hasn't put up a bio yet!`}
        </p>
      </div>

      {/* MEMBERS */}
    </div>
  );
};
