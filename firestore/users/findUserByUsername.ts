import { UserEntity } from "../../entities/UserEntity";
import { usersCollection } from "../collections";

export const findUserByUsername = async (
  username: string,
): Promise<UserEntity> => {
  const doc = (
    await usersCollection.where("username", "==", username).get()
  ).docs[0].data();

  console.log(doc);

  return doc as any;
};
