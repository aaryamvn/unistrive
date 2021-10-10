import { useState } from "react";
import { Button } from "../../../components/Button";
import { TextBox } from "../../../components/TextBox";
import { useAuthContext } from "../../../contexts/AuthContext";
import { createUniversity } from "../../../firestore/universities/createUniversity";

const NewUniversity = () => {
  const [name, setName] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [linkedInProfile, setLinkedInProfile] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const { user, login } = useAuthContext();

  if (!user) {
    return (
      <div className="relative h-screen w-screen container mx-auto flex items-center justify-center">
        <div className="md:w-[30rem] xl:w-[40rem] flex flex-col gap-[1rem]">
          <h1
            className="md:text-[2rem] xl:text-[2.5rem] font-extrabold"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Sign In to View this page
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
            Register your University!
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              createUniversity({
                name,
                bannerUrl,
                logoUrl,
                linkedInProfile,
                bio,
                creatorId: user.id,
                email: user.email,
                followerIds: [],
                studentIds: [],
                postIds: [],
              });
            }}
            className="w-full mt-6 flex flex-col gap-6"
          >
            <TextBox
              title="University Name"
              placeholder="Harvard"
              value={name}
              setValue={setName}
            />
            <TextBox
              title="Logo URL"
              placeholder="https://i.imgur.com/rgUshNg.png"
              value={logoUrl}
              setValue={setLogoUrl}
            />
            <TextBox
              title="Banner URL"
              placeholder="https://i.imgur.com/rgUshNg.png"
              value={bannerUrl}
              setValue={setBannerUrl}
            />
            <TextBox
              title="LinkedIn Account"
              placeholder="https://www.linkedin.com/school/harvard-university/"
              value={linkedInProfile}
              setValue={setLinkedInProfile}
            />
            <div className={`flex flex-col gap-1`}>
              <h3 className="uppercase font-semibold text-muted1 text-sm">
                Description
              </h3>
              <textarea
                placeholder="Enter A Description"
                className="h-60 bg-bgVariant1 text-bgVariantInverted1 rounded-md outline-none border-none p-5"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
              <Button bg="bg-accent1" width="w-full" type="submit">
                <h3 className="mx-auto text-lg">Create Univeristy</h3>
              </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUniversity;
