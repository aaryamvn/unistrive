import { UniversityEntity } from "../../entities/UniversityEntity";
import { universitiesCollection } from "../collections";

export const findUniversityByName = async (
  uniName: string,
): Promise<UniversityEntity> => {
  const doc = (
    await universitiesCollection.where("name", "==", uniName).get()
  ).docs[0] // [0] is for finding the first and logically only instance of the user documentation with the same username
    ?.data();

  console.log(doc);

  return doc as any;
};
