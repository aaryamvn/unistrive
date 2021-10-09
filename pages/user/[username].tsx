import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { findUserByUsername } from "../../firestore/users/findUserByUsername";
import { Layout } from "../../hoc/Layout";

const UserPage = () => {
  const router = useRouter();
  const { user: loggedInUser } = useAuthContext();

  const { username } = router.query;
  let user;

  useEffect(() => {
    (async () => {
      if (username) user = await findUserByUsername(username as string);
    })();
  }, [loggedInUser]);

  return <Layout>sjdngjhdsf</Layout>;
};

export default UserPage;
