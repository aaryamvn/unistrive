import React from "react";
import { UserEntity } from "../entities/UserEntity";

interface PostProps {
  title: string;
  content: string;
  creator: UserEntity;
  universityName: string;
  universityLogoUrl: string;
  upvotesAmt?: number;
  commentsAmt?: number;
  showCommentsButton?: boolean;
}

export const Post: React.FC<PostProps> = ({
  commentsAmt,
  content,
  creator,
  universityName,
  universityLogoUrl,
  title,
  showCommentsButton = true,
  upvotesAmt,
}) => {
  return (
    <div className="w-full rounded-md p-4 bg-bgVariant1 flex items-center gap-4">
      {/* Upvotes */}
      <div className="flex flex-col items-center gap-2">
        <img
          src="/icons/upvote.svg"
          alt=""
          className="h-2 w-2 text-white fill-current"
        />
        <h3 className="text-sm font-semibold">{upvotesAmt}</h3>
      </div>

      <div className="flex flex-col gap-1">
        {/* Header */}
        <div className="flex items-center gap-3">
          {/* university */}
          <div className="flex items-center">
            <img
              src={universityLogoUrl}
              alt=""
              className="h-5 w-5 object-cover rounded-sm mr-1"
            />
            <span className="font-semibold">{universityName}</span>
          </div>

          {/* user */}
          <span>
            Posted by <span className="font-semibold">{creator?.username}</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-lg font-bold trunctate">{title}</h1>

        {/* Content */}
        <p className="text-muted1 text-md font-regular">{content}</p>

        {/* Comments Button */}
      </div>
    </div>
  );
};
