import { consultantProfilesCollection } from "../collections";

export const editConsultantProfile = async (data: object, id: string) => {
  const doc = consultantProfilesCollection.doc(id).update(data);
  console.log(doc);

  return doc;
};
