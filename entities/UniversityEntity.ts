export interface UniversityEntity {
  id?: string;

  name: string;
  logoUrl: string;
  bannerUrl?: string;
  email: string;
  linkedInProfile?: string;
  bio?: string;

  creatorId: string; // the person that created this uni

  followerIds: string[]; // everyone following this uni
  studentIds: string[]; // the students belonging to this uni

  postIds: string[]; // all the posts inside this university
}
