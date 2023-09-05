import { AiOutlineBell, AiOutlineRight } from "react-icons/ai";
import { FaHome } from "react-icons/fa";

const DashboardLocation = () => {
  return (
    <div className="flex flex-row justify-between items-center gap-1 bg-[#000000] text-white py-5 px-8">
      <div className="flex flex-row justify-between items-center gap-1">
        <FaHome /> <span>Home</span> <AiOutlineRight />{" "}
        <span>User Account</span> <AiOutlineRight />{" "}
        <span className="text-[#EDB842]">Sign Up</span>
      </div>
      <div className="text-xl text-[#EDB842]">
        <AiOutlineBell />
      </div>
    </div>
  );
};

export default DashboardLocation;
