import { PostEntity } from "../../entities/PostEntity";
import { postsCollection } from "../collections";

export const createPost = async (data: PostEntity) => {
  const doc = await postsCollection.add(data);
  postsCollection.doc(doc.id).set({id:doc.id})
  console.log(doc);

  return doc;
};
