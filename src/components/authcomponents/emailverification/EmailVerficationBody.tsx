import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { LeftWind, RightWind } from "../../../images";
import { verifyEmailAction } from "../../../redux/actions/auth.actions";
import { ReducersType } from "../../../redux/store";
import { VerifyEmailType } from "../../../redux/types/auth.types";
import { ReduxResponseType } from "../../../redux/types/general.types";

const EmailVerficationBody = () => {
  //handle form
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();

  const [formData, setFormData] = useState<VerifyEmailType>({
    email: email,
    code: "",
  });
  const { code } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const verifyEmailRedux = useSelector(
    (state: ReducersType) => state?.verifyEmail
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code) {
      dispatch(verifyEmailAction(formData) as any);
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
    verifyEmailRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: verifyEmailRedux?.serverResponse?.message,
      });
    if (verifyEmailRedux?.success) {
      setTimeout(function () {
        navigate(`/reset-password/${email}`);
      }, 6000);
    }
  }, [email, navigate, verifyEmailRedux]);

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
          <form
            className="bg-[#FFFFFF] m-0 w-full py-8 px-5 rounded-md shadow-lg flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
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
              name="code"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              placeholder="enter code here"
              autoFocus={true}
              type="text"
              value={code}
              onChange={onChange}
            />
            {verifyEmailRedux?.error && (
              <div className="text-[#DB4444]">{verifyEmailRedux?.error}</div>
            )}
            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              {verifyEmailRedux?.loading ? (
                <div className="" style={{ height: "25px" }}>
                  <PulseLoader color="#ffffff" />
                </div>
              ) : (
                <>
                  <span>Verify me</span>
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

export default EmailVerficationBody;
