import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "../components/Button";

export const Login = () => {
  const router = useRouter();
  const { user, login } = useAuthContext();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <div className="relative h-screen w-screen container mx-auto flex items-center justify-center">
      <div className="md:w-[30rem] xl:w-[40rem] flex flex-col gap-[1rem]">
        <h1
          className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Getting into a good college is stressful, unless you have the right
          guidance.
        </h1>

        <p className="text-muted1 md:text-[1.2rem] xl:text-[1.4rem]">
          Unistrive allows high-schoolers to connect to students from the
          universities of their dreams, and obtain valuable advice for no cost.
        </p>

        <Button bg="bg-accent1" width="w-[13rem]" onClick={login}>
          <img src="/icons/google.svg" className="h-5 w-5 object-contain" />
          <h3>Login With Google</h3>
        </Button>
      </div>

      <img
        src="/call_hand_vector.png"
        className="absolute bottom-0 right-5"
        alt=""
      />
    </div>
  );
};

export default Login;
