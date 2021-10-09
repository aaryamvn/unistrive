import { UniversityEntity } from "../../entities/UniversityEntity";
import { universitiesCollection } from "../collections";

export const findUniversityById = async (
  id: string,
): Promise<UniversityEntity> => {
  const doc = (await universitiesCollection.doc(id).get())[0].data();
  return doc as any;
};
