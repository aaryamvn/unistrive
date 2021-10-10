import { universitiesCollection } from "../collections";
import { findUniversityByName } from "../universities/findUniversityByName";

export const addStudentToUniversity = async (
  userId: string,
  universityName: string,
) => {
  const university = await findUniversityByName(universityName);

  if (university) {
    const universityDoc = universitiesCollection.doc(university.id);
    const studentIds: string[] = university.studentIds || [];

    if (!studentIds.includes(userId)) {
      studentIds.push(userId);
      universityDoc.update({ studentIds });
    }
  }
};
