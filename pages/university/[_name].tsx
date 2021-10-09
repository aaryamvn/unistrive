import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { UniversityEntity } from "../../entities/UniversityEntity";
import { findUniversityById } from "../../firestore/universities/findUniversitybyId";

const UniversityPage = () => {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [university, setUniversity] = useState<UniversityEntity>();

  const { name } = router.query;

  useEffect(() => {
    findUniversityById(name as string).then((u) => setUniversity(u));
  }, []);

  return <p></p>;
};

export default UniversityPage;
