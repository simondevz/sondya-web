const FormatDate = ({
  dateString,
  className,
}: {
  dateString: string;
  className?: string;
}) => {
  const dateNow = new Date();
  const date = new Date(dateString);
  const timeDiff = (dateNow.getTime() - date.getTime()) / 1000;

  const secondsAgo = Math.round(timeDiff);
  const minutesAgo = Math.round(secondsAgo / 60);
  const hoursAgo = Math.round(minutesAgo / 60);
  const daysAgo = Math.round(hoursAgo / 24);

  let returnString: string = secondsAgo + "s";
  if (secondsAgo > 60) returnString = minutesAgo + "m";
  if (minutesAgo > 60) returnString = hoursAgo + "h";
  if (hoursAgo > 24) returnString = daysAgo + "d";
  if (daysAgo > 7) {
    const months: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year: string =
      date.getFullYear() === dateNow.getFullYear()
        ? ""
        : ", " + date.getFullYear();

    const remainder = day % 10;
    const dayEndString: string =
      remainder === 1
        ? "st"
        : remainder === 2
        ? "nd"
        : remainder === 3
        ? "rd"
        : "th";

    returnString = `${day + dayEndString} ${month}${year}`;
  }
  return <span className={className}>{returnString}</span>;
};

export const TimeLeft = ({
  utcDateString,
  className,
}: {
  utcDateString: string;
  className?: string;
}) => {
  if (utcDateString === "")
    return <span className={className}>No set time</span>;
  const dateNow = new Date();
  const date = new Date(utcDateString);
  const timeDiff = (date.getTime() - dateNow.getUTCMilliseconds()) / 1000;

  const secondsLeft = Math.round(timeDiff) % 60; // seconds left in a minute
  const minutesLeft = Math.round(timeDiff / 60) % 60; // minute left in an hour
  const hoursLeft = Math.round(timeDiff / (60 * 60)) % 24; // hours left in a day
  const daysLeft = Math.round(timeDiff / (60 * 60 * 24)); // days left

  let returnString: string = `${
    daysLeft < 0 ? daysLeft + "d" : ""
  } ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;

  return <span className={className}>{returnString}</span>;
};

export default FormatDate;
