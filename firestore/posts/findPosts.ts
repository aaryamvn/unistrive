// This finds all posts for the user
import { findPostsByUniversity } from "./findPostsByUniversity";
import { findUserById } from "../users/findUserById";
import { PostEntity } from "../../entities/PostEntity";

export const findPosts = async (userId: string): Promise<PostEntity[]> => {
  const user = await findUserById(userId);
  const posts: PostEntity[] = [];
  user.followingUniNames.map(async (uniName: string) => {
    const uniPosts = await findPostsByUniversity(uniName);
    uniPosts.map((post: PostEntity) => {
      posts.push(post);
    });
  });
  return posts as any;
};
