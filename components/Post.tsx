import React from "react";
import { UserEntity } from "../entities/UserEntity";

interface PostProps {
  title: string;
  content: string;
  creator: UserEntity;
  universityName: string;
  upvotesAmt?: number;
  commentsAmt?: number;
  showCommentsButton?: boolean;
  createdAt: Date;
}

export const Post: React.FC<PostProps> = ({
  commentsAmt,
  content,
  creator,
  universityName,
  createdAt,
  title,
  showCommentsButton = true,
  upvotesAmt,
}) => {
  return (
    <div className="w-full bg-bgVariant1 flex gap-2">
      {/* Upvotes */}
      <div></div>

      <div>
        {/* Header */}
        {/* Title */}
        {/* Content */}
        {/* Comments Button */}
      </div>
    </div>
  );
};
