import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { LeftWind, RightWind } from "../../../images";

const EmailVerficationBody = () => {
  return (
    <section className="flex flex-col gap-3 md:h-[90vh]">
      <div className="flex flex-row items-center gap-1 bg-[#F2F4F5] text-[#5F6C72] p-5">
        <FaHome /> <span>Home</span> <AiOutlineRight />{" "}
        <span>User Account</span> <AiOutlineRight />{" "}
        <span className="text-[#EDB842]">Email Verification</span>
      </div>
      <div className="flex flex-col p-10 md:p-5 h-full w-full justify-center items-center">
        <div className="bg-[#EDB84233] flex flex-row py-10 text-center items-center max-w-xl rounded-sm">
          <img className="w-[6rem] md:w-[10rem] -ms-10" src={LeftWind} alt="" />
          <div className="bg-[#FFFFFF] m-0 w-full py-8 px-5 rounded-md shadow-lg flex flex-col gap-4">
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Verify Your Email Address
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Nam ultricies lectus a risus blandit elementum. Quisque arcu arcu,
              tristique a eu in diam.
            </div>
            <div className="flex flex-row justify-between text-[12px] md:text-[18px]">
              <span className="text-[#191C1F] font-[400] ">
                Verification Code
              </span>
              <span className="text-[#EDB842] font-[600] ">Resend Code</span>
            </div>
            <input
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              type="text"
            />
            <button className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white">
              <span>Verify me</span>
              <AiOutlineArrowRight />
            </button>
          </div>
          <img
            className="w-[6rem] md:w-[10rem] -me-10"
            src={RightWind}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default EmailVerficationBody;
