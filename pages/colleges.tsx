import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { UniDetailsSection } from "../components/university/UniDetailsSection";
import { UniversityEntity } from "../entities/UniversityEntity";
import { getAllUniversities } from "../firestore/universities/getAllUniversities";

export const Login = () => {
  const [universities, setUniversities] = useState<UniversityEntity[]>();

  useEffect(() => {
    const getUniversities = async () => {
      const universities = await getAllUniversities();
      setUniversities(universities);
    };

    getUniversities();
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative h-screen mx-auto flex items-center justify-center">
        <div className="md:w-[30rem] xl:w-[40rem] flex flex-col gap-[1rem]">
          <h1
            className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Colleges
          </h1>

          <p className="text-muted1 md:text-[1.2rem] xl:text-[1.4rem]">
            Here is a list of colleges who have registered with Unistrive
          </p>
        </div>
        {universities &&
          universities.map((university, i) => {
            return <UniDetailsSection university={university} key={i} />;
          })}
      </div>
    </>
  );
};

export default Login;
