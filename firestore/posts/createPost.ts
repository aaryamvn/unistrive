import { PostEntity } from "../../entities/PostEntity";
import { postsCollection } from "../collections";
import { editHighschoolerProfile } from "../highschoolerProfiles/editHighschoolerProfile";
import { findHighschoolerProfileById } from "../highschoolerProfiles/findHighschoolerProfileById";

export const createPost = async (data: PostEntity): Promise<string> => {
  const doc = await postsCollection.add(data);
  postsCollection.doc(doc.id).update({ id: doc.id });

  const highSchoolStudent = await findHighschoolerProfileById(data.creatorId);
  let postsByStudent = highSchoolStudent.createdPostIds;
  postsByStudent.push(doc.id);

  editHighschoolerProfile({ createdPostIds: postsByStudent }, data.creatorId);
  console.log(doc);
  return doc.id;
};
