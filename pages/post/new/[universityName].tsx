import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { TextBox } from "../../../components/TextBox";
import { useAuthContext } from "../../../contexts/AuthContext";
import { createPost } from "../../../firestore/posts/createPost";

const NewUniversity = ({ universityName }: { universityName: string }) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { user, login } = useAuthContext();

  if (!user || user.accountType === "consultant") {
    return (
      <div className="relative h-screen w-screen container mx-auto flex items-center justify-center">
        <div className="md:w-[30rem] xl:w-[40rem] flex flex-col gap-[1rem]">
          <h1
            className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Sign in from a high school student profile to create new posts
          </h1>

          <Button bg="bg-accent1" width="w-[13rem]" onClick={login}>
            <img
              src="/icons/google.svg"
              className="h-5 w-5 object-contain"
              alt=""
            />
            <h3>Login With Google</h3>
          </Button>
        </div>

        <img
          src="/call_hand_vector.png"
          className="absolute bottom-0 right-5"
          alt=""
        />
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center w-full mt-20 overflow-hidden">
        <div className="mx-auto text-left md:w-[60%] xl:w-[32rem]">
          <h1
            className="md:text-[2.5rem] xl:text-[2.8rem] font-bold"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Create a post
          </h1>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const postId = await createPost({
                creatorId: user.id,
                universityName: universityName,
                title,
                content,
                upvoterIds: [user.id],
                commentIds: [],
                createdOn: Date(),
                updatedOn: Date(),
              });
              return router.push(`/posts/${postId}`)
            }}
            className="w-full mt-6 flex flex-col gap-6"
          >
            <TextBox
              title="Post Title"
              placeholder="Enter your title"
              value={title}
              setValue={setTitle}
            />
            <div className={`flex flex-col gap-1`}>
              <h3 className="uppercase font-semibold text-muted1 text-sm">
                Content
              </h3>
              <textarea
                placeholder="Enter your content"
                className="h-60 bg-bgVariant1 text-bgVariantInverted1 rounded-md outline-none border-none p-5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <Button bg="bg-accent1" width="w-full" type="submit">
              <h3 className="mx-auto text-lg">Create Post</h3>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { universityName } = context.query;
  return { props: { universityName } };
}

export default NewUniversity;
