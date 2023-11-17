import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import {
  GetUserProfileAction,
  UpdateSocialsAction,
} from "../../../redux/actions/userDashboard/profile.actions";
import { UPDATE_SOCIALS_RESET } from "../../../redux/constants/userDashboard/profile.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import {
  adminUGetUserType,
  socialsUpdateType,
} from "../../../redux/types/users.types";

type editsocialType = {
  showModal: any;
  handleClose: any;
  userData: adminUGetUserType;
};

const EditSocialMediaModal = ({
  showModal,
  handleClose,
  userData,
}: editsocialType) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  // fetch data
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<socialsUpdateType>({
    facebook_url: "",
    linkedin_url: "",
    youtube_url: "",
    instagram_url: "",
    twitter_url: "",
    tiktok_url: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setFormData({ ...userData });
    }, 2000);
  }, [userData]);

  // update data
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateProfileSocialRedux = useSelector(
    (state: ReducersType) => state?.updateSocials
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(UpdateSocialsAction(formData) as any);
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
    updateProfileSocialRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: updateProfileSocialRedux?.serverResponse?.message,
      });
    if (updateProfileSocialRedux?.success) {
      setTimeout(function () {
        dispatch(GetUserProfileAction() as any);
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: UPDATE_SOCIALS_RESET });
      }, 2000);
    }
  }, [updateProfileSocialRedux, dispatch]);

  // console.log(formData);
  return (
    <Modal
      className="modal top-[20%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <form onSubmit={handleSubmit}>
        <div className="border-b flex justify-between p-2">
          <div className="font-[600] text-lg">Edit Account Info</div>
          <div>
            <span className="text-[1.5rem]" onClick={handleClose}>
              <AiOutlineCloseCircle />
            </span>
          </div>
        </div>
        <div className="py-6 px-3 flex flex-col gap-1 h-[60vh] md:h-auto overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Facebook
              </label>
              <input
                name="facebook_url"
                className="border p-2 rounded-md"
                type="text"
                placeholder="profile link/url"
                value={formData?.facebook_url}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Youtube
              </label>
              <input
                name="youtube_url"
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="profile link/url"
                value={formData.youtube_url}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Instagram
              </label>
              <input
                name="instagram_url"
                className="border p-2 rounded-md"
                type="text"
                placeholder="profile link/url"
                value={formData.instagram_url}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Tiktok
              </label>
              <input
                name="tiktok_url"
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="profile link/url"
                value={formData.tiktok_url}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Linkdln
              </label>
              <input
                name="linkedin_url"
                className="border p-2 rounded-md"
                type="text"
                placeholder="profile link/url"
                value={formData.linkedin_url}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Twitter
              </label>
              <input
                name="twitter_url"
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="profile link/url"
                value={formData.twitter_url}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="">
            {updateProfileSocialRedux?.error && (
              <div className="text-[#DB4444]">
                {updateProfileSocialRedux?.error}
              </div>
            )}
          </div>
        </div>
        <div className="border-t flex justify-end gap-3 p-3">
          <button
            className="p-2 border text-white bg-[#6f442b] rounded-md"
            onClick={handleClose}
          >
            Close
          </button>
          <button className="p-2 border text-white bg-[#EDB842] rounded-md">
            {updateProfileSocialRedux?.loading ? (
              <div className="" style={{ height: "25px" }}>
                <PulseLoader color="#ffffff" />
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditSocialMediaModal;
