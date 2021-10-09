import { useState } from "react";
import { Button } from "../../../components/Button";
import { TextBox } from "../../../components/TextBox";

const NewUniversity = () => {
  const [displayName, setDisplayName] = useState<string>("");
  return (
    <>
      <TextBox
        title="University Name"
        placeholder="Harvard"
        value={displayName}
        setValue={setDisplayName}
      />
      <Button bg="bg-accent1" width="w-full">
        <h3 className="mx-auto text-lg">Next</h3>
      </Button>
    </>
  );
};

export default NewUniversity
