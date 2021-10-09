import { useRouter } from "next/router";
import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import { findUserByUsername } from "../../firestore/users/findUserByUsername";

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

  return (
    <div>
      <Navbar />
      <div className="relative w-screen container mx-auto flex items-center justify-center gap-2 mt-5">
        <div className="w-[40rem] h-full bg-bgVariant1 p-2">d</div>
        <div className="w-[19.5rem] h-full bg-bgVariant1 p-2">d</div>
      </div>
    </div>
  );
};

export default UserPage;
