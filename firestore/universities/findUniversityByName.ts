import { UniversityEntity } from "../../entities/UniversityEntity";
import { universitiesCollection } from "../collections";

export const findUniversityByName = async (
  uniName: string,
): Promise<UniversityEntity> => {
  const doc = (await universitiesCollection.where("name", "==", uniName).get())
    .docs[0].data();

  console.log(doc);

  return doc as any;
};
