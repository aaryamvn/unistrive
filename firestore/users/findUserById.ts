import { UserEntity } from "../../entities/UserEntity";
import { usersCollection } from "../collections";

export const findUserById = async (id: string): Promise<UserEntity> => {
  // .data() parses the data from the response(it doesn't need to be awaited)
  const doc = (await usersCollection.doc(id).get()).data();
  return doc as any;
};
