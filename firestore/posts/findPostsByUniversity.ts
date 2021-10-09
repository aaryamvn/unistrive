import { PostEntity } from "../../entities/PostEntity";
import { postsCollection } from "../collections";

export const findPostsByUniversity = async (
  universityName: string,
): Promise<PostEntity[]> => {
  const docs = (
    await postsCollection.where("universityName", "==", universityName).get()
  ).docs;
  let posts = [];
  docs.map((doc) => {
    posts.push(doc.data());
  });
  return posts as any;
};
