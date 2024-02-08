import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { kycVerifyEmailAction } from "../../../redux/actions/userDashboard/kyc.actions";
import { GetUserProfileAction } from "../../../redux/actions/userDashboard/profile.actions";
import { KYC_VERIFY_EMAIL_RESET } from "../../../redux/constants/userDashboard/kyc.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { adminUGetUserType } from "../../../redux/types/users.types";

const KycVerifyEmailBody = () => {
  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const getLogin = useSelector(
  //   (state: ReducersType) => state?.login
  // ) as ReduxResponseType<LoginResponseType>;

  const getProfileDetailsRedux = useSelector(
    (state: ReducersType) => state?.getProfile
  ) as ReduxResponseType<adminUGetUserType>;

  useEffect(() => {
    dispatch(GetUserProfileAction() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(getLogin);

  const [formData, setFormData] = useState<{ email: string }>({
    email: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setFormData((prevState) => ({
        ...prevState,
        email: getProfileDetailsRedux?.serverResponse?.data?.email,
      }));
    }, 1000);
  }, [getProfileDetailsRedux?.serverResponse?.data?.email]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const kycVerifyEmailReducer = useSelector(
    (state: ReducersType) => state?.kycVerifyEmail
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      if (
        getProfileDetailsRedux?.serverResponse?.data?.email_verified === true
      ) {
        navigate("/kyc/personal/info");
      } else {
        dispatch(kycVerifyEmailAction(formData) as any);
      }
    }
  };

  useEffect(() => {
    // updateProfileSocialRedux?.error &&
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     timer: 5000,
    //     text: updateProfileSocialRedux?.error,
    //   });
    kycVerifyEmailReducer?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: kycVerifyEmailReducer?.serverResponse?.message,
      });
    if (kycVerifyEmailReducer?.success) {
      setTimeout(function () {
        // dispatch(GetUserProfileAction() as any);
        navigate("/kyc/verify/code");
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: KYC_VERIFY_EMAIL_RESET });
      }, 2000);
    }
  }, [kycVerifyEmailReducer, dispatch, navigate]);

  // console.log(formData);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col p-3 md:p-10 h-full w-full justify-center items-center my-10">
        <div className="bg-[#EDB84233] flex flex-row p-3 md:p-10 text-center items-center max-w-xl rounded-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-[#FFFFFF] m-0 w-full py-8 px-3 md:px-6 rounded-md shadow-lg flex flex-col gap-4"
          >
            <div className="flex items-center justify-center gap-2 font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Kyc Password Verification
              {getProfileDetailsRedux?.serverResponse?.data?.email_verified && (
                <span className="text-green-700 text-xl">
                  <MdVerified />
                </span>
              )}
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Enter the email address associated with the{" "}
              <span className="text-[#EDB842]">Sondya</span> account you are
              logged into.
            </div>
            <div className="flex flex-row gap-2 items-center justify-start text-[12px] md:text-[18px]">
              <span className="text-[#191C1F] font-[400] ">Email Address</span>
              {getProfileDetailsRedux?.serverResponse?.data?.email_verified && (
                <span className="text-green-700 text-xl">
                  <MdVerified />
                </span>
              )}
            </div>
            <input
              type="email"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="email"
              autoFocus={true}
              required
              readOnly
              value={formData.email}
              onChange={onChange}
              placeholder="Email Address"
              autoComplete="off"
              spellCheck={false}
            />
            <small>
              A 4-digit code will be sent to your email which you will use for
              verification
            </small>
            <div className="">
              {kycVerifyEmailReducer?.error && (
                <div className="text-[#DB4444]">
                  {kycVerifyEmailReducer?.error}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              {kycVerifyEmailReducer?.loading ? (
                <div className="" style={{ height: "25px" }}>
                  <PulseLoader color="#ffffff" />
                </div>
              ) : (
                <>
                  {getProfileDetailsRedux?.serverResponse?.data
                    ?.email_verified ? (
                    <span>Continue</span>
                  ) : (
                    <span>Send Code</span>
                  )}
                  <AiOutlineArrowRight />
                </>
              )}
            </button>

            <hr />
            <div className="text-[#475156] text-[11px] md:text-[15px]">
              Check
              <span className="text-[#EDB842]"> Spam account</span> in your
              email , if you didnt receive the email in your inbox.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default KycVerifyEmailBody;
