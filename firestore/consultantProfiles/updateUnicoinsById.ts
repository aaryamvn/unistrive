import { consultantProfilesCollection } from "../collections";
import { findConsultantProfileByUserId } from "./findConsultantProfileByUserId";

export const updateUnicoins = async (id: string) => {
  const consultant = await findConsultantProfileByUserId(id);
  if (!consultant.unicoins) consultant.unicoins = 0;

  const unicoins = consultant.unicoins + 1;
  
  consultantProfilesCollection.doc(consultant.documentId).update({ unicoins });
};
