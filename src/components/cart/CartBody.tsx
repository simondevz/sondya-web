import { useCallback, useEffect, useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { CartZip } from "../../images/cart";
import { productImage1 } from "../../images/products";
import {
  UpdateCartTimeDistanceAction,
  clearCartAction,
  removeFromCartAction,
  totalCartAction,
  updateCartAction,
  viewCartAction,
} from "../../redux/actions/cart.actions";
import {
  trackDistanceTimeAction,
  updateShippingDestinationAction,
  viewShippingDestinationAction,
} from "../../redux/actions/shippingdestination.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { ProductOrderType } from "../../redux/types/productOrders.types";
import {
  TrackDistanceTimeRequestType,
  TrackDistanceTimeType,
  shippingDestinationType,
} from "../../redux/types/shippingdestination.types";
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

  // calculate tracking

  // console.log(cartItems);
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
                  <th>Tax, shipping fee, discount</th>
                  <th>Quantity</th>
                  <th>Sub Total</th>
                  <th>Remove</th>
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
                        $
                        {t.current_price && (
                          <FormatNumber price={t.current_price} />
                        )}
                      </td>
                      <td className="p-3 text-lead">
                        ${t.tax && <FormatNumber price={t.tax} />}, $
                        {t.shipping_fee && (
                          <FormatNumber price={t.shipping_fee} />
                        )}
                        , ${t.discount && <FormatNumber price={t.discount} />}
                      </td>
                      <td className="p-3">
                        <input
                          className="outline-none p-2 outline-0 border-0 w-16 bg-[#EDB84233] rounded-md"
                          type="number"
                          min={1}
                          defaultValue={t.order_quantity}
                          // value={t.order_quantity}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setProductChange({
                              ...t,
                              order_quantity: Number(e.target.value),
                            })
                          }
                          max={t.total_stock}
                        />
                      </td>
                      <td className="p-3">
                        $
                        {t.total_price && t.total_price && (
                          <FormatNumber
                            price={t.total_price && t.total_price}
                          />
                        )}
                      </td>
                      <td>
                        <div className="flex flex-col gap-3 justify-center h-full">
                          {/* <span className="border-2 p-1 text-[#CACDD8] border-[#CACDD8] rounded-full w-fit">
                            <FiEdit3 />
                          </span> */}
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
  Discount: number;
};

const CartBodySummary = ({ cartItems }: any) => {
  const [tab1, settab1] = useState<boolean>(false);
  const [tab2, settab2] = useState<boolean>(true);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  //Calculate the total price
  const calculateTotal = (cartTotalItems: ProductOrderType[]): number => {
    // Ensure that cartTotalItems is an array before using reduce
    if (!Array.isArray(cartTotalItems)) {
      return 0;
    }
    return cartTotalItems.reduce(
      (total: number, item: ProductOrderType) =>
        total + item.order_quantity * item.current_price,
      0
    );
  };

  //Calculate the total price
  const calculateTotalTax = (cartTotalItems: ProductOrderType[]): number => {
    // Ensure that cartTotalItems is an array before using reduce
    if (!Array.isArray(cartTotalItems)) {
      return 0;
    }
    return cartTotalItems.reduce(
      (total: number, item: ProductOrderType) => total + item.tax,
      0
    );
  };

  const calculateTotalShippingFee = (
    cartTotalItems: ProductOrderType[]
  ): number => {
    // Ensure that cartTotalItems is an array before using reduce
    if (!Array.isArray(cartTotalItems)) {
      return 0;
    }
    return cartTotalItems.reduce(
      (total: number, item: ProductOrderType) => total + item.shipping_fee,
      0
    );
  };

  const calculateTotalDiscount = (
    cartTotalItems: ProductOrderType[]
  ): number => {
    // Ensure that cartTotalItems is an array before using reduce
    if (!Array.isArray(cartTotalItems)) {
      return 0;
    }
    return cartTotalItems.reduce(
      (total: number, item: ProductOrderType) => total + item.discount,
      0
    );
  };

  const [total, setTotal] = useState<TotalingType>({
    SubTotalPrice: 0,
    ShippingFee: 21,
    Tax: 1,
    Discount: 3,
  });

  useEffect(() => {
    setTimeout(() => {
      setTotal((prev: TotalingType) => {
        return {
          ...prev,
          SubTotalPrice: calculateTotal(cartItems),
          Tax: calculateTotalTax(cartItems),
          ShippingFee: calculateTotalShippingFee(cartItems),
          Discount: calculateTotalDiscount(cartItems),
        };
      });
    }, 1000);
  }, [cartItems]);
  //calculating total price ends

  // view shipping destination starts
  const [formData, setFormData] = useState<shippingDestinationType>({
    _id: "",
    country: "",
    state: "",
    city: "",
    address: "",
    zipcode: "",
    phone_number: "",
  });

  const viewShippingDestinationRedux = useSelector(
    (state: ReducersType) => state?.viewShippingDestination
  ) as ReduxResponseType<shippingDestinationType | null>;

  const viewShippingDestination = useMemo(() => {
    return viewShippingDestinationRedux?.serverResponse?.data;
  }, [viewShippingDestinationRedux]);

  useEffect(() => {
    dispatch(viewShippingDestinationAction() as any);
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      if (viewShippingDestination) {
        setFormData(viewShippingDestination);
      }
    });
  }, [dispatch, viewShippingDestination]);
  // view shipping destination ends

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
  // update destination ends

  //calculate tracking distance and time
  const [trackingFormdata, setTrackingFormdata] = useState<
    TrackDistanceTimeRequestType[]
  >([]);

  // add shipping destinations
  useEffect(() => {
    setTimeout(() => {
      cartItems.forEach((t: any, i: number) => {
        setTrackingFormdata((prev) => {
          if (t?._id !== prev[i]?._id && formData?.country !== "") {
            return [
              ...prev,
              {
                _id: t._id,
                origin: {
                  country: t.country,
                  state: t.state,
                  city: t.city,
                  address: t.address,
                  zip_code: t.zip_code,
                },
                destination: {
                  country: formData?.country ?? "",
                  state: formData?.state ?? "",
                  city: formData?.city ?? "",
                  address: formData?.address ?? "",
                  zip_code: formData?.zipcode ?? "",
                },
              },
            ];
          } else {
            return [...prev];
          }
        });
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewShippingDestination, formData]);

  // update tracking data
  const trackDistanceTimeRedux = useSelector(
    (state: ReducersType) => state?.trackDistanceTime
  ) as ReduxResponseType<TrackDistanceTimeType[]>;

  useEffect(() => {
    if (trackDistanceTimeRedux.success) {
      setTimeout(() => {
        dispatch(
          UpdateCartTimeDistanceAction(
            trackDistanceTimeRedux.serverResponse.data
          ) as any
        );
      }, 1000);
    }
  }, [dispatch, trackDistanceTimeRedux]);

  const handleSubmitTrackingData = () => {
    setTimeout(() => {
      if (trackingFormdata.length > 0) {
        dispatch(trackDistanceTimeAction(trackingFormdata) as any);
        if (trackDistanceTimeRedux.success) {
          setTimeout(() => {
            dispatch(
              UpdateCartTimeDistanceAction(
                trackDistanceTimeRedux.serverResponse.data
              ) as any
            );
          }, 1000);
        }
      }
    }, 1000);
  };

  // console.log(trackDistanceTimeRedux.serverResponse.success);
  // console.log(trackDistanceTimeRedux);

  // console.log(cartItems);
  // console.log(trackingFormdata);
  // console.log(trackDistanceTimeRedux.serverResponse.data);
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
                  defaultValue={viewShippingDestination?.country}
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
                  defaultValue={viewShippingDestination?.state}
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
                  defaultValue={viewShippingDestination?.city}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-[600]" htmlFor="">
                  Address
                </label>
                <input
                  name="address"
                  id="address"
                  onChange={onChange}
                  className="p-2 rounded-md -m-1"
                  type="text"
                  placeholder="45th Street los Angeles"
                  defaultValue={viewShippingDestination?.address}
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
                  defaultValue={viewShippingDestination?.phone_number}
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
                  defaultValue={viewShippingDestination?.zipcode}
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
              <div className="">
                {updateShippingDestinationRedux?.success && (
                  <div className="text-[#357950]">
                    {updateShippingDestinationRedux?.serverResponse.message}
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
                $
                {total.SubTotalPrice && (
                  <FormatNumber price={total.SubTotalPrice} />
                )}
              </span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Total Shipping Fees</span>
              <span>
                $
                {total.ShippingFee && (
                  <FormatNumber price={total.ShippingFee} />
                )}
              </span>
            </div>
            <div className="text-[#A2A6B0] w-4/5">
              (Standard Rate - Price may vary depending on the item/destination.
              TECS Staff will contact you.)
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Tota Tax </span>
              <span>${total.Tax && <FormatNumber price={total.Tax} />}</span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Total Discount </span>
              <span>
                ${total.Discount && <FormatNumber price={total.Discount} />}
              </span>
            </div>
            <div className="flex flex-row justify-between w-full">
              <span>Order Total</span>
              <span>
                $
                {total.SubTotalPrice && total.ShippingFee && total.Tax && (
                  <FormatNumber
                    price={
                      total.SubTotalPrice +
                      total.ShippingFee +
                      total.Tax -
                      total.Discount
                    }
                  />
                )}
              </span>
            </div>
            <button
              onClick={() => {
                handleSubmitTrackingData();
                // navigate("/checkout")
              }}
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
