export interface ConsultantProfileEntity {
  id?: string;
  userId: string; // id of the user this profile belongs too

  universityName: string; // the id of the university they are a student of
  courseName: string; // the name of the course they are majoring in at their university
  createdCommentIds?: string[]; // the comments they have written on the postings of highschoolers
  unicoins?: number; // the amount of unicoins this consultant has
}
