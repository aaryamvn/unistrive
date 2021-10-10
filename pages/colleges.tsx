import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { UniDetailsSection } from "../components/university/UniDetailsSection";
import { UniversityEntity } from "../entities/UniversityEntity";
import { getAllUniversities } from "../firestore/universities/getAllUniversities";
import Link from "next/link";

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
      <div className="mx-auto flex flex-col">
        <div className="md:w-[30rem] xl:w-[40rem] flex flex-col gap-[1rem] mx-auto pt-20">
          <h1
            className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Colleges
          </h1>

          <p className="text-muted1 md:text-[1.2rem] xl:text-[1.4rem]">
            A list of colleges who have registered with Unistrive
          </p>
          <div className="flex items-center gap-2 mx-auto pt-10">
            {universities &&
              universities.map((university, i) => {
                return (
                  <Link href={`/university/${university.name}`} key={i}>
                    <a>
                      <UniDetailsSection
                        university={university}
                        height="17rem"
                        showCreatePost={false}
                        showAboutTextHeader={false}
                      />
                    </a>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
