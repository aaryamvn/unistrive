import { UniversityEntity } from "../../entities/UniversityEntity";
import { universitiesCollection } from "../collections";

export const createUniversity = async (data: UniversityEntity) => {
  const doc = await universitiesCollection.add(data);
  console.log(doc);

  return doc;
};
