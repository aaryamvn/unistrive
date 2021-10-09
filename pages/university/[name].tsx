import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import { PostEntity } from "../../entities/PostEntity";
import { UniversityEntity } from "../../entities/UniversityEntity";
import { findPostsByUniversity } from "../../firestore/posts/findPostsByUniversity";
import { findUniversityByName } from "../../firestore/universities/findUniversityByName";

export async function getServerSideProps(context: NextPageContext) {
  const { name } = context.query;
  const uni = await findUniversityByName(name as string);
  return { props: { uni } };
}

const UniversityPage = ({ uni }: { uni: UniversityEntity }) => {
  console.log(uni);
  const { isLoading } = useAuthContext();

  const [posts, setPosts] = useState<PostEntity[]>([]);

  // make an array of all the posts from this university
  useEffect(() => {
    (async () => uni && setPosts(await findPostsByUniversity(uni.name)))();
  }, [uni]);

  // loading state
  if (isLoading) {
    return (
      <h1
        className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="relative w-screen container mx-auto flex justify-center gap-2 mt-5">
        {/* <BannerSection /> */}
        {/* <MainSection />
        <UniDetailsSection /> */}
      </div>
    </div>
  );
};

export default UniversityPage;

const BannerSection = () => {
  return (
    <div className="w-screen bg-bgVariant1 p-5">
      <img src="" alt="" className="w-full object-contain" />
    </div>
  );
};

const MainSection = () => {
  return <div className="w-[40rem] rounded-md bg-bgVariant1 p-5"></div>;
};

const UniDetailsSection = () => {
  return (
    <div className="w-[19.5rem] rounded-md bg-bgVariant1 p-5 flex flex-col items-center gap-4 text-center"></div>
  );
};
