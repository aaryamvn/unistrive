export interface PostEntity {
  id?: string;

  creatorId: string;
  universityName: string;

  title: string;
  content: string;
  upvoterIds: string[];
  commentIds?: string[];
  answeredCommentId?: string;

  createdOn: string;
  updatedOn: string;
}
