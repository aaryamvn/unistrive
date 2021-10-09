import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { UniversityEntity } from "../../entities/UniversityEntity";
import { findUniversityByName } from "../../firestore/universities/findUniversityByName";

const UniversityPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuthContext();
  const [university, setUniversity] = useState<UniversityEntity>();

  const { name } = router.query;
  console.log(name);

  useEffect(() => {
    findUniversityByName("MIT").then((u) => setUniversity(u));
  }, [name]);

  if (isLoading) {
    return (
      <h1
        className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Loading...
      </h1>
    );
  }

  if (!user) {
    return <p></p>;
  } else {
    return (
      <p>
        <div>
          <pre>{JSON.stringify(university, null, 2)}</pre>
        </div>
      </p>
    );
  }
};

export default UniversityPage;
