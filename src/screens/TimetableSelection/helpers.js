export const findTerm = (listOfChoicesElements, chosenFieldOfStudy) => {
  return (found_term = listOfChoicesElements
    .filter(item => item.field_of_study_concat === chosenFieldOfStudy)
    .map(term_of_study => term_of_study));
};

export const removeDuplicates = listOfChoicesElements => {
  const withoutDuplicates = [];
  listOfChoicesElements.forEach(listOfChoicesElement => {
    if (
      !withoutDuplicates.some(
        item =>
          item.field_of_study_concat ===
          listOfChoicesElement.field_of_study_concat
      )
    ) {
      withoutDuplicates.push({ ...listOfChoicesElement });
    }
  });
  return withoutDuplicates;
};

export const findTimetable = (
  listOfChoicesElements,
  chosenFieldOfStudy,
  chosenTermOfStudies
) => {
  return (chosenTimetable = listOfChoicesElements.filter(
    item =>
      item.field_of_study_concat === chosenFieldOfStudy &&
      item.term_of_study === chosenTermOfStudies
  )[0].timetable);
};
