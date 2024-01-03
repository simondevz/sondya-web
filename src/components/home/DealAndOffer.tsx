import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RealMe } from "../../images";

const DealAndOffer = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-5 p-5 md:p-10">
      <div className="bg-[#EDB84233] flex flex-wrap-reverse md:flex-nowrap gap-3 justify-evenly px-4 py-10 rounded-md">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="text-[#EDB842]">- THE BEST PLACE TO CONNECT</div>
          <div className="text-4xl font-[600] text-[#191C1F] playfair-display">
            Explore Groups
          </div>
          <div className="text-[#475156] text-left">
            Join our group for news, events and connectitvity
          </div>
          <button
            onClick={() => navigate("/groupchat/list")}
            className="flex gap-3 items-center bg-[#EDB842C9] p-3 rounded-md text-white"
          >
            <span>Explore now</span> <MdArrowForward />
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <img src={RealMe} alt="" />
        </div>
      </div>
    </section>
  );
};

export default DealAndOffer;
