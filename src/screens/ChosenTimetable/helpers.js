import moment from 'moment';

const currentDate = new Date();

export const findCurrentClass = (currentClassCandidate, chosenDay) => {
  const currentDay = currentDate.getDay();
  const currentTimeInMinutes =
    currentDate.getHours() * 60 + currentDate.getMinutes();

  const classStartTimeInMinutes =
    Number(currentClassCandidate.start_hour.slice(0, 2)) * 60 +
    Number(currentClassCandidate.start_hour.slice(3, 5));
  const classEndTimeInMinutes =
    Number(currentClassCandidate.end_hour.slice(0, 2)) * 60 +
    Number(currentClassCandidate.end_hour.slice(3, 5));

  if (currentDay === chosenDay) {
    if (
      classStartTimeInMinutes <= currentTimeInMinutes &&
      currentTimeInMinutes < classEndTimeInMinutes
    ) {
      return true;
    }
    return false;
  }
  return false;
};

export const timeToMinutes = time => {
  let splittedTime = time.split(':');
  let seconds = 0;
  let multiplier = 1;
  while (splittedTime.length > 0) {
    seconds += multiplier * parseInt(splittedTime.pop(), 10);
    multiplier *= 60;
  }
  return seconds / 60;
};

export const findTimeDifferenceInMinutes = startTime => {
  const extractedTimeFromCurrentDate = moment(currentDate, 'HH:mm:ss');
  const startTimeInMomentFormat = moment(startTime, 'HH:mm:ss');

  const currentAndStartTimeDifference = moment.duration(
    extractedTimeFromCurrentDate.diff(startTimeInMomentFormat)
  );
  return Math.abs(currentAndStartTimeDifference.asMinutes());
};

export const sliceHour = hour => {
  if (hour[0] === '0') {
    return hour.slice(1, -3);
  } else {
    return hour.slice(0, -3);
  }
};
