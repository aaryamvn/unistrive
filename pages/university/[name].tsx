import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { PostEntity } from "../../entities/PostEntity";
import { findPostsByUniversity } from "../../firestore/posts/findPostsByUniversity";
import { findUniversityByName } from "../../firestore/universities/findUniversityByName";

const UniversityPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuthContext();
  const [posts, setPosts] = useState<PostEntity[]>([]);

  const { name } = router.query;
  console.log(name);

  useEffect(() => {
    getPosts("MIT");
  }, [name]);

  const getPosts = async (name: string) => {
    if (name)
      setPosts(await findPostsByUniversity(name));
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

  if (!user) {
    return <p></p>;
  } else {
    return (
      <p>
        <div>
          <pre>{JSON.stringify(posts, null, 2)}</pre>
        </div>
      </p>
    );
  }
};

export default UniversityPage;
