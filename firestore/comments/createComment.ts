import { CommentEntity } from "../../entities/CommentEntity";
import { commentsCollection } from "../collections";

export const createComment = async (data: CommentEntity) => {
  const doc = await commentsCollection.add(data);
  commentsCollection.doc(doc.id).update({ id: doc.id });

  console.log(doc);
  return doc;
};
