import { useCallback, useEffect, useMemo, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { CartZip } from "../../images/cart";
import { productImage1 } from "../../images/products";
import {
  clearCartAction,
  removeFromCartAction,
  totalCartAction,
  updateCartAction,
  viewCartAction,
} from "../../redux/actions/cart.actions";
import {
  updateShippingDestinationAction,
  viewShippingDestinationAction,
} from "../../redux/actions/shippingdestination.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { ProductOrderType } from "../../redux/types/productOrders.types";
import { shippingDestinationType } from "../../redux/types/shippingdestination.types";
import { LastComponent } from "../home";
import { FormatNumber } from "../shareables/FormatNumber";
import { EmptyCartBody } from "./EmptyCart";

const CartBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for change cart details
  const [productChange, setProductChange] = useState<ProductOrderType | null>();

  // get cart list
  const cartListRedux = useSelector(
    (state: ReducersType) => state?.viewCart
  ) as ReduxResponseType<ProductOrderType[]>;

  const cartItems = useMemo(() => {
    return cartListRedux?.serverResponse?.data;
  }, [cartListRedux]);

  // remove from cart
  const removeFromCartRedux = useSelector(
    (state: ReducersType) => state?.removeFromCart
  ) as ReduxResponseType<ProductOrderType[]>;

  const removeFromCart = useCallback(
    (product: ProductOrderType) => {
      setTimeout(() => {
        dispatch(removeFromCartAction(product) as any);
        dispatch(totalCartAction() as any);
      }, 1000);
    },
    [dispatch]
  );

  //update cart
  const updateCartRedux = useSelector(
    (state: ReducersType) => state?.updateCart
  ) as ReduxResponseType<ProductOrderType[]>;

  useEffect(() => {
    setTimeout(() => {
      productChange && dispatch(updateCartAction(productChange) as any);
      dispatch(viewCartAction() as any);
    }, 1000);
  }, [productChange, dispatch]);

  // clear cart
  const clearCartRedux = useSelector(
    (state: ReducersType) => state?.clearCart
  ) as ReduxResponseType<ProductOrderType[]>;

  const clearCart = useCallback(() => {
    setTimeout(() => {
      dispatch(clearCartAction() as any);
      dispatch(totalCartAction() as any);
    }, 1000);
  }, [dispatch]);

  // view cart
  useEffect(() => {
    dispatch(viewCartAction() as any);
  }, [dispatch, removeFromCartRedux, clearCartRedux, updateCartRedux]);

  // console.log(productChange);
  return (
    <>
      {cartItems.length === 0 ? (
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
                {cartItems.map((t, i) => {
                  return (
                    <tr className="border-b-2" key={i}>
                      <td className="w-1/3 p-3">
                        <div className="flex flex-col md:flex-row gap-3">
                          <img
                            className="object-cover w-full md:w-1/2 h-1/2 md:h-full"
                            src={
                              t.image && t.image.length > 0
                                ? t.image[0].url
                                : productImage1
                            }
                            alt=""
                          />
                          <div className="w-full md:w-1/2 h-1/2 md:h-full text-[0.85rem] md:text-inherit">
                            {t.name}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        $<FormatNumber price={t.current_price} />
                      </td>
                      <td className="p-3">
                        {t.quantity}
                        <input
                          className="outline-none p-2 outline-0 border-0 w-16 bg-[#EDB84233] rounded-md"
                          type="number"
                          min={1}
                          defaultValue={t.Order_quantity}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setProductChange({
                              ...t,
                              Order_quantity: Number(e.target.value),
                            })
                          }
                          max={t.quantity}
                        />
                      </td>
                      <td className="p-3">
                        $<FormatNumber price={t.total_price} />
                      </td>
                      <td>
                        <div className="flex flex-col gap-3 justify-center h-full">
                          <span className="border-2 p-1 text-[#CACDD8] border-[#CACDD8] rounded-full w-fit">
                            <FiEdit3 />
                          </span>
                          <span
                            onClick={() => removeFromCart(t)}
                            className="border-2 p-1 text-[#CACDD8] border-[#CACDD8] rounded-full w-fit"
                          >
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
              <button
                onClick={() => navigate("/products")}
                className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md self-center md:self-start whitespace-nowrap"
              >
                Continue
              </button>
              <button
                onClick={() => clearCart()}
                className="px-4 py-2 text-white bg-[#EDB842] rounded-md self-center md:self-start whitespace-nowrap"
              >
                Clear cart
              </button>
            </div>
            <div className="">
              <button className="px-4 py-2 text-white bg-[#EDB842] rounded-md self-center md:self-start whitespace-nowrap">
                Update cart
              </button>
            </div>
          </div>
          <CartBodySummary cartItems={cartItems} />
          <LastComponent />
        </section>
      )}
    </>
  );
};

type TotalingType = {
  SubTotalPrice: number;
  ShippingFee: number;
  Tax: number;
};

const CartBodySummary = ({ cartItems }: any) => {
  const [tab1, settab1] = useState<boolean>(false);
  const [tab2, settab2] = useState<boolean>(true);

  const [formData, setFormData] = useState<shippingDestinationType>({
    _id: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    phone_number: "",
  });

  const dispatch = useDispatch();

  //Calculate the total price
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
  //calculating total price ends

  // view cart
  const viewShippingDestinationRedux = useSelector(
    (state: ReducersType) => state?.viewShippingDestination
  ) as ReduxResponseType<shippingDestinationType | null>;

  const viewShippingDestination = useMemo(() => {
    return viewShippingDestinationRedux?.serverResponse?.data;
  }, [viewShippingDestinationRedux]);

  useEffect(() => {
    dispatch(viewShippingDestinationAction() as any);
  }, [dispatch]);
  // view cart ends

  // update destination starts
  const updateShippingDestinationRedux = useSelector(
    (state: ReducersType) => state?.updateShippingDestination
  ) as ReduxResponseType<shippingDestinationType>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateShippingDestinationAction(formData) as any);
  };

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(updateShippingDestinationRedux);

  // update destination ends
  return (
    <div className="bg-[#EDB84233] text-[#000000] flex flex-col gap-3 p-5 rounded-md">
      <div className="font-[700] text-xl">Summary</div>
      <div className="w-full md:w-2/3 max-w-[35rem] self-center flex flex-col gap-3">
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
          <div className="flex flex-col gap-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <label className="font-[600]" htmlFor="">
                  Country
                </label>
                <select
                  name="country"
                  id="country"
                  onChange={onChange}
                  className="p-2 rounded-md -m-1"
                  value={viewShippingDestination?.country}
                >
                  <option className="p-2" value="">
                    Choose
                  </option>
                  <option className="p-2" value="Nigeria">
                    Nigeria
                  </option>
                  <option value="Ghana">Ghana</option>
                  <option value="South Africa">South Africa</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-[600]" htmlFor="">
                  State/Province
                </label>
                <input
                  name="state"
                  id="state"
                  onChange={onChange}
                  className="p-2 rounded-md -m-1"
                  type="text"
                  placeholder="California"
                  value={viewShippingDestination?.state}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-[600]" htmlFor="">
                  city/town
                </label>
                <input
                  name="city"
                  id="city"
                  onChange={onChange}
                  className="p-2 rounded-md -m-1"
                  type="text"
                  placeholder="los Angeles"
                  value={viewShippingDestination?.city}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-[600]" htmlFor="">
                  Phone Number
                </label>
                <input
                  name="phone_number"
                  id="phone_number"
                  onChange={onChange}
                  className="p-2 rounded-md -m-1"
                  type="text"
                  placeholder="+234,2443"
                  value={viewShippingDestination?.phone_number}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-[600]" htmlFor="">
                  Zip/Postal Code
                </label>
                <input
                  name="zipcode"
                  id="zipcode"
                  onChange={onChange}
                  className="p-2 rounded-md -m-1"
                  type="text"
                  placeholder="1062983"
                  value={viewShippingDestination?.zipcode}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-[600]" htmlFor="">
                  Standard Rate
                </label>
                <div className="flex flex-row gap-3 items-center">
                  <input
                    className="p-2 rounded-md -m-1"
                    type="radio"
                    name="discount"
                  />{" "}
                  <span className="font-[400] text-sm">
                    Price may vary depending on the item/destination. Shop Staff
                    will contact you. $21.00
                  </span>
                </div>
              </div>
              <div className="">
                {updateShippingDestinationRedux?.error && (
                  <div className="text-[#DB4444]">
                    {updateShippingDestinationRedux?.error}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#0156FF] p-2 text-white rounded-md"
              >
                {updateShippingDestinationRedux?.loading ? (
                  <div className="" style={{ height: "25px" }}>
                    <PulseLoader color="#ffffff" />
                  </div>
                ) : (
                  <span> Save</span>
                )}
              </button>
            </form>
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
          <div className="flex flex-col gap-3 transition-all duration-1000 ease-in-out pointer-events-auto">
            <form className="flex flex-col gap-3" action="">
              <div className="flex flex-col gap-3">
                <label className="font-[600]" htmlFor="">
                  Enter discount code
                </label>
                <input className="p-2 rounded-md -m-1" type="text" />
              </div>
              <button className="p-2 border border-[#EDB842] rounded-md text-[#A2A6B0]">
                Apply Discount
              </button>
            </form>
            <hr />
            <div className="flex flex-row justify-between w-full">
              <span>Subtotal</span>
              <span>
                $<FormatNumber price={total.SubTotalPrice} />
              </span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Shipping </span>
              <span>
                $<FormatNumber price={total.ShippingFee} />
              </span>
            </div>
            <div className="text-[#A2A6B0] w-4/5">
              (Standard Rate - Price may vary depending on the item/destination.
              TECS Staff will contact you.)
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Tax </span>
              <span>
                $<FormatNumber price={total.Tax} />
              </span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Order Total</span>
              <span>
                $
                <FormatNumber
                  price={total.SubTotalPrice + total.ShippingFee + total.Tax}
                />
              </span>
            </div>
            <button
              type="submit"
              className="bg-[#0156FF] p-2 text-white rounded-md"
            >
              <span> Proceed to Checkout</span>
            </button>
            <div className="flex flex-row gap-3 self-center">
              <img className="object-contain" src={CartZip} alt="" />
              <span className="text-[#272560] font-[400] border-l-4 broder-[#00AEB8] ps-3">
                own it now, up to 6 months interest free learn more
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartBody;
