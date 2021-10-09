import { PostEntity } from "../../entities/PostEntity";
import { postsCollection } from "../collections";

export const findPostsByUniversity = async (
  universityId: string,
): Promise<PostEntity[]> => {
  const docs = await postsCollection
    .where("universityId", "==", universityId)
    .get();
  return docs as any;
};
