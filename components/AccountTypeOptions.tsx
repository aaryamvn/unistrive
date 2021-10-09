import React from "react";

export const AccountTypeOptions = ({ accountType, setAccountType }) => {
  return (
    <div className="flex items-center gap-2 mt-2">
      <AccountTypeOption
        illustrationUrl="/highschooler_illustration.png"
        title="High Schooler"
        description="A High-Schoolers Purpose on this platform is to seek mentorship from the students of their dream universities."
        code="highschooler"
        accountType={accountType}
        setAccountType={setAccountType}
      />
      <AccountTypeOption
        illustrationUrl="/consultant_illustration.png"
        title="Consultant"
        description="A Consultants purpose on this platform is to mentor high-schoolers on how to get into the university they go to."
        code="consultant"
        accountType={accountType}
        setAccountType={setAccountType}
      />
    </div>
  );
};

const AccountTypeOption = ({
  illustrationUrl,
  title,
  description,
  code,
  accountType,
  setAccountType,
}) => {
  return (
    <div
      className={`p-5 rounded-lg ${
        accountType === code ? "bg-accent1" : "bg-bgVariant1"
      } flex flex-col items-center text-center gap-6 w-1/2 h-[20rem] select-none hover:opacity-[0.7] cursor-pointer`}
      onClick={() => setAccountType(code)}
    >
      <img
        src={
          accountType === code ? "/checkmark_illustration.svg" : illustrationUrl
        }
        alt=""
        className=""
      />

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted1">{description}</p>
      </div>
    </div>
  );
};
