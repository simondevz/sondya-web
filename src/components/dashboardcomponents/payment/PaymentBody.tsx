import { useState } from "react";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
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
