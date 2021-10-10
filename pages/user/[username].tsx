// import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { ConsultantProfileEntity } from "../../entities/ConsultantProfileEntity";
import { HighschoolerProfileEntity } from "../../entities/HighschoolerProfileEntity";
import { PostEntity } from "../../entities/PostEntity";
// import { ConsultantProfileEntity } from "../../entities/ConsultantProfileEntity";
// import { HighschoolerProfileEntity } from "../../entities/HighschoolerProfileEntity";
import { UserEntity } from "../../entities/UserEntity";
import { findConsultantProfileByUserId } from "../../firestore/consultantProfiles/findConsultantProfileByUserId";
import { findHighschoolerProfileByUserId } from "../../firestore/highschoolerProfiles/findHighschoolerProfileByUserId";
// import { findPostsByCreator } from "../../firestore/posts/findPostsByCreator";
import { findUserByUsername } from "../../firestore/users/findUserByUsername";

const UserPage = ({ user, consultantProfile, highschoolerProfile }) => {
  return (
    <div>
      <Navbar />
      <div className="relative w-screen container mx-auto flex justify-center gap-2 mt-5">
        <div className="w-[40rem] rounded-md bg-bgVariant1 p-5">
          {user ? user.bio : "Failed to fetch bio"}
        </div>
        <ProfileCard
          user={user}
          highschoolerProfile={highschoolerProfile}
          consultantProfile={consultantProfile}
        />
      </div>
    </div>
  );
};

const ProfileCard = ({
  user,
  highschoolerProfile,
  consultantProfile,
}: {
  user: UserEntity;
  highschoolerProfile?: HighschoolerProfileEntity;
  consultantProfile?: ConsultantProfileEntity;
}) => {
  console.log("profile", user);

  return (
    <div className="w-[19.5rem] rounded-md bg-bgVariant1 p-5 flex flex-col items-center gap-4 text-center">
      {/* Avatar */}
      <img
        src={user?.avatarUrl}
        className="h-[7rem] w-[7rem] rounded-full"
        alt=""
      />

      <div>
        <span className="px-3 py-1 rounded-full font-semibold text-xs bg-accent1">
          {user?.accountType === "highschooler"
            ? "High Schooler"
            : "Consultant"}
        </span>
        <div className="flex flex-col items-center mt-2">
          <h2 className="text-[1.4rem] font-semibold">{user?.displayName}</h2>
          <span className="text-sm text-muted1">@{user?.username}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {user?.accountType === "consultant" && (
          <div className="flex flex-col">
            <h5 className="font-semibold text-sm">
              {consultantProfile?.unicoins || 0} Unicoins
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;

export async function getServerSideProps(context: NextPageContext) {
  const { username } = context.query;

  const user = await findUserByUsername(username as string);
  const consultantProfile = await findConsultantProfileByUserId(user?.id);
  const highschoolerProfile = await findHighschoolerProfileByUserId(user?.id);

  // undefined is not serializable.
  return {
    props: {
      user,
      consultantProfile: consultantProfile || null,
      highschoolerProfile: highschoolerProfile || null,
    },
  };
}
