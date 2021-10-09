import { UserEntity } from "../../entities/UserEntity";
import { usersCollection } from "../collections";

export const findUserByUsername = async (
  username: string,
): Promise<UserEntity> => {
  const doc = (
    await usersCollection.where("username", "==", username).get()
  )// [0] is for finding the first and logically only instance of the user documentation with the same username
  .docs[0]
    ?.data();

  console.log(doc);

  return doc as any;
};
