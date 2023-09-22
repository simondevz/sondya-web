import { BiSolidTruck } from "react-icons/bi";
import {
  BsBox2Fill,
  BsFillCalendarMinusFill,
  BsFillCreditCard2BackFill,
  BsFillEnvelopeFill,
  BsFillPhoneFill,
  BsTrophyFill,
} from "react-icons/bs";
import { FaFileInvoice, FaReceipt, FaUserAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { PiExport } from "react-icons/pi";

const AdminOrderDetailsHero = () => {
  return (
    <section>
      <div className="flex flex-row justify-between">
        <div className="font-[600] text-lg">Order Details </div>
        <div className="flex gap-2">
          <button className="flex gap-2 items-center bg-[#EDB84233] text-[#EDB842] p-2 rounded-md">
            <PiExport />
            <span>Export</span>
          </button>
          <button className="flex gap-2 items-center bg-[#EDB842] text-white p-2 rounded-md">
            <FaFileInvoice />
            <span>Invoice</span>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-3">
        {/* box 1 */}
        <div className="flex flex-col w-1/3 gap-3 shadow-md p-4 rounded-lg max-w-[24rem] min-w-[18rem] flex-grow">
          <div className="flex gap-3 items-center justify-between w-full font-[600]">
            <div className="flex gap-3 items-center">
              <span className="text-lg whitespace-nowrap">Order #302011</span>
              <span className="p-2 bg-[#EDB84233] text-[#EDB842] rounded-md">
                Processing
              </span>
            </div>
            <span className="text-[#A3A9B6]">
              <MdEdit />
            </span>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <BsFillCalendarMinusFill />
              </span>
              <span>Added</span>
            </div>
            <div className="">12 Dec 2022</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <BsFillCreditCard2BackFill />
              </span>
              <span>Payment Method</span>
            </div>
            <div className="">Visa</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <BiSolidTruck />
              </span>
              <span>Shipping Method</span>
            </div>
            <div className="">Flat Shipping</div>
          </div>
        </div>
        {/* box 2 */}
        <div className="flex flex-col w-1/3 gap-3 shadow-md p-4 rounded-lg max-w-[24rem] min-w-[18rem] flex-grow">
          <div className="flex gap-3 items-center justify-between w-full font-[600]">
            <div className="flex gap-3 items-center text-lg">Customer</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <FaUserAlt />
              </span>
              <span>Customer</span>
            </div>
            <div className="">Josh Adam</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <BsFillEnvelopeFill />
              </span>
              <span>Email</span>
            </div>
            <div className="">joshadam@mail.com</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <BsFillPhoneFill />
              </span>
              <span>Phone</span>
            </div>
            <div className="">909 427 2910</div>
          </div>
        </div>
        {/* box 3 */}
        <div className="flex flex-col w-1/3 gap-3 shadow-md p-4 rounded-lg max-w-[24rem] min-w-[18rem] flex-grow">
          <div className="flex gap-3 items-center justify-between w-full font-[600]">
            <div className="flex gap-3 items-center text-lg">Vendor</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <FaUserAlt />
              </span>
              <span>Vendor</span>
            </div>
            <div className="">Josh Adam</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <BsFillEnvelopeFill />
              </span>
              <span>Email</span>
            </div>
            <div className="">joshadam@mail.com</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <BsFillPhoneFill />
              </span>
              <span>Phone</span>
            </div>
            <div className="">909 427 2910</div>
          </div>
        </div>
        {/* box 4 */}
        <div className="flex flex-col w-1/3 gap-3 shadow-md p-4 rounded-lg max-w-[24rem] min-w-[18rem] flex-grow">
          <div className="flex gap-3 items-center justify-between w-full font-[600]">
            <div className="flex gap-3 items-center text-lg">Document</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <FaReceipt />
              </span>
              <span>Invoice</span>
            </div>
            <div className="">INV-32011</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <BsBox2Fill />
              </span>
              <span>Shipping</span>
            </div>
            <div className="">SHP-2011REG</div>
          </div>
          <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
            <div className="flex gap-3 items-center">
              <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                <BsTrophyFill />
              </span>
              <span>Rewards</span>
            </div>
            <div className="">480 point</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrderDetailsHero;
