import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { useAuthContext } from "../contexts/AuthContext";

const Index = () => {
  const { user, logout } = useAuthContext();
  return (
    <div>
      <Navbar />
      <div className="relative h-[calc(100vh-4rem)] w-screen container mx-auto flex items-center justify-center">
        <div className="md:w-[30rem] xl:w-[40rem] flex flex-col gap-[1rem]">
          <h1
            className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Welcome {user?.displayName}
          </h1>

          <Button bg="bg-accent1" width="w-[8rem]" onClick={logout}>
            <h3>Logout</h3>
          </Button>
        </div>

        <img
          src="/call_hand_vector.png"
          className="absolute bottom-0 right-5"
          alt=""
        />
      </div>
    </div>
  );
};

export default Index;
