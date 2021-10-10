import { CommentEntity } from "../../entities/CommentEntity";
import { commentsCollection } from "../collections";
import { editConsultantProfile } from "../consultantProfiles/editConsultantProfile";
import { findConsultantProfileById } from "../consultantProfiles/findConsultantProfileById";

export const createComment = async (data: CommentEntity) => {
  const doc = await commentsCollection.add(data);
  commentsCollection.doc(doc.id).update({ id: doc.id });

  const consultant = await findConsultantProfileById(data.creatorId);
  let commentsByConsultant = consultant.createdCommentIds;
  commentsByConsultant.push(doc.id);

  editConsultantProfile(
    { createdCommentIds: commentsByConsultant },
    data.creatorId,
  );

  console.log(doc);
  return doc;
};
