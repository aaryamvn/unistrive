import { findPostsByUniversity } from "./findPostsByUniversity";
import { findUserById } from "../users/findUserById";
import { PostEntity } from "../../entities/PostEntity";

export const findPosts = async (userId: string): Promise<PostEntity[]> => {
  const user = await findUserById(userId);
  const posts: PostEntity[] = [];

  // This retrieves all posts from all universities the user is following
  let unresolved = user?.followingUniNames?.map(async (uniName: string) => {
    const uniPosts = await findPostsByUniversity(uniName);

    uniPosts.forEach((post: PostEntity) => {
      posts.push(post);
      console.log(posts);
    });
  });

  // wait for all the posts to get pushed
  await Promise.all(unresolved);

  console.log(posts);
  return posts as any;
};
