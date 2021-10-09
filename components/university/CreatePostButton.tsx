import { Button } from "../Button";

export const CreatePostButton = () => {
  return (
    <Button
      bg="bg-[#fff]"
      height="h-[2.5rem]"
      width="w-full"
      className="!rounded-full text-bg hover:opacity-[0.7] transition-all"
    >
      <div className="mx-auto flex items-center gap-2">
        <img src="/icons/plus.svg" alt="" className="h-[1.3rem] w-[1.3rem]" />
        Create Post
      </div>
    </Button>
  );
};
