import { useEffect, useMemo, useState } from "react";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  Alipay,
  ApplePay,
  GooglePay,
  Mastercard,
  PayPal,
  ShopPay,
  Visa,
} from "../../images/checkout";
import { productImage1 } from "../../images/products";
import { viewCartAction } from "../../redux/actions/cart.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { ProductOrderType } from "../../redux/types/productOrders.types";
import { FormatNumber } from "../shareables/FormatNumber";

type TotalingType = {
  SubTotalPrice: number;
  ShippingFee: number;
  Discount: number;
  Tax: number;
};
const CheckoutBody = () => {
  const [tab1, settab1] = useState<boolean>(false);
  const [tab2, settab2] = useState<boolean>(true);
  const [tab3, settab3] = useState<boolean>(true);

  //
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // get cart list
  const cartListRedux = useSelector(
    (state: ReducersType) => state?.viewCart
  ) as ReduxResponseType<ProductOrderType[]>;

  const cartItems = useMemo(() => {
    return cartListRedux?.serverResponse?.data;
  }, [cartListRedux]);

  // view cart
  useEffect(() => {
    dispatch(viewCartAction() as any);
  }, [dispatch]);

  // calculate  total price

  const calculateTotal = (cartTotalItems: ProductOrderType[]): number => {
    // Ensure that cartTotalItems is an array before using reduce
    if (!Array.isArray(cartTotalItems)) {
      return 0;
    }
    return cartTotalItems.reduce(
      (total: number, item: ProductOrderType) =>
        total + item.Order_quantity * item.current_price,
      0
    );
  };

  const [total, setTotal] = useState<TotalingType>({
    SubTotalPrice: 0,
    ShippingFee: 21,
    Discount: 0,
    Tax: 1,
  });

  useEffect(() => {
    setTimeout(() => {
      setTotal((prev: TotalingType) => {
        return {
          ...prev,
          SubTotalPrice: calculateTotal(cartItems),
        };
      });
    }, 1000);
  }, [cartItems]);

  // console.log(cartItems);

  // get billing address
  return (
    <section className="flex flex-col gap-3 items-center p-4">
      <div className="flex flex-row justify-between w-full md:w-2/3 lg:w-1/2 max-w-[38rem] font-[600]">
        <span className="playfair-display">Order Summary</span>
        <span>
          $<FormatNumber price={total.SubTotalPrice} />
        </span>
      </div>
      <div className="flex flex-col gap-3 w-full md:w-2/3 lg:w-1/2 max-w-[38rem]">
        {cartItems.map((t, i) => {
          return (
            <div
              className="relative flex flex-row justify-between gap-3 items-center border-b pb-3"
              key={i}
            >
              <img
                className="object-cover rounded-md h-32 w-36"
                src={
                  t.image && t.image.length > 0 ? t.image[0].url : productImage1
                }
                alt=""
              />
              <div className="flex flex-col justify-between h-32">
                <div className="flex flex-row justify-between">
                  <span className="text-sm font-[500]">{t.name}</span>
                  <span>
                    $<FormatNumber price={t.current_price} />
                  </span>
                </div>
                <div className="flex flex-col gap-1 justify-end text-end">
                  <span className="text-sm text-[#565553] font-[400]">
                    seller: <span className="">{t.owner?.email}</span>
                  </span>
                  <span>
                    Sub total: $<FormatNumber price={t.total_price} />
                  </span>
                </div>
              </div>
              <div className="absolute -top-2 -left-4 md:-left-4 w-fit py-2 px-3 bg-[#EDB842] text-white rounded-full h-fit">
                {t.Order_quantity}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-start w-full md:w-2/3 lg:w-1/2 max-w-[38rem] font-[600]">
        <span className="s">Discount Code</span>
      </div>
      <button className="flex flex-row justify-between w-full md:w-2/3 lg:w-1/2 max-w-[38rem] font-[600] text-white p-2 bg-[#EDB842] rounded-md">
        <div className="flex flex-row gap-3 items-center">
          <BsFillTicketPerforatedFill />
          <span>Discount Code</span>
        </div>
        <div className="">Apply</div>
      </button>
      <div className="flex flex-col justify-between w-full md:w-2/3 lg:w-1/2 max-w-[38rem] gap-2">
        <div className="flex flex-row justify-between w-full">
          <span>Subtotal</span>
          <span>
            $<FormatNumber price={total.SubTotalPrice} />
          </span>
        </div>
        <div className="flex flex-row justify-between w-full">
          <span>Shipping Cost </span>
          <span>
            $<FormatNumber price={total.ShippingFee} />
          </span>
        </div>
        <div className="flex flex-row justify-between w-full">
          <span>Discount (0%)</span>
          <span>
            -$
            <FormatNumber price={total.Discount} />
          </span>
        </div>
        <div className="flex flex-row justify-between w-full -mb-2 font-[700]">
          <span>Total</span>
          <span>
            {" "}
            $
            <FormatNumber
              price={total.SubTotalPrice + total.ShippingFee + total.Tax}
            />
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full md:w-2/3 lg:w-1/2 max-w-[38rem] gap-2">
        <div className="font-[600] text-lg">Summary</div>
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
                <img className="-mx-3 object-contain w-16" src={Visa} alt="" />
                <img
                  className="-mx-3 object-contain w-16"
                  src={Mastercard}
                  alt=""
                />
              </div>
              <div className="flex flex-row gap-1 items-center -my-2">
                <input type="radio" name="pay" /> <span>Mobile wallet</span>
                <img
                  className="-mx-3 object-contain w-16"
                  src={PayPal}
                  alt=""
                />
                <img
                  className="-mx-3 object-contain w-16"
                  src={ApplePay}
                  alt=""
                />
                <img
                  className="-mx-3 object-contain w-16"
                  src={ShopPay}
                  alt=""
                />
                <img
                  className="-mx-3 object-contain w-16"
                  src={GooglePay}
                  alt=""
                />
                <img
                  className="-mx-3 object-contain w-16"
                  src={Alipay}
                  alt=""
                />
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
              <button className="bg-[#EDB842] p-2 rounded-md text-white">
                Pay $
                <FormatNumber
                  price={total.SubTotalPrice + total.ShippingFee + total.Tax}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CheckoutBody;
