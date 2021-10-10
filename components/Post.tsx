import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { UserEntity } from "../entities/UserEntity";
import Link from "next/link";
import { upvotePost } from "../firestore/posts/upvotePost";
import { findUserById } from "../firestore/users/findUserById";
import { findUniversityByName } from "../firestore/universities/findUniversityByName";
import { UniversityEntity } from "../entities/UniversityEntity";

interface PostProps {
  id: string;
  title: string;
  content: string;
  creatorId: string;
  universityName: string;
  upvotesAmt?: number;
  commentsAmt?: number;
  showCommentsButton?: boolean;
}

export const Post: React.FC<PostProps> = ({
  commentsAmt,
  content,
  creatorId,
  universityName,
  title,
  id,
  showCommentsButton = true,
  upvotesAmt,
}) => {
  const { user } = useAuthContext();

  let creator: UserEntity;
  let university: UniversityEntity;

  useEffect(() => {
    (async () => {
      creator = await findUserById(creatorId);
      university = await findUniversityByName(universityName);
    })();
  }, []);

  return (
    <div className="w-full rounded-md p-4 bg-bgVariant1 flex items-center gap-4">
      {/* Upvotes */}
      <div className="flex flex-col items-center gap-2">
        <img
          src="/icons/upvote.svg"
          alt=""
          className="h-2 w-2 text-white fill-current cursor-pointer select-none"
          draggable="false"
          onClick={() => upvotePost(user?.id, id)}
        />
        <h3 className="text-sm font-semibold">{upvotesAmt}</h3>
      </div>

      <div className="flex flex-col gap-1">
        {/* Header */}
        <div className="flex items-center gap-3">
          {/* university */}
          <Link href={`/university/${university?.name}`}>
            <a>
              <div className="flex items-center">
                <img
                  src={university?.logoUrl}
                  alt=""
                  className="h-5 w-5 object-cover rounded-sm mr-1"
                />
                <span className="font-semibold">{university?.name}</span>
              </div>
            </a>
          </Link>

          {/* user */}
          <span>
            Posted by{" "}
            <Link href={`/user/${creator?.username}`}>
              <a>
                <span className="font-semibold">{creator?.username}</span>
              </a>
            </Link>
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
