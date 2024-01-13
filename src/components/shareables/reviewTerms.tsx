import { useEffect, useMemo, useState } from "react";
import { Modal } from "react-overlays";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Swal from "sweetalert2";
import { updateTermsAction } from "../../redux/actions/userDashboard/serviceOrder.actions";
import { UPDATE_TERMS_RESET } from "../../redux/constants/userDashboard/serviceOrder.constants";
import { API_ROUTES } from "../../redux/routes";
import { ReducersType } from "../../redux/store";
import { LoginResponseType } from "../../redux/types/auth.types";
import { ReduxResponseType } from "../../redux/types/general.types";
import {
  ServiceOrderType,
  TermsType,
} from "../../redux/types/serviceOrders.types";

const ReviewTerms = ({
  currentOrder,
  showModal,
  handleClose,
}: {
  currentOrder?: ServiceOrderType;
  showModal: any;
  handleClose: any;
}) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  const dispatch = useDispatch();
  const [rejecting, setRejecting] = useState<boolean>(false);
  const [terms, setTerms] = useState<TermsType>({
    amount: 0,
    duration: 1,
    durationUnit: "hours",
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
  // console.log("updated terms ==> ", updateTermsRedux);

  const isSeller = useMemo(() => {
    return loginRedux.serverResponse?.data?.id === currentOrder?.seller?.id;
  }, [loginRedux.serverResponse?.data?.id, currentOrder?.seller?.id]);

  useEffect(() => {
    if (currentOrder?.order_id)
      setTerms({
        ...currentOrder!.checkout_items?.terms,
      });
  }, [
    currentOrder?.order_id,
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
      currentOrder?.order_id !== "" &&
      loginRedux?.serverResponse?.data?.id &&
      currentOrder?.buyer?.id &&
      currentOrder?.seller?.id
    )
      sendMessage(
        JSON.stringify({
          meta: "join_review_terms_room",
          room_id: currentOrder?.order_id,
          sender_id: loginRedux?.serverResponse?.data?.id || "",
          receiver_id: isSeller
            ? currentOrder?.buyer?.id
            : currentOrder?.seller?.id,
          message: "",
        })
      );
  }, [
    loginRedux?.serverResponse?.data?.id,
    sendMessage,
    isSeller,
    currentOrder?.order_id,
    currentOrder?.seller?.id,
    currentOrder?.buyer?.id,
  ]);

  useEffect(() => {
    if (updateTermsRedux.success) {
      // echo it through a websocket
      sendMessage(
        JSON.stringify({
          meta: "echo_terms",
          receiver_id: isSeller
            ? currentOrder?.buyer?.id
            : currentOrder?.seller?.id,
          payload: {
            terms: updateTermsRedux?.serverResponse?.data,
            meta: "echo_terms",
            sender_id: loginRedux?.serverResponse?.data?.id,
            chat_id: currentOrder?.order_id,
          },
        })
      );
      // console.log("echoed ==> ", {
      //   payload: {
      //     terms: updateTermsRedux?.serverResponse?.data,
      //     meta: "echo_terms",
      //   },
      // });
      dispatch({ type: UPDATE_TERMS_RESET });
    }
  }, [
    updateTermsRedux?.serverResponse?.data,
    updateTermsRedux.success,
    sendMessage,
    isSeller,
    dispatch,
    currentOrder?.order_id,
    currentOrder?.buyer?.id,
    currentOrder?.seller?.id,
    loginRedux?.serverResponse?.data?.id,
  ]);

  //   Testing Echo Connection
  useEffect(() => {
    setInterval(() => {
      if (connectionStatus === "Open")
        sendMessage(
          JSON.stringify({
            meta: "Test_echo_terms",
            receiver_id: isSeller
              ? currentOrder?.buyer?.id
              : currentOrder?.seller?.id,
            payload: {
              message: "Echo tested, say Hi",
              meta: "Test_echo_terms",
              sender_id: loginRedux?.serverResponse?.data?.id,
              chat_id: currentOrder?.order_id,
            },
          })
        );
    }, 60 * 1000);
  }, [
    currentOrder?.buyer?.id,
    currentOrder?.seller?.id,
    currentOrder?.order_id,
    sendMessage,
    isSeller,
    dispatch,
    loginRedux?.serverResponse?.data?.id,
    connectionStatus,
  ]);

  return (
    <Modal
      className="modal top-[20%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div className="flex flex-col gap-3 w-full shadow-md py-4">
        <div className="bg-[#EDB842] text-white p-3 rounded-t-md">
          Revive Terms
        </div>
        <Terms
          terms={terms}
          setTerms={setTerms}
          lastMessage={lastMessage}
          isSeller={isSeller}
          order_id={currentOrder?.order_id || ""}
        />
        <div className="font-[600] text-[#667085] text-sm px-4">
          {terms?.acceptedBySeller && terms?.acceptedByBuyer ? (
            <span>
              These are the terms aggreed upon by both parties.{" "}
              {isSeller
                ? "You can now deliver the work done."
                : "You can now proceed to checkout"}
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
                  updateTermsAction(currentOrder?.order_id || "", {
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
                  updateTermsAction(currentOrder?.order_id || "", {
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
      </div>
    </Modal>
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
        // if (data.meta === "Test_echo_terms") console.log(data.message);
        if (data.meta === "echo_terms") {
          const newTerms: TermsType = data?.terms;
          setTerms(newTerms);
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
    return !terms?.rejectedByBuyer && !terms?.rejectedBySeller ? true : false;
  }, [terms?.rejectedByBuyer, terms?.rejectedBySeller]);

  return (
    <div className="flex flex-wrap gap-2 p-4 w-full">
      <div>{disableInputs ? "Currently Set Terms" : "Edit Terms"}</div>
      <div className="flex w-full gap-2">
        <div className="flex base-1/2 flex-col">
          <label htmlFor="amount">Amount:</label>
          <input
            className="border p-2 rounded-md bg-[#F9F9FC]"
            id="amount"
            disabled={disableInputs}
            type={"number"}
            name="amount"
            value={terms?.amount || 0}
            onChange={(event) =>
              setTerms({ ...terms, amount: Number(event.target.value) })
            }
          />
        </div>
      </div>
      <div className="flex base-1/2 flex-col">
        <label htmlFor="duration">Duration:</label>
        <div className="flex">
          <input
            className="border p-2 rounded-md bg-[#F9F9FC]"
            disabled={disableInputs}
            id="duration"
            name="duration"
            type={"number"}
            min={1}
            value={terms?.duration || 1}
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
