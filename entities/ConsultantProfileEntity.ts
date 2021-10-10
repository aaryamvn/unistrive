export interface ConsultantProfileEntity {
  id?: string;
  userId: string; // id of the user this profile belongs too
  documentId?: string;
  universityName: string; // the name of the university they are a student of (actually matched in db)
  courseName: string; // the name of the course they are majoring in at their university (hardcoded string)
  createdCommentIds?: string[]; // the comments they have written on the postings of highschoolers
  unicoins?: number; // the amount of unicoins this consultant has
}
