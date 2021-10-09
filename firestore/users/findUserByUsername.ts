import { UserEntity } from "../../entities/UserEntity";
import { usersCollection } from "../collections";

export const findUserByUsername = async (
  username: string,
): Promise<UserEntity> => {
  const doc = (
    await usersCollection.where("username", "==", "fullstackslayer").get()
  ).docs[0];

  console.log(doc);

  return doc as any;
};
