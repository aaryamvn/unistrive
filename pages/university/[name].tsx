import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { UniversityEntity } from "../../entities/UniversityEntity";
import { findUniversityByName } from "../../firestore/universities/findUniversityByName";

const UniversityPage = () => {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [university, setUniversity] = useState<UniversityEntity>();

  const { name } = router.query;
  console.log(name);

  useEffect(() => {
    findUniversityByName("MIT").then((u) => setUniversity(u));
  }, [name]);

  if (!user) {
    return <p></p>;
  }
  return <p><div><pre>{JSON.stringify(university, null, 2) }</pre></div></p>;
};

export default UniversityPage;
