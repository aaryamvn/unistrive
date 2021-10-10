import { Navbar } from "../components/Navbar";
import { useRouter } from "next/router";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { MainSection } from "../components/home/MainSection";
import { PostEntity } from "../entities/PostEntity";
import { findPosts } from "../firestore/posts/findPosts";
import { SidePanel } from "../components/home/SidePanel";

const Index = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  // posts
  const [posts, setPosts] = useState<PostEntity[]>([]);

  // make an array of all the posts from the users followed unis
  useEffect(() => {
    (async () => setPosts(await findPosts(user?.id)))();
  }, [user?.id]);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) {
    return <p>Login</p>;
  }

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="relative w-screen">
        <div className="mx-auto flex justify-center gap-2 mt-4 overflow-y-auto">
          <MainSection posts={posts} />
          <SidePanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
