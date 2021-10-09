export interface CommentEntity {
  id?: string;

  creatorId: string; // the id of the consultant that created this comment
  postId: number;

  content: string;
  upvoterIds?: string[];

  createdOn: Date;
  updatedOn: Date;
}
