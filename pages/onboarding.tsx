import { useAuthContext } from "../contexts/AuthContext";
import { TextBox } from "../components/TextBox";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";

export const Onboarding = () => {
  const { user } = useAuthContext();

  console.log(user);

  // stage
  const [activeStage, setActiveStage] = useState<number>(1);

  // form data - generic account
  const [displayName, setDisplayName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [linkedInProfile, setLinkedInProfile] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  // fill in form data with defaults beforehand
  useEffect(() => {
    setDisplayName(user?.displayName);
    setUsername(user?.username);
  }, [user]);

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

export default Onboarding;
