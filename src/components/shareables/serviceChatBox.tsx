import { useState, useEffect, SetStateAction, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Swal from "sweetalert2";
import {
  userGeChatMessagesAction,
  userSendChatMessageAction,
} from "../../redux/actions/userDashboard/chats.actions";
import { API_ROUTES } from "../../redux/routes";
import { ReducersType } from "../../redux/store";
import { LoginResponseType } from "../../redux/types/auth.types";
import { chatMessageType } from "../../redux/types/chats.types";
import { ReduxResponseType } from "../../redux/types/general.types";
import { AdminGetProductType } from "../../redux/types/products.types";
import { AdminGetServiceType } from "../../redux/types/services.types";
import ChatMessage from "../sellersdashboardcomponents/sellerinbox/components/chatBoxMessage";
import ChatBoxInput from "../sellersdashboardcomponents/sellerinbox/components/chatBoxInput";
import SelectedFilesPreview from "../sellersdashboardcomponents/sellerinbox/components/selectedFilePreview";
import { USER_SEND_MESSAGES_RESET } from "../../redux/constants/userDashboard/chats.constants";

export const ServiceDetailsChat = ({
  owner_id,
  service_id,
}: {
  owner_id: string;
  service_id: string;
}) => {
  // Websockets related logic
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);

  const fileList = useMemo(() => {
    let returnList: any[] = [];
    for (let index = 0; index < files?.length; index++) {
      returnList = [...returnList, files[index]];
    }
    console.log(returnList);
    return returnList;
  }, [files]);

  const socketUrl = API_ROUTES.websocket.personal;
  const [messageHistory, setMessageHistory] = useState<chatMessageType[]>([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

  const dispatch = useDispatch();
  const loginRedux = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType>;

  const chatMessagesRedux = useSelector(
    (state: ReducersType) => state?.userGetChatMessages
  ) as ReduxResponseType;

  const sendChatMessage = useSelector(
    (state: ReducersType) => state.userSendChatMessage
  ) as ReduxResponseType<chatMessageType>;

  useEffect(() => {
    const data = sendChatMessage?.serverResponse?.data;
    setSending(false);
    console.log(data);
    if (sendChatMessage?.error)
      Swal.fire({
        title: "Error!!!",
        icon: "error",
        text: sendChatMessage?.error,
        confirmButtonText: "Okay",
      }).finally(() => dispatch({ type: USER_SEND_MESSAGES_RESET }));

    if (sendChatMessage?.success) {
      if (
        sendChatMessage?.serverResponse?.message ===
        "Message sent successfully."
      ) {
        sendMessage(
          JSON.stringify({
            meta: "echo_payload",
            receiver_id: owner_id,
            payload: data,
          })
        );
        dispatch({ type: USER_SEND_MESSAGES_RESET });
      } else {
        Swal.fire({
          title: "Error!!!",
          icon: "error",
          text: sendChatMessage?.serverResponse?.message,
          confirmButtonText: "Okay",
        }).finally(() => dispatch({ type: USER_SEND_MESSAGES_RESET }));
      }
    }
  }, [
    sendChatMessage?.error,
    sendChatMessage?.success,
    sendChatMessage?.serverResponse?.data,
    sendChatMessage?.serverResponse?.message,
    dispatch,
    sendMessage,
    owner_id,
  ]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage?.data);

      if (data?.meta) {
        if (data?.meta === "connection_tested") {
          console.log(data);
        }

        if (data?.meta === "error_occured") {
          setSending(false);
          setMessage("");
          setFiles([]);
          Swal.fire({
            title: "Error!!!",
            icon: "error",
            text: data?.error,
            confirmButtonText: "Okay",
          });
        }
      } else {
        console.log("in service chat box ==>> ", data);
        setMessageHistory((prev: chatMessageType[]) => {
          setSending(false);
          setMessage("");
          setFiles([]);
          return prev.concat(data);
        });
      }
    }
  }, [lastMessage, setMessageHistory]);

  // Clear last messages when receiver changes
  useEffect(() => {
    setMessageHistory([]);
  }, [owner_id]);

  // Effect to join websocket
  useEffect(() => {
    sendMessage(
      JSON.stringify({
        meta: "join_conversation",
        room_id: "",
        sender_id: loginRedux?.serverResponse?.data?.id || "",
        receiver_id: owner_id,
        message: "",
      })
    );
  }, [loginRedux?.serverResponse?.data?.id, sendMessage, owner_id]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const handleSendMesage = async () => {
    setSending(true);
    if (connectionStatus !== "Open") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: "Please check your Internet Connection and Reload the page...",
      });
      setSending(false);
      return;
    }

    if (!loginRedux?.serverResponse?.data?.id) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: "Please login to send messages...",
      });
      setSending(false);
      return;
    }

    // If there are files to be sent process it so it can be sent in json
    let file_attachments: any[] = [];
    if (fileList?.length > 0) {
      if (fileList?.length > 4) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          timer: 5000,
          text: "You cannot send more than 4 files at a time...",
        });
        setSending(false);
        return;
      }

      for (let index = 0; index < fileList.length; index++) {
        if (fileList[index] > 10485760) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            timer: 5000,
            text: "File too large, Can't send files more than 10mb...",
          });
          setSending(false);
          return;
        }
      }

      dispatch(
        userSendChatMessageAction({
          message,
          reciever_id: owner_id || "",
          file_attachments: files,
          chat_id: "",
        }) as any
      );

      setMessage("");
      setFiles([]);
      return;
    }

    if (message) {
      sendMessage(
        JSON.stringify({
          room_id: "",
          sender_id: loginRedux?.serverResponse?.data?.id,
          receiver_id: owner_id,
          message,
          file_attachments,
        })
      );
    } else {
      setSending(false);
      Swal.fire({
        title: "Error",
        text: "Need to send Text or File",
        icon: "error",
        confirmButtonText: "Okay",
        timer: 5000,
      });
    }
  };

  useEffect(() => {
    setInterval(() => {
      if (loginRedux?.serverResponse?.data?.id && owner_id)
        sendMessage(
          JSON.stringify({
            room_id: "",
            meta: "testing_connection",
            sender_id: loginRedux?.serverResponse?.data?.id,
            receiver_id: owner_id,
            message: "",
          })
        );
    }, 60 * 1000);
  }, [loginRedux?.serverResponse?.data?.id, owner_id, sendMessage]);

  useEffect(() => {
    if (owner_id) {
      dispatch(
        userGeChatMessagesAction(
          `receiver_id=${owner_id}&sender_id=${loginRedux?.serverResponse?.data?.id}&service_id=${service_id}`
        ) as any
      );
    }
  }, [dispatch, owner_id, loginRedux?.serverResponse?.data?.id, service_id]);

  return (
    <div className="p-3 max-w-[50rem] max-h-[25rem] flex flex-col gap-4 border-2 rounded-md shadow-md overflow-y-scroll">
      <div className="p-2 shadow-md">Away. Avg. response time:1 Hour</div>
      <div className="p-3 border max-w-[30rem] mx-auto rounded-lg">
        Ask Extreme Design a question or share your project details
        (requirements, timeline, budget, etc.)
      </div>
      <div className="rounded-2xl border p-2">
        👋 Hey Extreme Design, can you help me with...
      </div>
      <div className="rounded-2xl border p-2">
        Would it be possible to get a custom offer for...
      </div>
      <div className="rounded-2xl border p-2">
        Do you think you can deliver an order by...
      </div>
      <div>
        {/* messages from database */}
        {chatMessagesRedux?.success ? (
          chatMessagesRedux?.serverResponse?.data?.length ? (
            chatMessagesRedux?.serverResponse?.data?.map(
              (message: chatMessageType) => {
                return (
                  <ChatMessage
                    key={message?._id}
                    message={message}
                    setAttachment={function (
                      value: SetStateAction<
                        | ((AdminGetServiceType | AdminGetProductType) & {
                            isProduct: boolean;
                          })
                        | undefined
                      >
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                );
              }
            )
          ) : (
            <></>
          )
        ) : chatMessagesRedux?.loading ? (
          <div>loading...</div>
        ) : (
          <></>
        )}

        {/* messages from the websocket */}
        {messageHistory.map((message: chatMessageType) => {
          return (
            <ChatMessage
              key={message?._id}
              message={message}
              setAttachment={function (
                value: SetStateAction<
                  | ((AdminGetServiceType | AdminGetProductType) & {
                      isProduct: boolean;
                    })
                  | undefined
                >
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          );
        })}

        {/* message ends */}
        {sending ? <>sending...</> : <></>}
        <div>
          {/* Attachment to  show the file user wants to send */}
          <SelectedFilesPreview fileList={fileList} />
        </div>
      </div>
      <div className="">
        <ChatBoxInput
          message={message}
          setMessage={setMessage}
          handleSendMesage={handleSendMesage}
          setFiles={setFiles}
        />
      </div>
    </div>
  );
};
