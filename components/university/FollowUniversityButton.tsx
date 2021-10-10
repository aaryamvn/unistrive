import { useAuthContext } from "../../contexts/AuthContext";
import { UniversityEntity } from "../../entities/UniversityEntity";
import { followUniversity } from "../../firestore/users/followUniversity";
import { isFollowingUniversity } from "../../firestore/users/isFollowingUniversity";
import { Button } from "../Button";

export const FollowUniversityButton = ({
  university,
}: {
  university: UniversityEntity;
}) => {
  const { user } = useAuthContext();

  if (!user) {
    return <></>
  }

  return (
    <Button
      bg="bg-[#fff]"
      height="h-[2.5rem]"
      className="!rounded-full text-bg hover:opacity-[0.7] transition-all"
      onClick={() => followUniversity(user.id, university.name)}
    >
      {isFollowingUniversity?(
        <span className="flex items-center gap-2">
          <img
            src="/icons/checkmark.svg"
            alt=""
            className="h-[1.3rem] w-[1.3rem]"
          />
          Following
        </span>):(
        <span className="flex items-center gap-2">
          <img
            src="/icons/follow_user.svg"
            alt=""
            className="h-[1.3rem] w-[1.3rem]"
          />
          Follow University
        </span>)}
    </Button>
  );
};
