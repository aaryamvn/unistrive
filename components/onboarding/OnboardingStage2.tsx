import React from "react";
import { AccountTypeOptions } from "../AccountTypeOptions";
import { Button } from "../Button";

export const OnboardingStage2 = ({
  setActiveStage,
  accountType,
  setAccountType,
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h3 className="uppercase font-semibold text-muted1 text-sm">
          What Are You On Unistrive For?
        </h3>
        <AccountTypeOptions
          accountType={accountType}
          setAccountType={setAccountType}
        />
      </div>
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
