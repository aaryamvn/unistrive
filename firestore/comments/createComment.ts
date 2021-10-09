import { CommentEntity } from "../../entities/CommentEntity";
import { commentsCollection } from "../collections";

export const createComment = async (data: CommentEntity) => {
  const doc = await commentsCollection.add(data);
  console.log(doc);

  return doc;
};
