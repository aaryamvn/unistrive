import { useAuthContext } from "../../contexts/AuthContext";
import { UniversityEntity } from "../../entities/UniversityEntity";
import { Button } from "../Button";

export const FollowUniversityButton = ({
  university,
}: {
  university: UniversityEntity;
}) => {
  const { user } = useAuthContext();

  return (
    <Button
      bg="bg-[#fff]"
      height="h-[2.5rem]"
      className="!rounded-full text-bg hover:opacity-[0.7] transition-all"
    >
      {user?.followingUniNames?.includes(university.name) ? (
        <span className="flex items-center gap-2">
          <img
            src="/icons/checkmark.svg"
            alt=""
            className="h-[1.3rem] w-[1.3rem]"
          />
          Following
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <img
            src="/icons/follow_user.svg"
            alt=""
            className="h-[1.3rem] w-[1.3rem]"
          />
          Follow University
        </span>
      )}
    </Button>
  );
};
