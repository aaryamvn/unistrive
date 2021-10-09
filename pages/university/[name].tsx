import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { PostEntity } from "../../entities/PostEntity";
import { findPostsByUniversity } from "../../firestore/posts/findPostsByUniversity";

const UniversityPage = ({ name }) => {
  const { user, isLoading } = useAuthContext();
  const [posts, setPosts] = useState<PostEntity[]>([]);

  console.log(name);

  useEffect(() => {
    getPosts(name);
  }, [name]);

  const getPosts = async (name: string) => {
    if (name) setPosts(await findPostsByUniversity(name));
  };

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
    <p>
      <div>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </div>
    </p>
  );
};

export default UniversityPage;

export async function getServerSideProps(context: NextPageContext) {
  const { name } = context.query;
  return { props: { name } };
}
