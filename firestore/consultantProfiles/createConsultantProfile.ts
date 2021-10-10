import { ConsultantProfileEntity } from "../../entities/ConsultantProfileEntity";
import { consultantProfilesCollection } from "../collections";

export const createConsultantProfile = async (
  data: ConsultantProfileEntity,
) => {
  const doc = await (await consultantProfilesCollection.add(data)).get();
  console.log(doc);

  return {
    id: doc.id,
    ...doc.data(),
  };
};
