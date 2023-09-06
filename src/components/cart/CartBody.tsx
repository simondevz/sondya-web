import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { cartDataItem } from "../../data/cartData";
import { LastComponent } from "../home";
import { FormatNumber } from "../shareables/FormatNumber";
import { EmptyCartBody } from "./EmptyCart";

const CartBody = () => {
  return (
    <>
      {cartDataItem.length === 0 ? (
        <EmptyCartBody />
      ) : (
        <section className="flex flex-col gap-3 px-2 py-5 md:p-10">
          <div className="font-[700] text-xl playfair-display">
            Account Settings
          </div>
          <div className="overflow-x-scroll">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sub Total</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                {cartDataItem.map((t, i) => {
                  return (
                    <tr className="border-b-2" key={i}>
                      <td className="w-1/3 p-3">
                        <div className="flex flex-col md:flex-row gap-3">
                          <img
                            className="object-cover w-full md:w-1/2 h-1/2 md:h-full"
                            src={t.image}
                            alt=""
                          />
                          <div className="w-full md:w-1/2 h-1/2 md:h-full text-[0.85rem] md:text-inherit">
                            {t.name}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        $<FormatNumber price={t.price} />
                      </td>
                      <td className="p-3">
                        <input
                          className="outline-none p-2 outline-0 border-0 w-16 bg-[#EDB84233] rounded-md"
                          type="number"
                          value={t.quantity}
                        />
                      </td>
                      <td className="p-3">
                        $<FormatNumber price={t.price * t.quantity} />
                      </td>
                      <td>
                        <div className="flex flex-col gap-3 justify-center h-full">
                          <span className="border-2 p-1 text-[#CACDD8] border-[#CACDD8] rounded-full w-fit">
                            <FiEdit3 />
                          </span>
                          <span className="border-2 p-1 text-[#CACDD8] border-[#CACDD8] rounded-full w-fit">
                            <MdDelete />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex fle-row justify-between gap-3">
            <div className="flex flex-row gap-3 items-center">
              <button className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md self-center md:self-start whitespace-nowrap">
                Continue
              </button>
              <button className="px-4 py-2 text-white bg-[#EDB842] rounded-md self-center md:self-start whitespace-nowrap">
                Clear cart
              </button>
            </div>
            <div className="">
              <button className="px-4 py-2 text-white bg-[#EDB842] rounded-md self-center md:self-start whitespace-nowrap">
                Update cart
              </button>
            </div>
          </div>
          <CartBodySummary />
          <LastComponent />
        </section>
      )}
    </>
  );
};

const CartBodySummary = () => {
  const [tab1, settab1] = useState<boolean>(false);
  const [tab2, settab2] = useState<boolean>(true);
  return (
    <div className="bg-[#EDB84233] text-[#000000] flex flex-col gap-3 p-5 rounded-md">
      <div className="font-[700] text-xl">Summary</div>
      <div className="w-full md:w-2/3 max-w-[35rem] self-center">
        <div className="flex flex-row justify-between w-full">
          <span className="font-[600] text-xl">Estimate Shipping and Tax</span>
          <button onClick={() => settab1(!tab1)}>
            {tab1 ? <PiCaretDownBold /> : <PiCaretUpBold />}
          </button>
        </div>
        <div className="text-[#666666] font-[400]">
          Enter your destination to get a shipping estimate.
        </div>
        {tab1 && (
          <div className="animate__animated animate__slideInDown overflow-hidden">
            tab1
          </div>
        )}
      </div>
      <div className="flex flex-col w-full md:w-2/3 max-w-[35rem] self-center gap-3">
        <div className="flex flex-row justify-between w-full">
          <span className="font-[600] text-xl">Apply Discount Code</span>
          <button onClick={() => settab2(!tab2)}>
            {tab2 ? <PiCaretDownBold /> : <PiCaretUpBold />}
          </button>
        </div>
        <div className="text-[#666666] font-[400]">
          <hr />
        </div>
        {tab2 && (
          <div className="flex flex-col gap-3 animate__animated animate__slideInDown overflow-y-hidden">
            <div className="flex flex-row justify-between w-full">
              <span>Subtotal</span>
              <span>$13,047.00</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Shipping </span>
              <span>$21.00</span>
            </div>
            <div className="text-[#A2A6B0] w-4/5">
              (Standard Rate - Price may vary depending on the item/destination.
              TECS Staff will contact you.)
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Tax </span>
              <span>$1.91</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>GST (10%) </span>
              <span>$1.91</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Order Total</span>
              <span>$13,068.00</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartBody;
