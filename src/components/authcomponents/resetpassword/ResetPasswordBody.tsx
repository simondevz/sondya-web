import { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineRight,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { LeftWind, RightWind } from "../../../images";
import { resetPasswordAction } from "../../../redux/actions/auth.actions";
import { ReducersType } from "../../../redux/store";
import { ResetPasswordType } from "../../../redux/types/auth.types";
import { ReduxResponseType } from "../../../redux/types/general.types";

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

  //handle form
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();

  const [formData, setFormData] = useState<ResetPasswordType>({
    email: email,
    password: "",
    confirm_password: "",
  });
  const { password, confirm_password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetPasswordRedux = useSelector(
    (state: ReducersType) => state?.resetPassword
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password && confirm_password) {
      dispatch(resetPasswordAction(formData) as any);
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
    resetPasswordRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: resetPasswordRedux?.serverResponse?.message,
      });
    if (resetPasswordRedux?.success) {
      setTimeout(function () {
        navigate("/login");
      }, 6000);
    }
  }, [navigate, resetPasswordRedux]);
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
          <form
            className="bg-[#FFFFFF] m-0 w-full py-8 px-5 rounded-md shadow-lg flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
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
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="6+ characters"
                className="outline-none rounded-md p-1 m-0"
                autoFocus={true}
                value={password}
                onChange={onChange}
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
                name="confirm_password"
                type={showPassword1 ? "text" : "password"}
                placeholder="confirm password"
                className="outline-none rounded-md p-1 m-0"
                value={confirm_password}
                onChange={onChange}
              />
              <button
                className="text-xl p-1 m-0"
                type="button"
                onClick={togglePasswordVisibility1}
              >
                {showPassword1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            {resetPasswordRedux?.error && (
              <div className="text-[#DB4444]">{resetPasswordRedux?.error}</div>
            )}
            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              {resetPasswordRedux?.loading ? (
                <div className="" style={{ height: "25px" }}>
                  <PulseLoader color="#ffffff" />
                </div>
              ) : (
                <>
                  <span>Reset Password</span>
                  <AiOutlineArrowRight />
                </>
              )}
            </button>
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

export default ResetPasswordBody;
