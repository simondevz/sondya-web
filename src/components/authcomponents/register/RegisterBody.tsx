import { useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineRight,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import countryData from "../../../data/countries.json";
import { AuthImage, IconGoogle } from "../../../images";
import { registerAction } from "../../../redux/actions/auth.actions";
import { ReducersType } from "../../../redux/store";
import { RegisterType } from "../../../redux/types/auth.types";
import { ReduxResponseType } from "../../../redux/types/general.types";

const RegisterBody = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referrer = queryParams.get("referrer");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //handle form
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterType>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    country: "",
    referrer: referrer || "",
  });
  const { first_name, last_name, username, email, password } = formData;

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerRedux = useSelector(
    (state: ReducersType) => state?.register
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (first_name && last_name && email && username && password) {
      dispatch(registerAction(formData) as any);
    }
  };

  useEffect(() => {
    registerRedux?.error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: registerRedux?.error,
      });
    registerRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: registerRedux?.serverResponse?.message,
      });
    if (registerRedux?.success) {
      setTimeout(function () {
        navigate("/auth/success");
      }, 6000);
    }
  }, [navigate, registerRedux]);

  console.log(formData);

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
              onSubmit={handleSubmit}
            >
              <div className="font-[700] text-[26px]">Create an account</div>
              <div className="font-[600] text-[13px]">
                Enter your details below
              </div>
              <div className="">
                <input
                  name="first_name"
                  className="border-b-2 outline-none w-full md:w-2/3 focus:border-b-[#EDB842]"
                  placeholder="First Name"
                  type="text"
                  autoFocus={true}
                  value={first_name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="">
                <input
                  name="last_name"
                  className="border-b-2 outline-none w-full md:w-2/3 focus:border-b-[#EDB842]"
                  placeholder="Last Name"
                  type="text"
                  value={last_name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="">
                <input
                  name="email"
                  className="border-b-2 outline-none w-full md:w-2/3 focus:border-b-[#EDB842]"
                  placeholder="Email Name"
                  type="text"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="">
                <input
                  name="username"
                  className="border-b-2 outline-none w-full md:w-2/3 focus:border-b-[#EDB842]"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="">
                <select
                  className="border-b-2 outline-none w-full md:w-2/3 focus:border-b-[#EDB842]"
                  name="country"
                  id="country"
                  onChange={onChange}
                  required
                >
                  {countryData.map((t, i) => {
                    return <option value={t.label}>{t.label}</option>;
                  })}
                </select>
              </div>
              <div className="">
                <div className="flex flex-row items-center mx-auto md:ms-0  w-full md:w-2/3 justify-between border-b-2 focus:border-b-[#EDB842] hover:border-b-[#EDB842]">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="6+ characters"
                    className="outline-none rounded-md p-2 m-0"
                    value={password}
                    onChange={onChange}
                    required
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
              <div className="">
                <input
                  name="referrer"
                  className="border-b-2 outline-none w-full md:w-2/3 focus:border-b-[#EDB842] text-[#5F6C72]"
                  placeholder="sre@gmail.com"
                  type="text"
                  value={formData.referrer}
                  onChange={onChange}
                  required
                  readOnly
                />
              </div>
              <button
                type="submit"
                className="p-2 text-white bg-[#EDB842] rounded-md w-full md:w-2/3 self-center md:self-start flex justify-center"
              >
                {registerRedux?.loading ? (
                  <div className="" style={{ height: "25px" }}>
                    <PulseLoader color="#ffffff" />
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
              <button className="p-2 flex flex-row gap-3 items-center border rounded-md w-full md:w-2/3 justify-center self-center md:self-start">
                <img className="w-5" src={IconGoogle} alt="" />
                <span>Sign up with Google</span>
              </button>
              <div
                onClick={() => navigate("/login")}
                className="self-center md:self-start"
              >
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
