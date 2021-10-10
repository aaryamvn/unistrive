import React from "react";
import { PostEntity } from "../../entities/PostEntity";
import { findUniversityByName } from "../../firestore/universities/findUniversityByName";
import { findUserById } from "../../firestore/users/findUserById";
import { Post } from "../Post";

export const MainSection = ({ posts }: { posts: PostEntity[] }) => {
  return (
    <div className="w-[40rem]">
      {posts.map(async (post) => {
        const postCreator = await findUserById(post?.creatorId);
        const postUniversity = await findUniversityByName(post?.universityName);

        return (
          <Post
            id={post?.id}
            title={post?.title}
            content={post?.content}
            creator={postCreator}
            universityName={post?.universityName}
            universityLogoUrl={postUniversity?.logoUrl}
            upvotesAmt={post?.upvoterIds?.length}
          />
        );
      })}
    </div>
  );
};
