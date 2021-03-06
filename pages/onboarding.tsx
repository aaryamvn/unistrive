import { useAuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { createHighschoolerProfile } from "../firestore/highschoolerProfiles/createHighschoolerProfile";
import { createConsultantProfile } from "../firestore/consultantProfiles/createConsultantProfile";
import { editUser } from "../firestore/users/editUser";
import { UserEntity } from "../entities/UserEntity";
import { OnboardingStage1 } from "../components/onboarding/OnboardingStage1";
import { OnboardingStage2 } from "../components/onboarding/OnboardingStage2";
import { OnboardingStage3 } from "../components/onboarding/OnboardingStage3";
import { addStudentToUniversity } from "../firestore/universities/addStudentToUniversity";

export const Onboarding = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  console.log("user", user);

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
    let highschoolerProfile;
    let consultantProfile;

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
      highschoolerProfile = await createHighschoolerProfile({
        userId: user?.id,
        schoolName,
      });

      console.log(highschoolerProfile);
      updatedUser.highschoolerProfileId = highschoolerProfile.id;
    }

    if (accountType === "consultant") {
      consultantProfile = await createConsultantProfile({
        userId: user?.id,
        courseName,
        universityName: uniName,
      });

      await addStudentToUniversity(user?.id, uniName);

      console.log(consultantProfile);
      updatedUser.consultantProfileId = consultantProfile.id;
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

export default Onboarding;
