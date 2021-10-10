import { HighschoolerProfileEntity } from "../../entities/HighschoolerProfileEntity";
import { highschoolerProfilesCollection } from "../collections";

export const findHighschoolerProfileByUserId = async (
  id: string,
): Promise<HighschoolerProfileEntity> => {
  const doc = await highschoolerProfilesCollection
    .where("userId", "==", id)
    .get();
  return doc as any;
};
