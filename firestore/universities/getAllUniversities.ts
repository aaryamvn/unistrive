import { UniversityEntity } from "../../entities/UniversityEntity";
import { universitiesCollection } from "../collections";

export const getAllUniversities = async (): Promise<UniversityEntity[]> => {
  const unis = (await universitiesCollection.get()).docs;

  const filteredUnis: UniversityEntity[] = unis.map((uni) => uni.data() as any);
  return filteredUnis as any;
};
