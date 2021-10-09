export interface CommentEntity {
  id?: string;

  creatorId: string; // the id of the consultant that created this comment
  postId: number;

  content: string;
  likerIds?: string[];

  createdOn: Date;
  updatedOn: Date;
}
