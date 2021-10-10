import { HighschoolerProfileEntity } from "../../entities/HighschoolerProfileEntity";
import { highschoolerProfilesCollection } from "../collections";

export const editHighschoolerProfile = async (
  data: object,
  id: string,
) => {
  const doc = highschoolerProfilesCollection.doc(id).update(data);
  console.log(doc);

  return doc;
};
