import { postsCollection } from "../collections";
import { findPostById } from "./findPostById";

export const markPostAnswered = async (
  postId: string,
  commentId: string,
): Promise<string> => {
  const post = await findPostById(postId);

  if (post.answeredCommentId == commentId) {
    return "Already marked as answered";
  } else {
    await postsCollection.doc(postId).update({ answeredCommentId: commentId });
  }
};
