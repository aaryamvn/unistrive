import { CommentEntity } from "../../entities/CommentEntity";
import { commentsCollection } from "../collections";
import { editConsultantProfile } from "../consultantProfiles/editConsultantProfile";
import { findConsultantProfileById } from "../consultantProfiles/findConsultantProfileById";

export const createComment = async (data: CommentEntity) => {
  const doc = await commentsCollection.add(data);
  commentsCollection.doc(doc.id).update({ id: doc.id });
  return doc;
};
