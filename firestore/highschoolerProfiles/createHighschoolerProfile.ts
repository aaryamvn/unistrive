import { HighschoolerProfileEntity } from "../../entities/HighschoolerProfileEntity";
import { highschoolerProfilesCollection } from "../collections";

export const createHighschoolerProfile = async (
  data: HighschoolerProfileEntity,
) => {
  const doc = await highschoolerProfilesCollection.add(data);
  highschoolerProfilesCollection.doc(doc.id).set({ id: doc.id });

  return doc;
};
