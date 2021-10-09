import { CommentEntity } from "../../entities/CommentEntity";
import { commentsCollection } from "../collections";

export const findCommentById = async (id: string): Promise<CommentEntity> => {
  const doc = (await commentsCollection.doc(id).get()).data();
  return doc as any;
};
