import React from "react";
import { TextBox } from "../TextBox";

export const OnboardingStage3 = ({
  accountType,
  yearOfGraduation,
  setYearOfGraduation,
  currentYear,
  setCurrentYear,
  schoolName,
  setSchoolName,
  uniName,
  setUniName,
  courseName,
  setCourseName,
}) => {
  return (
    <>
      <TextBox
        title="Year Of Graduation"
        placeholder="2022"
        type="number"
        value={yearOfGraduation}
        setValue={setYearOfGraduation}
      />

      <TextBox
        title="Current Year"
        placeholder="1 (Freshman)"
        type="number"
        value={currentYear}
        setValue={setCurrentYear}
      />

      {accountType === "highschooler" && (
        <>
          <TextBox
            title="School"
            placeholder="St. Phillips High School"
            value={schoolName}
            setValue={setSchoolName}
          />
        </>
      )}

      {accountType === "consultant" && (
        <>
          <TextBox
            title="University"
            placeholder="Harvard School Of Business"
            value={uniName}
            setValue={setUniName}
          />

          <TextBox
            title="Course"
            placeholder="Computer Science"
            value={courseName}
            setValue={setCourseName}
          />
        </>
      )}
    </>
  );
};
