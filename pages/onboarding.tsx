import { useAuthContext } from "../contexts/AuthContext";
import { TextBox } from "../components/TextBox";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { AccountTypeOptions } from "../components/AccountTypeOptions";
import { createConsultantProfile } from "../firestore/consultantProfiles/createConsultantProfile";
import { createHighschoolerProfile } from "../firestore/highschoolerProfiles/createHighschoolerProfile";
import { editUser } from "../firestore/users/editUser";
import { UserEntity } from "../entities/UserEntity";
import { useRouter } from "next/router";

export const Onboarding = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  // stage
  const [activeStage, setActiveStage] = useState<number>(1);

  // form data - generic account
  const [displayName, setDisplayName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [linkedInProfile, setLinkedInProfile] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [accountType, setAccountType] = useState<"highschooler" | "consultant">(
    null,
  );
  const [yearOfGraduation, setYearOfGraduation] = useState<number>();
  const [currentYear, setCurrentYear] = useState<number>();

  // form data - highschooler account
  const [schoolName, setSchoolName] = useState<string>(""); // Name of the school a highschooler is studying at
  const [appliedToUniNames, setAppliedToUniNames] = useState<string[]>([
    "test1",
    "test2",
  ]); // All the universities on the platform that this highschooler has applied to

  // form data - consultant account
  const [uniName, setUniName] = useState<string>(""); // The ID of the university a consultant is studying at
  const [courseName, setCourseName] = useState<string>(""); // The name of the course a consultant is majoring in at their university

  // fill in form data with defaults beforehand
  useEffect(() => {
    setDisplayName(user?.displayName);
    setUsername(user?.username);
  }, [user]);

  // submit handler
  async function handleSubmit() {
    let highschoolerProfileId;
    let consultantProfileId;

    const updatedUser: UserEntity = {
      displayName,
      username,
      bio,
      currentYear,
      yearOfGraduation,
      accountType,
      linkedInProfile,
    };

    if (accountType === "highschooler") {
      highschoolerProfileId = await createHighschoolerProfile({
        userId: user?.id,
        appliedToUniNames: appliedToUniNames,
        schoolName: schoolName,
      }).then((doc) => {
        return doc.id;
      });

      updatedUser.highschoolerProfileId = highschoolerProfileId;
    }

    if (accountType === "consultant") {
      consultantProfileId = await createConsultantProfile({
        userId: user?.id,
        courseName,
        universityName: uniName,
      }).then((doc) => {
        return doc.id;
      });

      updatedUser.consultantProfileId = consultantProfileId;
    }

    editUser(updatedUser, user?.id);
    router.push("/");
  }

  return (
    <div className="flex items-center h-screen w-screen overflow-hidden">
      <div className="mx-auto text-left md:w-[60%] xl:w-[32rem]">
        <h1
          className="md:text-[2.5rem] xl:text-[2.8rem] font-bold"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Welcome to Unistrive!
        </h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full mt-6 flex flex-col gap-6"
        >
          {activeStage === 1 && (
            <OnboardingStage1
              setActiveStage={setActiveStage}
              displayName={displayName}
              setDisplayName={setDisplayName}
              username={username}
              setUsername={setUsername}
              linkedInProfile={linkedInProfile}
              setLinkedInProfile={setLinkedInProfile}
              bio={bio}
              setBio={setBio}
            />
          )}

          {activeStage === 2 && (
            <OnboardingStage2
              setActiveStage={setActiveStage}
              accountType={accountType}
              setAccountType={setAccountType}
            />
          )}

          {activeStage === 3 && (
            <>
              <OnboardingStage3
                accountType={accountType}
                yearOfGraduation={yearOfGraduation}
                setYearOfGraduation={setYearOfGraduation}
                currentYear={currentYear}
                setCurrentYear={setCurrentYear}
                schoolName={schoolName}
                setSchoolName={setSchoolName}
                appliedToUniNames={appliedToUniNames}
                setAppliedToUniNames={setAppliedToUniNames}
                uniName={uniName}
                setUniName={setUniName}
                courseName={courseName}
                setCourseName={setCourseName}
              />

              <Button bg="bg-accent1" width="w-full" onClick={handleSubmit}>
                <h3 className="mx-auto text-lg">Submit</h3>
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

const OnboardingStage1 = ({
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

const OnboardingStage2 = ({ setActiveStage, accountType, setAccountType }) => {
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

const OnboardingStage3 = ({
  accountType,
  yearOfGraduation,
  setYearOfGraduation,
  currentYear,
  setCurrentYear,
  schoolName,
  setSchoolName,
  appliedToUniNames,
  setAppliedToUniNames,
  uniName,
  setUniName,
  courseName,
  setCourseName,
}) => {
  return (
    <>
      <TextBox
        title="Year Of Graduation"
        placeholder="2022"
        type="number"
        value={yearOfGraduation}
        setValue={setYearOfGraduation}
      />

      <TextBox
        title="Current Year"
        placeholder="1 (Freshman)"
        type="number"
        value={currentYear}
        setValue={setCurrentYear}
      />

      {accountType === "highschooler" && (
        <>
          <TextBox
            title="School"
            placeholder="St. Phillips High School"
            value={schoolName}
            setValue={setSchoolName}
          />

          {/* TASK: Make it a multi-select searchable textbox */}
          <TextBox
            title="Applied to Universities"
            placeholder="Harvard, MIT, Wharton"
            value={appliedToUniNames}
            setValue={setAppliedToUniNames}
          />
        </>
      )}

      {accountType === "consultant" && (
        // TASK: Make it a searchable textbox
        <>
          <TextBox
            title="University"
            placeholder="Harvard School Of Business"
            value={uniName}
            setValue={setUniName}
          />

          <TextBox
            title="Course"
            placeholder="Computer Science"
            value={courseName}
            setValue={setCourseName}
          />
        </>
      )}
    </>
  );
};

export default Onboarding;
