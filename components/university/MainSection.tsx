import React from "react";
import { PostEntity } from "../../entities/PostEntity";
import { Post } from "../Post";

export const MainSection = ({ posts }: { posts: PostEntity[] }) => {
  return (
    <div className="w-[40rem] flex flex-col gap-2">
      {posts.map((post) => {
        return (
          <Post
            id={post?.id}
            title={post?.title}
            content={post?.content}
            creatorId={post.creatorId}
            universityName={post?.universityName}
            upvotesAmt={post?.upvoterIds?.length}
          />
        );
      })}
    </div>
  );
};
