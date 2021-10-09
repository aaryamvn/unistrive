import { NextPageContext } from "next";
import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import { CommentEntity } from "../../entities/CommentEntity";
import { PostEntity } from "../../entities/PostEntity";
import { UniversityEntity } from "../../entities/UniversityEntity";
import { UserEntity } from "../../entities/UserEntity";
import { createComment } from "../../firestore/comments/createComment";
import { findCommentsByPost } from "../../firestore/comments/findCommentsByPost";
import { findPostById } from "../../firestore/posts/findPostById";
import { findUniversityById } from "../../firestore/universities/findUniversitybyId";
import { findUniversityByName } from "../../firestore/universities/findUniversityByName";
import { findUserById } from "../../firestore/users/findUserById";

const PostPage = ({
  id,
  post,
  comments,
}: {
  id: string;
  post: PostEntity;
  comments: CommentEntity[];
}) => {
  console.log(id);
  console.log(post);
  console.log(comments);

  const [newComment, setNewComment] = useState<string>();

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
      <div className="flex w-960 mx-auto">
        <div className="w-2/3">
          <div className="py-2">
            <div className="flex border border-grey-light-alt hover:border-grey rounded bg-white cursor-pointer">
              <div className="w-1/12 flex flex-col text-center pt-2">
                <button className="text-xs">
                  <svg
                    className="w-5 fill-current text-grey"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 10v8h6v-8h5l-8-8-8 8h5z" />
                  </svg>
                </button>
                <span className="text-xs font-semibold my-1">
                  {post.upvoterIds.length}
                </span>
              </div>
              <div className="w-11/12 pt-2">
                <div className="flex items-center text-xs mb-2">
                  <a className="font-semibold no-underline hover:underline text-black flex items-center">
                    <img
                      className="rounded-full border h-5 w-5"
                      src="https://1000logos.net/wp-content/uploads/2017/02/Harvard-symbol.jpg"
                      alt=""
                    />
                    <span className="ml-2">{post.universityName}</span>
                  </a>
                  <span className="text-grey-light mx-1 text-xxs">•</span>
                  <span className="text-grey">Posted by</span>
                  <a className="text-grey mx-1 no-underline hover:underline">
                    Divy Srivastava
                  </a>
                  <span className="text-grey">{post.createdOn}</span>
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-1">{post.title}</h2>
                  <p className="text-sm font-regular mb-1">
                    {post.content}
                  </p>
                </div>
                <div className="inline-flex items-center my-1">
                  <div className="flex hover:bg-grey-lighter p-1">
                    <svg
                      className="w-4 fill-current text-grey"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z" />
                    </svg>
                    <span className="ml-2 text-xs font-semibold text-grey">
                      {comments.length} Comment{comments.length == 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="flex hover:bg-grey-lighter p-1 ml-2 rotate-90">
                    <svg
                      className="w-4 fill-current text-grey"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(user && user.accountType === "consultant") && (
            <form
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
              <textarea
                placeholder="Enter A Description"
                className="h-60 bg-bgVariant1 text-bgVariantInverted1 rounded-md outline-none border-none p-5"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="bg-accent1 w-16" type="submit">
                <h3 className="mx-auto text-lg">Create Comment</h3>
              </button>
            </form>
          )}
          {comments.map((comment, i) => {
            return <p key={i}>{comment.content}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const post = await findPostById(id as string);
  const comments = await findCommentsByPost(post.id);
  return { props: { id, post, comments } };
}

export default PostPage;
