import { useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineRight,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { AuthImage } from "../../../images";
import { loginAction } from "../../../redux/actions/auth.actions";
import { LOGIN_RESET } from "../../../redux/constants/auth.constants";
import { ReducersType } from "../../../redux/store";
import { LoginType } from "../../../redux/types/auth.types";
import { ReduxResponseType } from "../../../redux/types/general.types";

const LoginBody = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //handle form
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginRedux = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginAction(formData) as any);
    }
  };
  console.log(loginRedux?.serverResponse?.data);

  useEffect(() => {
    // loginRedux?.error &&
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     timer: 5000,
    //     text: loginRedux?.error,
    //   });
    loginRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: loginRedux?.serverResponse?.message,
      });
    if (loginRedux?.success) {
      setTimeout(function () {
        if (loginRedux?.serverResponse?.data[0]?.type === "user") {
          navigate("/dashboard");
        } else {
          navigate("/admin/dashboard");
        }
        dispatch({ type: LOGIN_RESET });
      }, 6000);
    }
  }, [navigate, loginRedux, dispatch]);

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
              onSubmit={handleSubmit}
            >
              <div className="font-[700] text-[26px]">Log in to Exclusive</div>
              <div className="font-[600] text-[13px]">
                Enter your details below
              </div>
              <div className="">
                <input
                  name="email"
                  className="border-b-2 outline-none w-2/3 focus:border-b-[#EDB842]"
                  placeholder="Email"
                  type="text"
                  autoFocus={true}
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="">
                <div className="flex flex-row items-center mx-auto md:ms-0  w-2/3 justify-between border-b-2 focus:border-b-[#EDB842] hover:border-b-[#EDB842]">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="6+ characters"
                    className="outline-none rounded-md p-2 m-0"
                    value={password}
                    onChange={onChange}
                  />
                  <button
                    className="text-xl p-1 m-0"
                    type="submit"
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
              {loginRedux?.error && (
                <div className="text-[#DB4444]">{loginRedux?.error}</div>
              )}
              <div className="flex flex-row items-center justify-between w-2/3 self-center md:self-start">
                <button className="px-6 py-2 text-white bg-[#EDB842] rounded-md self-center md:self-start whitespace-nowrap">
                  {loginRedux?.loading ? (
                    <div className="" style={{ height: "25px" }}>
                      <PulseLoader color="#ffffff" />
                    </div>
                  ) : (
                    "Login"
                  )}
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
