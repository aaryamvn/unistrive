import { UniversityEntity } from "../../entities/UniversityEntity";
import { universitiesCollection } from "../collections";

export const getUniversityNamesInMass = async (): Promise<string[]> => {
  const unis = (await universitiesCollection.get()).docs;

  const uniNames = [];
  unis.map((uni) => {
    uniNames.push((uni.data() as UniversityEntity).name);
  });

  console.log(uniNames);
  return uniNames as any;
};
