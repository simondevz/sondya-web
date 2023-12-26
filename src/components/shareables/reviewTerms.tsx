import { useEffect, useMemo, useState } from "react";
import {
  ServiceOrderType,
  TermsType,
} from "../../redux/types/serviceOrders.types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTermsAction } from "../../redux/actions/userDashboard/serviceOrder.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { LoginResponseType } from "../../redux/types/auth.types";
import { PulseLoader } from "react-spinners";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { API_ROUTES } from "../../redux/routes";
import Swal from "sweetalert2";
import { UPDATE_TERMS_RESET } from "../../redux/constants/userDashboard/serviceOrder.constants";
import { toast } from "react-toastify";

const ReviewTerms = ({
  currentOrder,
  setCurrentOrder,
}: {
  currentOrder?: ServiceOrderType;
  setCurrentOrder: React.Dispatch<
    React.SetStateAction<ServiceOrderType | undefined>
  >;
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [rejecting, setRejecting] = useState<boolean>(false);
  const [terms, setTerms] = useState<TermsType>({
    order_id: params?.order_id || "",
    amount: 0,
    duration: 1,
    durationUnit: "hours",
    advance: 0,
    acceptedByBuyer: false,
    acceptedBySeller: false,
    rejectedByBuyer: false,
    rejectedBySeller: true,
  });

  const loginRedux = useSelector(
    (state: ReducersType) => state.login
  ) as ReduxResponseType<LoginResponseType>;

  const updateTermsRedux = useSelector(
    (state: ReducersType) => state.updateTerms
  ) as ReduxResponseType<TermsType>;

  const isSeller = useMemo(() => {
    return loginRedux.serverResponse?.data?.id === currentOrder?.seller?.id;
  }, [loginRedux.serverResponse?.data?.id, currentOrder?.seller?.id]);

  useEffect(() => {
    if (currentOrder?._id)
      setTerms({
        ...currentOrder!.terms,
        buyer_id: currentOrder?.buyer?.id,
        seller_id: currentOrder?.seller?.id,
        order_id: params?.order_id || "",
      });
  }, [
    params?.order_id,
    currentOrder?._id,
    currentOrder?.buyer?.id,
    currentOrder?.seller?.id,
    currentOrder,
  ]);

  // web socket logic
  const socketUrl = API_ROUTES.websocket.personal;
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // Effect to join websocket
  useEffect(() => {
    if (
      terms?.order_id !== "" &&
      loginRedux?.serverResponse?.data?.id &&
      terms?.seller_id &&
      terms?.buyer_id
    )
      sendMessage(
        JSON.stringify({
          meta: "join_review_terms_room",
          room_id: terms?.order_id,
          sender_id: loginRedux?.serverResponse?.data?.id || "",
          receiver_id: isSeller ? terms?.buyer_id : terms?.seller_id,
          message: "",
        })
      );
  }, [
    loginRedux?.serverResponse?.data?.id,
    sendMessage,
    terms?.buyer_id,
    terms?.seller_id,
    isSeller,
    terms?.order_id,
  ]);

  useEffect(() => {
    if (updateTermsRedux.success) {
      // echo it through a websocket
      sendMessage(
        JSON.stringify({
          meta: "echo_terms",
          receiver_id: isSeller ? terms?.buyer_id : terms?.seller_id,
          payload: {
            terms: updateTermsRedux?.serverResponse?.data,
            meta: "echo_terms",
            sender_id: loginRedux?.serverResponse?.data?.id,
            chat_id: params?.order_id,
          },
        })
      );
      console.log("echoed ==> ", {
        payload: {
          terms: updateTermsRedux?.serverResponse?.data,
          meta: "echo_terms",
        },
      });
      dispatch({ type: UPDATE_TERMS_RESET });
    }
  }, [
    updateTermsRedux?.serverResponse?.data,
    updateTermsRedux.success,
    terms?.buyer_id,
    terms?.seller_id,
    sendMessage,
    isSeller,
    dispatch,
    params?.order_id,
    loginRedux?.serverResponse?.data?.id,
  ]);

  //   Testing Echo Connection
  useEffect(() => {
    setInterval(() => {
      if (connectionStatus === "Open")
        sendMessage(
          JSON.stringify({
            meta: "Test_echo_terms",
            receiver_id: isSeller ? terms?.buyer_id : terms?.seller_id,
            payload: {
              message: "Echo tested, say Hi",
              meta: "Test_echo_terms",
              sender_id: loginRedux?.serverResponse?.data?.id,
              chat_id: params?.order_id,
            },
          })
        );
    }, 60 * 1000);
  }, [
    terms?.buyer_id,
    terms?.seller_id,
    sendMessage,
    isSeller,
    dispatch,
    params?.order_id,
    loginRedux?.serverResponse?.data?.id,
    connectionStatus,
  ]);

  return (
    <div className="flex flex-col gap-3 w-full md:w-1/2 shadow-md py-4">
      <div className="bg-[#EDB842] text-white p-3 rounded-t-md">
        Revive Terms
      </div>
      <Terms
        terms={terms}
        setTerms={setTerms}
        lastMessage={lastMessage}
        isSeller={isSeller}
        order_id={params?.order_id || currentOrder?._id || ""}
      />
      <div className="font-[600] text-[#667085] text-sm px-4">
        {terms?.acceptedBySeller && terms?.acceptedByBuyer ? (
          <span>
            These are the terms aggreed upon by both parties.{" "}
            {isSeller
              ? "Please click below to deliver the work done."
              : "Please click below to proceed to checkout"}
          </span>
        ) : (
          <span>
            Note: Click the "Reject Button" to edit terms and the "Accept
            Button" to notify the other party of your newly set terms. You and{" "}
            {isSeller ? "Buyer" : "Seller"} must click the “Accept Button” for
            the agreement to hold. Both parties will be notified on this
          </span>
        )}
      </div>
      {terms?.acceptedByBuyer && terms?.acceptedBySeller ? (
        <></>
      ) : (
        <div className="flex flex-row gap-3 px-4">
          <button
            onClick={() => {
              setRejecting(true);
              dispatch(
                updateTermsAction({
                  ...terms,
                  [isSeller ? "rejectedBySeller" : "rejectedByBuyer"]: true,
                  [!isSeller ? "rejectedBySeller" : "rejectedByBuyer"]: false,
                  acceptedByBuyer: false,
                  acceptedBySeller: false,
                }) as any
              );
            }}
            className="bg-[#FF0000B2] p-2 text-white rounded-md"
          >
            {updateTermsRedux?.loading && rejecting ? (
              <PulseLoader color="white" />
            ) : (
              "Reject"
            )}
          </button>
          <button
            onClick={() => {
              setRejecting(false);
              dispatch(
                updateTermsAction({
                  ...terms,
                  [isSeller ? "acceptedBySeller" : "acceptedByBuyer"]: true,
                  rejectedByBuyer: false,
                  rejectedBySeller: false,
                }) as any
              );
            }}
            className="bg-[#EDB842] p-2 text-white rounded-md"
          >
            {updateTermsRedux?.loading && !rejecting ? (
              <PulseLoader color="white" />
            ) : (
              "Accept"
            )}
          </button>
        </div>
      )}
      {isSeller ? (
        <>
          {" "}
          <div className="font-[600] text-[#1D1F2C] px-4">Delivery</div>
          <div className="font-[600] text-[#667085] text-sm px-4">
            Deliver Note: Both parties will be notified on this
          </div>
          <button className="bg-[#EDB842] p-2 text-white rounded-b-md">
            Deliver Work
          </button>
        </>
      ) : (
        <>
          <div className="font-[600] text-[#1D1F2C] px-4">Payment</div>
          <div className="font-[600] text-[#667085] text-sm px-4">
            Complete payment Note: Both parties will be notified on this
          </div>
          <button className="bg-[#EDB842] p-2 text-white rounded-b-md">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

const Terms = ({
  terms,
  setTerms,
  lastMessage,
  isSeller,
  order_id,
}: {
  terms: TermsType;
  setTerms: React.Dispatch<React.SetStateAction<TermsType>>;
  lastMessage: MessageEvent<any> | null;
  isSeller: boolean;
  order_id: string;
}) => {
  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage?.data);

      if (data?.meta) {
        if (data.meta === "Test_echo_terms") console.log(data.message);
        if (data.meta === "echo_terms") {
          const newTerms: TermsType = data?.terms;
          setTerms({ ...newTerms, order_id });
          const notificationText =
            newTerms?.acceptedByBuyer && newTerms?.acceptedBySeller
              ? `Both you and ${
                  isSeller ? "the buyer" : "the seller"
                } accepted the terms.`
              : newTerms?.acceptedByBuyer && !newTerms?.acceptedBySeller
              ? `${isSeller ? "The buyer" : "You"} set new terms.`
              : !newTerms?.acceptedByBuyer && newTerms?.acceptedBySeller
              ? `${isSeller ? "You" : "The seller"} set new terms.`
              : newTerms?.rejectedByBuyer
              ? `${isSeller ? "The buyer" : "You"} rejected the new Terms set.`
              : `${
                  isSeller ? "You" : "The seller"
                } rejected the new Terms set.`;

          toast(notificationText, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        if (data?.meta === "error_occured") {
          Swal.fire({
            title: "Error!!!",
            icon: "error",
            text: data?.error,
            confirmButtonText: "Okay",
          });
        }
      }
    }
  }, [lastMessage, setTerms, order_id, isSeller]);

  const disableInputs = useMemo(() => {
    return !terms.rejectedByBuyer && !terms.rejectedBySeller ? true : false;
  }, [terms.rejectedByBuyer, terms.rejectedBySeller]);

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <div>{disableInputs ? "Currently Set Terms" : "Edit Terms"}</div>
      <div className="flex w-full gap-2">
        <div className="flex base-1/2 flex-col">
          <label htmlFor="amount">Amount:</label>
          <input
            className="border-2 border-[#667085]"
            id="amount"
            disabled={disableInputs}
            type={"number"}
            name="amount"
            value={terms.amount}
            onChange={(event) =>
              setTerms({ ...terms, amount: Number(event.target.value) })
            }
          />
        </div>
        <div className="flex base-1/2 flex-col">
          <label htmlFor="advance">Advance:</label>
          <input
            className="border-2 border-[#667085]"
            disabled={disableInputs}
            id="advance"
            name="advance"
            type={"number"}
            max={100}
            min={0}
            value={terms.advance}
            onChange={(event) =>
              setTerms({ ...terms, advance: Number(event.target.value) })
            }
          />
        </div>
      </div>
      <div className="flex base-1/2 flex-col">
        <label htmlFor="duration">Duration:</label>
        <div className="flex">
          <input
            className="border-2 border-[#667085]"
            disabled={disableInputs}
            id="duration"
            name="duration"
            type={"number"}
            min={1}
            value={terms.duration}
            onChange={(event) =>
              setTerms({ ...terms, duration: Number(event.target.value) })
            }
          />
          <select
            onChange={(event) =>
              setTerms({ ...terms, durationUnit: event.target.value })
            }
            disabled={disableInputs}
            id="durationUnit"
          >
            <option value={"hours"}>hours</option>
            <option value={"days"}>days</option>
            <option value={"weeks"}>weeks</option>
            <option value={"months"}>months</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReviewTerms;
