export interface CommentEntity {
  id?: string;

  creatorId: string; // the id of the consultant that created this comment
  postId: string;

  content: string;
  upvoterIds?: string[];

  createdOn: string;
}
