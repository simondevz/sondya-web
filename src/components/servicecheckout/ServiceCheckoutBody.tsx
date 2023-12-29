import { useEffect, useMemo, useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getServiceOrderByIdAction,
  updateServiceOrderAction,
} from "../../redux/actions/userDashboard/serviceOrder.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { ServiceOrderType } from "../../redux/types/serviceOrders.types";
import { GET_SERVICE_ORDER_BYID_RESET } from "../../redux/constants/userDashboard/serviceOrder.constants";
import { FormatNumber } from "../shareables/FormatNumber";
import { PulseLoader } from "react-spinners";
import {
  initializePaymentsAction,
  verifyPaymentsAction,
} from "../../redux/actions/userDashboard/payments.actions";
import {
  PaymentRequestType,
  PaymentResponseType,
} from "../../redux/types/payments.types";
import Swal from "sweetalert2";
import {
  INITIALIZE_PAYMENTS_RESET,
  VERIFY_PAYMENTS_RESET,
} from "../../redux/constants/userDashboard/payments.constants";

const ServiceCheckoutBody = () => {
  const [serviceOrder, setServiceOrder] = useState<ServiceOrderType>();
  const [status, setStatus] = useState<boolean>(false);
  const navigate = useNavigate();
  console.log("status ==>> ", status);

  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  let order_id: string = useMemo(() => {
    return params.order_id || "";
  }, [params.order_id]);

  const serviceOrderRedux = useSelector(
    (state: ReducersType) => state.getServiceOrderById
  ) as ReduxResponseType<ServiceOrderType>;

  useEffect(() => {
    setTimeout(() => {
      if (order_id && order_id !== serviceOrder?.order_id) {
        dispatch(getServiceOrderByIdAction({ order_id }) as any);
      }
    }, 1000);
  }, [dispatch, order_id, serviceOrder?.order_id]);

  useEffect(() => {
    if (
      serviceOrderRedux.success &&
      serviceOrderRedux?.serverResponse?.data?.order_id === order_id
    ) {
      setServiceOrder(serviceOrderRedux?.serverResponse?.data);
      setStatus(
        serviceOrderRedux?.serverResponse?.data?.payment_status === "COMPLETED"
      );
    }
  }, [
    dispatch,
    serviceOrderRedux?.success,
    serviceOrderRedux?.serverResponse?.data,
    order_id,
  ]);

  // Payment logic
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

  useEffect(() => {
    if (
      serviceOrder?.buyer?.id &&
      serviceOrder?.buyer?.email &&
      serviceOrder?.buyer?.username &&
      serviceOrder?.checkout_items?.terms?.amount
    )
      setPaymentData({
        buyer: {
          id: serviceOrder?.buyer?.id,
          username: serviceOrder?.buyer?.username,
          email: serviceOrder?.buyer?.email,
          phone_number: serviceOrder?.buyer?.phone,
        },
        amount: serviceOrder?.checkout_items?.terms?.amount,
        currency: "USD",
        redirect_url: window.location.origin + location.pathname,
      });
  }, [
    serviceOrder?.buyer?.id,
    serviceOrder?.buyer?.username,
    serviceOrder?.buyer?.email,
    serviceOrder?.buyer?.phone,
    serviceOrder?.checkout_items?.terms?.amount,
    location.pathname,
  ]);
  const { amount, currency, redirect_url } = paymentData;

  const handleMakePayment = () => {
    if (amount > 0 && currency !== "" && redirect_url !== "") {
      dispatch(initializePaymentsAction(paymentData) as any);
    }
  };

  //make payment
  const InitializePaymentRedux = useSelector(
    (state: ReducersType) => state?.initializePayments
  ) as ReduxResponseType<PaymentResponseType>;

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
  }, [
    InitializePaymentRedux?.error,
    InitializePaymentRedux?.success,
    InitializePaymentRedux?.serverResponse?.data?.data?.link,
  ]);

  // Verify Payment
  const verifyPaymentRedux = useSelector(
    (state: ReducersType) => state?.verifyPayments
  ) as ReduxResponseType<any>;

  // const verifyPaymentData = useMemo(() => {
  //   return verifyPaymentRedux?.serverResponse?.data;
  // }, [verifyPaymentRedux]);

  // verify payment
  useEffect(() => {
    setTimeout(() => {
      const tx_ref = new URLSearchParams(window.location.search).get("tx_ref");
      if (tx_ref !== null) {
        dispatch(verifyPaymentsAction({ tx_ref }) as any);
        navigate(location.pathname, { replace: true });
      }
    }, 1000);
  }, [dispatch, navigate, location.pathname]);

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
      serviceOrder?.payment_status !== "COMPLETED"
    ) {
      setTimeout(() => {
        if (
          verifyPaymentRedux.serverResponse?.data?.data?.status ===
            "successful" &&
          serviceOrder
        ) {
          setStatus(true);
          const delivery_time = (() => {
            let currentDate = new Date();
            const durationUnit =
              serviceOrder?.checkout_items?.terms?.durationUnit;
            const convertionValue =
              durationUnit === "weeks"
                ? 6.048e8
                : durationUnit === "days"
                ? 8.64e7
                : durationUnit === "months"
                ? 2.628e9
                : 3.6e6; // last one is hours
            return new Date(
              currentDate.getTime() +
                serviceOrder?.checkout_items?.terms?.duration * convertionValue
            );
          })();
          dispatch(
            updateServiceOrderAction({
              ...serviceOrder,
              payment_status: "COMPLETED",
              checkout_items: {
                ...serviceOrder.checkout_items,
                delivery_time: delivery_time.toUTCString(),
              },
            } as ServiceOrderType) as any
          );
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
        dispatch({ type: GET_SERVICE_ORDER_BYID_RESET });
      }, 2000);
    }
  }, [verifyPaymentRedux, dispatch, serviceOrder]);

  return (
    <section className="p-3 md:p-10">
      <div className="flex flex-col gap-4">
        {!status ? (
          <>
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
                <div className="px-3 font-[600] text-lg">
                  {serviceOrder?.checkout_items?.name}
                </div>
                <div className="text-[#95979D] text-sm px-3">
                  {serviceOrder?.checkout_items?.brief_description}
                </div>
                <div className="flex justify-start gap-4 font-[600] px-3">
                  <div className="flex gap-3 items-center">
                    <BsClock />
                    {serviceOrder?.checkout_items?.terms?.duration}{" "}
                    {serviceOrder?.checkout_items?.terms?.durationUnit} Delivery
                  </div>
                </div>
                <div className="flex flex-col justify-between w-full max-w-[38rem] gap-2 px-3 pb-5">
                  <div className="flex flex-row justify-between w-full">
                    <span>Amount</span>
                    <span>
                      $
                      {serviceOrder?.checkout_items?.terms?.amount ? (
                        <FormatNumber
                          price={serviceOrder?.checkout_items?.terms?.amount}
                        />
                      ) : (
                        0.0
                      )}
                    </span>
                  </div>
                  <hr />
                  <div className="flex flex-row justify-between w-full -mb-2 font-[700]">
                    <span>Total Checkout</span>
                    <span>
                      $
                      {serviceOrder?.checkout_items?.terms?.amount ? (
                        <FormatNumber
                          price={serviceOrder?.checkout_items?.terms?.amount}
                        />
                      ) : (
                        0.0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                handleMakePayment();
              }}
              className="p-2 bg-[#EDB842] rounded-md text-white my-5"
            >
              {InitializePaymentRedux?.loading ? (
                <div className="" style={{ height: "25px" }}>
                  <PulseLoader color="#ffffff" />
                </div>
              ) : (
                <span>
                  Pay $
                  {serviceOrder?.checkout_items?.terms?.amount ? (
                    <FormatNumber
                      price={serviceOrder?.checkout_items?.terms?.amount}
                    />
                  ) : (
                    0.0
                  )}
                </span>
              )}
            </button>
          </>
        ) : (
          <ServiceCheckoutBodyStatus />
        )}
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
  return (
    <div className="flex flex-col justify-between w-full max-w-[38rem] gap-2">
      <div className="w-full self-center flex flex-col gap-3">
        <div className="flex flex-row justify-start gap-4 w-full">
          <span className="font-[500] text-lg">Service Summary</span>
          <button onClick={() => settab1(!tab1)}>
            {tab1 ? <PiCaretDownBold /> : <PiCaretUpBold />}
          </button>
        </div>
        {tab1 && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between border items-center rounded-md p-3">
              <div className="text-[#5F6C72] text-sm">
                <div className="gap-2 flex">
                  <span className="text-[#191C1F]">Service:</span>
                  <span>Programmer </span>
                </div>
                <div className="gap-2 flex">
                  <span className="text-[#191C1F]">Vendor:</span>
                  <span>SonicTheHedgeHog</span>
                </div>
                <div className="gap-2 flex">
                  <span className="text-[#191C1F]">Phone Number:</span>
                  <span>+234 1234 567 890 </span>
                </div>
                <div className="gap-2 flex">
                  <span className="text-[#191C1F]">Email:</span>
                  <span> kevin.gilbert@gmail.com</span>
                </div>
              </div>
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
    </div>
  );
};

export default ServiceCheckoutBody;
