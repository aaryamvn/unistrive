import { HighschoolerProfileEntity } from "../../entities/HighschoolerProfileEntity";
import { highschoolerProfilesCollection } from "../collections";

export const createHighschoolerProfile = async (
  data: HighschoolerProfileEntity,
) => {
  const doc = await (await highschoolerProfilesCollection.add(data)).get();
  console.log(doc);

  return {
    id: doc.id,
    ...doc.data(),
  };
};
