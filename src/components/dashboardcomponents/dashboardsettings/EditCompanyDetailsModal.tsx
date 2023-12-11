import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import {
  GetUserProfileAction,
  UpdateCompanyDetailsAction,
} from "../../../redux/actions/userDashboard/profile.actions";
import { UPDATE_COMPANY_DETAILS_RESET } from "../../../redux/constants/userDashboard/profile.constants";
import { ReducersType } from "../../../redux/store";
import { CompanyDetailsType } from "../../../redux/types/company_details.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { adminUGetUserType } from "../../../redux/types/users.types";
type editsocialType = {
  showModal: any;
  handleClose: any;
  userData: adminUGetUserType;
};

const EditCompanyDetailsModal = ({
  showModal,
  handleClose,
  userData,
}: editsocialType) => {
  // Backdrop JSX codey
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  // fetch data
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<CompanyDetailsType>({
    company_name: "",
    company_website: "",
    company_email: "",
    contact_person_name: "",
    contact_person_number: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setFormData({ ...userData.company_details });
    }, 2000);
  }, [userData]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateCompanyDetailsRedux = useSelector(
    (state: ReducersType) => state?.updateCompanyDetails
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(UpdateCompanyDetailsAction(formData) as any);
  };

  useEffect(() => {
    // updateProfileSocialRedux?.error &&
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     timer: 5000,
    //     text: updateProfileSocialRedux?.error,
    //   });
    updateCompanyDetailsRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: updateCompanyDetailsRedux?.serverResponse?.message,
      });
    if (updateCompanyDetailsRedux?.success) {
      setTimeout(function () {
        dispatch(GetUserProfileAction() as any);
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: UPDATE_COMPANY_DETAILS_RESET });
      }, 2000);
    }
  }, [updateCompanyDetailsRedux, dispatch]);
  return (
    <Modal
      className="modal top-[20%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <form onSubmit={handleSubmit}>
        <div className="border-b flex justify-between p-2">
          <div className="font-[600] text-lg">Company Details</div>
          <div>
            <span className="text-[1.5rem]" onClick={handleClose}>
              <AiOutlineCloseCircle />
            </span>
          </div>
        </div>
        <div className="py-6 px-3 flex flex-col gap-1 h-[60vh] md:h-auto overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col w-full">
              <label className="font-[400] text-sm" htmlFor="">
                Company Name
              </label>
              <input
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Snappy"
                onChange={onChange}
                name="company_name"
                value={formData.company_name}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col w-full">
              <label className="font-[400] text-sm" htmlFor="">
                Company Website
              </label>
              <input
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Snappy"
                onChange={onChange}
                name="company_website"
                value={formData.company_website}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col w-full">
              <label className="font-[400] text-sm" htmlFor="">
                Contact Person Name
              </label>
              <input
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Snappy"
                onChange={onChange}
                name="contact_person_name"
                value={formData.contact_person_name}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Company email
              </label>
              <input
                className="border p-2 rounded-md"
                type="text"
                placeholder="Ade Tiger"
                onChange={onChange}
                name="company_email"
                value={formData.company_email}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Contact Person Number
              </label>
              <input
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Adekunle"
                onChange={onChange}
                name="contact_person_number"
                value={formData.contact_person_number}
              />
            </div>
          </div>
          <div className="">
            {updateCompanyDetailsRedux?.error && (
              <div className="text-[#DB4444]">
                {updateCompanyDetailsRedux?.error}
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
            {updateCompanyDetailsRedux?.loading ? (
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

export default EditCompanyDetailsModal;
