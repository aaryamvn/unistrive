import { ConsultantProfileEntity } from "../../entities/ConsultantProfileEntity";
import { consultantProfilesCollection } from "../collections";

export const createConsultantProfile = async (
  data: ConsultantProfileEntity,
) => {
  const doc = await (await consultantProfilesCollection.add(data)).get();
  consultantProfilesCollection.doc(doc.id).update({ docId: doc.id });
  console.log(doc);

  return {
    id: doc.id,
    ...doc.data(),
  };
};
