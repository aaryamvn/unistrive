import { PostEntity } from "../../entities/PostEntity";
import { postsCollection } from "../collections";

export const createPost = async (data: PostEntity) => {
  const doc = await postsCollection.add(data);
  console.log(doc);

  return doc;
};
