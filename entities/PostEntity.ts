export interface PostEntity {
  id?: string;

  creatorId: string;
  universityId: string;

  title: string;
  description: string;
  likerIds: string[];
  commentIds?: string[];

  createdOn: Date;
  updatedOn: Date;
}
