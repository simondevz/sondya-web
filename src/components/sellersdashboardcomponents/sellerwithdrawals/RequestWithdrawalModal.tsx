import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { Modal } from "react-overlays";

const RequestWithdrawalModal = ({ showModal, handleClose }: any) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );
  return (
    <Modal
      className="modal top-[30%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div>
        <div className="border-b flex justify-between p-2">
          <div className="font-[600] text-lg">Request Withdrawal</div>
          <div>
            <span className="text-[1.5rem]" onClick={handleClose}>
              <AiOutlineCloseCircle />
            </span>
          </div>
        </div>
        <div className="py-6 px-3 flex flex-col gap-1 h-auto overflow-y-auto">
          <div className="text-[#5F6C72] my-2">
            Enter amount to be received in your account
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-[400] text-sm" htmlFor="">
              Enter Account
            </label>
            <input
              className="border p-2 rounded-md"
              type="text"
              placeholder="Enter Account"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-[400] text-sm" htmlFor="">
              Select from existing accounts
            </label>
            <select className="border p-2 rounded-md" name="" id="">
              <option value="">Select from existing accounts </option>
            </select>
          </div>
          <button className="flex flex-row gap-2 items-center text-[#42526D] p-2">
            <span>
              <MdAdd />
            </span>
            <span>Add new account</span>
          </button>
        </div>
        <div className="border-t flex justify-end gap-3 p-3">
          <button
            className="p-2 border text-white bg-[#6f442b] rounded-md"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="p-2 border text-white bg-[#EDB842] rounded-md">
            Continue
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RequestWithdrawalModal;
