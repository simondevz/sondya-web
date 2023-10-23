import { useState } from "react";
import { AiOutlineArrowRight, AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { circleWavy, circleWavyFailure } from "../../../images";

const TransferPaymentModal = ({ showModal, handleClose }: any) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  const [status] = useState<string>("main");
  return (
    <Modal
      className="modal top-[30%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div className="p-2">
        {status === "main" ? (
          <TransferContent
            showModal={showModal}
            handleClose={() => handleClose(false)}
          />
        ) : status === "success" ? (
          <TransferSuccess
            showModal={showModal}
            handleClose={() => handleClose(false)}
          />
        ) : (
          <TransferFailure
            showModal={showModal}
            handleClose={() => handleClose(false)}
          />
        )}
      </div>
    </Modal>
  );
};

const TransferSuccess = ({ showModal, handleClose }: any) => {
  return (
    <div className="w-full h-[45vh] flex flex-col items-center justify-center text-center p-3 md:p-5">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <img src={circleWavy} alt="" />
        <div className="text-3xl font-[700] playfair-display">
          Payment is sucessful
        </div>
        <div className="text-sm text-[#767E94]">
          Proin placerat risus non justo faucibus commodo. Nunc non neque sit
          amet magna aliquam condimentum.
        </div>
        <div className="flex flex-row gap-3">
          <button
            onClick={handleClose}
            className="rounded-md border-2 border-[#EDB842] p-2 text-[#EDB842]"
          >
            Go back
          </button>
          <button className="flex flex-row gap-2 items-center text-white bg-[#EDB842] rounded-md p-2">
            <span>View details</span>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
const TransferFailure = ({ showModal, handleClose }: any) => {
  return (
    <div className="w-full h-[45vh] flex flex-col items-center justify-center text-center p-3 md:p-5">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <img src={circleWavyFailure} alt="" />
        <div className="text-3xl font-[700] playfair-display">
          Payment was unsucessful
        </div>
        <div className="text-sm text-[#767E94]">
          Proin placerat risus non justo faucibus commodo. Nunc non neque sit
          amet magna aliquam condimentum.
        </div>
        <div className="flex flex-row gap-3">
          <button
            onClick={handleClose}
            className="rounded-md border-2 border-[#EDB842] p-2 text-[#EDB842]"
          >
            Go back
          </button>
          <button className="flex flex-row gap-2 items-center text-white bg-[#EDB842] rounded-md p-2">
            <span>View details</span>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
const TransferContent = ({ showModal, handleClose }: any) => {
  return (
    <div className="">
      <div className="border-b flex justify-between p-2">
        <div className="font-[600] text-lg">Transfer</div>
        <div>
          <span className="text-[1.5rem]" onClick={handleClose}>
            <AiOutlineCloseCircle />
          </span>
        </div>
      </div>
      <div className="py-6 px-3 flex flex-col gap-1 h-auto overflow-y-auto">
        <div className="flex flex-col w-full">
          <label className="font-[400] text-sm" htmlFor="">
            Transfer to
          </label>
          <input
            className="border p-2 rounded-md bg-[#D9D9D970]"
            type="text"
            placeholder="Adekunle Scoba"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="font-[400] text-sm" htmlFor="">
            Bank
          </label>
          <input
            className="border p-2 rounded-md bg-[#D9D9D970]"
            type="text"
            placeholder="First Bank"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="font-[400] text-sm" htmlFor="">
            Email
          </label>
          <input
            className="border p-2 rounded-md bg-[#D9D9D970]"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="font-[400] text-sm" htmlFor="">
            Pay from (Bank)
          </label>
          <input
            className="border p-2 rounded-md bg-[#D9D9D970]"
            type="text"
            placeholder="FirstBank"
          />
        </div>
        <div className="flex flex-col w-1/3">
          <label className="font-[400] text-sm" htmlFor="">
            Enter Token
          </label>
          <input
            className="border p-2 rounded-md bg-[#D9D9D970]"
            type="text"
            placeholder="FirstBank"
          />
        </div>
      </div>
      <div className="border-t flex justify-end gap-3 p-3">
        <button className="py-2 px-5 border text-white bg-[#EDB842] rounded-md">
          Pay
        </button>
        <button
          className="py-2 px-5 border text-white bg-[#ED4242B0] rounded-md"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TransferPaymentModal;
