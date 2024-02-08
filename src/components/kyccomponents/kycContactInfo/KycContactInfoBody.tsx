import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import countryData from "../../../data/countries.json";
import { kycContactInfoAction } from "../../../redux/actions/userDashboard/kyc.actions";
import { GetUserProfileAction } from "../../../redux/actions/userDashboard/profile.actions";
import { KYC_CONTACT_INFO_RESET } from "../../../redux/constants/userDashboard/kyc.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { kycContactInfoType } from "../../../redux/types/kyc.types";
import { adminUGetUserType } from "../../../redux/types/users.types";

const KycContactInfoBody = () => {
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

  const [formData, setFormData] = useState<kycContactInfoType>({
    address: "",
    phone_number: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (getProfileDetailsRedux?.serverResponse?.data) {
      setFormData((prevState) => ({
        ...prevState,
        ...getProfileDetailsRedux?.serverResponse?.data,
      }));
    }
  }, [getProfileDetailsRedux?.serverResponse?.data]);

  const kycContactInfoReducer = useSelector(
    (state: ReducersType) => state?.kycContactInfo
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(kycContactInfoAction(formData) as any);
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
    kycContactInfoReducer?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: kycContactInfoReducer?.serverResponse?.message,
      });
    if (kycContactInfoReducer?.success) {
      setTimeout(function () {
        // dispatch(GetUserProfileAction() as any);
        navigate("/kyc/document");
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: KYC_CONTACT_INFO_RESET });
      }, 2000);
    }
  }, [kycContactInfoReducer, dispatch, navigate]);
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col p-3 md:p-10 h-full w-full justify-center items-center my-10">
        <div className="bg-[#EDB84233] flex flex-row p-3 md:p-10 text-center items-center max-w-xl rounded-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-[#FFFFFF] m-0 w-full py-8 px-3 md:px-6 rounded-md shadow-lg flex flex-col gap-4"
          >
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Contact Infomation
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Fill in the information below
            </div>

            <label className="text-[#191C1F] font-[400] text-left">
              Residential Address
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="address"
              placeholder="Enter your Residential Address"
              autoFocus={true}
              onChange={onChange}
              value={formData?.address}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Phone Number
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="phone_number"
              placeholder="Enter your Phone Number"
              autoFocus={true}
              onChange={onChange}
              value={formData?.phone_number}
            />
            <label className="text-[#191C1F] font-[400] text-left">City</label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="city"
              placeholder="Enter your City"
              autoFocus={true}
              onChange={onChange}
              value={formData?.city}
            />
            <label className="text-[#191C1F] font-[400] text-left">State</label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="state"
              placeholder="Enter your State"
              autoFocus={true}
              onChange={onChange}
              value={formData?.state}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Country
            </label>
            <select
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="country"
              id="country"
              onChange={onChange}
              value={formData?.country}
              required
            >
              {countryData.map((t, i) => {
                return (
                  <option key={i} value={t.label}>
                    {t.label}
                  </option>
                );
              })}
            </select>

            <div className="">
              {kycContactInfoReducer?.error && (
                <div className="text-[#DB4444]">
                  {kycContactInfoReducer?.error}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              {kycContactInfoReducer?.loading ? (
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

export default KycContactInfoBody;
