import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { adminCreateUserAction } from "../../../redux/actions/admin/users.actions";
import { ADMIN_CREATE_USER_RESET } from "../../../redux/constants/admin/users.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { adminCreateUserType } from "../../../redux/types/users.types";

const AdminCreateUserModal = ({ showModal, handleClose }: any) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  //handle form
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<adminCreateUserType>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, username, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  let adminCreateUserRedux = useSelector(
    (state: ReducersType) => state?.adminCreateUser
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (first_name && last_name && email && username && password) {
      dispatch(adminCreateUserAction(formData) as any);
    }
  };

  useEffect(() => {
    adminCreateUserRedux?.error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: adminCreateUserRedux?.error,
      });
    adminCreateUserRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: adminCreateUserRedux?.serverResponse?.message,
      });
    if (adminCreateUserRedux?.success) {
      setTimeout(function () {
        // navigate("/auth/success");
        handleClose();
      }, 6000);
    }

    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch({ type: ADMIN_CREATE_USER_RESET });
    }, 2000);
  }, [navigate, adminCreateUserRedux, handleClose, dispatch]);

  return (
    <Modal
      className="modal top-[30%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <form onSubmit={handleSubmit}>
        <div className="border-b flex justify-between p-2">
          <div className="font-[600] text-lg">Create User</div>
          <div>
            <span className="text-[1.5rem]" onClick={handleClose}>
              <AiOutlineCloseCircle />
            </span>
          </div>
        </div>
        <div className="py-6 px-3 flex flex-col gap-1 h-auto overflow-y-auto">
          <div className="flex flex-col w-full">
            <label className="font-[400] text-sm" htmlFor="">
              First Name
            </label>
            <input
              name="first_name"
              className="border p-2 rounded-md bg-[#D9D9D970]"
              type="text"
              placeholder="First Name"
              autoFocus={true}
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-[400] text-sm" htmlFor="">
              Last Name
            </label>
            <input
              name="last_name"
              className="border p-2 rounded-md bg-[#D9D9D970]"
              type="text"
              placeholder="Last Name"
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-[400] text-sm" htmlFor="">
              Email
            </label>
            <input
              name="email"
              className="border p-2 rounded-md bg-[#D9D9D970]"
              type="email"
              placeholder="Email"
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-[400] text-sm" htmlFor="">
              Username
            </label>
            <input
              name="username"
              className="border p-2 rounded-md bg-[#D9D9D970]"
              type="text"
              placeholder="Username"
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-[400] text-sm" htmlFor="">
              Password
            </label>
            <input
              name="password"
              className="border p-2 rounded-md bg-[#D9D9D970]"
              type="text"
              placeholder="Password"
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="border-t flex justify-end gap-3 p-3">
          <button
            type="button"
            className="p-2 border text-white bg-[#6f442b] rounded-md"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="p-2 border text-white bg-[#EDB842] rounded-md"
          >
            {adminCreateUserRedux?.loading ? (
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

export default AdminCreateUserModal;
