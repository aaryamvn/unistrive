export interface HighschoolerProfileEntity {
  id?: string;
  userId: string; // id of the user this profile belongs too

  schoolName: string; // the name of the high school they study at
  createdPostIds?: string[]; // the posts they have created in a university
}
