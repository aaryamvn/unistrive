import { UniversityEntity } from "../../entities/UniversityEntity";
import { universitiesCollection } from "../collections";

export const createUniversity = async (data: UniversityEntity) => {
  const doc = await universitiesCollection.add(data);
  universitiesCollection.doc(doc.id).set({id:doc.id})
  console.log(doc);

  return doc;
};
