import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { recentOrderData } from "../../../data/RecentOrderData";
import { PaymentPics } from "../../../images";
import {
  Alipay,
  Amex,
  ApplePay,
  DinersClub,
  GooglePay,
  Mastercard,
  PayPal,
  ShopPay,
  Visa,
} from "../../../images/checkout";

const PaymentBody = () => {
  return (
    <section className="border">
      <div className="flex flex-row justify-between font-[600] py-3 px-6">
        <span>Order Payments</span>
        <button className="text-[#EDB842] flex flex-row gap-2 items-center">
          <span>View All</span>
          <AiOutlineArrowRight />
        </button>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="bg-[#E4E7E9]">
            <tr className="">
              <th className="py-4 px-6 font-[400] text-[#475156]">
                Payment ID
              </th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Status</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Date</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Total</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.slice(0, 5).map((t, i) => {
              return (
                <tr key={i}>
                  <td className="py-4 px-6 text-[#000000] font-[700] whitespace-nowrap">
                    {t.orderId}
                  </td>
                  <td
                    className={`${
                      t.status === "IN PROGRESS"
                        ? "text-[#FA8232]"
                        : t.status === "COMPLETED"
                        ? "text-[#2DB224]"
                        : "text-[#EE5858]"
                    } py-4 px-6 font-[600] whitespace-nowrap`}
                  >
                    {t.status}
                  </td>
                  <td className="py-4 px-6 text-[#5F6C72] font-[400] whitespace-nowrap">
                    {t.date}
                  </td>
                  <td className="py-4 px-6 text-[#5F6C72] font-[400] whitespace-nowrap">
                    {t.Total}
                  </td>
                  <td className="py-4 px-6 font-[600]">
                    <button className="text-[#EDB842] flex flex-row gap-2 items-center whitespace-nowrap">
                      <span>View Details</span>
                      <AiOutlineArrowRight />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const PaymentBodyReact = () => {
  const [tab1, settab1] = useState<boolean>(false);
  const [tab2, settab2] = useState<boolean>(true);
  const [tab3, settab3] = useState<boolean>(true);
  return (
    <section className="flex flex-row">
      <img className="rounded-s-md shadow-md" src={PaymentPics} alt="" />
      <div className="flex flex-col gap-3 shadow-lg justify-center p-3 md:p-6">
        <div className="font-[700] playfair-display text-2xl">
          Payment Method
        </div>
        <div className="flex flex-col w-full self-center gap-3">
          <div className="flex flex-row justify-start gap-4 w-full">
            <div className="flex -my-2 flex-row gap-1 items-center">
              <input type="radio" name="pay" /> <span>Card</span>
              <img
                className="-mx-3 object-contain w-16"
                src={DinersClub}
                alt=""
              />
              <img className="-mx-3 object-contain w-16" src={Visa} alt="" />
              <img className="-mx-3 object-contain w-16" src={Amex} alt="" />
              <img
                className="-mx-3 object-contain w-16"
                src={Mastercard}
                alt=""
              />
            </div>
            <button onClick={() => settab1(!tab1)}>
              {tab1 ? <PiCaretDownBold /> : <PiCaretUpBold />}
            </button>
          </div>
          {tab1 && (
            <div className="flex flex-col gap-3 transition-all duration-1000 ease-in-out pointer-events-auto">
              <div className="">Choose the option you wish to use</div>
              <div className="flex flex-row gap-2">
                <div className="-mx-5">
                  <img
                    className="object-contain w-20"
                    src={DinersClub}
                    alt=""
                  />
                </div>
                <div className="-mx-5">
                  <img className="object-contain w-20" src={Visa} alt="" />
                </div>
                <div className="-mx-5">
                  <img className="object-contain w-20" src={Amex} alt="" />
                </div>
                <div className="-mx-5">
                  <img
                    className="object-contain w-20"
                    src={Mastercard}
                    alt=""
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full self-center gap-3">
          <div className="flex flex-row justify-start gap-4 w-full">
            <div className="flex flex-row gap-1 items-center -my-2">
              <input type="radio" name="pay" /> <span>Mobile wallet</span>
              <img className="-mx-3 object-contain w-16" src={PayPal} alt="" />
              <img
                className="-mx-3 object-contain w-16"
                src={ApplePay}
                alt=""
              />
              <img className="-mx-3 object-contain w-16" src={ShopPay} alt="" />
              <img
                className="-mx-3 object-contain w-16"
                src={GooglePay}
                alt=""
              />
              <img className="-mx-3 object-contain w-16" src={Alipay} alt="" />
            </div>
            <button onClick={() => settab2(!tab2)}>
              {tab2 ? <PiCaretDownBold /> : <PiCaretUpBold />}
            </button>
          </div>
          {tab2 && (
            <div className="flex flex-col gap-3 transition-all duration-1000 ease-in-out pointer-events-auto">
              <div className="">Choose the option you wish to use</div>
              <div className="flex flex-row gap-2">
                <div className="-mx-5">
                  <img className="object-contain w-20" src={PayPal} alt="" />
                </div>
                <div className="-mx-5">
                  <img className="object-contain w-20" src={ApplePay} alt="" />
                </div>
                <div className="-mx-5">
                  <img className="object-contain w-20" src={ShopPay} alt="" />
                </div>
                <div className="-mx-5">
                  <img className="object-contain w-20" src={GooglePay} alt="" />
                </div>
                <div className="-mx-5">
                  <img className="object-contain w-20" src={Alipay} alt="" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full self-center gap-3">
          <div className="flex flex-row justify-start gap-4 w-full">
            <span className="font-[500] text-lg">Others</span>
            <button onClick={() => settab3(!tab3)}>
              {tab3 ? <PiCaretDownBold /> : <PiCaretUpBold />}
            </button>
          </div>
          {tab3 && (
            <div className="flex flex-col gap-3 transition-all duration-1000 ease-in-out pointer-events-auto">
              Bank
            </div>
          )}
        </div>
        <button className="p-2 bg-[#EDB842] text-white rounded-md">
          Continue
        </button>
      </div>
    </section>
  );
};

export default PaymentBody;
