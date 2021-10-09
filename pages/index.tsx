import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { useAuthContext } from "../contexts/AuthContext";
import { Layout } from "../hoc/Layout";

const Index = () => {
  const { user, logout } = useAuthContext();
  return (
    <Layout>
      {user && (
        <div className="relative h-screen w-screen container mx-auto flex items-center justify-center">
          <div className="md:w-[30rem] xl:w-[40rem] flex flex-col gap-[1rem]">
            <h1
              className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Welcome {user?.displayName}
            </h1>
            <Button bg="bg-accent1" width="w-[13rem]" onClick={logout}>
              Logout
            </Button>
          </div>
          <img
            src="/call_hand_vector.png"
            className="absolute bottom-0 right-5"
            alt=""
          />
        </div>
      )}
    </Layout>
  );
};

export default Index;
