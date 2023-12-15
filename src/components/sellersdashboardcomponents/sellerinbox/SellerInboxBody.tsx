import { AiOutlineSend } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { RiCloseFill, RiImageFill } from "react-icons/ri";
import { Chat1 } from "../../../images/chat";
import { API_ROUTES } from "../../../redux/routes";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { ReducersType } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatUserType,
  GetChatsType,
  chatMessageType,
} from "../../../redux/types/chats.types";
import Swal from "sweetalert2";
import { adminUGetUserType } from "../../../redux/types/users.types";
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

const SellerInboxBody = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const seller_id = location?.state?.seller_id;
  const [product_id, setProductId] = useState<string>(
    location?.state?.product_id
  );

  const userRedux = useSelector(
    (state: ReducersType) => state?.userGetUsers
  ) as ReduxResponseType;

  const sellerRedux = useSelector(
    (state: ReducersType) => state?.userGetUser
  ) as ReduxResponseType<adminUGetUserType>;

  const loginRedux = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType;

  const userChatsRedux = useSelector(
    (state: ReducersType) => state?.getUserChats
  ) as ReduxResponseType<GetChatsType[]>;

  const [search, setSearch] = useState<string>("");
  const [receiver, setReceiver] = useState<adminUGetUserType | ChatUserType>();

  useEffect(() => {
    if (sellerRedux?.success) setReceiver(sellerRedux?.serverResponse?.data);
  }, [sellerRedux?.serverResponse?.data, sellerRedux?.success]);

  useEffect(() => {
    dispatch(userGetChatsAction() as any);
  }, [dispatch]);

  useEffect(() => {
    if (seller_id) dispatch(getUserAction(seller_id) as any);
  }, [seller_id, dispatch]);

  return (
    <section className="w-full h-full flex">
      <div className="flex flex-row w-full h-[95vh] border rounded-md">
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
              (userChatsRedux?.success &&
              userChatsRedux?.serverResponse?.data?.length ? (
                userChatsRedux?.serverResponse?.data?.map(
                  (chat: GetChatsType) => {
                    // the person current user is chatting with
                    const chattingWith: ChatUserType =
                      loginRedux?.serverResponse?.data?.id === chat?.user1?._id
                        ? chat?.user2
                        : chat?.user1;
                    return (
                      <div
                        key={chat._id}
                        onClick={() => setReceiver(chattingWith)}
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
                              {chattingWith?.first_name}{" "}
                              {chattingWith?.last_name}
                            </span>
                            {/* {chat.unread && (
                      <span className="bg-[#EDB842] text-white px-3 py-1 rounded-full w-fit h-fit">
                        {chat.unread}
                      </span>
                    )} */}
                          </div>
                          <div className="w-full flex flex-row justify-between font-[400] text-[0.875rem] text-[#767E94]">
                            <span className="flex flex-nowrap gap-[0.2rem]">
                              {chat?.messages[0]?.sender_id ===
                              loginRedux?.serverResponse?.data?.id ? (
                                <span>You: </span>
                              ) : (
                                <></>
                              )}
                              <span className="truncate w-28">
                                {chat.messages[0]?.message ||
                                  (chat?.messages[0]?.image?.length ? (
                                    <span>
                                      <RiImageFill />
                                      <span>Images</span>
                                    </span>
                                  ) : (
                                    <></>
                                  ))}
                              </span>
                            </span>
                            <FormatDate
                              dateString={
                                chat?.messages[0]?.createdAt as string
                              }
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )
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
        <ChatBox
          receiver={receiver}
          product_id={product_id}
          setProductId={setProductId}
        />
      </div>
    </section>
  );
};

const ChatBox = ({
  receiver,
  product_id,
  setProductId,
}: {
  receiver: adminUGetUserType | ChatUserType | undefined;
  product_id?: string;
  setProductId: any;
}) => {
  // Websockets related logic
  const [files, setFiles] = useState<Array<any>>([]);
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [isOnline, setIsonline] = useState<boolean>(false);

  const dispatch = useDispatch();
  const [attachment, setAttachment] = useState<
    (AdminGetProductType | AdminGetServiceType) & { isProduct: boolean }
  >();

  const socketUrl = API_ROUTES.websocket.personal;
  const [messageHistory, setMessageHistory] = useState<chatMessageType[]>([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

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
      } else {
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
  }, [receiver?._id]);

  // Effect to join websocket
  useEffect(() => {
    sendMessage(
      JSON.stringify({
        meta: "join_conversation",
        room_id: "",
        sender_id: loginRedux?.serverResponse?.data?.id || "",
        receiver_id: receiver?._id,
        message: "",
      })
    );
  }, [loginRedux?.serverResponse?.data?.id, sendMessage, receiver?._id]);

  // Effect to get the list of users online.
  // Todo: make this function to be getting if the person is online or not
  useEffect(() => {
    setInterval(() => {
      sendMessage(
        JSON.stringify({
          meta: "user_online_check",
          room_id: "",
          user_id: loginRedux?.serverResponse?.data?.id,
          message: "",
        })
      );
    }, 10000); // checks every 10 seconds
  }, [loginRedux?.serverResponse?.data?.id, sendMessage]);

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
    let images: any[] = [];
    if (files?.length > 0) {
      images = await Promise.all(
        files?.map((file: any) => {
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
        images,
        [attachment?._id
          ? attachment?.isProduct
            ? "product_id"
            : "service_id"
          : "null"]: attachment?._id,
      })
    );
  };

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
                chatMessagesRedux?.serverResponse?.data?.map(
                  (message: chatMessageType) => {
                    return (
                      <ChatMessage
                        key={message?._id}
                        message={message}
                        setAttachment={setAttachment}
                      />
                    );
                  }
                )
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
          {attachment ? (
            <Attachment
              showforward={false}
              data={attachment}
              setAttachment={setAttachment}
            />
          ) : (
            <></>
          )}
          <div className="flex flex-row border-t p-3 mt-auto">
            <input
              className="p-2 outline-none flex-1"
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(event) => setMessage(event?.target.value)}
            />
            <button
              onClick={handleSendMesage}
              className="p-2 text-2xl text-white bg-[#EDB842] rounded-md"
            >
              <AiOutlineSend />
            </button>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full justify-around">
          <span className="my-auto">Pick a User to Chat with...</span>
        </div>
      )}
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
      </div>
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
