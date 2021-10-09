// This finds all posts for the user
import { findPostsByUniversity } from "./findPostsByUniversity";
import { findUserById } from "../users/findUserById";
import { PostEntity } from "../../entities/PostEntity";

export const findPosts = async (userId: string) => {
  const user = await findUserById(userId);
  const posts: PostEntity[] = [];
  user.followingUniIds.map(async (uniId: string) => {
    const uniPosts = await findPostsByUniversity(uniId);
    uniPosts.map((post: PostEntity) => {
      posts.push(post);
    });
  });
  return posts;
};
