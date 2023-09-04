import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineRight,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { AuthImage, IconGoogle } from "../../../images";

const RegisterBody = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-1 bg-[#F2F4F5] text-[#5F6C72] p-5">
        <FaHome /> <span>Home</span> <AiOutlineRight />{" "}
        <span>User Account</span> <AiOutlineRight />{" "}
        <span className="text-[#EDB842]">Sign Up</span>
      </div>
      <div className="flex flex-row py-10 md:py-6">
        <div className="w-1/2 hidden md:flex">
          <img src={AuthImage} alt="" />
        </div>
        <div className="w-full md:w-1/2">
          <div className="w-4/5 mx-auto">
            <form
              className="flex flex-col text-center md:text-left gap-5"
              action=""
              method="post"
            >
              <div className="font-[700] text-[26px]">Create an account</div>
              <div className="font-[600] text-[13px]">
                Enter your details below
              </div>
              <div className="">
                <input
                  className="border-b-2 outline-none w-2/3 focus:border-b-[#EDB842]"
                  placeholder="First Name"
                  type="text"
                />
              </div>
              <div className="">
                <input
                  className="border-b-2 outline-none w-2/3 focus:border-b-[#EDB842]"
                  placeholder="Last Name"
                  type="text"
                />
              </div>
              <div className="">
                <input
                  className="border-b-2 outline-none w-2/3 focus:border-b-[#EDB842]"
                  placeholder="Email Name"
                  type="text"
                />
              </div>
              <div className="">
                <input
                  className="border-b-2 outline-none w-2/3 focus:border-b-[#EDB842]"
                  placeholder="Phone Number"
                  type="text"
                />
              </div>
              <div className="">
                <div className="flex flex-row items-center mx-auto md:ms-0  w-2/3 justify-between border-b-2 focus:border-b-[#EDB842] hover:border-b-[#EDB842]">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="6+ characters"
                    className="outline-none rounded-md p-2 m-0"
                  />
                  <button
                    className="text-xl p-1 m-0"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                </div>
              </div>
              <button className="p-2 text-white bg-[#EDB842] rounded-md w-2/3 self-center md:self-start">
                Create Account
              </button>
              <button className="p-2 flex flex-row gap-3 items-center border rounded-md w-2/3 justify-center self-center md:self-start">
                <img className="w-5" src={IconGoogle} alt="" />
                <span>Sign up with Google</span>
              </button>
              <div className="self-center md:self-start">
                <span>Already have account?</span>
                <span>Log in</span>
              </div>
              <div className="flex flex-row items-center gap-3 self-center md:self-start">
                <span>
                  <input type="checkbox" name="" id="" />
                </span>{" "}
                <span>Terms and Conditions</span>
              </div>{" "}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBody;
