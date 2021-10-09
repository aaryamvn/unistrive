import { HighschoolerProfileEntity } from "../../entities/HighschoolerProfileEntity";
import { highschoolerProfilesCollection } from "../collections";

export const findHighschoolerProfileById = async (
  id: string,
): Promise<HighschoolerProfileEntity> => {
  const doc = (await highschoolerProfilesCollection.doc(id).get()).data();
  return doc as any;
};
