import { useState } from "react";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

export const Like = ({ defaultValue }: { defaultValue?: boolean }) => {
  const [like, setLike] = useState<boolean>(defaultValue || false);
  return (
    <div
      className="text-xl bg-[#EDB842] text-white p-1 rounded-full"
      onClick={() => setLike(!like)}
    >
      {like ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
    </div>
  );
};
