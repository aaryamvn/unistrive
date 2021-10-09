import { UserEntity } from "../../entities/UserEntity";
import { usersCollection } from "../collections";

export const findUserById = async (id: string): Promise<UserEntity> => {
  const doc = (await usersCollection.doc(id).get()).data();
  return doc as any;
};
