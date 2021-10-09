import { UserEntity } from "../../entities/UserEntity";
import { usersCollection } from "../collections";

export const createUser = async (data: UserEntity) => {
  const doc = await usersCollection.add(data);
  usersCollection.doc(doc.id).set({ id: doc.id });

  return doc;
};
