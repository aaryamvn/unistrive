import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { Navbar } from "../../components/Navbar";
import { BannerSection } from "../../components/university/BannerSection";
import { MainSection } from "../../components/university/MainSection";
import { UniDetailsSection } from "../../components/university/UniDetailsSection";
import { useAuthContext } from "../../contexts/AuthContext";
import { PostEntity } from "../../entities/PostEntity";
import { UniversityEntity } from "../../entities/UniversityEntity";
import { findPostsByUniversity } from "../../firestore/posts/findPostsByUniversity";
import { findUniversityByName } from "../../firestore/universities/findUniversityByName";

const UniversityPage = ({ university }: { university: UniversityEntity }) => {
  const { isLoading } = useAuthContext();

  // posts
  const [posts, setPosts] = useState<PostEntity[]>([]);

  // make an array of all the posts from this university
  useEffect(() => {
    (async () =>
      university && setPosts(await findPostsByUniversity(university.name)))();
  }, [university]);

  // loader
  if (isLoading) return <Loader />;

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="relative w-screen">
        <BannerSection university={university} />
        <div className="mx-auto flex justify-center gap-2 mt-4 overflow-y-auto">
          <MainSection />
          <div>
            <UniDetailsSection university={university} />
            <UniDetailsSection university={university} />
            <UniDetailsSection university={university} />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { name } = context.query;
  const university = await findUniversityByName(name as string);
  return { props: { university } };
}

export default UniversityPage;
