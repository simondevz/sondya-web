import { orderConfirm1, orderConfirm2 } from "../../../images";

const OrderConfirmationBody = () => {
  return (
    <section className="flex flex-row gap-2 justify-center px-7 py-24 md:p-12">
      <div className="">
        <img className="object-cover" src={orderConfirm1} alt="" />
      </div>
      <div className="flex flex-col items-center text-center">
        <img className="object-cover" src={orderConfirm2} alt="" />
        <div className="font-[600] text-xl -mt-32 md:-mt-48 max-w-[12rem]">
          Your Order is Confirmed
        </div>
        <button className=" bg-[#EDB842] mt-3 md:mt-6 whitespace-nowrap text-white rounded-md font-[600] w-fit py-2 px-4">
          Continue Shopping
        </button>
      </div>
    </section>
  );
};

export default OrderConfirmationBody;
