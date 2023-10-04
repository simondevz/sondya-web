import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import "../../../css/modal.css";
import {
  Facebook,
  Google,
  Instagram,
  Pinterest,
  Reddit,
  Telegram,
  Twitter,
  Whatsapp,
  userImage,
} from "../../../images/dashboard";
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
                  className="object-cover rounded-full"
                  src={userImage}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[#191C1F]">Adekunle Gilbert</div>
                <div className="text-[#5F6C72]">Dhaka - 1207, Bangladesh</div>
              </div>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Username:</span>
              <span className="text-[#5F6C72]"> kevin12345@gmail.com</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Email:</span>
              <span className="text-[#5F6C72]"> ade.gilbert@gmail.com</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Sec Email:</span>
              <span className="text-[#5F6C72]">kevin12345@gmail.com</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Country:</span>
              <span className="text-[#5F6C72]">+234 1234 567 890</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">State:</span>
              <span className="text-[#5F6C72]">+234 1234 567 890</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Zip Code:</span>
              <span className="text-[#5F6C72]">+234 1234 567 890</span>
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
              <div className="text-[#191C1F]">Adekunle Gilbert</div>
              <div className="text-[#5F6C72]">
                East Ikoyi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C,
                Flat No. 5D, Ikeja - 1200, Lagos
              </div>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Phone:</span>
              <span className="text-[#5F6C72]">+234 1234 567 890</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Email:</span>
              <span className="text-[#5F6C72]"> ade.gilbert@gmail.com</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Website:</span>
              <span className="text-[#5F6C72]"> ade.gilbert@gmail.com</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Contact Person:</span>
              <span className="text-[#5F6C72]"> ade.gilbert@gmail.com</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Designation:</span>
              <span className="text-[#5F6C72]"> ade.gilbert@gmail.com</span>
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
          <img className="object-cover w-8 h-8" src={Facebook} alt="" />
          <img className="object-cover w-8 h-8" src={Instagram} alt="" />
          <img className="object-cover w-8 h-8" src={Google} alt="" />
          <img className="object-cover w-8 h-8" src={Twitter} alt="" />
          <img className="object-cover w-8 h-8" src={Telegram} alt="" />
          <img className="object-cover w-8 h-8" src={Reddit} alt="" />
          <img className="object-cover w-8 h-8" src={Whatsapp} alt="" />
          <img className="object-cover w-8 h-8" src={Pinterest} alt="" />
        </div>
        <button
          onClick={() => setEditSocialMedia(true)}
          className="py-2 bg-[#EDB842] text-white rounded-md w-fit self-start px-4 my-3"
        >
          Edit Account
        </button>
      </div>
      <div className="flex flex-col gap-2 max-w-[40rem]">
        <div className="font-[600] text-[#191F33] text-xl">
          Verify Your Account
        </div>
        <div className="text-[#767E94]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan
          felis nunc, ut sagittis augue imperdiet quis. Vestibulum bibendum
          ultricies ipsum.
        </div>
        <div className="text-[#767E94]">
          <h4>Rules & Regulations</h4>
          <ul className="ms-4">
            <li>asdfasdf</li>
            <li>asd0fasdfadfasdf</li>
            <li>adf0asdfasd</li>
          </ul>
        </div>
        <button className="py-2 bg-[#EDB842] text-white rounded-md w-fit self-start px-4 my-3">
          Verify Now
        </button>
      </div>
      <div className="flex flex-col gap-2 max-w-[40rem]">
        <div className="font-[600] text-[#191F33] text-xl">Change Password</div>
        <div className="text-[#767E94]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan
          felis nunc, ut sagittis augue imperdiet quis. Vestibulum bibendum
          ultricies ipsum.
        </div>
        <button
          onClick={() => setEditPassword(true)}
          className="py-2 bg-[#EDB842] text-white rounded-md w-fit self-start px-4 my-3"
        >
          Verify Now
        </button>
      </div>
      <div className="flex flex-col gap-2 max-w-[40rem]">
        <div className="font-[600] text-[#191F33] text-xl">Delete Account</div>
        <div className="text-[#767E94]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan
          felis nunc, ut sagittis augue imperdiet quis. Vestibulum bibendum
          ultricies ipsum, id suscipit ligula facilisis ac. Praesent ultricies
          augue metus
        </div>
        <button className="py-2 bg-[#FFE5E5] text-[#FF4F4F] rounded-md w-fit self-start px-4 my-3 flex flex-row gap-2 items-center">
          <MdDeleteOutline />
          <span>Delete Account</span>
        </button>
      </div>
      <div className="overflow-y-scroll">
        <EditAccountInfoModal
          showModal={EditAccounInfo}
          handleClose={() => setEditAccounInfo(false)}
        />
        <ChangePasswordModal
          showModal={EditPassword}
          handleClose={() => setEditPassword(false)}
        />
        <EditCompanyDetailsModal
          showModal={EditCompanyDetails}
          handleClose={() => setEditCompanyDetails(false)}
        />
        <EditSocialMediaModal
          showModal={EditSocialMedia}
          handleClose={() => setEditSocialMedia(false)}
        />
      </div>
    </section>
  );
};

export default DashboardSettingsBody;
