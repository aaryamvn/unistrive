import { findPostsByUniversity } from "./findPostsByUniversity";
import { findUserById } from "../users/findUserById";
import { PostEntity } from "../../entities/PostEntity";

export const findPosts = async (userId: string): Promise<PostEntity[]> => {
  const user = await findUserById(userId);

  // This retrieves all posts from all universities the user is following
  let unresolvedPosts: Promise<PostEntity[]>[] = user?.followingUniNames?.map(
    async (uniName: string) => {
      const uniPosts = await findPostsByUniversity(uniName);
      return uniPosts;
    },
  );

  // wait for all the posts to get pushed
  let posts = (await Promise.all(unresolvedPosts)).flat();

  return posts;
};
