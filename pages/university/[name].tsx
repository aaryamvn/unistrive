import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Navbar } from "../../components/Navbar";
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
    (async () => university && setPosts(await findPostsByUniversity(university.name)))();
  }, [university]);

  // loader
  if (isLoading) return <Loader />;

  return (
    <div>
      <Navbar />
      <div className="relative w-screen mx-auto flex justify-center gap-2">
        <BannerSection uni={university} />
        {/* <MainSection />
        <UniDetailsSection /> */}
      </div>
    </div>
  );
};

const BannerSection = ({ uni }: { uni: UniversityEntity }) => {
  const { user } = useAuthContext();

  if (!uni) {
    return <>YO MAMA</>;
  }

  return (
    <div className="w-screen">
      <img
        src={
          uni.bannerUrl ||
          "https://media.istockphoto.com/photos/university-sign-in-fall-picture-id182240679?b=1&k=20&m=182240679&s=170667a&w=0&h=B5nYT957nFgQbNzHqjZZr0VUhwWX-Dh3fTq-jBzU7qI="
        }
        alt=""
        className="w-screen h-[10rem] object-cover"
      />

      <div className="bg-bgVariant1 relative py-5">
        <div className="mx-auto w-[59.5rem] flex flex-col gap-3">
          <div className="flex gap-5">
            <img
              src={uni.logoUrl}
              alt=""
              className="mt-[-2.5rem] h-[6rem] w-[6rem] object-cover rounded-md"
            />
            <div>
              <div className="flex flex-col">
                <h1 className="text-[2.5rem] font-bold leading-tight">
                  {uni.name}
                </h1>
                <span className="text-[1rem] font-regular text-muted1">
                  {uni.email}
                </span>
              </div>

              {/* Buttons */}
              <div className="mt-4">
                <Button
                  bg="bg-[#fff]"
                  height="h-[2.5rem]"
                  className="!rounded-full text-bg"
                >
                  {user?.followingUniNames?.includes(uni.name) ? (
                    <span className="flex items-center gap-2">
                      <img
                        src="/icons/checkmark.svg"
                        alt=""
                        className="h-[1.3rem] w-[1.3rem]"
                      />
                      Following
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <img
                        src="/icons/follow_user.svg"
                        alt=""
                        className="h-[1.3rem] w-[1.3rem]"
                      />
                      Follow University
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export async function getServerSideProps(context: NextPageContext) {
  const { name } = context.query;
  const university = await findUniversityByName(name as string);
  return { props: { university } };
}

export default UniversityPage;
