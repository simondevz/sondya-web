import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";

const EditCompanyDetailsModal = ({ showModal, handleClose }: any) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );
  return (
    <Modal
      className="modal top-[20%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div>
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
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Company name
              </label>
              <input
                className="border p-2 rounded-md"
                type="text"
                placeholder="Ade Tiger"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Company GST No.
              </label>
              <input
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Adekunle"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Company Website
              </label>
              <input
                className="border p-2 rounded-md"
                type="text"
                placeholder="Ade Tiger"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Contact Person Name
              </label>
              <input
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Adekunle"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Designation
              </label>
              <input
                className="border p-2 rounded-md"
                type="text"
                placeholder="Ade Tiger"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                Contact Number
              </label>
              <input
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Adekunle"
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
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-[400] text-sm" htmlFor="">
                No of Employess
              </label>
              <input
                className="border p-2 rounded-md w-full"
                type="text"
                placeholder="Adekunle"
              />
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
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditCompanyDetailsModal;
