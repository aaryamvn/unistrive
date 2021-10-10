import { highschoolerProfilesCollection } from "../collections";
import { findHighschoolerProfileByUserId } from "./findHighschoolerProfileByUserId";

export const updateUnicoins = async (id: string) => {
  const highschooler = await findHighschoolerProfileByUserId(id);
  if (!highschooler.unicoins) highschooler.unicoins = 0;

  const unicoins = highschooler.unicoins + 1;

  highschoolerProfilesCollection
    .doc(highschooler.documentId)
    .update({ unicoins });
};
