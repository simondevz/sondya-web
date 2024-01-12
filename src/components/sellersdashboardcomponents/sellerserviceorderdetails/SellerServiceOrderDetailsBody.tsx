import { useEffect, useState } from "react";
import { BiSolidPackage } from "react-icons/bi";
import { FaHandshake, FaUserAlt } from "react-icons/fa";
import { MdArrowDropDown, MdEmail, MdPhoneEnabled } from "react-icons/md";
import { PiNotebookLight } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { Modal } from "react-overlays";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "../../../css/modal.css";
import { ImgExample } from "../../../images";
import { trackRod1 } from "../../../images/cart";
import {
  getServiceOrderByIdAction,
  updateServiceOrderAction,
} from "../../../redux/actions/userDashboard/serviceOrder.actions";
import {
  GET_SERVICE_ORDER_BYID_RESET,
  UPDATE_SERVICE_ORDERS_RESET,
} from "../../../redux/constants/userDashboard/serviceOrder.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { ServiceOrderType } from "../../../redux/types/serviceOrders.types";
import { FormatNumber } from "../../shareables/FormatNumber";
import { TimeLeft } from "../../shareables/dateFormatter";
import ReviewTerms from "../../shareables/reviewTerms";
import { ServiceDetailsChat } from "../../shareables/serviceChatBox";

const SellerServiceOrderDetailsBody = () => {
  const [showReviewTerms, setShowReviewTerms] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<ServiceOrderType>();
  const [showDeliverDialogue, setShowDevliverDialogue] = useState<boolean>();

  const [deliver, setDeliver] = useState<boolean>(false);
  const dispatch = useDispatch();
  const params = useParams();

  const serviceOrderById = useSelector(
    (state: ReducersType) => state.getServiceOrderById
  ) as ReduxResponseType<ServiceOrderType>;

  const updatedServiceOrderRedux = useSelector(
    (state: ReducersType) => state.updateServiceOrders
  ) as ReduxResponseType<ServiceOrderType>;

  // deliver the service.
  useEffect(() => {
    if (
      deliver &&
      currentOrder &&
      currentOrder.order_status !== "DELIVERED" &&
      currentOrder.order_status !== "COMPLETED"
    ) {
      dispatch(
        updateServiceOrderAction({
          ...currentOrder,
          order_status: "DELIVERED",
        }) as any
      );
    }
  }, [deliver, dispatch, currentOrder, currentOrder?.order_status]);

  // update service after calling updateserviceorderaction
  useEffect(() => {
    if (updatedServiceOrderRedux.success) {
      setCurrentOrder(updatedServiceOrderRedux.serverResponse?.data);
      toast("Order Status Updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: UPDATE_SERVICE_ORDERS_RESET });
    }

    if (updatedServiceOrderRedux?.error)
      Swal.fire({
        title: "Error!!",
        text: updatedServiceOrderRedux?.error,
        icon: "error",
        timer: 3000,
        confirmButtonText: "Okay",
      }).finally(() => dispatch({ type: UPDATE_SERVICE_ORDERS_RESET }));
  }, [
    dispatch,
    updatedServiceOrderRedux?.success,
    updatedServiceOrderRedux?.serverResponse?.data,
    updatedServiceOrderRedux?.error,
  ]);

  // Get service order details
  useEffect(() => {
    if (!currentOrder?.order_id) {
      dispatch(
        getServiceOrderByIdAction({ order_id: params?.order_id || "" }) as any
      );
    }
  }, [dispatch, params?.order_id, currentOrder?.order_id]);

  // If get service by id is run setState
  useEffect(() => {
    if (serviceOrderById?.success) {
      setCurrentOrder(serviceOrderById?.serverResponse?.data);
      dispatch({ type: GET_SERVICE_ORDER_BYID_RESET });
    }
  }, [
    dispatch,
    serviceOrderById?.serverResponse?.data,
    serviceOrderById?.success,
    params?.order_id,
  ]);

  return (
    <section className="flex flex-col gap-6 w-full p-3">
      <div className="flex flex-row gap-3">
        <span className="p-2 font-[#1A9882]">Time Left</span>
        <TimeLeft
          utcDateString={currentOrder?.checkout_items?.delivery_time || ""}
          className="p-2 bg-[#E9FAF7] text-[#1A9882] rounded-md"
        />
      </div>
      <div className="w-full overflow-x-auto shadow-md">
        <table className="table-auto w-full">
          <thead className="bg-[#F0F1F3]">
            <tr className="text-[#1D1F2C] font-[600]">
              <th className="py-2 px-3 text-start">Service</th>
              <th className="py-2 px-3 text-start">Order ID</th>
              <th className="py-2 px-3 text-start whitespace-nowrap">
                Duration
              </th>
              <th className="py-2 px-3 text-start">Price</th>
              <th className="py-2 px-3 text-start">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="flex flex-col md:flex-row  gap-4 py-2 px-3 w-56 md:w-auto">
                <img
                  className="w-20 h-20"
                  src={
                    currentOrder?.checkout_items?.image?.[0]?.url || ImgExample
                  }
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <div className="font-[600] text-[#1D1F2C]">
                    {currentOrder?.checkout_items?.name}
                  </div>
                  <div className="font-[400] text-[#667085]">
                    {currentOrder?.checkout_items?.brief_description}
                  </div>
                </div>
              </td>
              <td className="text-[#666666] py-2 px-3">
                {currentOrder?.order_id}
              </td>
              <td className="text-[#666666] py-2 px-3">
                {currentOrder?.checkout_items?.terms?.duration}{" "}
                {currentOrder?.checkout_items?.terms?.durationUnit}
              </td>
              <td className="text-[#666666] py-2 px-3">
                $
                {currentOrder?.checkout_items?.terms?.amount && (
                  <FormatNumber
                    price={currentOrder?.checkout_items?.terms?.amount}
                  />
                )}
              </td>
              <td className="text-[#666666] py-2 px-3">
                $
                {(currentOrder?.checkout_items?.total_price ||
                  currentOrder?.checkout_items?.terms?.amount) && (
                  <FormatNumber
                    price={
                      currentOrder?.checkout_items?.total_price ||
                      currentOrder?.checkout_items?.terms?.amount
                    }
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-around text-lg md:text-xl text-[#191C1F]">
        <div className="flex flex-col items-center">
          <span className="text-[#2DB224]">
            <PiNotebookLight />
          </span>
          <span>Order Placed</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#EDB842]">
            <BiSolidPackage />
          </span>
          <span>Progress</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#EDB842]">
            <FaHandshake />
          </span>
          <span>Delivered</span>
        </div>
      </div>
      <div className="">
        <img
          className="object-cover mx-auto w-[67%] h-2"
          src={trackRod1}
          alt=""
        />
        <div className="w-full flex flex-row justify-around">
          <span className="p-1 bg-[#EDB842] h-fit w-fit rounded-full -mt-4">
            <span
              className={
                (currentOrder?.payment_status === "COMPLETED"
                  ? ""
                  : " invisible ") + "text-white text-xl"
              }
            >
              <TiTick />
            </span>
          </span>
          <span
            className={
              (currentOrder?.payment_status === "COMPLETED"
                ? " bg-[#EDB842] "
                : " bg-white border-[#EDB842] border-2 ") +
              "p-1 h-fit w-fit rounded-full -mt-4"
            }
          >
            <span
              className={
                (currentOrder?.order_status === "DELIVERED"
                  ? ""
                  : " invisible ") + "text-white text-xl"
              }
            >
              <TiTick />
            </span>
          </span>
          <span
            className={
              (currentOrder?.order_status === "DELIVERED"
                ? " bg-[#EDB842] "
                : " bg-white border-[#EDB842] border-2 ") +
              "p-1 h-fit w-fit rounded-full -mt-4"
            }
          >
            <span
              className={
                (currentOrder?.order_status === "COMPLETED"
                  ? ""
                  : " invisible ") + "text-white text-xl"
              }
            >
              <TiTick />
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap text-[0.875rem] justify-around w-full">
        <div className="flex flex-col gap-6 shadow-md p-4 rounded-md w-fit">
          <div className="font-[600]">Vendor</div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <FaUserAlt />
              </span>
              <span>Vendor</span>
            </div>
            <span>{currentOrder?.seller?.username}</span>
          </div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdEmail />
              </span>
              <span>Email</span>
            </div>
            <span>{currentOrder?.seller?.email}</span>
          </div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdPhoneEnabled />
              </span>
              <span>Phone</span>
            </div>
            <span>{currentOrder?.seller?.phone || "Nil"}</span>
          </div>
        </div>
        {/* custommer part */}
        <div className="flex flex-col gap-6 shadow-md p-4 rounded-md w-fit">
          <div className="font-[600]">Customer</div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <FaUserAlt />
              </span>
              <span>Customer</span>
            </div>
            <span>{currentOrder?.buyer?.username}</span>
          </div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdEmail />
              </span>
              <span>Email</span>
            </div>
            <span>{currentOrder?.buyer?.email}</span>
          </div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdPhoneEnabled />
              </span>
              <span>Phone</span>
            </div>
            <span>{currentOrder?.buyer?.phone || "Nil"}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-8">
        <button
          className="flex px-6 py-2 bg-[#EDB84233] text-[#EDB842] font-semibold text-[0.875rem] rounded-md justify-between w-fit gap-2"
          onClick={() => setShowReviewTerms(true)}
        >
          <span className="my-auto">Review Terms</span>
          <span className="my-auto">
            <MdArrowDropDown />
          </span>
        </button>
        <button
          className="flex px-6 py-2 bg-[#EDB842] text-[#fff] font-semibold text-[0.875rem] rounded-md justify-between w-fit gap-2"
          onClick={() => {
            if (
              !(
                currentOrder?.checkout_items?.terms?.acceptedByBuyer &&
                currentOrder?.checkout_items?.terms?.acceptedBySeller
              )
            ) {
              Swal.fire({
                title: "Error!!",
                icon: "error",
                text: "You both have to agree to set terms before you can deliver the work...",
                confirmButtonText: "okay",
              });
              return;
            }

            setShowDevliverDialogue(true);
          }}
        >
          <span className="my-auto">Deliver Work</span>
        </button>
      </div>
      <DeliverWorkModal
        showModal={showDeliverDialogue}
        order_status={currentOrder?.order_status || ""}
        handleClose={() => setShowDevliverDialogue(false)}
        handledeliver={() => {
          setDeliver(true);
          setShowDevliverDialogue(false);
        }}
      />
      <ReviewTerms
        currentOrder={currentOrder}
        showModal={showReviewTerms}
        handleClose={() => setShowReviewTerms(false)}
      />
      {/* the owner_id is the id of the person recieving the messages. */}
      {/* In this particular case the person recieving the messages will be the buyer since it is the seller that will be sending the messages */}
      {/* The componenet was originally made for the customer to contact the seller without leaving the details page hence the variable name "owner_id" */}
      <div className="flex justify-center w-full ">
        <ServiceDetailsChat
          owner_id={currentOrder?.buyer?.id || ""}
          service_id={currentOrder?.checkout_items?._id || ""}
        />
      </div>
    </section>
  );
};

const DeliverWorkModal = ({
  showModal,
  handleClose,
  handledeliver,
  order_status,
}: {
  showModal: any;
  handleClose: any;
  handledeliver: any;
  order_status: string;
}) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  return (
    <Modal
      className="modal top-[20%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div className="flex flex-col gap-6 p-6 font-[600] text-[#667085] text-sm text-center ">
        <span>
          {order_status !== "DELIVERED" &&
            order_status !== "COMPLETED" &&
            "You can submit the work you did in the chat below then click the deliver button. Note that The Buy will confirm your work before the money is released."}
          {order_status === "DELIVERED" &&
            "Your work has been delivered. We are waiting for the buyer to confirm."}
          {order_status === "COMPLETED" &&
            "This order has been completed your money has been sent to your account."}
        </span>
        <div className="flex gap-3">
          {order_status !== "DELIVERED" && order_status !== "COMPLETED" && (
            <button
              onClick={handledeliver}
              className="flex px-6 py-2 bg-[#EDB842] text-[#fff] font-semibold text-[0.875rem] rounded-md justify-between w-fit gap-2"
            >
              Devliver
            </button>
          )}
          <button
            onClick={handleClose}
            className="flex px-6 py-2 bg-[#EDB842] text-[#fff] font-semibold text-[0.875rem] rounded-md justify-between w-fit gap-2"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SellerServiceOrderDetailsBody;
