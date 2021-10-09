import { ConsultantProfileEntity } from "../../entities/ConsultantProfileEntity";
import { consultantProfilesCollection } from "../collections";

export const createConsultantProfile = async (
  data: ConsultantProfileEntity,
) => {
  const doc = await consultantProfilesCollection.add(data);
  consultantProfilesCollection.doc(doc.id).set({ id: doc.id });

  return doc;
};
