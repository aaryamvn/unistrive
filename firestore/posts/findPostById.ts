import { PostEntity } from "../../entities/PostEntity";
import { postsCollection } from "../collections";

export const findPostById = async (id: string): Promise<PostEntity> => {
  const doc = (await postsCollection.doc(id).get()).data();
  return doc as any;
};
