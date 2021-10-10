import React, { useEffect, useState } from "react";
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
  refreshCb?: () => void;
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
  refreshCb,
}) => {
  const { user } = useAuthContext();

  const [creator, setCreator] = useState<UserEntity>(null);
  const [university, setUniversity] = useState<UniversityEntity>(null);

  useEffect(() => {
    (async () => {
      setCreator(await findUserById(creatorId));
      setUniversity(await findUniversityByName(universityName));
    })();
  }, [creatorId, universityName]);

  console.log("creator", creator);
  console.log("university", university);

  return (
    <div className="w-full rounded-md p-4 bg-bgVariant1 flex items-center gap-4">
      {/* Upvotes */}
      <div className="flex flex-col items-center gap-2">
        <img
          src="/icons/upvote.svg"
          alt=""
          className="h-2 w-2 text-white fill-current cursor-pointer select-none"
          draggable="false"
          onClick={async () => {
            await upvotePost(user?.id, id);
            refreshCb();
          }}
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
        <Link href={`/post/${id}`} passHref>
          <h1 className="text-lg font-bold trunctate cursor-pointer">
            {title}
          </h1>
        </Link>

        {/* Content */}
        <p className="text-muted1 text-md font-regular">{content}</p>

        {/* Comments Button */}
        <Link href={`/post/${id}`}>
          <div className="flex items-center gap-2 cursor-pointer p-2 rounded-sm hover:opacity-[0.7] font-regular text-sm">
            <img
              src="/icons/replies.svg"
              alt=""
              className="h-[0.9rem] w-[0.9rem] select-none"
              draggable="false"
            />

            {`View ${commentsAmt || 0} replies`}
          </div>
        </Link>
      </div>
    </div>
  );
};
