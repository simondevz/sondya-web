import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { kycPersonalInfoAction } from "../../../redux/actions/userDashboard/kyc.actions";
import { GetUserProfileAction } from "../../../redux/actions/userDashboard/profile.actions";
import { KYC_PERSONAL_INFO_RESET } from "../../../redux/constants/userDashboard/kyc.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { kycPersonalInfoType } from "../../../redux/types/kyc.types";
import { adminUGetUserType } from "../../../redux/types/users.types";

const KycPersonalInfoBody = () => {
  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProfileDetailsRedux = useSelector(
    (state: ReducersType) => state?.getProfile
  ) as ReduxResponseType<adminUGetUserType>;

  useEffect(() => {
    dispatch(GetUserProfileAction() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formData, setFormData] = useState<kycPersonalInfoType>({
    first_name: "",
    last_name: "",
    gender: "",
    marital_status: "",
    date_of_birth: "",
  });

  useEffect(() => {
    if (getProfileDetailsRedux?.serverResponse?.data) {
      setFormData((prevState) => ({
        ...prevState,
        ...getProfileDetailsRedux?.serverResponse?.data,
      }));
    }
  }, [getProfileDetailsRedux?.serverResponse?.data]);

  const kycPersonalInfoReducer = useSelector(
    (state: ReducersType) => state?.kycPersonalInfo
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(kycPersonalInfoAction(formData) as any);
      // console.log(formData);
    }
  };

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

  useEffect(() => {
    // updateProfileSocialRedux?.error &&
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     timer: 5000,
    //     text: updateProfileSocialRedux?.error,
    //   });
    kycPersonalInfoReducer?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: kycPersonalInfoReducer?.serverResponse?.message,
      });
    if (kycPersonalInfoReducer?.success) {
      setTimeout(function () {
        // dispatch(GetUserProfileAction() as any);
        navigate("/kyc/contact/info");
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: KYC_PERSONAL_INFO_RESET });
      }, 2000);
    }
  }, [kycPersonalInfoReducer, dispatch, navigate]);
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col p-3 md:p-10 h-full w-full justify-center items-center my-10">
        <div className="bg-[#EDB84233] flex flex-row p-3 md:p-10 text-center items-center max-w-xl rounded-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-[#FFFFFF] m-0 w-full py-8 px-3 md:px-6 rounded-md shadow-lg flex flex-col gap-4"
          >
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Personal Infomation
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Fill in the information below
            </div>

            <label className="text-[#191C1F] font-[400] text-left">
              First Name
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="first_name"
              placeholder="Enter your First Name"
              autoFocus={true}
              onChange={onChange}
              required
              value={formData?.first_name}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Last Name
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="last_name"
              placeholder="Enter your Last Name"
              onChange={onChange}
              required
              value={formData?.last_name}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Gender
            </label>
            <select
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="gender"
              id=""
              required
              onChange={onChange}
              value={formData?.gender}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

            <label className="text-[#191C1F] font-[400] text-left">
              Marital Status
            </label>
            <select
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="marital_status"
              id=""
              required
              onChange={onChange}
              value={formData?.marital_status}
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
            <label className="text-[#191C1F] font-[400] text-left">
              Date of Birth
            </label>
            <input
              type="date"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="date_of_birth"
              placeholder="Enter your Date of Birth"
              onChange={onChange}
              required
              value={formData?.date_of_birth}
            />
            <div className="">
              {kycPersonalInfoReducer?.error && (
                <div className="text-[#DB4444]">
                  {kycPersonalInfoReducer?.error}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              {kycPersonalInfoReducer?.loading ? (
                <div className="" style={{ height: "25px" }}>
                  <PulseLoader color="#ffffff" />
                </div>
              ) : (
                <>
                  <span>Continue</span>
                  <AiOutlineArrowRight />
                </>
              )}
            </button>

            <hr />
            <div className="text-[#475156] text-[11px] md:text-[15px]">
              Fill in the required information and click continue to proceed to
              next section
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default KycPersonalInfoBody;
