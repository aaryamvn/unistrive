import { PostEntity } from "../../entities/PostEntity";
import { postsCollection } from "../collections";
import { editHighschoolerProfile } from "../highschoolerProfiles/editHighschoolerProfile";
import { findHighschoolerProfileById } from "../highschoolerProfiles/findHighschoolerProfileById";

import { findUserById } from "../users/findUserById";

export const createPost = async (data: PostEntity): Promise<string> => {
  const creator = await findUserById(data.creatorId);

  if (creator.accountType === "highschooler") {
    // create the post
    const doc = await postsCollection.add(data);
    postsCollection.doc(doc.id).update({ id: doc.id });

    // push it to the users post array
    const profileId = creator.highschoolerProfileId;
    const highSchoolerProfile = await findHighschoolerProfileById(profileId);

    const postsByHighschooler = highSchoolerProfile?.createdPostIds || [];
    postsByHighschooler.push(doc.id);

    editHighschoolerProfile({ createdPostIds: postsByHighschooler }, profileId);

    // return the new post
    console.log(doc);
    return doc.id;
  }
};
