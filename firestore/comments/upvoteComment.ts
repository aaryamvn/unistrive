import { commentsCollection } from "../collections";
import { findCommentById } from "./findCommentById";

export const upvoteComment = async (
  userId: string,
  commentId: string,
): Promise<string> => {
  const comment = await findCommentById(commentId);
  if (userId in comment.upvoterIds) {
    return "Already Upvoted";
  } else {
    let upvoterIds = comment.upvoterIds;
    upvoterIds.push(userId);
    commentsCollection.doc(commentId).update({ upvoterIds });
  }
};
