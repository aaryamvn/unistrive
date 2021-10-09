import React from "react";
import { Button } from "../Button";
import { TextBox } from "../TextBox";

export const OnboardingStage1 = ({
  setActiveStage,
  displayName,
  setDisplayName,
  username,
  setUsername,
  linkedInProfile,
  setLinkedInProfile,
  bio,
  setBio,
}) => {
  return (
    <>
      <TextBox
        title="Display Name"
        placeholder="John Doe"
        value={displayName}
        setValue={setDisplayName}
      />
      <TextBox
        title="Username"
        placeholder="jdoe"
        value={username}
        setValue={setUsername}
      />
      <TextBox
        title="LinkedIn Profile"
        placeholder="https://linkedin.com/..."
        value={linkedInProfile}
        setValue={setLinkedInProfile}
      />
      <TextBox
        title="Biography"
        placeholder="Write something about yourself here"
        value={bio}
        setValue={setBio}
      />
      <Button
        bg="bg-accent1"
        width="w-full"
        onClick={() => setActiveStage((c) => c + 1)}
      >
        <h3 className="mx-auto text-lg">Next</h3>
      </Button>
    </>
  );
};
