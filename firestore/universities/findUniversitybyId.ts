import { UniversityEntity } from "../../entities/UniversityEntity";
import { universitiesCollection } from "../collections";

export const findUniversityById = async (
  id: string,
): Promise<UniversityEntity[]> => {
  const doc = (await universitiesCollection.doc(id).get()).data();
  return doc as any;
};
