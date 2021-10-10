import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Post } from "../../components/Post";
import { useAuthContext } from "../../contexts/AuthContext";
import { CommentEntity } from "../../entities/CommentEntity";
import { PostEntity } from "../../entities/PostEntity";
import { UserEntity } from "../../entities/UserEntity";
import { createComment } from "../../firestore/comments/createComment";
import { findCommentsByPost } from "../../firestore/comments/findCommentsByPost";
import { findPostById } from "../../firestore/posts/findPostById";
import { findUserById } from "../../firestore/users/findUserById";
import moment from "moment";
import { useRouter } from "next/router";
import { upvoteComment } from "../../firestore/comments/upvoteComment";
import { markPostAnswered } from "../../firestore/posts/markAnswer";

const PostPage = ({
  id,
  post,
  comments,
  creator,
}: {
  id: string;
  post: PostEntity;
  comments: (CommentEntity & { commentUser: UserEntity })[];
  creator: UserEntity;
}) => {
  console.log(id);
  console.log(post);
  console.log(comments);

  const router = useRouter();
  const [newComment, setNewComment] = useState<string>();
  const [updatingState, setUpdatingState] = useState<boolean>(false);
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <h1
        className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex w-960 mx-auto ml-8">
        <div className="w-2/3">
          <div className="py-4">
            <Post
              commentsAmt={post.commentIds.length}
              content={post.content}
              creatorId={post.creatorId}
              universityName={post.universityName}
              title={post.title}
              id={post.id}
              upvotesAmt={post.upvoterIds.length}
              refreshCb={() => refreshData()}
            />
          </div>
          {user && user.accountType === "consultant" && (
            <form
              className="mt-10"
              onSubmit={async (e) => {
                e.preventDefault();
                await createComment({
                  content: newComment,
                  creatorId: user.id,
                  postId: id,
                  createdOn: Date(),
                });
                refreshData();
              }}
            >
              <h3 className="mx-auto text-xl">Create Comment</h3>
              <textarea
                placeholder="Enter A Description"
                className="h-60 bg-bgVariant1 text-bgVariantInverted1 rounded-md outline-none border-none p-5 w-full"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="bg-accent1 w-40" type="submit">
                <h3 className="mx-auto text-lg">Create Comment</h3>
              </button>
            </form>
          )}
          <h3 className="mb-4 text-3xl mt-10 font-semibold text-gray-900">
            Comments
          </h3>

          {comments.map((comment, i) => {
            const commentUser = comment.commentUser;
            if (!commentUser) return <p></p>;
            return (
              <div className="flex items-center space-y-2 gap-3" key={i}>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/icons/upvote.svg"
                    alt=""
                    className="h-2 w-2 text-white fill-current cursor-pointer select-none"
                    draggable="false"
                    onClick={async () => {
                      await upvoteComment(user?.id, comment.id);
                      refreshData();
                    }}
                  />
                  <h3 className="text-sm font-semibold">
                    {comment.upvoterIds?.length || 0}
                  </h3>
                </div>
                <div className="flex py-2">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      className="mt-4 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                      src={commentUser.avatarUrl}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <strong>{commentUser.displayName}</strong>{" "}
                    <span className="text-xs text-gray-400">
                      {moment(comment.createdOn).fromNow()}
                    </span>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <svg
                    onClick={async () => {
                      await markPostAnswered(post.id, comment.id);
                      refreshData();
                    }}
                    className="text-white fill-current cursor-pointer select-none"
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                  >
                    <path
                      fill={
                        comment.id == post.answeredCommentId ? "green" : "white"
                      }
                      fill-rule="evenodd"
                      d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"
                    ></path>
                  </svg>
                  {comment.id == post.answeredCommentId && (
                    <h3 className="text-sm font-semibold">
                      Marked as answered!
                    </h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const post = await findPostById(id as string);
  let comments = await findCommentsByPost(post?.id);
  const creator = await findUserById(post?.creatorId);
  comments = await Promise.all(
    comments.map(async (c) => {
      return {
        ...c,
        commentUser: await findUserById(c.creatorId),
      };
    }),
  );

  return { props: { id, post, comments, creator } };
}

export default PostPage;
