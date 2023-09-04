import { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineRight,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { LeftWind, RightWind } from "../../../images";

const ResetPasswordBody = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  // const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  return (
    <section className="flex flex-col gap-3 ">
      <div className="flex flex-row items-center gap-1 bg-[#F2F4F5] text-[#5F6C72] p-5">
        <FaHome /> <span>Home</span> <AiOutlineRight />{" "}
        <span>User Account</span> <AiOutlineRight />{" "}
        <span className="text-[#EDB842]">Reset Password</span>
      </div>
      <div className="flex flex-col p-10 md:p-5 h-full w-full justify-center items-center">
        <div className="bg-[#EDB84233] flex flex-row py-10 text-center items-center max-w-xl rounded-sm">
          <img className="w-[6rem] md:w-[10rem] -ms-10" src={LeftWind} alt="" />
          <div className="bg-[#FFFFFF] m-0 w-full py-8 px-5 rounded-md shadow-lg flex flex-col gap-4">
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Reset Password
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Duis sagittis molestie tellus, at eleifend sapien pellque quis.
              Fusce lorem nunc, fringilla sit amet nunc.
            </div>
            <div className="flex flex-row justify-start text-[11px] md:text-[15px] -mb-3">
              <span className="text-[#191C1F] font-[400] ">Password</span>
            </div>
            <div className="flex flex-row items-center justify-between border hover:border-[#EDB842] rounded-md p-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="6+ characters"
                className="outline-none rounded-md p-1 m-0"
              />
              <button
                className="text-xl p-1 m-0"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            <div className="flex flex-row justify-start text-[11px] md:text-[15px] -mb-3">
              <span className="text-[#191C1F] font-[400] ">
                Confirm Password
              </span>
            </div>
            <div className="flex flex-row items-center justify-between border hover:border-[#EDB842] rounded-md p-2">
              <input
                type={showPassword1 ? "text" : "password"}
                className="outline-none rounded-md p-1 m-0"
              />
              <button
                className="text-xl p-1 m-0"
                type="button"
                onClick={togglePasswordVisibility1}
              >
                {showPassword1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            <button className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white">
              <span>Reset Password</span>
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

export default ResetPasswordBody;
