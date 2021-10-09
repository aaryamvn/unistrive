import { firestore } from "../services/firebase";

export const commentsCollection = firestore().collection("comments");

export const postsCollection = firestore().collection("posts");

export const universitiesCollection = firestore().collection("universities");

export const usersCollection = firestore().collection("users");

export const highschoolerProfilesCollection = firestore().collection(
  "highschoolerProfiles",
);

export const consultantProfilesCollection =
  firestore().collection("consultantProfiles");
