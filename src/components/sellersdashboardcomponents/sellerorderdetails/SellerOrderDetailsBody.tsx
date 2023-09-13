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
import { MdEdit, MdLocationOn } from "react-icons/md";
import { PiExport } from "react-icons/pi";
import { Divider, ImgExample } from "../../../images";
import {
  trackDelivered,
  trackOrderPlaced,
  trackPacked,
  trackProcessing,
  trackShipping,
} from "../../../images/cart";

const SellerOrderDetailsBody = () => {
  return (
    <section className="p-2">
      <div className="flex flex-col gap-3">
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
        <div className="flex flex-wrap gap-3">
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
        {/* second section */}
        <div className="flex flex-col lg:flex-row gap-3 justify-between">
          <div className="flex flex-col gap-3 shadow-md h-fit flex-grow">
            <div className="flex flex-row gap-3">
              <span className="p-2 font-[#1A9882]">Order List</span>
              <span className="p-2 bg-[#E9FAF7] text-[#1A9882] rounded-md">
                +2 Orders
              </span>
            </div>
            <div className="w-full">
              <table className="table-auto w-full">
                <thead className="bg-[#F0F1F3]">
                  <tr className="text-[#1D1F2C] font-[600]">
                    <th className="py-2 px-3">Product</th>
                    <th className="py-2 px-3">SKU</th>
                    <th className="py-2 px-3">Total qty</th>
                    <th className="py-2 px-3">Price</th>
                    <th className="py-2 px-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td className="flex flex-col md:flex-row  gap-2 py-2 px-3 justify-center">
                      <img src={ImgExample} alt="" />
                      <div className="flex flex-col gap-1">
                        <div className="font-[600] text-[#1D1F2C]">
                          Logic+ Wireless Mouse
                        </div>
                        <div className="font-[400] text-[#667085]">Black</div>
                      </div>
                    </td>
                    <td className="text-[#666666] py-2 px-3">302011</td>
                    <td className="text-[#666666] py-2 px-3">1 pcs</td>
                    <td className="text-[#666666] py-2 px-3">$121.00</td>
                    <td className="text-[#666666] py-2 px-3">$121.00</td>
                  </tr>
                  <tr className="border">
                    <td className="flex flex-col md:flex-row gap-2 py-2 px-3 justify-center">
                      <img src={ImgExample} alt="" />
                      <div className="flex flex-col gap-1">
                        <div className="font-[600] text-[#1D1F2C]">
                          Logic+ Wireless Mouse
                        </div>
                        <div className="font-[400] text-[#667085]">Black</div>
                      </div>
                    </td>
                    <td className="text-[#666666] py-2 px-3">302011</td>
                    <td className="text-[#666666] py-2 px-3">1 pcs</td>
                    <td className="text-[#666666] py-2 px-3">$590.00</td>
                    <td className="text-[#666666] py-2 px-3">$590.00</td>
                  </tr>
                  <tr className="border">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-[#1D1F2C] py-2 px-3">Subtotal</td>
                    <td className="text-[#1D1F2C] py-2 px-3">$711.00</td>
                  </tr>
                  <tr className="border">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-[#1D1F2C] py-2 px-3">VAT(0)%</td>
                    <td className="text-[#1D1F2C] py-2 px-3">$711.00</td>
                  </tr>
                  <tr className="border">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-[#1D1F2C] py-2 px-3">Shipping Rate</td>
                    <td className="text-[#1D1F2C] py-2 px-3">$20.00</td>
                  </tr>
                  <tr className="border">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-[#1D1F2C] py-2 px-3">Total</td>
                    <td className="text-[#1D1F2C] py-2 px-3">$731.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {/* address */}
            <div className="flex flex-col gap-3 shadow-md p-4 rounded-md max-w-[20rem]">
              <div className="font-[600]">Address</div>
              <div className="flex flex-row w-full justify-between gap-3 items-center">
                <div className="flex flex-row gap-1 items-center">
                  <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                    <MdLocationOn />
                  </span>
                  <div className="flex flex-col gap-1">
                    <div className="">Billing Address:</div>
                    <div className="">
                      1833 Bel Meadow Drive, Fontana, California 92335, USA
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full justify-between gap-3 items-center">
                <div className="flex flex-row gap-1 items-center">
                  <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                    <MdLocationOn />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="">Shipping Address:</div>
                  <div className="">
                    1833 Bel Meadow Drive, Fontana, California 92335, USA
                  </div>
                </div>
              </div>
            </div>
            {/* order status starts here */}
            <div className="flex flex-col gap-3 shadow-md p-4 rounded-md w-[20rem] max-w-[20rem]">
              <div className="font-[600]">Order Status</div>
              <div className="flex flex-col w-full gap-0 p-2">
                <div className="flex flex-row gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="p-2 bg-[#EDB84233] rounded-full text-[#EDB842]">
                      <img src={trackOrderPlaced} alt="" />
                    </span>
                    <img
                      className="w-[0.16rem] h-[2.5rem]"
                      src={Divider}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D1F2C] font-[500] text-[16px]">
                      Order Placed
                    </div>
                    <div className="text-[#4A4C56] font-[400] text-[14px]">
                      An order has been placed.
                    </div>
                    <div className="text-[#858D9D] font-[400] text-[12px]">
                      12/12/2022, 03:00
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="p-2 bg-[#EDB84233] rounded-full text-[#EDB842]">
                      <img src={trackProcessing} alt="" />
                    </span>
                    <img
                      className="w-[0.16rem] h-[2rem]"
                      src={Divider}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D1F2C] font-[500] text-[16px]">
                      Processing
                    </div>
                    <div className="text-[#4A4C56] font-[400] text-[14px]">
                      Seller has proccessed your order.
                    </div>
                    <div className="text-[#858D9D] font-[400] text-[12px]">
                      12/12/2022, 03:15
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                      <img src={trackPacked} alt="" />
                    </span>
                    <img
                      className="w-[0.16rem] h-[2rem]"
                      src={Divider}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D1F2C] font-[500] text-[16px]">
                      Packed
                    </div>
                    <div className="text-[#4A4C56] font-[400] text-[14px]">
                      Seller has proccessed your order.
                    </div>
                    <div className="text-[#858D9D] font-[400] text-[12px]">
                      12/12/2022, 03:15
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                      <img src={trackShipping} alt="" />
                    </span>
                    <img
                      className="w-[0.16rem] h-[2rem]"
                      src={Divider}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D1F2C] font-[500] text-[16px]">
                      Shipping
                    </div>
                    <div className="text-[#4A4C56] font-[400] text-[14px]">
                      Seller has proccessed your order.
                    </div>
                    <div className="text-[#858D9D] font-[400] text-[12px]">
                      12/12/2022, 03:15
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                      <img src={trackDelivered} alt="" />
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D1F2C] font-[500] text-[16px]">
                      Delivered
                    </div>
                    <div className="text-[#4A4C56] font-[400] text-[14px]">
                      Seller has proccessed your order.
                    </div>
                    <div className="text-[#858D9D] font-[400] text-[12px]">
                      12/12/2022, 03:15
                    </div>
                  </div>
                </div>

                {/* another one? */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerOrderDetailsBody;
