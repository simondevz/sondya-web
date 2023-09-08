import { AiOutlineArrowRight } from "react-icons/ai";
import { bgWhoAreWe } from "../../../images/whoarewe";

const TrackOrderBody = () => {
  return (
    <section className="p-12">
      <div
        className="bg-no-repeat bg-contain bg-center h-[80vh] flex flex-col gap-6"
        style={{ backgroundImage: `url(${bgWhoAreWe})` }}
      >
        <div className="font-[600] text-2xl playfair-display text-[#191C1F]">
          Track Order
        </div>
        <div className="text-[#5F6C72]">
          To track your order please enter your order ID in the input field
          below and press the “Track Order” button. this was given to you on
          your receipt and in the confirmation email you should have received.
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <label className="font-[600]" htmlFor="">
              Order ID
            </label>
            <input
              className="border p-2 rounded-md"
              type="text"
              placeholder="ID..."
            />
            <small className="text-[#5F6C72] font-[400]">
              &#9432; Order ID that we sended to your in your email address.
            </small>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <label className="font-[600]" htmlFor="">
              Billing Email
            </label>
            <input
              className="border p-2 rounded-md"
              type="text"
              placeholder="Email address"
            />
          </div>
        </div>
        <button className="flex flex-row gap-2 p-2 bg-[#EDB842] text-white items-center rounded-md max-w-[13rem] justify-center">
          <span>Track Order</span>
          <span>
            <AiOutlineArrowRight />
          </span>
        </button>
      </div>
    </section>
  );
};

export default TrackOrderBody;
