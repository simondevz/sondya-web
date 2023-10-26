import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { LeftWind, RightWind } from "../../../images";
import { forgotPasswordAction } from "../../../redux/actions/auth.actions";
import { ReducersType } from "../../../redux/store";
import { ForgotPasswordType } from "../../../redux/types/auth.types";
import { ReduxResponseType } from "../../../redux/types/general.types";

const ForgotPasswordBody = () => {
  //handle form
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ForgotPasswordType>({
    email: "",
  });
  const { email } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const forgotPasswordRedux = useSelector(
    (state: ReducersType) => state?.forgotPassword
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      dispatch(forgotPasswordAction(formData) as any);
    }
  };

  useEffect(() => {
    // loginRedux?.error &&
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     timer: 5000,
    //     text: loginRedux?.error,
    //   });
    forgotPasswordRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: forgotPasswordRedux?.serverResponse?.message,
      });
    if (forgotPasswordRedux?.success) {
      setTimeout(function () {
        navigate(`/email-verification/${email}`);
      }, 6000);
    }
  }, [navigate, forgotPasswordRedux, email]);
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-1 bg-[#F2F4F5] text-[#5F6C72] p-5">
        <FaHome /> <span>Home</span> <AiOutlineRight />{" "}
        <span>User Account</span> <AiOutlineRight />{" "}
        <span className="text-[#EDB842]">Forgot Password</span>
      </div>
      <div className="flex flex-col p-10 md:p-5 h-full w-full justify-center items-center my-10">
        <div className="bg-[#EDB84233] flex flex-row py-10 text-center items-center max-w-xl rounded-sm">
          <img className="w-[6rem] md:w-[10rem] -ms-10" src={LeftWind} alt="" />
          <form
            className="bg-[#FFFFFF] m-0 w-full py-8 px-5 rounded-md shadow-lg flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Forget Password
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Enter the email address or mobile phone number associated with
              your <span className="text-[#EDB842]">Sondya</span> account.
            </div>
            <div className="flex flex-row justify-start text-[12px] md:text-[18px]">
              <span className="text-[#191C1F] font-[400] ">Email Address</span>
            </div>
            <input
              type="email"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="email"
              autoFocus={true}
              value={email}
              onChange={onChange}
            />
            {forgotPasswordRedux?.error && (
              <div className="text-[#DB4444]">{forgotPasswordRedux?.error}</div>
            )}
            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              {forgotPasswordRedux?.loading ? (
                <div className="" style={{ height: "25px" }}>
                  <PulseLoader color="#ffffff" />
                </div>
              ) : (
                <>
                  <span>Send Code</span>
                  <AiOutlineArrowRight />
                </>
              )}
            </button>
            <div className="flex flex-col gap-2 justify-start text-[#5F6C72] text-[11px] md:text-[15px]">
              <div className="">
                Already have account?{" "}
                <span className="text-[#EDB842]">Sign In</span>
              </div>
              <div className="">
                Don’t have account?{" "}
                <span className="text-[#EDB842]">Sign In</span>
              </div>
            </div>
            <hr />
            <div className="text-[#475156] text-[11px] md:text-[15px]">
              You may contact{" "}
              <span className="text-[#EDB842]">Customer Service</span> for help
              restoring access to your account.
            </div>
          </form>
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

export default ForgotPasswordBody;
