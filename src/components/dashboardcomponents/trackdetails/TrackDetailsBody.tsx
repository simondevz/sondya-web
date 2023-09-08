import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiMap, BiSolidPackage } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import { MdDocumentScanner } from "react-icons/md";
import { PiNotebookLight } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { trackDataItem } from "../../../data/trackData";
import { trackRod1 } from "../../../images/cart";
import { Visa } from "../../../images/checkout";
import { FormatNumber } from "../../shareables/FormatNumber";

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
          {/* check the design and work with it */}
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
        </div>
        <div className="flex flex-col gap-3 p-3">
          {trackDataItem.map((t, i) => {
            return (
              <div className="flex flex-row items-center gap-3">
                <img className="object-cover" src={t.image} alt="" />
                <div className="flex flex-row w-full justify-between">
                  <div className="">
                    <div className="font-[400] text-[#344054] text-xl">
                      {t.name}
                    </div>
                    <div className="flex flex-row gap-2 font-[400] text-[#667085] py-2 h-fit">
                      <span>{t.color}</span>
                      <span className="border-l-2 ps-2 h-fit">{t.ramSize}</span>
                      <span className="border-l-2 ps-2">{t.diskSize}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D2939] font-[600]">
                      $<FormatNumber price={t.price} />
                    </div>
                    <div className="font-[400] text-[#667085]">
                      Qty:{t.quantity}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <hr />
        <div className="flex flex-row justify-around p-3">
          <div className="flex flex-col leading-[.25rem]">
            <div className="font-[600]">Payment</div>
            <div className="flex flex-row items-center gap-0">
              {" "}
              <span className="font-[400] text-[#667085]">Visa **56</span>
              <img src={Visa} alt="" />
            </div>
          </div>
          <div className="font-[400] text-[#667085] text-sm">
            <div className="font-[600] text-black text-lg">Delivery</div>
            <div className="">Address</div>
            <div className="">847 Jewess Bridge Apt. 174</div>
            <div className="">London, UK</div>
            <div className="">474-769-3919</div>
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-between p-3 text-[#667085]">
          <div className="flex flex-col gap-2">
            <div className="font-[600] text-black text-lg">Need Help</div>
            <div className="flex flex-row items-center gap-2 text-sm">
              <AiOutlineInfoCircle />
              <span>Order Issues</span>
              <GoArrowUpRight />
            </div>
            <div className="flex flex-row items-center gap-2 text-sm">
              <BsTruck />
              <span>Delivery Info</span>
              <GoArrowUpRight />
            </div>
            <div className="flex flex-row items-center gap-2 text-sm">
              <FiPackage />
              <span>Returns</span>
              <GoArrowUpRight />
            </div>
          </div>
          <div className="font-[400] text-[#667085] text-sm flex flex-col gap-2 w-3/5 md:w-1/2 lg:w-1/3">
            <div className="font-[600] text-black text-lg">Order Summary</div>
            <div className="flex flex-row justify-between">
              <span>Discount</span>
              <span>$5554</span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Discount</span>
              <span>(20%) - $1109.40</span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Delivery</span>
              <span>$0.00</span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Tax</span>
              <span>+$221.88</span>
            </div>
            <hr />
            <div className="flex flex-row justify-between font-[600]">
              <span>Total</span>
              <span className="text-black">$0.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackDetailsBody;
