import { findUniversityByName } from "../universities/findUniversityByName";
import { findUserById } from "./findUserById";

export const isFollowingUniversity = async (
  userId: string,
  universityName: string,
) => {
  // The userDoc lets us update the data
  // The findUserById function just reduces repeated code
  const user = await findUserById(userId);

  // Same implementation
  const university = await findUniversityByName(universityName);

  if (universityName in user.followingUniNames) {
    if (!(userId in university.followerIds)) {
      return true;
    }
  }
};
