import { AiOutlineRight } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LeftWind, RightWind } from "../../../images";

const AuthSuccessBody = () => {
  return (
    <section className="flex flex-col gap-3 h-[60vh] md:h-[90vh]">
      <div className="flex flex-row items-center gap-1 bg-[#F2F4F5] text-[#5F6C72] p-5">
        <FaHome /> <span>Home</span> <AiOutlineRight />{" "}
        <span>User Account</span> <AiOutlineRight />{" "}
        <span className="text-[#EDB842]">Email Verification</span>
      </div>
      <div className="flex flex-col p-10 md:p-5 h-full w-full justify-center items-center gap-3">
        <div className="bg-[#EDB84233] flex flex-row py-10 text-center items-center max-w-xl rounded-sm">
          <img className="w-[7rem] md:w-[10rem] -ms-10" src={LeftWind} alt="" />
          <div className="bg-[#FFFFFF] m-0 w-full p-5 rounded-md shadow-md">
            <div className="font-[700] playfair-display text-[18px] md:text-[25px] text-[#EDB842]">
              Thanks for joining!
            </div>
            <div className="font-[400] text-[13px] md:text-[#414141]">
              Your registration was successfull, A congratulatory message has
              been sent to your inbox. Click on login to log in to your
              dashboard.
            </div>
          </div>
          <img
            className="w-[7rem] md:w-[10rem] -me-10"
            src={RightWind}
            alt=""
          />
        </div>
        <div className="flex flex-row gap-4 w-full justify-between max-w-xl">
          <Link
            className="text-white bg-[#EDB842] px-4 py-2 rounded-md"
            to={"/"}
          >
            Home
          </Link>
          <Link
            className="text-white bg-[#EDB842] px-4 py-2 rounded-md"
            to={"/login"}
          >
            Continue to login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AuthSuccessBody;
