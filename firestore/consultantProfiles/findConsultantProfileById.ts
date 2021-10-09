import { ConsultantProfileEntity } from "../../entities/ConsultantProfileEntity";
import { consultantProfilesCollection } from "../collections";

export const findConsultantProfileById = async (
  id: string,
): Promise<ConsultantProfileEntity[]> => {
  const doc = (await consultantProfilesCollection.doc(id).get()).data();
  return doc as any;
};
