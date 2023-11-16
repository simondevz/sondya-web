import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { userImage } from "../../../images/dashboard";
import {
  GetUserProfileAction,
  UpdateProfileAction,
} from "../../../redux/actions/userDashboard/profile.actions";
import { UPDATE_PROFILE_RESET } from "../../../redux/constants/userDashboard/profile.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import {
  adminUGetUserType,
  profileUpdateType,
} from "../../../redux/types/users.types";

type editprofileType = {
  showModal: any;
  handleClose: any;
  userData: adminUGetUserType;
};

const EditAccountInfoModal = ({
  showModal,
  handleClose,
  userData,
}: editprofileType) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  // fetch data
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<profileUpdateType>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    state: "",
    country: "",
    website_url: "",
    zip_code: "",
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

  const updateProfileRedux = useSelector(
    (state: ReducersType) => state?.updateProfile
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(UpdateProfileAction(formData) as any);
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
    updateProfileRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: updateProfileRedux?.serverResponse?.message,
      });
    if (updateProfileRedux?.success) {
      setTimeout(function () {
        dispatch(GetUserProfileAction() as any);
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: UPDATE_PROFILE_RESET });
      }, 2000);
    }
  }, [updateProfileRedux, dispatch]);

  return (
    <Modal
      className="modal top-[20%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="border-b flex justify-between p-4">
          <div className="font-[600] text-lg">Edit Account Info</div>
          <div>
            <span className="text-[1.5rem]" onClick={handleClose}>
              <AiOutlineCloseCircle />
            </span>
          </div>
        </div>
        <div className="py-6 px-3 flex flex-row gap-1 h-[60vh] md:h-auto overflow-y-auto">
          <div className="w-1/6">
            <img className="object-cover w-full" src={userImage} alt="" />
          </div>
          <div className="flex flex-col gap-1 px-2 w-5/6">
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  First name
                </label>
                <input
                  name="first_name"
                  className="border p-2 rounded-md"
                  type="text"
                  placeholder="Ade "
                  onChange={onChange}
                  value={formData.first_name}
                  autoFocus={true}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Last name
                </label>
                <input
                  name="last_name"
                  className="border p-2 rounded-md w-full"
                  type="text"
                  placeholder="Tiger"
                  onChange={onChange}
                  value={formData.last_name}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Username
                </label>
                <input
                  name="username"
                  className="border p-2 rounded-md"
                  type="text"
                  placeholder="Gilbert01"
                  onChange={onChange}
                  value={formData.username}
                  readOnly
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Email
                </label>
                <input
                  name="email"
                  className="border p-2 rounded-md w-full"
                  type="text"
                  placeholder="ade.gilbert@gmail.com"
                  onChange={onChange}
                  readOnly
                  value={formData.email}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Phone Number
                </label>
                <input
                  name="phone_number"
                  className="border p-2 rounded-md w-full"
                  type="text"
                  placeholder="+44 09525162"
                  onChange={onChange}
                  value={formData.phone_number}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  state
                </label>
                <input
                  name="state"
                  className="border p-2 rounded-md"
                  type="text"
                  placeholder="Florida"
                  onChange={onChange}
                  value={formData.state}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Country/Region
                </label>
                <input
                  name="country"
                  className="border p-2 rounded-md"
                  type="text"
                  placeholder="China"
                  onChange={onChange}
                  value={formData.country}
                />
              </div>
              {/* <div className="flex flex-col"> */}
              <div className="flex flex-row gap-1 w-1/2">
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="font-[400] text-sm" htmlFor="">
                    Zip code
                  </label>
                  <input
                    name="zip_code"
                    className="border p-2 rounded-md"
                    type="text"
                    placeholder="52101"
                    onChange={onChange}
                    value={formData.zip_code}
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="font-[400] text-sm" htmlFor="">
                    Website Url
                  </label>
                  <input
                    name="website_url"
                    className="border p-2 rounded-md"
                    type="text"
                    placeholder="http//.www...."
                    onChange={onChange}
                    value={formData.website_url}
                  />
                </div>
              </div>
              {/* </div> */}
              <div className="">
                {updateProfileRedux?.error && (
                  <div className="text-[#DB4444]">
                    {updateProfileRedux?.error}
                  </div>
                )}
              </div>
            </div>
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
            {updateProfileRedux?.loading ? (
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

export default EditAccountInfoModal;
