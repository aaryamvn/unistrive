import { CommentEntity } from "../../entities/CommentEntity";
import { commentsCollection } from "../collections";

export const findCommentsByPost = async (
  postId: string,
): Promise<CommentEntity[]> => {
  const docs = await commentsCollection.where("postId", "==", postId).get();
  return docs as any;
};
