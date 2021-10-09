import { useRouter } from "next/router";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p></p>;
};

export default PostPage;
