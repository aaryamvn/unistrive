import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { findUserByUsername } from "../../firestore/users/findUserByUsername";

const UserPage = () => {
  const router = useRouter();
  const { user: loggedInUser } = useAuthContext();

  const { username } = router.query;
  let user;

  useEffect(() => {
    const main = async () => {
      user = await findUserByUsername(username as string);
    };

    main();
  }, [loggedInUser]);

  return <p></p>;
};

export default UserPage;
