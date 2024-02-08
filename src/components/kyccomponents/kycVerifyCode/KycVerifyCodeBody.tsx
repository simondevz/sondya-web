import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { kycVerifyCodeAction } from "../../../redux/actions/userDashboard/kyc.actions";
import { KYC_VERIFY_CODE_RESET } from "../../../redux/constants/userDashboard/kyc.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";

const KycVerifyCodeBody = () => {
  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{ code: string }>({
    code: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const kycVerifyCodeReducer = useSelector(
    (state: ReducersType) => state?.kycVerifyCode
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(kycVerifyCodeAction(formData) as any);
      // console.log(formData);
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
    kycVerifyCodeReducer?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: kycVerifyCodeReducer?.serverResponse?.message,
      });
    if (kycVerifyCodeReducer?.success) {
      setTimeout(function () {
        // dispatch(GetUserProfileAction() as any);
        navigate("/kyc/personal/info");
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: KYC_VERIFY_CODE_RESET });
      }, 2000);
    }
  }, [kycVerifyCodeReducer, dispatch, navigate]);
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col p-3 md:p-10 h-full w-full justify-center items-center my-10">
        <div className="bg-[#EDB84233] flex flex-row p-3 md:p-10 text-center items-center max-w-xl rounded-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-[#FFFFFF] m-0 w-full py-8 px-3 md:px-6 rounded-md shadow-lg flex flex-col gap-4"
          >
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Kyc Verification Code
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Enter the verification code sent to your
              <span className="text-[#EDB842]"> Sondya </span> email address
            </div>
            <div className="flex flex-row justify-start text-[12px] md:text-[18px]">
              <span className="text-[#191C1F] font-[400] ">
                Verification Code
              </span>
            </div>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="code"
              placeholder="Enter Verification Code here"
              autoFocus={true}
              onChange={onChange}
              required
            />
            <small>Enter the verification code sent to your email</small>
            <div className="">
              {kycVerifyCodeReducer?.error && (
                <div className="text-[#DB4444]">
                  {kycVerifyCodeReducer?.error}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              {kycVerifyCodeReducer?.loading ? (
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

export default KycVerifyCodeBody;
