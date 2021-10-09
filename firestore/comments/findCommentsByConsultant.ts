import { CommentEntity } from "../../entities/CommentEntity";
import { commentsCollection } from "../collections";

export const findCommentsByCreator = async (
  creatorId: string,
): Promise<CommentEntity[]> => {
  const docs = await commentsCollection
    .where("creatorId", "==", creatorId)
    .get();
  return docs as any;
};
