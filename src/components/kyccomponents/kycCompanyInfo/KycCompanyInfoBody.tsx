import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { kycCompanyInfoAction } from "../../../redux/actions/userDashboard/kyc.actions";
import { GetUserProfileAction } from "../../../redux/actions/userDashboard/profile.actions";
import { KYC_COMPANY_INFO_REQUEST } from "../../../redux/constants/userDashboard/kyc.constants";
import { ReducersType } from "../../../redux/store";
import { CompanyDetailsType } from "../../../redux/types/company_details.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { adminUGetUserType } from "../../../redux/types/users.types";

const KycCompanyInfoBody = () => {
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

  const [formData, setFormData] = useState<CompanyDetailsType>({
    company_name: "",
    company_website: "",
    company_email: "",
    contact_person_name: "",
    contact_person_number: "",
  });

  useEffect(() => {
    if (getProfileDetailsRedux?.serverResponse?.data) {
      setFormData((prevState) => ({
        ...prevState,
        ...getProfileDetailsRedux?.serverResponse?.data?.company_details,
      }));
    }
  }, [getProfileDetailsRedux?.serverResponse?.data]);

  const kycCompanyInfoReducer = useSelector(
    (state: ReducersType) => state?.kycCompanyInfo
  ) as ReduxResponseType;
  // console.log(kycCompanyInfoReducer);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(kycCompanyInfoAction(formData) as any);
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
    kycCompanyInfoReducer?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: kycCompanyInfoReducer?.serverResponse?.message,
      });
    if (kycCompanyInfoReducer?.success) {
      setTimeout(function () {
        // dispatch(GetUserProfileAction() as any);
        navigate("/seller/dashboard");
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: KYC_COMPANY_INFO_REQUEST });
      }, 2000);
    }
  }, [kycCompanyInfoReducer, dispatch, navigate]);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col p-3 md:p-10 h-full w-full justify-center items-center my-10">
        <div className="bg-[#EDB84233] flex flex-row p-3 md:p-10 text-center items-center max-w-xl rounded-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-[#FFFFFF] m-0 w-full py-8 px-3 md:px-6 rounded-md shadow-lg flex flex-col gap-4"
          >
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Company Infomation
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Fill in the information below
            </div>

            <label className="text-[#191C1F] font-[400] text-left">
              Company Name
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="company_name"
              placeholder="Enter your Company Name"
              autoFocus={true}
              onChange={onChange}
              value={formData?.company_name}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Company Website
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="company_website"
              placeholder="Enter your Last Name"
              onChange={onChange}
              value={formData?.company_website}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Company Email
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="company_email"
              placeholder="Enter Company Email"
              onChange={onChange}
              value={formData?.company_email}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Contact Person Name
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="contact_person_name"
              placeholder="Enter Contact Person Name"
              onChange={onChange}
              value={formData?.contact_person_name}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Contact Person Number
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="contact_person_number"
              placeholder="Enter Contact Person Number"
              onChange={onChange}
              value={formData?.contact_person_number}
            />
            <div className="">
              {kycCompanyInfoReducer?.error && (
                <div className="text-[#DB4444]">
                  {kycCompanyInfoReducer?.error}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              {kycCompanyInfoReducer?.loading ? (
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

export default KycCompanyInfoBody;
