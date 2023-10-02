import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { Logo } from "../../images/logo";

const GroupChatListBody = () => {
  return (
    <section>
      <div className="flex flex-col gap-3 p-2">
        <div className="flex flex-col-reverse md:flex-row p-4  md:justify-around items-center text-center md:text-left gap-3">
          <div className="md:w-1/2 flex flex-col gap-2">
            <div className="text-2xl playfair-display font-[600]">
              Join our Community
            </div>
            <div className="text-[#9F9F9F] text-sm">
              Lorem ipsum dolor sit amet consectetur. Iaculis enim pellentesque
              sollicitudin sit a Pharetra nunc ac nunc lectus sodales ut. Cras
              nulla netus.
            </div>
          </div>
          <div className="flex flex-row md:w-1/3 gap-3">
            <div className="flex items-center border rounded-md border-[#EDB842] p-1 h-fit text-[#EDB842]">
              <input
                className="p-1 outline-none"
                type="text"
                placeholder="Search for anything..."
              />
              <BsSearch />
            </div>
            <button className="text-white bg-[#EDB842] px-5 py-2 rounded-md h-fit">
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          <div className="flex gap-3 bg-[#F8F9FA] p-2 rounded-md shadow-md shadow-[#EDB842]">
            <div className="">
              <img src={Logo} alt="" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-lg font-[600]">Group 1</div>
              <div className="text-[#5F5D64] text-sm">
                Social media has become an integral part of our day-to-day
                lives. It has changed the way
              </div>
              <button className="py-2 w-fit px-4 text-white bg-[#EDB842] rounded-md self-end">
                Join now
              </button>
            </div>
          </div>
          <div className="flex gap-3 bg-[#F8F9FA] p-2 rounded-md shadow-md shadow-[#EDB842]">
            <div className="">
              <img src={Logo} alt="" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-lg font-[600]">Group 1</div>
              <div className="text-[#5F5D64] text-sm">
                Social media has become an integral part of our day-to-day
                lives. It has changed the way
              </div>
              <button className="py-2 w-fit px-4 text-white bg-[#EDB842] rounded-md self-end">
                Join now
              </button>
            </div>
          </div>
          <div className="flex gap-3 bg-[#F8F9FA] p-2 rounded-md shadow-md shadow-[#EDB842]">
            <div className="">
              <img src={Logo} alt="" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-lg font-[600]">Group 1</div>
              <div className="text-[#5F5D64] text-sm">
                Social media has become an integral part of our day-to-day
                lives. It has changed the way
              </div>
              <button className="py-2 w-fit px-4 text-white bg-[#EDB842] rounded-md self-end">
                Join now
              </button>
            </div>
          </div>
          <div className="flex gap-3 bg-[#F8F9FA] p-2 rounded-md shadow-md shadow-[#EDB842]">
            <div className="">
              <img src={Logo} alt="" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-lg font-[600]">Group 1</div>
              <div className="text-[#5F5D64] text-sm">
                Social media has become an integral part of our day-to-day
                lives. It has changed the way
              </div>
              <button className="py-2 w-fit px-4 text-white bg-[#EDB842] rounded-md self-end">
                Join now
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center text-[#EDB842] self-center my-5">
          <span className="bg-[#EDB84233] p-2 rounded-md">
            <BiSolidLeftArrow />
          </span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">1</span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">2</span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">3</span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">4</span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">5</span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">...</span>
          <span className="bg-[#EDB84233] p-2 rounded-md">
            <BiSolidRightArrow />
          </span>
        </div>
      </div>
    </section>
  );
};

export default GroupChatListBody;
