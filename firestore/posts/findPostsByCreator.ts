import { PostEntity } from "../../entities/PostEntity";
import { postsCollection } from "../collections";

export const findPostsByCreator = async (
  creatorId: string,
): Promise<PostEntity[]> => {
  const docs = await postsCollection.where("creatorId", "==", creatorId).get();
  return docs as any;
};
