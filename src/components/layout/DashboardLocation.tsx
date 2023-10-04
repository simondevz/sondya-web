import { useState } from "react";
import { AiOutlineBell, AiOutlineRight } from "react-icons/ai";
import { FaHome, FaTimes } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { user1 } from "../../images/users";

const DashboardLocation = () => {
  let [status, setStatus] = useState(false);
  return (
    <div className="relative flex flex-row justify-between items-center gap-1 bg-[#000000] text-white py-5 px-8">
      <div className="flex flex-row justify-between items-center gap-1">
        <FaHome /> <span>Home</span> <AiOutlineRight />{" "}
        <span>User Account</span> <AiOutlineRight />{" "}
        <span className="text-[#EDB842]">Sign Up</span>
      </div>
      <button
        onClick={() => setStatus(!status)}
        className="text-xl text-[#EDB842]"
      >
        <AiOutlineBell />
      </button>
      {status && (
        <div className="absolute bg-white text-[#222529] flex flex-col right-3 top-11 w-[18rem] shadow-md rounded-md">
          <div className="flex gap-3 p-3  justify-between border-b">
            <span>Notifications</span>{" "}
            <button onClick={() => setStatus(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="flex gap-4 justify-between p-2 items-center ">
            <div className="flex text-sm items-center gap-3">
              <img className="w-8 h-8 object-contain" src={user1} alt="" />
              <div className="">
                <div className="text-[#222529] font-[600] text-[1rem]">
                  stewiedewie
                </div>
                <div className="text-[#4C525A]">High fived your workout</div>
                <div className="text-[#4C525A]">0 min</div>
              </div>
            </div>
            <div className="">
              <div className=""></div>
              <button>
                <MdArrowForwardIos />
              </button>
            </div>
          </div>
          <div className="flex gap-4 justify-between p-2 items-center ">
            <div className="flex text-sm items-center gap-3">
              <img className="w-8 h-8 object-contain" src={user1} alt="" />
              <div className="">
                <div className="text-[#222529] font-[600] text-[1rem]">
                  stewiedewie
                </div>
                <div className="text-[#4C525A]">High fived your workout</div>
                <div className="text-[#4C525A]">0 min</div>
              </div>
            </div>
            <div className="">
              <div className=""></div>
              <button>
                <MdArrowForwardIos />
              </button>
            </div>
          </div>
          <div className="flex gap-4 justify-between p-2 items-center ">
            <div className="flex text-sm items-center gap-3">
              <img className="w-8 h-8 object-contain" src={user1} alt="" />
              <div className="">
                <div className="text-[#222529] font-[600] text-[1rem]">
                  stewiedewie
                </div>
                <div className="text-[#4C525A]">High fived your workout</div>
                <div className="text-[#4C525A]">0 min</div>
              </div>
            </div>
            <div className="">
              <div className=""></div>
              <button>
                <MdArrowForwardIos />
              </button>
            </div>
          </div>
          <div className="flex gap-4 justify-between p-2 items-center ">
            <div className="flex text-sm items-center gap-3">
              <img className="w-8 h-8 object-contain" src={user1} alt="" />
              <div className="">
                <div className="text-[#222529] font-[600] text-[1rem]">
                  stewiedewie
                </div>
                <div className="text-[#4C525A]">High fived your workout</div>
                <div className="text-[#4C525A]">0 min</div>
              </div>
            </div>
            <div className="">
              <div className=""></div>
              <button>
                <MdArrowForwardIos />
              </button>
            </div>
          </div>
          <div className="text-[#EDB842] p-3 bg-[#EDB84230] text-xl font-[600] text-center">
            View All
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLocation;
