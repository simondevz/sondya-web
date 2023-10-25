import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineRight,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthImage } from "../../../images";

const LoginBody = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-1 bg-[#F2F4F5] text-[#5F6C72] p-5">
        <FaHome /> <span>Home</span> <AiOutlineRight />{" "}
        <span>User Account</span> <AiOutlineRight />{" "}
        <span className="text-[#EDB842]">Sign In</span>
      </div>
      <div className="flex flex-row py-16 md:py-6">
        <div className="w-1/2 hidden md:flex">
          <img src={AuthImage} alt="" />
        </div>
        <div className="w-full md:w-1/2 my-auto">
          <div className="w-5/6 mx-auto">
            <form
              className="flex flex-col text-center md:text-left gap-5"
              action=""
              method="post"
            >
              <div className="font-[700] text-[26px]">Log in to Exclusive</div>
              <div className="font-[600] text-[13px]">
                Enter your details below
              </div>
              <div className="">
                <input
                  className="border-b-2 outline-none w-2/3 focus:border-b-[#EDB842]"
                  placeholder="Email Name"
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
              <div className="text-[#DB4444]">Wrong Email or Password</div>
              <div className="flex flex-row items-center justify-between w-2/3 self-center md:self-start">
                <button className="p-2 text-white bg-[#EDB842] rounded-md self-center md:self-start whitespace-nowrap">
                  <Link to={"/register"}>Create Account</Link>
                </button>
                <span className="text-[#DB4444]">Forget Password?</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBody;
