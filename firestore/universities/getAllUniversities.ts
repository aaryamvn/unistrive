import { UniversityEntity } from "../../entities/UniversityEntity";
import { universitiesCollection } from "../collections";

export const getAllUniversities = async (): Promise<UniversityEntity[]> => {
  const unis = (await universitiesCollection.get()).docs;

  let filteredUnis: UniversityEntity[] = [];
  unis.map((uni) => {
    filteredUnis.push(uni.data());
  });

  return filteredUnis as any;
};
