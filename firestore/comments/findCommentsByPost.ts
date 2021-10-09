import { CommentEntity } from "../../entities/CommentEntity";
import { commentsCollection } from "../collections";

export const findCommentsByPost = async (
  postId: string,
): Promise<CommentEntity[]> => {
  const docs = await commentsCollection.where("postId", "==", postId).get();
  let comments = []
  docs.docs.map((doc) => {
    comments.push(doc.data());
  });
  return comments as any;
};
