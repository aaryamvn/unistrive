import { ConsultantProfileEntity } from "../../entities/ConsultantProfileEntity";
import { consultantProfilesCollection } from "../collections";

export const findConsultantProfileByUserId = async (
  id: string,
): Promise<ConsultantProfileEntity> => {
  const doc = await consultantProfilesCollection
    .where("userId", "==", id)
    .get();

  return doc.docs[0]?.data() as any;
};
