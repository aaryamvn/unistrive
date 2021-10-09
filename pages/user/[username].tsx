// import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { PostEntity } from "../../entities/PostEntity";
// import { ConsultantProfileEntity } from "../../entities/ConsultantProfileEntity";
// import { HighschoolerProfileEntity } from "../../entities/HighschoolerProfileEntity";
import { UserEntity } from "../../entities/UserEntity";
// import { findPostsByCreator } from "../../firestore/posts/findPostsByCreator";
// import { findConsultantProfileById } from "../../firestore/consultantProfiles/findConsultantProfileById";
// import { findHighschoolerProfileById } from "../../firestore/highschoolerProfiles/findHighschoolerProfileById";
import { findUserByUsername } from "../../firestore/users/findUserByUsername";

const UserPage = ({ username }) => {
  // const router = useRouter();
  let errors: string[];

  // const { username } = router.query;
  console.log("username: ", username);
  const [user, setUser] = useState<UserEntity>(null);

  //   const [highschoolerProfile, setHighschoolerProfile] =
  //     useState<HighschoolerProfileEntity>();
  //   const [consultantProfile, setConsultantProfile] =
  //     useState<ConsultantProfileEntity>();

  const [posts, setPosts] = useState<PostEntity[]>([]);

  useEffect(() => {
    try {
      const getUser = async (name: string) => {
        const user = await findUserByUsername(username as string);
        console.log("user from db: ", user);
        setUser(user);
      };

      getUser(username);
    } catch (error) {
      errors.push(error);
    }
  }, [username, errors]);

  if (!user || errors) {
    return (
      <div>
        <Navbar />
        <div className="relative h-[calc(100vh-4rem)] w-screen container mx-auto flex items-center justify-center">
          <div className="md:w-[30rem] xl:w-[40rem] flex flex-col gap-[1rem]">
            <h1
              className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <strong>OOPS!</strong> This account does not exist
            </h1>
          </div>

          <img
            src="/call_hand_vector.png"
            className="absolute bottom-0 right-5"
            alt=""
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="relative w-screen container mx-auto flex justify-center gap-2 mt-5">
        <div className="w-[40rem] rounded-md bg-bgVariant1 p-5">
          {user ? user.bio : "Failed to fetch bio"}
        </div>
        <ProfileCard
          user={user}
          // highschoolerProfile={highschoolerProfile}
          // consultantProfile={consultantProfile}
        />
      </div>
    </div>
  );
};

const ProfileCard = ({ user }: { user: UserEntity }) => {
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

      {/* <div className="flex items-center gap-2">
        {user?.accountType === "consultant" && (
          <div className="flex flex-col">
            <h5 className="font-semibold text-sm">Unicoins</h5>
            <span className="text-muted1 text-xs">
              {consultantProfile?.unicoins}
            </span>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default UserPage;

export async function getServerSideProps(context: NextPageContext) {
  const { username } = context.query;
  return { props: { username } };
}
