import { format } from "date-fns";
import { useEffect, useState } from "react";

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
    const dateObject = new Date(dateString);
    const formattedDate = format(dateObject, "do MMM, yy");
    returnString = formattedDate;
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
  const [tick, setTick] = useState<boolean>();
  useEffect(() => {
    if (utcDateString) setInterval(() => setTick(!tick), 1000);
  }, [tick, utcDateString]);

  if (utcDateString === "")
    return <span className={className}>No set time</span>;
  const date = new Date(utcDateString);
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = Math.floor(date.getTime() / 1000) - currentTime;

  if (timeDiff < 0) return <span className={className}>0h 0m 00s</span>;

  // Convert time left into days, hours, minutes, and seconds
  const daysLeft = Math.floor(timeDiff / (60 * 60 * 24));
  const hoursLeft = Math.floor((timeDiff % (60 * 60 * 24)) / (60 * 60));
  const minutesLeft = Math.floor((timeDiff % (60 * 60)) / 60);
  const secondsLeft = timeDiff % 60;

  let returnString: string = `${
    daysLeft < 0 ? daysLeft + "d" : ""
  } ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;

  return <span className={className}>{returnString}</span>;
};

export default FormatDate;
