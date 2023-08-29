import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface ratingType {
  rating?: number;
  starColor?: string;
}
export const Ratings = ({
  rating = 4,
  starColor = "text-[#EDB842]",
}: ratingType) => {
  const ratingwhole = Math.floor(rating);
  return (
    <div className={`flex flex-row gap-1 text-xl ${starColor}`}>
      {Array.from({ length: ratingwhole }).map((_, index) => (
        <AiFillStar key={index} />
      ))}
      {Array.from({ length: 5 - ratingwhole }).map((_, index) => (
        <AiOutlineStar key={index} />
      ))}
    </div>
  );
};
