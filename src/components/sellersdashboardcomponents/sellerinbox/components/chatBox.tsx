import { useState, useMemo, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { SendMessage, ReadyState } from "react-use-websocket";
import Swal from "sweetalert2";
import { Chat1 } from "../../../../images/chat";
import {
  userSendChatMessageAction,
  userGeChatMessagesAction,
} from "../../../../redux/actions/userDashboard/chats.actions";
import { userGetProductByIdAction } from "../../../../redux/actions/userDashboard/products.action";
import { USER_SEND_MESSAGES_RESET } from "../../../../redux/constants/userDashboard/chats.constants";
import { ReducersType } from "../../../../redux/store";
import { LoginResponseType } from "../../../../redux/types/auth.types";
import {
  ChatUserType,
  chatMessageType,
} from "../../../../redux/types/chats.types";
import { ReduxResponseType } from "../../../../redux/types/general.types";
import { AdminGetProductType } from "../../../../redux/types/products.types";
import { AdminGetServiceType } from "../../../../redux/types/services.types";
import { adminUGetUserType } from "../../../../redux/types/users.types";
import Attachment from "./attachment";
import ChatBoxInput from "./chatBoxInput";
import ChatMessage from "./chatBoxMessage";
import SelectedFilesPreview from "./selectedFilePreview";

const ChatBox = ({
  receiver,
  chatId,
  sendMessage,
  lastMessage,
  readyState,
  setMessageHistory,
  messageHistory,
}: {
  receiver: adminUGetUserType | ChatUserType | undefined;
  chatId: string;
  sendMessage: SendMessage;
  lastMessage: MessageEvent<any> | null;
  readyState: ReadyState;
  setMessageHistory: React.Dispatch<React.SetStateAction<chatMessageType[]>>;
  messageHistory: chatMessageType[];
}) => {
  // Websockets related logic
  const location = useLocation();
  const [message, setMessage] = useState<string>("");
  const [files, setFiles] = useState<Array<any>>([]);
  const fileList = useMemo(() => {
    let returnList: any[] = [];
    for (let index = 0; index < files.length; index++) {
      returnList = [...returnList, files[index]];
    }
    console.log(returnList);
    return returnList;
  }, [files]);

  const [sending, setSending] = useState<boolean>(false);
  const [isOnline, setIsonline] = useState<boolean>(false);
  const [product_id, setProductId] = useState<string>(
    location?.state?.product_id
  );

  const dispatch = useDispatch();
  const [attachment, setAttachment] = useState<
    (AdminGetProductType | AdminGetServiceType) & { isProduct: boolean }
  >();

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
            receiver_id: receiver?._id,
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
    receiver?._id,
  ]);

  useEffect(() => {
    if (product_id)
      dispatch(
        userGetProductByIdAction(
          product_id as string,
          setAttachment as React.Dispatch<
            React.SetStateAction<
              | (AdminGetProductType & {
                  isProduct: boolean;
                })
              | undefined
            >
          >
        ) as any
      );
  }, [product_id, dispatch]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage?.data);

      if (data?.meta) {
        if (data?.meta === "users_online") {
          if (data?.online?.length === 2) setIsonline(true);
          if (data?.online?.length < 2) setIsonline(false);
        }

        if (data?.meta === "connection_tested") {
          console.log(data);
        }

        if (data?.meta === "error_occured") {
          setSending(false);
          setMessage("");
          setFiles([]);
          setAttachment(undefined);
          setProductId("");
          Swal.fire({
            title: "Error!!!",
            icon: "error",
            text: data?.error,
            confirmButtonText: "Okay",
          });
        }
      } else {
        console.log("in chat box ==>> ", data);
        setMessageHistory((prev: chatMessageType[]) => {
          setSending(false);
          setMessage("");
          setFiles([]);
          setAttachment(undefined);
          setProductId("");
          return prev.concat(data);
        });
      }
    }
  }, [lastMessage, setMessageHistory, setProductId]);

  // Clear last messages when receiver changes
  useEffect(() => {
    setMessageHistory([]);
    setAttachment(undefined);
  }, [receiver?._id, setMessageHistory]);

  // Effect to join websocket
  useEffect(() => {
    if (chatId !== "" && loginRedux?.serverResponse?.data?.id && receiver?._id)
      sendMessage(
        JSON.stringify({
          meta: "join_conversation",
          room_id: chatId,
          sender_id: loginRedux?.serverResponse?.data?.id || "",
          receiver_id: receiver?._id,
          message: "",
        })
      );
  }, [
    loginRedux?.serverResponse?.data?.id,
    sendMessage,
    receiver?._id,
    chatId,
  ]);

  // This function shows if the other person is online or not
  useEffect(() => {
    setInterval(() => {
      if (chatId && loginRedux?.serverResponse?.data?.id) {
        sendMessage(
          JSON.stringify({
            meta: "user_online_check",
            room_id: chatId,
            user_id: loginRedux?.serverResponse?.data?.id,
            message: "",
          })
        );
      }
    }, 10000); // checks every 10 seconds
  }, [
    loginRedux?.serverResponse?.data?.id,
    sendMessage,
    receiver?._id,
    chatId,
  ]);

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
          reciever_id: receiver?._id || "",
          file_attachments: files,
          chat_id: chatId,
          [attachment?._id
            ? attachment?.isProduct
              ? "product_id"
              : "service_id"
            : "null"]: attachment?._id,
        }) as any
      );

      setMessage("");
      setFiles([]);
      setAttachment(undefined);
      setProductId("");
      return;
    }

    if (message) {
      sendMessage(
        JSON.stringify({
          room_id: "",
          sender_id: loginRedux?.serverResponse?.data?.id,
          receiver_id: receiver?._id,
          message,
          file_attachments,
          [attachment?._id
            ? attachment?.isProduct
              ? "product_id"
              : "service_id"
            : "null"]: attachment?._id,
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
    if (loginRedux?.serverResponse?.data?.id && receiver?._id)
      sendMessage(
        JSON.stringify({
          room_id: "",
          meta: "testing_connection",
          sender_id: loginRedux?.serverResponse?.data?.id,
          receiver_id: receiver?._id,
          message: "",
        })
      );
  }, [loginRedux?.serverResponse?.data?.id, receiver?._id, sendMessage]);

  useEffect(() => {
    if (receiver?._id) {
      dispatch(
        userGeChatMessagesAction(
          `receiver_id=${receiver?._id}&sender_id=${loginRedux?.serverResponse?.data?.id}`
        ) as any
      );
    }
  }, [dispatch, receiver?._id, loginRedux?.serverResponse?.data?.id]);

  return (
    <div className="hidden md:flex flex-col w-full h-full border">
      {receiver?._id ? (
        <>
          <div className="flex flex-row items-center justify-between p-2 border-b-2">
            <div className="flex flex-row gap-2">
              <img
                className="object-fit w-10 h-10 rounded-full"
                src={receiver?.image?.[0]?.url || Chat1}
                alt=""
              />
              <div className="flex flex-col">
                <div className="font-[600]">
                  {receiver?.first_name} {receiver?.last_name}
                </div>
                <div className="flex">
                  <span
                    className={`${
                      isOnline ? "bg-green-500" : "bg-red-500"
                    } flex w-2 h-2 rounded-full my-auto m-2`}
                  ></span>
                  <span className="text-sm text-[#636A80] font-[400]">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-[#464D61] text-2xl">
              <MdDeleteOutline />
            </span>
          </div>
          <div className="w-full h-full p-2 overflow-y-scroll">
            <div className="w-full my-4">
              <hr className="text-[#EBEEF7]" />
              <div className="font-[600] mx-auto w-fit text-[#636A80] bg-white -mt-5 h-fit p-2">
                Today
              </div>
            </div>
            {/* messages from database */}
            {chatMessagesRedux?.success ? (
              chatMessagesRedux?.serverResponse?.data?.length ? (
                chatMessagesRedux?.serverResponse?.data
                  ?.sort(
                    (message1: chatMessageType, message2: chatMessageType) =>
                      new Date(message1?.createdAt as string).getTime() -
                      new Date(message2?.createdAt as string).getTime()
                  )
                  ?.map((message: chatMessageType) => {
                    return (
                      <ChatMessage
                        key={message?._id}
                        message={message}
                        setAttachment={setAttachment}
                      />
                    );
                  })
              ) : (
                <>This is a new chat. No messages yet</>
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
                  setAttachment={setAttachment}
                />
              );
            })}
          </div>

          {/* message ends */}
          {sending ? <>sending...</> : <></>}
          <div>
            {/* Attachments to show the related product */}
            {attachment ? (
              <Attachment
                showforward={false}
                data={attachment}
                setAttachment={setAttachment}
              />
            ) : (
              <></>
            )}
            {/* Attachment to  show the file user wants to send */}
            <SelectedFilesPreview fileList={fileList} />
          </div>
          <ChatBoxInput
            message={message}
            setMessage={setMessage}
            handleSendMesage={handleSendMesage}
            setFiles={setFiles}
          />
        </>
      ) : (
        <div className="flex h-full w-full justify-around">
          <span className="my-auto">Pick a User to Chat with...</span>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
