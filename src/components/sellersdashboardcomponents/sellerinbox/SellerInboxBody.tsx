import { AiOutlineSend } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineAttachFile } from "react-icons/md";
import { RiCloseFill, RiImageFill } from "react-icons/ri";
import { Chat1 } from "../../../images/chat";
import { API_ROUTES } from "../../../redux/routes";
import { useEffect, useMemo, useState } from "react";
import useWebSocket, { ReadyState, SendMessage } from "react-use-websocket";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { ReducersType } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatUserType,
  GetChatsType,
  chatMessageType,
} from "../../../redux/types/chats.types";
import Swal from "sweetalert2";
import { ImageType, adminUGetUserType } from "../../../redux/types/users.types";
import {
  userGeChatMessagesAction,
  userGetChatsAction,
} from "../../../redux/actions/userDashboard/chats.actions";
import {
  getUserAction,
  userGetUsersAction,
} from "../../../redux/actions/userDashboard/user.actions";
import { user3 } from "../../../images/users";
import { useLocation } from "react-router-dom";
import { userGetProductByIdAction } from "../../../redux/actions/userDashboard/products.action";
import { userGetServiceByIdAction } from "../../../redux/actions/userDashboard/services.actions";
import { AdminGetServiceType } from "../../../redux/types/services.types";
import { AdminGetProductType } from "../../../redux/types/products.types";
import { productImage2 } from "../../../images/products";
import { TiArrowForward } from "react-icons/ti";
import FormatDate from "../../shareables/dateFormatter";
import { LoginResponseType } from "../../../redux/types/auth.types";
import pdfImage from "../../../images/pdf.png";
import mp4Image from "../../../images/mp4.png";
import mkvImage from "../../../images/mkv.png";
import mp3Image from "../../../images/mp3.png";
import movImage from "../../../images/mov.png";
import aviImage from "../../../images/avi.png";
import webmImage from "../../../images/webm.png";
import pptImage from "../../../images/ppt.png";
import docImage from "../../../images/doc.png";
import xlsImage from "../../../images/xls.png";
import txtImage from "../../../images/txt.png";
import wavImage from "../../../images/wav.png";
import unknownImage from "../../../images/unknown.png";

const SellerInboxBody = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [receiver, setReceiver] = useState<adminUGetUserType | ChatUserType>();
  const [chatId, setChatId] = useState<string>("");
  const seller_id = location?.state?.seller_id;
  const [userChats, setUserChats] = useState<GetChatsType[]>();

  const userChatsRedux = useSelector(
    (state: ReducersType) => state?.getUserChats
  ) as ReduxResponseType<GetChatsType[]>;

  const sellerRedux = useSelector(
    (state: ReducersType) => state?.userGetUser
  ) as ReduxResponseType<adminUGetUserType>;

  useEffect(() => {
    if (sellerRedux?.success) setReceiver(sellerRedux?.serverResponse?.data);
  }, [sellerRedux?.serverResponse?.data, sellerRedux?.success]);

  useEffect(() => {
    dispatch(userGetChatsAction() as any);
  }, [dispatch]);

  useEffect(() => {
    if (seller_id) dispatch(getUserAction(seller_id) as any);
  }, [seller_id, dispatch]);

  useEffect(() => {
    dispatch(userGetChatsAction() as any);
  }, [dispatch]);

  useEffect(() => {
    if (userChatsRedux?.success)
      setUserChats(userChatsRedux?.serverResponse?.data);
  }, [userChatsRedux?.success, userChatsRedux?.serverResponse?.data]);

  const socketUrl = API_ROUTES.websocket.personal;
  const [messageHistory, setMessageHistory] = useState<chatMessageType[]>([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

  const [chatLastMessage, setChatLastMessage] =
    useState<MessageEvent<any> | null>(lastMessage);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage?.data);

      if (data?.meta) {
        if (data?.meta === "new_room") {
          setUserChats((prevChats) => {
            return prevChats
              ?.concat(data.chats)
              ?.sort(
                (chat1, chat2) =>
                  new Date(
                    chat1?.messages?.[0]?.createdAt as string
                  ).getTime() -
                  new Date(chat2?.messages?.[0]?.createdAt as string).getTime()
              );
          });
        }
        if (data?.meta === "connection_tested") {
          console.log(data);
        }
      } else {
        setUserChats((prevChats) => {
          console.log("prevChats ==> ", prevChats);
          const index = prevChats?.findIndex(
            (chat) => chat?._id === data?.chat_id
          );

          if (!prevChats?.[Number(index)]) return prevChats;
          if (prevChats) prevChats[Number(index)].messages = [data];
          prevChats
            ?.sort(
              (chat1, chat2) =>
                new Date(chat1?.messages?.[0]?.createdAt as string).getTime() -
                new Date(chat2?.messages?.[0]?.createdAt as string).getTime()
            )
            .reverse();
          console.log("prevChats ==>> ", prevChats);
          return prevChats;
        });
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (lastMessage !== null) {
      setChatLastMessage(() => lastMessage);
    }
  }, [lastMessage]);

  return (
    <section className="w-full h-full flex">
      <div className="flex flex-row w-full h-[95vh] border rounded-md">
        <InboxList
          setReceiver={setReceiver}
          setChatId={setChatId}
          sendMessage={sendMessage}
          userChats={userChats}
        />
        <ChatBox
          receiver={receiver}
          chatId={chatId}
          sendMessage={sendMessage}
          lastMessage={chatLastMessage}
          readyState={readyState}
          setMessageHistory={setMessageHistory}
          messageHistory={messageHistory}
        />
      </div>
    </section>
  );
};

const InboxList = ({
  setReceiver,
  setChatId,
  sendMessage,
  userChats,
}: {
  setReceiver: React.Dispatch<
    React.SetStateAction<adminUGetUserType | ChatUserType | undefined>
  >;
  userChats: GetChatsType[] | undefined;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: SendMessage;
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [search, setSearch] = useState<string>("");
  const seller_id = location?.state?.seller_id;

  const userRedux = useSelector(
    (state: ReducersType) => state?.userGetUsers
  ) as ReduxResponseType;

  const loginRedux = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType;

  const chatIdList = useMemo(() => {
    return userChats?.map((chat) => chat?._id);
  }, [userChats]);

  useEffect(() => {
    if (seller_id) dispatch(getUserAction(seller_id) as any);
  }, [seller_id, dispatch]);

  // Effect to join websocket
  useEffect(() => {
    if (
      chatIdList?.[0] &&
      chatIdList?.length &&
      loginRedux?.serverResponse?.data?.id
    )
      sendMessage(
        JSON.stringify({
          meta: "join_conversations",
          room_id: "lobby",
          room_ids: chatIdList,
          user_id: loginRedux?.serverResponse?.data?.id,
          receiver_id: "",
          message: "",
        })
      );
  }, [
    chatIdList?.length,
    chatIdList,
    loginRedux?.serverResponse?.data?.id,
    sendMessage,
  ]);

  // Checks for new rooms(chats).
  useEffect(() => {
    setInterval(() => {
      if (loginRedux?.serverResponse?.data?.id)
        sendMessage(
          JSON.stringify({
            meta: "new_room_check",
            room_id: "lobby",
            user_id: loginRedux?.serverResponse?.data?.id,
            message: "",
          })
        );
    }, 10000); // checks every 10 seconds
  }, [loginRedux?.serverResponse?.data?.id, sendMessage]);

  return (
    <div className="flex flex-col gap-3 w-full md:w-1/2 lg:w-1/3 border p-4">
      <div className="font-[600] text-lg">Inbox</div>
      <input
        className="p-2 bg-[#EDB84233] rounded-md w-full"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(event) => {
          const searchString = event.target.value;
          setSearch(searchString);

          if (searchString)
            dispatch(userGetUsersAction(`search=${searchString}`) as any);
        }}
      />
      <div className="overflow-y-auto flex flex-col gap-2">
        {/* User Chats */}
        {!search &&
          (userChats?.length ? (
            userChats
              ?.sort(
                (chat1, chat2) =>
                  new Date(
                    chat1?.messages?.[0]?.createdAt as string
                  ).getTime() -
                  new Date(chat2?.messages?.[0]?.createdAt as string).getTime()
              )
              .reverse()
              ?.map((chat: GetChatsType) => {
                // the person current user is chatting with
                const chattingWith: ChatUserType =
                  loginRedux?.serverResponse?.data?.id === chat?.user1?._id
                    ? chat?.user2
                    : chat?.user1;
                return (
                  <InboxListItem
                    key={chat?._id}
                    setReceiver={setReceiver}
                    setChatId={setChatId}
                    chattingWith={chattingWith}
                    chat={chat}
                  />
                );
              })
          ) : (
            <div>No Conversations Yet...</div>
          ))}

        {/* New contacts */}
        {search &&
          (userRedux?.success ? (
            userRedux?.serverResponse?.data?.length ? (
              userRedux?.serverResponse?.data?.map(
                (user: adminUGetUserType) => {
                  return (
                    <div
                      key={user?._id}
                      onClick={() => setReceiver(user)}
                      className="flex flex-col gap-2 p-2"
                    >
                      <span>
                        {user.first_name} {user.last_name}
                      </span>
                    </div>
                  );
                }
              )
            ) : (
              <span>No User Found</span>
            )
          ) : (
            userRedux?.loading && <>loading...</>
          ))}
      </div>
    </div>
  );
};

const InboxListItem = ({
  chat,
  setReceiver,
  setChatId,
  chattingWith,
}: {
  chattingWith: ChatUserType;
  chat: GetChatsType;
  setChatId: (value: React.SetStateAction<string>) => void;
  setReceiver: (
    value: React.SetStateAction<adminUGetUserType | ChatUserType | undefined>
  ) => void;
}) => {
  const [messageToShow, setMessageToShow] = useState<chatMessageType>();
  const loginRedux = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType>;

  useEffect(() => {
    setMessageToShow(chat?.messages[0]);
  }, [chat?.messages]);

  return (
    <div
      key={chat._id}
      onClick={() => {
        setReceiver(chattingWith);
        setChatId(chat._id);
      }}
      className="flex flex-row gap-2 w-full"
    >
      <img
        className="object-contain w-10 h-10"
        src={chattingWith?.image?.[0]?.url || user3}
        alt=""
      />
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row justify-between">
          <span>
            {chattingWith?.first_name} {chattingWith?.last_name}
          </span>
          {/* {chat.unread && (
<span className="bg-[#EDB842] text-white px-3 py-1 rounded-full w-fit h-fit">
{chat.unread}
</span>
)} */}
        </div>
        <div className="w-full flex flex-row justify-between font-[400] text-[0.875rem] text-[#767E94]">
          <span className="flex flex-nowrap gap-[0.2rem]">
            {(messageToShow?.sender_id as unknown as string) ===
              loginRedux?.serverResponse?.data?.id ||
            messageToShow?.sender_id?._id ===
              loginRedux?.serverResponse?.data?.id ? (
              <span>You: </span>
            ) : (
              <></>
            )}
            <span className="truncate w-28">
              {chat.messages[0]?.message ||
                (messageToShow?.file_attachments?.length ? (
                  <span className="flex">
                    <RiImageFill className="my-auto" />
                    <span className="my-auto">files</span>
                  </span>
                ) : (
                  <></>
                ))}
            </span>
          </span>
          <FormatDate dateString={messageToShow?.createdAt as string} />
        </div>
      </div>
    </div>
  );
};

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
  ) as ReduxResponseType;

  const chatMessagesRedux = useSelector(
    (state: ReducersType) => state?.userGetChatMessages
  ) as ReduxResponseType;

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

      file_attachments = await Promise.all(
        fileList?.map((file: any) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (event: any) => {
              resolve({
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
                fileContent: event?.target?.result,
              });
            };

            reader.onerror = (error) => {
              reject(error);
            };
          });
        })
      );
    }

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

const SelectedFilesPreview = ({ fileList }: { fileList: any[] }) => {
  return (
    <div className="flex gap-2 ">
      {fileList?.length ? (
        fileList?.map((file, index) => {
          return (
            <div
              key={index}
              className=" flex gap-2 w-24 h-24 p-2 overflow-x-auto shadow-xl"
            >
              {file.type.includes("image") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="uploaded"
                  className="object-fit w-full h-full"
                />
              ) : file.type.includes("video") ? (
                <img
                  src={mp4Image}
                  alt="video placeholder"
                  className="object-fit w-full h-full"
                />
              ) : file.type.includes("application") ? (
                <img
                  src={pdfImage}
                  alt="documentplace holder placeholde"
                  className="object-fit w-full h-full"
                />
              ) : file.type.includes("audio") ? (
                <img
                  src={mp3Image}
                  alt="audio placeholder"
                  className="object-fit w-full h-full"
                />
              ) : (
                <></>
              )}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

const ChatBoxInput = ({
  message,
  setMessage,
  handleSendMesage,
  setFiles,
}: {
  message: string;
  setMessage: (value: React.SetStateAction<string>) => void;
  handleSendMesage: () => Promise<void>;
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const acceptedFormats: string =
    ".png, .jpg, .jpeg, .mp4, .webm, .mkv, .avi, .mov, .wav, .mp3, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt";
  return (
    <div className="flex flex-row border-t p-3 mt-auto">
      <input
        className="p-2 outline-none flex-1"
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(event) => setMessage(event?.target.value)}
      />
      <button className="text-2xl text-white bg-[#EDB842] relative rounded-md mx-2">
        <label className="p-2 flex cusor-pointer" htmlFor="files_input">
          <MdOutlineAttachFile />
        </label>
      </button>
      <input
        className="hidden"
        type="file"
        multiple
        accept={acceptedFormats}
        onChange={(event) =>
          setFiles(event.target.files as unknown as Array<any>)
        }
        id="files_input"
      />
      <button
        onClick={handleSendMesage}
        className="p-2 text-2xl text-white bg-[#EDB842] rounded-md"
      >
        <AiOutlineSend />
      </button>
    </div>
  );
};

const ChatMessage = ({
  message,
  setAttachment,
}: {
  message: chatMessageType;
  setAttachment: React.Dispatch<
    React.SetStateAction<
      | ((AdminGetProductType | AdminGetServiceType) & { isProduct: boolean })
      | undefined
    >
  >;
}) => {
  const dispatch = useDispatch();
  const service_id = message?.service_id;
  const product_id = message?.product_id;

  const [product, setProduct] = useState<AdminGetProductType>();
  const [service, setService] = useState<AdminGetServiceType>();

  useEffect(() => {
    if (product_id)
      dispatch(
        userGetProductByIdAction(
          product_id as string,
          setProduct as React.Dispatch<
            React.SetStateAction<
              (AdminGetProductType & { isProduct: boolean }) | undefined
            >
          >
        ) as any
      );
  }, [product_id, dispatch]);

  useEffect(() => {
    if (service_id)
      dispatch(
        userGetServiceByIdAction(
          service_id as string,
          setService as React.Dispatch<
            React.SetStateAction<
              (AdminGetServiceType & { isProduct: boolean }) | undefined
            >
          >
        ) as any
      );
  }, [service_id, dispatch]);

  return (
    <div key={message?._id} className={"flex flex-row gap-2 w-full my-2"}>
      <div className="">
        <img src={message?.sender_id?.image?.[0]?.url || Chat1} alt="" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-[600] flex gap-2">
          <span>
            {message?.sender_id?.first_name} {message?.sender_id?.last_name}
          </span>
          <FormatDate
            dateString={message.createdAt as string}
            className="text-[#939AAD]"
          />
        </div>
        <div className="text-[#636A80]">{message?.message}</div>

        {product?._id ? (
          <Attachment
            setAttachment={setAttachment}
            data={{ ...product, isProduct: true }}
            showforward
          />
        ) : (
          <></>
        )}
        {service?._id ? (
          <Attachment
            setAttachment={setAttachment}
            data={{ ...service, isProduct: false }}
            showforward
          />
        ) : (
          <></>
        )}
        {message?.file_attachments?.length ? (
          <ViewMedia files={message.file_attachments} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const ViewMedia = ({
  files,
}: {
  files: (ImageType & { format: string })[];
}) => {
  return (
    <div className="grid grid-cols-2">
      {files?.map((file) => {
        return (
          <div
            key={file._id}
            className=" flex gap-2 w-24 h-24 p-2 overflow-x-auto shadow-xl"
          >
            {file?.format === "pdf" ? (
              <a
                href={file?.url}
                download={
                  file?.public_id ? file.public_id.split("/")[1] : "unknowun"
                }
              >
                <img
                  src={pdfImage}
                  alt="uploaded"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "mp4" ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={mp4Image}
                  alt="video placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "mp3" ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={mp3Image}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "png" ||
              file?.format === "jpg" ||
              file?.format === "jpeg" ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={file?.url}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "txt" ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={txtImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === ("doc" || "docx") ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={docImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file.format === ("ppt" || "pptx") ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={pptImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === ("xls" || "xlsx") ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={xlsImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "mkv" ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={mkvImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "avi" ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={aviImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "webm" ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={webmImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "mov" ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={movImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "wav" ? (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={wavImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : (
              <a href={file?.url} download={file?.public_id}>
                <img
                  src={unknownImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Attachment = ({
  data,
  showforward,
  setAttachment,
}: {
  data: (AdminGetProductType | AdminGetServiceType) & { isProduct: boolean };
  showforward: boolean;
  setAttachment: React.Dispatch<
    React.SetStateAction<
      | ((AdminGetProductType | AdminGetServiceType) & { isProduct: boolean })
      | undefined
    >
  >;
}) => {
  return (
    <div className="flex relative border w-fit gap-4 rounded-lg p-2 pr-6 justify-between">
      <button
        onClick={() => setAttachment?.(undefined)}
        className={
          (!showforward ? "flex " : "hidden ") + "absolute right-2 top-2"
        }
      >
        <RiCloseFill />
      </button>
      <img
        src={data?.image?.[0]?.url || productImage2}
        alt={data?.name}
        className="w-20 h-20 object-fit rounded-lg"
      />
      <span className="flex flex-col justify-between text-[0.875rem]">
        <span>{data?.name}</span>
        <span className="text-red-500">${data?.current_price}.00</span>
      </span>
      <button
        onClick={() => setAttachment?.(data)}
        className={
          (showforward ? " flex" : " hidden") +
          " absolute bottom-1/2 right-[-1.5rem]"
        }
      >
        <TiArrowForward />
      </button>
    </div>
  );
};

export default SellerInboxBody;
