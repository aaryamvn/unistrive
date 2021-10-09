export interface PostEntity {
  id?: string;

  creatorId: string;
  universityName: string;

  title: string;
  description: string;
  upvoterIds: string[];
  commentIds?: string[];

  createdOn: string;
  updatedOn: string;
}
