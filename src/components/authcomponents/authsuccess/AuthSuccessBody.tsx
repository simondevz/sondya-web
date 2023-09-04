import { AiOutlineRight } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { LeftWind, RightWind } from "../../../images";

const AuthSuccessBody = () => {
  return (
    <section className="flex flex-col gap-3 h-[60vh] md:h-[90vh]">
      <div className="flex flex-row items-center gap-1 bg-[#F2F4F5] text-[#5F6C72] p-5">
        <FaHome /> <span>Home</span> <AiOutlineRight />{" "}
        <span>User Account</span> <AiOutlineRight />{" "}
        <span className="text-[#EDB842]">Email Verification</span>
      </div>
      <div className="flex flex-col p-10 md:p-5 h-full w-full justify-center items-center">
        <div className="bg-[#EDB84233] flex flex-row py-10 text-center items-center max-w-xl rounded-sm">
          <img className="w-[7rem] md:w-[10rem] -ms-10" src={LeftWind} alt="" />
          <div className="bg-[#FFFFFF] m-0 w-full p-5 rounded-md shadow-md">
            <div className="font-[700] playfair-display text-[18px] md:text-[25px] text-[#EDB842]">
              Thanks for joining!
            </div>
            <div className="font-[400] text-[13px] md:text-[#414141]">
              We will send you a confirmation code in your inbox. Copy and Paste
              to activate your account.
            </div>
          </div>
          <img
            className="w-[7rem] md:w-[10rem] -me-10"
            src={RightWind}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default AuthSuccessBody;
