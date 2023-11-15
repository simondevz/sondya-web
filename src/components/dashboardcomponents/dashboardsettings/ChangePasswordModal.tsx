import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";

const ChangePasswordModal = ({ showModal, handleClose }: any) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  // // change password code
  // const dispatch = useDispatch();
  // const [formData, setFormData] = useState<passwordUpdateType>({
  //   current_password: "",
  //   new_password: "",
  //   confirm_password: "",
  // });

  return (
    <Modal
      className="modal top-[30%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div>
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
            <label className="font-[400] text-sm" htmlFor="">
              Current Password
            </label>
            <input
              className="border p-2 rounded-md"
              type="text"
              placeholder="Current Password"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-[400] text-sm" htmlFor="">
              New Password
            </label>
            <input
              className="border p-2 rounded-md"
              type="text"
              placeholder="New Password"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-[400] text-sm" htmlFor="">
              Confirm New Password
            </label>
            <input
              className="border p-2 rounded-md"
              type="text"
              placeholder="Confirm New Password"
            />
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
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
