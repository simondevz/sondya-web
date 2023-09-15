import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { userImage } from "../../../images/dashboard";

// let rand = () => Math.floor(Math.random() * 20) - 10;

const EditAccountInfoModal = ({ showModal, handleClose }: any) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );
  //
  return (
    <Modal
      className="modal top-[20%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div className="flex flex-col">
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
                  Company Display name
                </label>
                <input
                  className="border p-2 rounded-md"
                  type="text"
                  placeholder="Ade Tiger"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  User name
                </label>
                <input
                  className="border p-2 rounded-md w-full"
                  type="text"
                  placeholder="Display name"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Full Name
                </label>
                <input
                  className="border p-2 rounded-md"
                  type="text"
                  placeholder="Adekunle Gilbert"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Email
                </label>
                <input
                  className="border p-2 rounded-md w-full"
                  type="text"
                  placeholder="ade.gilbert@gmail.com"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Secondary Email
                </label>
                <input
                  className="border p-2 rounded-md w-full"
                  type="text"
                  placeholder="ade12345@gmail.com"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Phone Number
                </label>
                <input
                  className="border p-2 rounded-md"
                  type="text"
                  placeholder="+234 1234 567 890"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Country/Region
                </label>
                <input
                  className="border p-2 rounded-md"
                  type="text"
                  placeholder="ade12345@gmail.com"
                />
              </div>
              {/* <div className="flex flex-col"> */}
              <div className="flex flex-row gap-1 w-1/2">
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="font-[400] text-sm" htmlFor="">
                    Country/Region
                  </label>
                  <input
                    className="border p-2 rounded-md"
                    type="text"
                    placeholder="ade12345@gmail.com"
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="font-[400] text-sm" htmlFor="">
                    Phone Number
                  </label>
                  <input className="border p-2 rounded-md" type="text" />
                </div>
              </div>
              {/* </div> */}
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

export default EditAccountInfoModal;
