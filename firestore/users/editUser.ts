import { UserEntity } from "../../entities/UserEntity";
import { usersCollection } from "../collections";

export const editUser = async (data: UserEntity, id: string) => {
  const doc = usersCollection.doc(id).update(data);
  console.log(doc);
  return doc;
};
