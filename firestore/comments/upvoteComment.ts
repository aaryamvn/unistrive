import { commentsCollection } from "../collections";
import { updateUnicoins } from "../consultantProfiles/updateUnicoinsById";
import { findConsultantProfileByUserId } from "../consultantProfiles/findConsultantProfileByUserId";
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
    await commentsCollection.doc(commentId).update({ upvoterIds });
    updateUnicoins(comment.creatorId);
  }
};
