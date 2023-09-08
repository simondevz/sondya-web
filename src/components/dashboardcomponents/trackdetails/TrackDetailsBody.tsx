import { BiMap, BiSolidPackage } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import { PiNotebookLight } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { trackRod1 } from "../../../images/cart";

const TrackDetailsBody = () => {
  return (
    <section className="p-1 md:p-5 w-full">
      <div className="w-full shadow-md p-2 md:p-3 flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <div className="playfair-display font-[600] text-2xl">
            Order ID:
            <span className="font-[700]">#96459761</span>
          </div>
          <div className="flex flex-row gap-3">
            <button className="p-2 flex flex-row gap-3 items-center text-[#667085] border rounded-md">
              <span>
                <MdDocumentScanner />
              </span>
              <span>Invoice</span>
            </button>
            <button className="p-2 flex flex-row gap-3 items-center bg-[#EDB842] text-white rounded-md">
              <span>Track order</span>
              <span>
                <BiMap />
              </span>
            </button>
          </div>
        </div>
        {/* second */}
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="text-[#667085] font-[400]">Order date:</span>
          <span className="text-[#1D2939] font-[600]">Feb 16, 2022</span>
          <div className="flex flex-row items-center gap-3 text-[#EDB842] font-[600]">
            <BsTruck />
            <span>Estimated delivery: May 16, 2022</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-around text-lg md:text-xl text-[#191C1F]">
          <div className="flex flex-col items-center">
            <span className="text-[#2DB224]">
              <PiNotebookLight />
            </span>
            <span>Order Placed</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#EDB842]">
              <BiSolidPackage />
            </span>
            <span>Packaging</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#EDB842]">
              <BsTruck />
            </span>
            <span>On The Road</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#EDB842]">
              <FaHandshake />
            </span>
            <span>Delivered</span>
          </div>
        </div>
        <div className="">
          <img
            className="object-cover mx-auto w-[75%] h-2"
            src={trackRod1}
            alt=""
          />
          {/* if hidden the padding is "p-3" if */}
          <div className="w-full flex flex-row justify-around">
            <span className="p-1 bg-[#EDB842] h-fit w-fit rounded-full -mt-4">
              <span className="text-white text-xl">
                <TiTick />
              </span>
            </span>
            <span className="p-1 bg-[#EDB842] h-fit w-fit rounded-full -mt-4">
              <span className="text-white text-xl invisible">
                <TiTick />
              </span>
            </span>
            <span className="p-1 border-[#EDB842] bg-white border-2  h-fit w-fit rounded-full -mt-4">
              <span className="text-white text-xl invisible">
                <TiTick />
              </span>
            </span>
            <span className="p-1 border-[#EDB842] bg-white border-2 h-fit w-fit rounded-full -mt-4">
              <span className="text-white text-xl invisible">
                <TiTick />
              </span>
            </span>
          </div>
          {/* <div className="w-full flex flex-row justify-evenly">
            <img
              className="object-cover h-2 w-1/4 -mr-10"
              src={trackRod2}
              alt=""
            />
            <img
              className="object-cover h-2 w-1/4 -mr-6"
              src={trackRod2}
              alt=""
            />
            <img
              className="object-cover h-2 w-1/4 -ml-10"
              src={trackRod2}
              alt=""
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default TrackDetailsBody;
