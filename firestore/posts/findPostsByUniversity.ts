import { PostEntity } from "../../entities/PostEntity";
import { postsCollection } from "../collections";

export const findPostsByUniversity = async (
  universityName: string,
): Promise<PostEntity[]> => {
  const docs = await postsCollection
    .where("universityName", "==", universityName)
    .get();
  return docs as any;
};
