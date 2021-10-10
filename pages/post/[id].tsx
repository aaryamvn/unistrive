import { NextPageContext } from "next";
import { useState } from "react";
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

const PostPage = ({
  id,
  post,
  comments,
  creator,
}: {
  id: string;
  post: PostEntity;
  comments: CommentEntity[];
  creator: UserEntity;
}) => {
  console.log(id);
  console.log(post);
  console.log(comments);

  const [newComment, setNewComment] = useState<string>();
  const [commentUser, setCommentUser] = useState<UserEntity>();

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
          <div className="py-2">
            <Post
              commentsAmt={post.commentIds.length}
              content={post.content}
              creatorId={post.creatorId}
              universityName={post.universityName}
              title={post.title}
              id={post.id}
              upvotesAmt={post.upvoterIds.length}
            />
          </div>
          {user && user.accountType === "consultant" && (
            <form
              className="mt-10"
              onSubmit={(e) => {
                e.preventDefault();
                createComment({
                  content: newComment,
                  creatorId: user.id,
                  postId: id,
                  createdOn: Date(),
                });
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
            const updateState = async () => {
              const commentUserFromDb = await findUserById(comment.creatorId);
              setCommentUser(commentUserFromDb);
            };
            updateState();

            return (
              <div className="space-y-4" key={i}>
                <div className="flex py-2">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                      src={commentUser?.avatarUrl}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <strong>{commentUser?.displayName}</strong>{" "}
                    <span className="text-xs text-gray-400">
                      {moment(comment.createdOn).fromNow()}
                    </span>
                    <p className="text-sm">{comment?.content}</p>
                  </div>
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
  const comments = await findCommentsByPost(post?.id);
  const creator = await findUserById(post?.creatorId);

  return { props: { id, post, comments, creator } };
}

export default PostPage;
