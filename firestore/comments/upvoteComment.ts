import { commentsCollection } from "../collections";
import { findHighschoolerProfileByUserId } from "../highschoolerProfiles/findHighschoolerProfileByUserId";
import { findCommentById } from "./findCommentById";

export const upvoteComment = async (
  userId: string,
  commentId: string,
): Promise<string> => {
  const comment = await findCommentById(commentId);

  if (!comment.upvoterIds) comment.upvoterIds = [];

  if (userId in comment.upvoterIds) {
    return "Already Upvoted";
  } else {
    let upvoterIds = comment.upvoterIds;
    upvoterIds.push(userId);
    commentsCollection.doc(commentId).update({ upvoterIds });
  }
};
