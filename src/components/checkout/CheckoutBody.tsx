import { format } from "date-fns";
import randomstring from "randomstring";
import { useEffect, useMemo, useState } from "react";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import useWebSocket from "react-use-websocket";
import Swal from "sweetalert2";
import { CART_SESSION } from "../../extraStorage/storageStore";
import { circleWavy } from "../../images";
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
import {
  UpdateCartTimeDistanceAction,
  viewCartAction,
} from "../../redux/actions/cart.actions";
import {
  createSellerNotificationAction,
  createUserNotificationAction,
} from "../../redux/actions/notifications.actions";
import {
  trackDistanceTimeAction,
  // trackDistanceTimeAction,
  viewShippingDestinationAction,
} from "../../redux/actions/shippingdestination.actions";
import { orderEmailNotificationAction } from "../../redux/actions/userDashboard/emailNotification.actions";
import {
  initializePaymentsAction,
  verifyPaymentsAction,
} from "../../redux/actions/userDashboard/payments.actions";
import { userCreateProductOrderAction } from "../../redux/actions/userDashboard/productsOrder.actions";
import { GetUserProfileAction } from "../../redux/actions/userDashboard/profile.actions";
import {
  CREATE_SELLER_NOTIFICATION_RESET,
  CREATE_USER_NOTIFICATION_RESET,
} from "../../redux/constants/notifications.constants";
import {
  INITIALIZE_PAYMENTS_RESET,
  VERIFY_PAYMENTS_RESET,
} from "../../redux/constants/userDashboard/payments.constants";
import { CREATE_PRODUCT_ORDER_RESET } from "../../redux/constants/userDashboard/productsOrder.constants";
import { API_ROUTES } from "../../redux/routes";
import { ReducersType } from "../../redux/store";
import { LoginResponseType } from "../../redux/types/auth.types";
import {
  CheckoutType,
  GetProductOrder,
} from "../../redux/types/checkout.types";
import { ReduxResponseType } from "../../redux/types/general.types";
import { NotificationType } from "../../redux/types/notifications.types";
import {
  PaymentRequestType,
  PaymentResponseType,
} from "../../redux/types/payments.types";
import { ProductOrderType } from "../../redux/types/productOrders.types";
import {
  TrackDistanceTimeRequestType,
  TrackDistanceTimeType,
  shippingDestinationType,
} from "../../redux/types/shippingdestination.types";
import { adminUGetUserType } from "../../redux/types/users.types";
import { FormatNumber } from "../shareables/FormatNumber";

type TotalingType = {
  SubTotalPrice: number;
  ShippingFee: number;
  Tax: number;
  Discount: number;
};

const CheckoutBody = () => {
  const [tab1, settab1] = useState<boolean>(false);
  const [tab2, settab2] = useState<boolean>(true);
  const [tab3, settab3] = useState<boolean>(true);

  const payment_id: string = randomstring.generate({
    length: 8,
    charset: "numeric",
  });

  // import dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = new URLSearchParams(window.location.search);

  // get cart list
  const cartListRedux = useSelector(
    (state: ReducersType) => state?.viewCart
  ) as ReduxResponseType<ProductOrderType[]>;

  const trackDistanceTimeRedux = useSelector(
    (state: ReducersType) => state?.trackDistanceTime
  ) as ReduxResponseType<TrackDistanceTimeType[]>;

  const cartItems = useMemo(() => {
    return cartListRedux?.serverResponse?.data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartListRedux, trackDistanceTimeRedux]);

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
        total + item.order_quantity * item.current_price,
      0
    );
  };

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
    Discount: 0,
    Tax: 1,
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

  // get shipping address from local storage
  const viewShippingDestinationRedux = useSelector(
    (state: ReducersType) => state?.viewShippingDestination
  ) as ReduxResponseType<shippingDestinationType | null>;

  const viewShippingDestination = useMemo(() => {
    return viewShippingDestinationRedux?.serverResponse?.data;
  }, [viewShippingDestinationRedux]);

  useEffect(() => {
    dispatch(viewShippingDestinationAction() as any);
  }, [dispatch]);
  // get shipping address from local storage ends

  //get shipping address from database
  const getProfileDetailsRedux = useSelector(
    (state: ReducersType) => state?.getProfile
  ) as ReduxResponseType<adminUGetUserType>;

  const userData = useMemo(() => {
    return getProfileDetailsRedux?.serverResponse?.data;
  }, [getProfileDetailsRedux]);

  useEffect(() => {
    dispatch(GetUserProfileAction() as any);
  }, [dispatch]);
  //get shipping address from database ends

  //assign shipping address
  const [shippingAddress, setShippingAddress] =
    useState<shippingDestinationType>({
      _id: "",
      country: "",
      state: "",
      city: "",
      address: "",
      zipcode: "",
      phone_number: "",
    });

  // State to track the checkbox value for shipping address
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (viewShippingDestination && !isChecked) {
      setShippingAddress(viewShippingDestination);
    } else if (userData && isChecked) {
      setShippingAddress({
        _id: "",
        country: userData.country,
        state: userData.state,
        city: userData.city,
        address: userData.address,
        zipcode: userData.zip_code,
        phone_number: userData.phone_number,
      });
    }
  }, [isChecked, userData, viewShippingDestination]);
  //assign shipping address

  //choose payment method
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  // checkout order starts
  const [checkoutOrder, setCheckoutOrder] = useState<CheckoutType>({
    checkout_items: [],
    total_amount: 0,
    currency: "",
    buyer: {
      id: "",
      username: "",
      email: "",
    },
    shipping_destination: {
      _id: "",
      country: "",
      state: "",
      city: "",
      address: "",
      zipcode: "",
      phone_number: "",
    },
    payment_method: "",
    payment_status: "successful",
    order_status: "order placed",
    redirect_url: window.location.origin + "/checkout",
    total_tax: 0,
    total_shipping_fee: 0,
    total_discount: 0,
    payment_id: payment_id,
  });

  // console.log(checkoutOrder);

  useEffect(() => {
    setTimeout(() => {
      setCheckoutOrder((prev: CheckoutType) => {
        return {
          ...prev,
          checkout_items: cartItems,
          currency: userData.currency,
          buyer: {
            id: userData._id,
            username: userData.username,
            email: userData.email,
            phone_number: userData?.phone_number,
          },
          shipping_destination: shippingAddress,
          payment_method: paymentMethod,
          total_tax: total.Tax,
          total_shipping_fee: total.ShippingFee,
          total_discount: total.Discount,
          total_amount:
            total.SubTotalPrice +
            total.ShippingFee +
            total.Tax -
            total.Discount,
        };
      });
    }, 2000);
  }, [cartItems, shippingAddress, total, userData, paymentMethod]);

  const checkoutOrderRedux = useSelector(
    (state: ReducersType) => state?.userCreateProductOrder
  ) as ReduxResponseType<CheckoutType>;

  const { checkout_items, shipping_destination, total_amount, buyer } =
    checkoutOrder;

  useEffect(() => {
    checkoutOrderRedux?.error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: checkoutOrderRedux?.error,
      });
    checkoutOrderRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: checkoutOrderRedux?.serverResponse?.message,
      });
    if (checkoutOrderRedux?.success) {
      setTimeout(() => {
        // navigate("/auth/success");
        // navigate("/admin/category");
        // handleClose();
      }, 3000);
    }
    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch({ type: CREATE_PRODUCT_ORDER_RESET });
    }, 3000);
  }, [checkoutOrderRedux, dispatch]);
  // checkout order ends

  // update tracking data
  //calculate tracking distance and time
  const [trackingFormdata, setTrackingFormdata] = useState<
    TrackDistanceTimeRequestType[]
  >([]);

  // add shipping destinations
  useEffect(() => {
    setTimeout(() => {
      cartItems.forEach((t, i) => {
        setTrackingFormdata((prev) => {
          const existingItem = prev.find((prev1) => prev1._id === t._id);

          if (!existingItem) {
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
                  country: shippingAddress?.country ?? "",
                  state: shippingAddress?.state ?? "",
                  city: shippingAddress?.city ?? "",
                  address: shippingAddress?.address ?? "",
                  zip_code: shippingAddress?.zipcode ?? "",
                },
              },
            ];
          } else {
            return [
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
                  country: shippingAddress?.country ?? "",
                  state: shippingAddress?.state ?? "",
                  city: shippingAddress?.city ?? "",
                  address: shippingAddress?.address ?? "",
                  zip_code: shippingAddress?.zipcode ?? "",
                },
              },
            ];
          }
        });
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingAddress]);

  // State variable to track whether the component has loaded
  const [componentLoaded, setComponentLoaded] = useState(false);

  useEffect(() => {
    if (trackingFormdata.length > 0 && componentLoaded) {
      setTimeout(() => {
        if (trackingFormdata.length > 0) {
          dispatch(trackDistanceTimeAction(trackingFormdata) as any);
        }
      }, 1000);
    } else if (trackingFormdata.length > 0 && !componentLoaded) {
      setComponentLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackingFormdata]);

  useEffect(() => {
    if (trackDistanceTimeRedux.success) {
      setTimeout(() => {
        dispatch(
          UpdateCartTimeDistanceAction(
            trackDistanceTimeRedux.serverResponse.data
          ) as any
        );
        dispatch(viewCartAction() as any);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, trackDistanceTimeRedux]);

  //make payment
  const InitializePaymentRedux = useSelector(
    (state: ReducersType) => state?.initializePayments
  ) as ReduxResponseType<PaymentResponseType>;

  const [paymentData, setPaymentData] = useState<PaymentRequestType>({
    buyer: {
      id: "",
      username: "",
      email: "",
      phone_number: "",
    },
    amount: 0,
    currency: "",
    redirect_url: "",
  });

  const [paymentStatus, setPaymentStatus] = useState(false);

  useEffect(() => {
    setPaymentData({
      buyer: {
        id: userData?._id,
        username: userData?.username,
        email: userData?.email,
        // email: "e2scoba2tm@gmail.com",
        phone_number: userData?.phone_number,
      },
      amount:
        total.SubTotalPrice + total.ShippingFee + total.Tax - total.Discount,
      // amount: 10,
      currency: "USD",
      redirect_url: window.location.origin + "/checkout",
    });
  }, [cartItems, total, userData, paymentMethod]);

  const { amount, currency, redirect_url } = paymentData;

  const handleMakePayment = () => {
    if (amount > 0 && currency !== "" && redirect_url !== "") {
      dispatch(initializePaymentsAction(paymentData) as any);
    }
  };

  useEffect(() => {
    if (InitializePaymentRedux?.success) {
      setTimeout(() => {
        window.location.href =
          InitializePaymentRedux?.serverResponse?.data?.data?.link;
      }, 1000);
    } else if (InitializePaymentRedux?.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: InitializePaymentRedux?.error,
      });
    }
  }, [InitializePaymentRedux]);

  const verifyPaymentRedux = useSelector(
    (state: ReducersType) => state?.verifyPayments
  ) as ReduxResponseType<any>;

  // const verifyPaymentData = useMemo(() => {
  //   return verifyPaymentRedux?.serverResponse?.data;
  // }, [verifyPaymentRedux]);

  const loginRedux = useSelector(
    (state: ReducersType) => state.login
  ) as ReduxResponseType<LoginResponseType>;

  // verify payment
  useEffect(() => {
    setTimeout(() => {
      const tx_ref = param.get("tx_ref");
      if (tx_ref !== null) {
        dispatch(verifyPaymentsAction({ tx_ref }) as any);
        navigate("/checkout", { replace: true });
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    verifyPaymentRedux?.error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: verifyPaymentRedux?.error,
      });
    if (
      verifyPaymentRedux?.success &&
      paymentStatus !== true &&
      !getProfileDetailsRedux?.loading &&
      checkoutOrder?.checkout_items?.length > 0
    ) {
      setTimeout(() => {
        if (
          verifyPaymentRedux.serverResponse?.data?.data?.status === "successful"
        ) {
          setTimeout(() => {
            if (checkout_items && shipping_destination && total_amount) {
              if (!buyer?.id)
                checkoutOrder.buyer = {
                  id: userData?._id || loginRedux?.serverResponse?.data?.id,
                  email:
                    userData?.email || loginRedux?.serverResponse?.data?.email,
                  username:
                    userData?.username ||
                    loginRedux?.serverResponse?.data?.username ||
                    "",
                  phone_number: userData?.phone_number,
                };

              const dateString = checkoutOrder.createdAt
                ? checkoutOrder.createdAt
                : "";
              const dateObject = new Date(dateString);
              const formattedDate = format(dateObject, "MMMM d, yyyy");

              dispatch(userCreateProductOrderAction(checkoutOrder) as any);
              dispatch(
                orderEmailNotificationAction({
                  email: checkoutOrder?.buyer?.email || userData?.email,
                  username:
                    checkoutOrder?.buyer?.username ||
                    userData?.username ||
                    "Esteemed User",
                  order_status: checkoutOrder?.order_status,
                  product: checkoutOrder?.checkout_items?.map((item) => {
                    return {
                      product_name: item.name,
                      qty: item.order_quantity,
                      seller_name: item?.owner?.username || "",
                    };
                  }),
                  date_ordered: formattedDate,
                  total_cost: checkoutOrder?.total_amount,
                }) as any
              );
            }
          }, 1000);

          setPaymentStatus(true);
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(CART_SESSION);
          }
          dispatch(viewCartAction() as any);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            timer: 5000,
            text: verifyPaymentRedux?.serverResponse?.message,
          });
        }
      }, 1000);
      setTimeout(() => {
        dispatch({ type: INITIALIZE_PAYMENTS_RESET });
        dispatch({ type: VERIFY_PAYMENTS_RESET });
      }, 2000);
    }
  }, [
    verifyPaymentRedux,
    buyer?.id,
    checkoutOrder,
    checkout_items,
    dispatch,
    loginRedux?.serverResponse?.data?.email,
    loginRedux?.serverResponse?.data?.id,
    loginRedux?.serverResponse?.data?.username,
    paymentStatus,
    shipping_destination,
    total_amount,
    getProfileDetailsRedux?.loading,
    userData?._id,
    userData?.username,
    userData?.email,
    userData?.phone_number,
  ]);

  const productOrderRedux = useSelector(
    (state: ReducersType) => state.userCreateProductOrder
  ) as ReduxResponseType<GetProductOrder>;
  // console.log("productOrderRedux ==>> ", productOrderRedux);

  useEffect(() => {
    if (productOrderRedux?.success && userData?._id) {
      dispatch(
        createUserNotificationAction({
          user: {
            id: userData?._id,
            email: userData?.email,
            username: userData?.username,
          },
          title: "Order Sent",
          message:
            "You Ordered " +
            productOrderRedux?.serverResponse?.data?.checkout_items
              ?.order_quantity +
            " " +
            productOrderRedux?.serverResponse?.data?.checkout_items?.name,
          type: "order_sent",
          link:
            "/order/details/" + productOrderRedux?.serverResponse?.data?._id,
          seen: false,
        }) as any
      );

      if (
        productOrderRedux?.success &&
        productOrderRedux?.serverResponse?.data?.checkout_items?.owner?.id
      )
        dispatch(
          createSellerNotificationAction({
            user: {
              id: productOrderRedux?.serverResponse?.data?.checkout_items?.owner
                ?.id,
              email:
                productOrderRedux?.serverResponse?.data?.checkout_items?.owner
                  ?.email,
              username:
                productOrderRedux?.serverResponse?.data?.checkout_items?.owner
                  ?.username,
            },
            title: "You have a Product Order",
            message:
              userData?.username +
              " Ordered " +
              productOrderRedux?.serverResponse?.data?.checkout_items
                ?.order_quantity +
              " " +
              productOrderRedux?.serverResponse?.data?.checkout_items?.name,
            type: "order_recieved",
            link:
              "/seller/order/details/" +
              productOrderRedux?.serverResponse?.data?._id,
            seen: false,
          }) as any
        );
    }
  }, [
    dispatch,
    userData?._id,
    userData?.email,
    userData?.username,
    productOrderRedux?.serverResponse?.data?.checkout_items?.owner,
    productOrderRedux?.serverResponse?.data?.checkout_items?.order_quantity,
    productOrderRedux?.serverResponse?.data?._id,
    productOrderRedux?.serverResponse?.data?.checkout_items?.name,
    productOrderRedux?.success,
  ]);

  // web sockets for notifications
  const socketUrl = API_ROUTES.websocket.notifications;
  const userNotificationRedux = useSelector(
    (state: ReducersType) => state.createUserNotification
  ) as ReduxResponseType<NotificationType>;

  const sellerNotificationRedux = useSelector(
    (state: ReducersType) => state.createSellerNotification
  ) as ReduxResponseType<NotificationType>;

  const { sendMessage: sendNoticication } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (userNotificationRedux?.success) {
      sendNoticication(
        JSON.stringify({
          meta: "echo_payload",
          receiver_id: userNotificationRedux?.serverResponse?.data?.user?.id,
          payload: {
            meta: "echo_payload",
            data: userNotificationRedux?.serverResponse?.data,
          },
        })
      );
      dispatch({ type: CREATE_USER_NOTIFICATION_RESET });
    }
  }, [
    dispatch,
    userNotificationRedux?.serverResponse?.data,
    userNotificationRedux?.success,
    sendNoticication,
  ]);

  useEffect(() => {
    if (sellerNotificationRedux?.success) {
      sendNoticication(
        JSON.stringify({
          meta: "echo_payload",
          receiver_id: sellerNotificationRedux?.serverResponse?.data?.user?.id,
          payload: {
            meta: "echo_payload",
            data: sellerNotificationRedux?.serverResponse?.data,
          },
        })
      );
      dispatch({ type: CREATE_SELLER_NOTIFICATION_RESET });
    }
  }, [
    dispatch,
    sellerNotificationRedux?.serverResponse?.data,
    sellerNotificationRedux?.success,
    sendNoticication,
  ]);

  return (
    <>
      {paymentStatus ? (
        <CheckoutBodySuccess />
      ) : (
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
                      t.image && t.image.length > 0
                        ? t.image[0].url
                        : productImage1
                    }
                    alt=""
                  />
                  <div className="flex flex-col justify-between h-32">
                    <div className="flex flex-wrap break-words justify-center">
                      <span className="text-sm font-[500]">{t.name}</span>
                    </div>
                    <div className="flex flex-wrap break-words justify-end">
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
                    {t.order_quantity}
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
              <span>Tax </span>
              <span>
                $<FormatNumber price={total.Tax} />
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
                  price={
                    total.SubTotalPrice +
                    total.ShippingFee +
                    total.Tax -
                    total.Discount
                  }
                />
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full md:w-2/3 lg:w-1/2 max-w-[38rem] gap-2">
            <div className="font-[600] text-lg">Summary</div>
            <div className="w-full self-center flex flex-col gap-3">
              <div className="flex flex-row justify-start gap-4 w-full">
                <span className="font-[500] text-lg">
                  Shipping Address Summary
                </span>
                <button onClick={() => settab1(!tab1)}>
                  {tab1 ? <PiCaretDownBold /> : <PiCaretUpBold />}
                </button>
              </div>
              {tab1 && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row justify-between border items-center rounded-md p-3">
                    <div className="text-[#5F6C72] text-sm">
                      <div className="text-[#191C1F]">
                        {userData.last_name} {userData.first_name}
                      </div>
                      <div className="w-4/5">{shippingAddress.address}</div>
                      <div className="">
                        <span className="text-[#191C1F]">Phone Number:</span>
                        <span>{shippingAddress.phone_number}</span>
                      </div>
                      <div className="">
                        <span className="text-[#191C1F]">Location:</span>
                        <span>
                          {shippingAddress.country},{shippingAddress.state},
                          {shippingAddress.city}
                        </span>
                      </div>
                      <div className="">
                        <span className="text-[#191C1F]">Zip Code:</span>
                        <span>{shippingAddress.zipcode}</span>
                      </div>
                    </div>
                    <div className="">
                      <button className="w-fit p-2 text-white bg-[#EDB842] whitespace-nowrap h-fit rounded-md">
                        Edit Address
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(!isChecked)}
                    />
                    <span>Use profile billing address</span>
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
                    <input
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      type="radio"
                      name="pay"
                    />{" "}
                    <span>Card</span>
                    <img
                      className="-mx-3 object-contain w-16"
                      src={Visa}
                      alt=""
                    />
                    <img
                      className="-mx-3 object-contain w-16"
                      src={Mastercard}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-row gap-1 items-center -my-2">
                    <input
                      value="wallet"
                      checked={paymentMethod === "wallet"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      type="radio"
                      name="pay"
                      disabled
                    />{" "}
                    <span>Mobile wallet</span>
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
                <span className="font-[500] text-lg">
                  Estimated Delivery Dates
                </span>
                <button onClick={() => settab3(!tab3)}>
                  {tab3 ? <PiCaretDownBold /> : <PiCaretUpBold />}
                </button>
              </div>
              <div className="text-[#666666] font-[400]"></div>
              {tab3 && (
                <div className="flex flex-col gap-3 transition-all duration-1000 ease-in-out pointer-events-auto">
                  <div className="flex flex-row gap-2">
                    <div className="">
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex flex-col gap-1 py-2"
                        >
                          <div className="text-[#191C1F] font-[600] text-lg">
                            Item: {item.name}
                          </div>
                          <div className="">
                            <span className="font-[500]">Shipping: </span>
                            {item?.track_distance_time?.deliveryDateShipping ??
                              "N/A"}
                          </div>
                          <div className="">
                            <span className="font-[500]">Flight: </span>
                            {item?.track_distance_time?.deliveryDateFlight ??
                              "N/A"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleMakePayment()}
                    className="bg-[#EDB842] p-2 rounded-md text-white"
                  >
                    {InitializePaymentRedux?.loading ? (
                      <div className="" style={{ height: "25px" }}>
                        <PulseLoader color="#ffffff" />
                      </div>
                    ) : (
                      <div className="">
                        Pay $
                        <FormatNumber
                          price={
                            total.SubTotalPrice +
                            total.ShippingFee +
                            total.Tax -
                            total.Discount
                          }
                        />
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export const CheckoutBodySuccess = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="shadow-md w-full flex flex-col justify-center items-center h-[60vh] rounded-md">
        <div className="flex gap-3 mx-auto flex-col items-center text-center w-[30rem]">
          <img className="mx-auto" src={circleWavy} alt="" />
          <div className="text-[#191F33] playfair-display text-xl font-[600]">
            Thanks for your order
          </div>
          <div className="text-[#767E94]">
            We are preparing your order and will notify you as soon as it has
            shipped.
          </div>
          <button
            onClick={() => navigate("/user/order/history")}
            className="border-[#EDB842] border text-[#EDB842] font-[600] rounded-md p-2"
          >
            Go to order page
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBody;
