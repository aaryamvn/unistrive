import { postsCollection } from "../collections";
import { updateUnicoins } from "../consultantProfiles/updateUnicoinsById";

import { findPostById } from "./findPostById";

export const upvotePost = async (
  userId: string,
  postId: string,
): Promise<string> => {
  const post = await findPostById(postId);
  if (post.upvoterIds.includes(postId)) {
    return "Already Upvoted";
  } else {
    let upvoterIds = post.upvoterIds;
    upvoterIds.push(userId);
    await postsCollection.doc(postId).update({ upvoterIds });
  }
};
