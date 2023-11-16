import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { UpdatePasswordAction } from "../../../redux/actions/userDashboard/profile.actions";
import { UPDATE_PASSWORD_RESET } from "../../../redux/constants/userDashboard/profile.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { passwordUpdateType } from "../../../redux/types/users.types";

const ChangePasswordModal = ({ showModal, handleClose }: any) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  // create category
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [formData, setFormData] = useState<passwordUpdateType>({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const { current_password, new_password, confirm_password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  let changePasswordRedux = useSelector(
    (state: ReducersType) => state?.updatePassword
  ) as ReduxResponseType<any>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (current_password && new_password && confirm_password) {
      dispatch(UpdatePasswordAction(formData) as any);
    }
  };
  useEffect(() => {
    // changePasswordRedux?.error &&
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     timer: 5000,
    //     text: changePasswordRedux?.error,
    //   });
    changePasswordRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: changePasswordRedux?.serverResponse?.message,
      });
    if (changePasswordRedux?.success) {
      setTimeout(function () {
        handleClose();
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: UPDATE_PASSWORD_RESET });
      }, 2000);
    }
  }, [changePasswordRedux, dispatch, handleClose]);
  return (
    <Modal
      className="modal top-[30%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
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
        <div className="py-6 px-3 flex flex-col gap-1 h-auto overflow-y-auto">
          <div className="flex flex-col w-full">
            <label className="font-[400] text-sm" htmlFor="121">
              Current Password
            </label>
            <input
              id="121"
              className="border p-2 rounded-md"
              type="text"
              autoFocus={true}
              placeholder="Current Password"
              onChange={onChange}
              required
              autoComplete="off"
              name="current_password"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-[400] text-sm" htmlFor="122">
              New Password
            </label>
            <input
              id="122"
              className="border p-2 rounded-md"
              type="text"
              placeholder="New Password"
              onChange={onChange}
              name="new_password"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-[400] text-sm" htmlFor="124">
              Confirm New Password
            </label>
            <input
              id="124"
              className="border p-2 rounded-md"
              type="text"
              placeholder="Confirm New Password"
              onChange={onChange}
              name="confirm_password"
              required
            />
          </div>
          <div className="">
            {changePasswordRedux?.error && (
              <div className="text-[#DB4444]">{changePasswordRedux?.error}</div>
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
          <button
            type="submit"
            className="p-2 border text-white bg-[#EDB842] rounded-md"
          >
            {changePasswordRedux?.loading ? (
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

export default ChangePasswordModal;
