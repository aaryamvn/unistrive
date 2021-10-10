import { consultantProfilesCollection } from "../collections";
import { findConsultantProfileById } from "./findConsultantProfileById";

export const updateUnicoins = async (id: string) => {
  const consultant = await findConsultantProfileById(id);
  if (!consultant.unicoins) consultant.unicoins = 0;

  const unicoins = consultant.unicoins + 1;
  consultantProfilesCollection.doc(id).update({ unicoins });
};
