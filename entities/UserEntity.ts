export interface UserEntity {
  id?: string;

  displayName: string;
  username: string;
  avatarUrl?: string;
  email?: string;
  bio?: string;
  linkedInProfile?: string;

  yearOfGraduation?: number; // the year they graduate either high-school or uni
  currentYear?: number; // the current year of their enrollment

  followerUserIds?: string[]; // users this user is followed by
  followingUserIds?: string[]; // users this user follows

  followingUniIds?: string[]; // universities this user follows

  postLikedIds?: string[]; // posts from highschoolers that this user has liked
  commentLikedIds?: string[]; // comments from consultants that this user has liked
  commentMarkedAsCorrectIds?: string[]; // comments from consultants that this user has marked as correct

  accountType: "highschooler" | "consultant";
  consultantProfileId?: string; // only applicable if accountType is "consultant"
  highschoolerProfileId?: string; // only applicable if accountType is "highschooler"
}
