import { useEffect, useState } from "react";
import { BsWhatsapp, BsYoutube } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../css/modal.css";
import {
  Facebook,
  Instagram,
  Twitter,
  userImage,
} from "../../../images/dashboard";
import { GetUserProfileAction } from "../../../redux/actions/userDashboard/profile.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { adminUGetUserType } from "../../../redux/types/users.types";
import ChangePasswordModal from "./ChangePasswordModal";
import EditAccountInfoModal from "./EditAccountInfoModal";
import EditCompanyDetailsModal from "./EditCompanyDetailsModal";
import EditSocialMediaModal from "./EditSocialMediaModal";

const DashboardSettingsBody = () => {
  // React state to control Modal visibility
  const [EditAccounInfo, setEditAccounInfo] = useState(false);
  const [EditCompanyDetails, setEditCompanyDetails] = useState(false);
  const [EditSocialMedia, setEditSocialMedia] = useState(false);
  const [EditPassword, setEditPassword] = useState(false);

  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<adminUGetUserType>({
    _id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    type: "",
    phone_number: "",
    address: "",
    state: "",
    country: "",
    zip_code: "",
    status: "",
    website_url: "",
    image: [],

    //social media
    facebook_url: "",
    linkedin_url: "",
    youtube_url: "",
    instagram_url: "",
    twitter_url: "",
    tiktok_url: "",

    //new
    city: "",
    currency: "",
    language: "",

    //company details
    company_details: {
      company_name: "",
      company_website: "",
      company_email: "",
      contact_person_name: "",
      contact_person_number: "",
    },

    // kyc stuffs
    gender: "",
    marital_status: "",
    date_of_birth: "",
    email_verified: false,
    kyc_completed: false,
  });

  const getProfileDetailsRedux = useSelector(
    (state: ReducersType) => state?.getProfile
  ) as ReduxResponseType<adminUGetUserType>;

  useEffect(() => {
    dispatch(GetUserProfileAction() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getProfileDetailsRedux?.serverResponse.data) {
      setUserData({
        ...getProfileDetailsRedux?.serverResponse?.data,
      });
    }
  }, [getProfileDetailsRedux?.serverResponse, dispatch]);

  // console.log(getProfileDetailsRedux.serverResponse);
  return (
    <section className="flex flex-col gap-3 overflow-hidden">
      <div className="flex flex-wrap gap-3 justify-start w-full">
        <div className="flex flex-col border max-w-[20rem]">
          <div className="p-3 border text-[#191C1F] font-[700] playfair-display">
            Account Info
          </div>
          <div className="flex flex-col gap-2 p-3 border flex-grow">
            <div className="flex flex-row gap-2">
              <div className="">
                <img
                  className="object-cover rounded-full w-16 h-16"
                  src={
                    userData.image?.[0]?.url
                      ? userData.image[0]?.url
                      : userImage
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[#191C1F]">
                  {userData.last_name} {userData.first_name}
                </div>
                <div className="text-[#5F6C72]">{userData.address}</div>
              </div>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Username:</span>
              <span className="text-[#5F6C72]"> {userData.username}</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Email:</span>
              <span className="text-[#5F6C72]"> {userData.email}</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Phone Number:</span>
              <span className="text-[#5F6C72]">{userData.phone_number}</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Country:</span>
              <span className="text-[#5F6C72]">{userData.country}</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">State:</span>
              <span className="text-[#5F6C72]">{userData.state}</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Zip Code:</span>
              <span className="text-[#5F6C72]">{userData.zip_code}</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">City:</span>
              <span className="text-[#5F6C72]">{userData.city}</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Currency:</span>
              <span className="text-[#5F6C72]">{userData.currency}</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Language:</span>
              <span className="text-[#5F6C72]">{userData.language}</span>
            </div>
            <button
              onClick={() => setEditAccounInfo(true)}
              className="py-2 bg-[#EDB842] text-white rounded-md w-fit self-center px-4 my-3"
            >
              Edit Account
            </button>
          </div>
        </div>
        <div className="flex flex-col border max-w-[20rem]">
          <div className="p-3 border text-[#191C1F]  font-[700] playfair-display">
            Company Details
          </div>
          <div className="flex flex-col gap-2 p-3 border flex-grow">
            <div className="">
              <div className="text-[#191C1F]">
                {userData?.last_name} {userData?.first_name}
              </div>
              <div className="text-[#5F6C72]">{userData.address}</div>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Company Name:</span>
              <span className="text-[#5F6C72]">
                {userData?.company_details?.company_name}
              </span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Company Website:</span>
              <span className="text-[#5F6C72]">
                {" "}
                {userData?.company_details?.company_website}
              </span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Contact Person Name:</span>
              <span className="text-[#5F6C72]">
                {" "}
                {userData?.company_details?.contact_person_name}
              </span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Company Number:</span>
              <span className="text-[#5F6C72]">
                {" "}
                {userData?.company_details?.contact_person_number}
              </span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Company Email:</span>
              <span className="text-[#5F6C72]">
                {" "}
                {userData?.company_details?.company_email}
              </span>
            </div>
            <button
              onClick={() => setEditCompanyDetails(true)}
              className="py-2 bg-[#EDB842] text-white rounded-md w-fit self-center px-4 my-3"
            >
              Edit Account
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-[600] playfair-display text-[#243A73]">
          Socials
        </div>
        <div className="flex flex-row gap-2">
          <a href={userData.facebook_url}>
            <img className="object-cover w-8 h-8" src={Facebook} alt="" />
          </a>
          <a href={userData.instagram_url}>
            <img className="object-cover w-8 h-8" src={Instagram} alt="" />
          </a>

          <a href={userData.twitter_url}>
            {" "}
            <img className="object-cover w-8 h-8" src={Twitter} alt="" />
          </a>

          <a className="text-3xl" href={userData.linkedin_url}>
            {" "}
            <FaLinkedinIn />
          </a>

          <a className="text-3xl" href={userData.tiktok_url}>
            <BsWhatsapp />
          </a>

          <a className="text-3xl" href={userData.youtube_url}>
            <BsYoutube />
          </a>
        </div>
        <div className="font-[600] text-[#191F33] text-xl mt-5">
          Edit socials
        </div>
        <div className="text-[#767E94]">
          Here you can edit your socials account. It includes where on can get
          you on all social media pages.
        </div>
        <button
          onClick={() => setEditSocialMedia(true)}
          className="py-2 bg-[#EDB842] text-white rounded-md w-fit self-start px-4 my-3"
        >
          Edit Socials
        </button>
      </div>
      <div className="w-full py-2 font-[600] text-lg gap-3 text-left">
        Referal link:{" "}
        {window.location.origin + "/register?referrer=" + userData.email}{" "}
        <button
          className="bg-[#EDB842] rounded-md p-2 md:m-3 text-white"
          onClick={() => navigate("/referal")}
        >
          Go to referal page
        </button>
      </div>
      <div className="flex flex-col gap-2 max-w-[40rem]">
        <div className="font-[600] text-[#191F33] text-xl">Change Password</div>
        <div className="text-[#767E94]">
          Here you can change the password of your account. You have to know
          your previous password to use the change password modal
        </div>
        <button
          onClick={() => setEditPassword(true)}
          className="py-2 bg-[#EDB842] text-white rounded-md w-fit self-start px-4 my-3"
        >
          Change password
        </button>
      </div>
      <div className="flex flex-col gap-2 max-w-[40rem]">
        <div className="font-[600] text-[#191F33] text-xl">
          Join Sellers(Kyc)
        </div>
        <div className="text-[#767E94]">
          To Join sellers and sell products and services on our website, you
          have to complete your Kyc registrations
        </div>
        <div className="flex items-center gap-2">
          <span className="font-[600]">kyc status</span> :{" "}
          {userData.kyc_completed ? (
            <div className="flex items-center gap-2">
              Completed{" "}
              <span className="text-green-700 text-xl">
                <MdVerified />
              </span>{" "}
            </div>
          ) : (
            <div className="text-red-400"> Incomplete</div>
          )}
        </div>
        {!userData.kyc_completed && (
          <button
            onClick={() => navigate("/kyc/verify/email")}
            className="py-2 bg-[#EDB842] text-white rounded-md w-fit self-start px-4 my-3"
          >
            Fill Kyc Details
          </button>
        )}
        {userData.kyc_completed && (
          <button
            onClick={() => navigate("/kyc/verify/email")}
            className="py-2 bg-[#EDB842] text-white rounded-md w-fit self-start px-4 my-3"
          >
            Update Kyc Details
          </button>
        )}
      </div>
      <div className="overflow-y-scroll">
        <EditAccountInfoModal
          showModal={EditAccounInfo}
          handleClose={() => setEditAccounInfo(false)}
          userData={userData}
        />
        <ChangePasswordModal
          showModal={EditPassword}
          handleClose={() => setEditPassword(false)}
        />
        <EditCompanyDetailsModal
          showModal={EditCompanyDetails}
          handleClose={() => setEditCompanyDetails(false)}
          userData={userData}
        />
        <EditSocialMediaModal
          showModal={EditSocialMedia}
          handleClose={() => setEditSocialMedia(false)}
          userData={userData}
        />
      </div>
    </section>
  );
};

export default DashboardSettingsBody;
