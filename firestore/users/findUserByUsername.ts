import { UserEntity } from "../../entities/UserEntity";
import { usersCollection } from "../collections";

export const findUserByUsername = async (
  username: string,
): Promise<UserEntity> => {
  const doc = (
    await usersCollection.where("username", "==", username).get()
  ).docs[0] // [0] is for finding the first and logically only instance of the user documentation with the same username
    ?.data();

  console.log(doc);

  return doc as any;
};
