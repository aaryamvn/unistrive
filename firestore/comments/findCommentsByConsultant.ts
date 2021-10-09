import { CommentEntity } from "../../entities/CommentEntity";
import { commentsCollection } from "../collections";

export const findCommentsByCreator = async (
  creatorId: string,
): Promise<CommentEntity[]> => {
  const docs = await commentsCollection
    .where("creatorId", "==", creatorId)
    .get();
  let comments = [];
  docs.docs.map((doc) => {
    comments.push(doc.data());
  });
  return comments as any;
};
