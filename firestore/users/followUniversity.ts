import { universitiesCollection, usersCollection } from "../collections";
import { findUniversityByName } from "../universities/findUniversityByName";
import { findUserById } from "./findUserById";

export const findUserByUsername = async (
  userId: string,
  universityName: string,
) => {
  const userDoc = usersCollection.doc(userId);
  const user = await findUserById(userId);

  const university = await findUniversityByName(universityName);
  const universityDoc = universitiesCollection.doc(university.id);

  if (userDoc && university) {
    // user part
    let followingUnis: string[] = user.followingUniNames;
    followingUnis.push(universityName);
    userDoc.update({ followngUniNames: followingUnis });

    // university part
    let followers: string[] = university.followerIds;
    followers.push(userId);
    universityDoc.update({ followerIds: followers });
  }
};
