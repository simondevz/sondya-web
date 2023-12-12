import { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { circleWavy } from "../../images";
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
} from "../../images/checkout";
import { serviceImage1 } from "../../images/serviceimages";
// import { ServiceDetailsChat } from "../servicesdetails/ServiceDetailsBody";

const ServiceCheckoutBody = () => {
  let [status, setStatus] = useState<boolean>(false);
  return (
    <section className="p-3 md:p-10">
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-[700] text-[#EDB842]">
          Credit Card Checkout
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-3">
          {/* first phase */}
          <div className="w-full md:w-1/2">
            <CheckoutServiceBodySummary />
          </div>
          {/* second phase */}
          <div className="flex flex-col gap-3 w-full md:w-1/2 border rounded-md p-3">
            <div className="pt-6 pb-2 font-[600]">Service</div>
            <hr />
            <div className="p-3">
              <img
                className="rounded-md w-full h-[15rem]"
                src={serviceImage1}
                alt=""
              />
            </div>
            <div className="px-3 font-[600] text-lg">Car Repair</div>
            <div className="text-[#95979D] text-sm px-3">
              Package includes Only Laptop-scenes Includes, Background
              Music,Logo, and 720HD Video
            </div>
            <div className="flex justify-start gap-4 font-[600] px-3">
              <div className="flex gap-3 items-center">
                <BsClock />4 Days Delivery
              </div>
              <div className="flex flex-row gap-3 items-center">
                <BiRefresh />1 Revision
              </div>
            </div>
            <div className="flex flex-col justify-between w-full max-w-[38rem] gap-2 px-3 pb-5">
              <div className="flex flex-row justify-between w-full">
                <span>Subtotal</span>
                <span>$56.00</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span>Shipping Cost </span>
                <span>$8.00</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span>Discount (10%)</span>
                <span>-$31.00</span>
              </div>
              <hr />
              <div className="flex flex-row justify-between w-full -mb-2 font-[700]">
                <span>Total Checkout</span>
                <span>$51.00</span>
              </div>
            </div>
          </div>
        </div>
        {/* chatting  */}
        <div className="mx-auto">
          {/* <ServiceDetailsChat /> */}{" "}
          {/* needs owner_id from the product to work */}
        </div>
        <button
          onClick={() => setStatus(!status)}
          className="p-2 bg-[#EDB842] rounded-md text-white my-5"
        >
          Pay $115.00 {status.toString()}
        </button>
        {status && <ServiceCheckoutBodyStatus />}
      </div>
    </section>
  );
};

const ServiceCheckoutBodyStatus = () => {
  return (
    <div className="flex flex-col gap-3 items-center shadow-md p-5 rounded-lg">
      <div className="text-center flex flex-col items-center gap-3">
        <img className="w-20" src={circleWavy} alt="" />
        <div className="text-2xl playfair-display font-[600]">
          Thanks for your order
        </div>
        <div className="">
          We are preparing your order and will notify you as soon as it has
          shipped.
        </div>
      </div>
    </div>
  );
};

const CheckoutServiceBodySummary = () => {
  const [tab1, settab1] = useState<boolean>(false);
  const [tab2, settab2] = useState<boolean>(true);
  const [tab3, settab3] = useState<boolean>(true);
  return (
    <div className="flex flex-col justify-between w-full max-w-[38rem] gap-2">
      <div className="w-full self-center flex flex-col gap-3">
        <div className="flex flex-row justify-start gap-4 w-full">
          <span className="font-[500] text-lg">Shipping Address Summary</span>
          <button onClick={() => settab1(!tab1)}>
            {tab1 ? <PiCaretDownBold /> : <PiCaretUpBold />}
          </button>
        </div>
        {tab1 && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between border items-center rounded-md p-3">
              <div className="text-[#5F6C72] text-sm">
                <div className="text-[#191C1F]">Adekunle Gilbert</div>
                <div className="w-4/5">
                  East Ikoyi Bazar, Word No. 04, Road No. 13/x, House no.
                  1320/C, Flat No. 5D, Ikeja - 1200, Lagos
                </div>
                <div className="">
                  <span className="text-[#191C1F]">Phone Number:</span>
                  <span>+234 1234 567 890 </span>
                </div>
                <div className="">
                  <span className="text-[#191C1F]">Email:</span>
                  <span> kevin.gilbert@gmail.com</span>
                </div>
              </div>
              <div className="">
                <button className="w-fit p-2 text-white bg-[#EDB842] whitespace-nowrap h-fit rounded-md">
                  Edit Address
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <input type="checkbox" />
              <span>Billing address is same as shipping</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full self-center gap-3">
        <div className="flex flex-row justify-start gap-4 w-full">
          <span className="font-[500] text-lg">Payment Method</span>
          <button onClick={() => settab2(!tab2)}>
            {tab2 ? <PiCaretDownBold /> : <PiCaretUpBold />}
          </button>
        </div>
        <div className="text-[#666666] font-[400]"></div>
        {tab2 && (
          <div className="flex flex-col leading-[0.1rem]  transition-all duration-1000 ease-in-out pointer-events-auto">
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
          </div>
        )}
      </div>
      <div className="flex flex-col w-full self-center gap-3">
        <div className="flex flex-row justify-start gap-4 w-full">
          <span className="font-[500] text-lg">Delivery Option</span>
          <button onClick={() => settab3(!tab3)}>
            {tab3 ? <PiCaretDownBold /> : <PiCaretUpBold />}
          </button>
        </div>
        <div className="text-[#666666] font-[400]"></div>
        {tab3 && (
          <div className="flex flex-col gap-3 transition-all duration-1000 ease-in-out pointer-events-auto">
            <div className="flex flex-row gap-2">
              <div className="mt-1">
                <input type="radio" name="shipping" id="" />
              </div>
              <div className="">
                <div className="">
                  <span className="font-[700]">Free Shipping</span>
                  <br />
                  Estimated delivery: May 10 2023 - December 12 2024
                </div>
                <div className="">
                  <span className="font-[700]">GIG</span>
                  <br />
                  Free Shipping Estimated delivery: May 10 2023 - December 12
                  2024
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCheckoutBody;
