import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Logo } from "../../images/logo";
import { user1 } from "../../images/users";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userGetGroupChatMembersAction,
  userGetMessagesAction,
  userLikeMessageAction,
} from "../../redux/actions/userDashboard/groupchat.actions";
import { useLocation, useNavigate } from "react-router-dom";
import {
  adminGroupChatType,
  groupMemberType,
  groupMessageType,
} from "../../redux/types/groupchat.types";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { API_ROUTES } from "../../redux/routes";
import useWebSocket, { ReadyState } from "react-use-websocket";
import JoinBtn from "../groupchatlist/joinBtn";
import Swal from "sweetalert2";
import { TbCircleChevronLeft, TbCircleChevronRight } from "react-icons/tb";
import { ImageType } from "../../redux/types/users.types";
import { GrClose } from "react-icons/gr";

const GroupChatBody = () => {
  const [sending, setSending] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<Array<any>>([]);

  const dispatch = useDispatch();
  const location = useLocation();
  const [message, setMessage] = useState<string>("");

  const group: adminGroupChatType = location?.state?.currentGroup;
  const navigate = useNavigate();

  const getMessagesRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.userGetMessages
  ) as ReduxResponseType;

  const loginRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType;

  const userGroupChatsRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.getUserGroupchats
  ) as ReduxResponseType;

  const getMembersRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.userGetGroupchatMembers
  ) as ReduxResponseType;

  const userInGroup = (userGroups: any, group: adminGroupChatType) => {
    for (let index = 0; index < userGroups.length; index++) {
      const group_id = userGroups[index]?.group_id;
      if (group_id === group?._id) return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(userGetGroupChatMembersAction(group?._id || "") as any);
    dispatch(userGetMessagesAction(group?._id || "") as any);
  }, [dispatch, group?._id]);

  // sending files(images)
  const [files, setFiles] = useState<Array<any>>([]);
  const handleFileSelect = (event: any) => {
    const files = event?.target?.files;
    setFiles(Array.from(files));
  };

  // Websockets related logic
  const [socketUrl, setSocketUrl] = useState<string>(API_ROUTES.websocket);
  const [messageHistory, setMessageHistory] = useState<groupMessageType[]>([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage?.data);
      if (data?.meta === "users_online") {
        setOnlineUsers(() => {
          // if i was able to get the list of users in this group
          if (getMembersRedux?.serverResponse?.data) {
            return getMembersRedux?.serverResponse?.data
              ?.filter((membership: groupMemberType) => {
                for (let index = 0; index < data?.online?.length; index++) {
                  const user_id = data?.online[index];
                  if (user_id === membership?.user_id?._id) return true;
                }
                return false;
              })
              .map((membership: groupMemberType) => membership?.user_id);
          }
          return [];
        });
      } else {
        setMessageHistory((prev: groupMessageType[]) => {
          setSending(false);
          setMessage("");
          setFiles([]);
          return prev.concat(data);
        });
      }
    }
  }, [lastMessage, setMessageHistory, getMembersRedux?.serverResponse?.data]);

  // Effect to join websocket
  useEffect(() => {
    sendMessage(
      JSON.stringify({
        meta: "join_conversation",
        room_id: group?._id || "",
        user_id: loginRedux?.serverResponse?.data?.id || "",
        message: "",
      })
    );
  }, [group?._id, loginRedux?.serverResponse?.data?.id, sendMessage]);

  // Effect to get the list of users online
  useEffect(() => {
    setInterval(() => {
      sendMessage(
        JSON.stringify({
          meta: "get_online_users",
          room_id: group?._id || "",
          user_id: loginRedux?.serverResponse?.data?.id || "anonymous",
          message: "",
        })
      );
    }, 30000); // checks every 30 seconds
  }, [group?._id, loginRedux?.serverResponse?.data?.id, sendMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const handleSendMesage = async () => {
    setSending(true);
    if (connectionStatus !== "Open") setSocketUrl(API_ROUTES.websocket);

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
        room_id: group?._id || "",
        user_id: loginRedux?.serverResponse?.data?.id || "",
        message,
        images,
      })
    );
  };

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col shadow-md p-3">
          <div className="flex flex-row justify-around">
            <div className="flex flex-row gap-3 items-center text-2xl font-[600]">
              <AiOutlineArrowLeft
                onClick={() => {
                  navigate(-1);
                }}
              />
              <div
                onClick={() => {
                  navigate("/groupchat/details", {
                    state: {
                      currentGroupId: group._id,
                      members: getMembersRedux?.serverResponse?.data,
                      onlineUsers,
                    },
                  });
                }}
                className=""
              >
                {group.name}
              </div>
            </div>
            <div className="">
              <img
                className="w-16"
                src={group?.image?.[0]?.url || Logo}
                alt=""
              />
            </div>
          </div>
          <div className="flex gap-2 text-[#9F9F9F] py-2 px-6">
            {/* Show online users */}
            {getMembersRedux?.serverResponse?.data &&
              onlineUsers.map((user, index) => {
                if (index < 7) return <div key={index}>{user?.username}</div>;
                if (index === 7)
                  return (
                    <div className="ml-[-0.2rem]" key={index}>
                      ...
                    </div>
                  );
                return <></>;
              })}
          </div>
        </div>
        <div className="flex flex-col shadow-md py-3 gap-3">
          <div className="flex flex-col shadow-md py-3 px-6 relative  gap-3 h-full min-h-[20rem]">
            {/* Shows messages from the database */}
            {getMessagesRedux?.loading ? (
              <div>loading...</div>
            ) : getMessagesRedux?.serverResponse?.data?.length ? (
              getMessagesRedux?.serverResponse?.data
                ?.map((message: groupMessageType) => {
                  return <GroupMessage message={message} key={message._id} />;
                })
                ?.reverse()
            ) : group?.message?.length ? (
              group?.message?.map((message: groupMessageType) => {
                return <GroupMessage message={message} key={message._id} />;
              })
            ) : (
              messageHistory.length === 0 && <div>No Messages Yett!!!</div>
            )}

            {/* Shows messages from the websocket  */}
            {messageHistory.length ? (
              messageHistory?.map((message: groupMessageType) => {
                return <GroupMessage message={message} key={message._id} />;
              })
            ) : (
              <></>
            )}

            {/* If there are files to be uploaded */}
            <div className=" flex gap-2 w-full flex-wrap justify-center ">
              {files?.length ? (
                files.map((file: any, index: number) => {
                  return (
                    <div key={index} className="w-24 h-24">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="uploaded"
                        className="object-fit w-full h-full"
                      />
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>

            {/* Status of the persons message */}
            {sending ? <div>sending...</div> : <></>}
          </div>
          <div className="flex flex-row gap-4 self-center w-2/3 items-center">
            {userInGroup(userGroupChatsRedux?.serverResponse?.data, group) ? (
              <>
                <div className="bg-[#EDB84226] p-2 rounded-md w-full">
                  <input
                    className="bg-[#EDB84208] outline-none p-3"
                    placeholder="Ask me anything... "
                    type="text"
                    onChange={(event: any) => {
                      setMessage(event.target.value);
                    }}
                    value={message}
                  />
                </div>
                <button
                  disabled={!(message || files.length) || sending}
                  onClick={() => {
                    handleSendMesage();
                  }}
                  className="text-white bg-[#EDB842] font-[600] text-2xl p-5 w-fit h-fit rounded-full"
                >
                  <AiOutlineSend />
                </button>
                <button className="text-white bg-[#EDB842] font-[600] text-2xl  w-fit h-fit rounded-full">
                  <label
                    className="p-5 w-fit h-fit rounded-full flex justify-around cursor-pointer "
                    htmlFor="selectPicture"
                  >
                    <MdOutlineAddAPhoto />
                  </label>
                </button>
                <input
                  type="file"
                  name="selectPicture"
                  id="selectPicture"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                  multiple
                />
              </>
            ) : (
              <div className="flex justify-around w-full">
                <JoinBtn
                  group={group}
                  userGroups={userGroupChatsRedux?.serverResponse?.data}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const GroupMessage = ({ message }: { message: groupMessageType }) => {
  const timeSent = new Date(message?.createdAt || "");
  const dispatch = useDispatch();

  const [indexToShow, setIndexToShow] = useState<number>(0);
  const [display, setDisplay] = useState<boolean>(false);

  const loginRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType;

  const like = () => {
    if (!userLiked) {
      setMessageLikes((state) => [
        ...state,
        loginRedux?.serverResponse?.data?.id,
      ]);
    } else {
      setMessageLikes((state) =>
        state.filter((like) => like !== loginRedux?.serverResponse?.data?.id)
      );
    }
    dispatch(userLikeMessageAction(message._id || "") as any);
  };

  const [messageLikes, setMessageLikes] = useState<Array<string>>(
    message?.likes || []
  );
  const userLiked = (() => {
    for (let index = 0; index < messageLikes.length; index++) {
      if (messageLikes[index] === loginRedux?.serverResponse?.data?.id)
        return true;
    }
    return false;
  })();

  return (
    <div
      className={
        (message?.sender_id === loginRedux?.serverResponse?.data?.id
          ? "self-end "
          : "") +
        "flex flex-col gap-3 bg-[#EDB84270] w-2/3 md:w-1/3 p-2 rounded-md"
      }
    >
      <div
        className={
          (display ? "flex " : "hidden ") +
          "fixed bg-black/60 top-0 left-0 w-full h-full z-50 justify-center "
        }
      >
        <button
          onClick={() => setDisplay(false)}
          className="absolute top-8 right-8 text-white text-[2rem]"
        >
          <GrClose />
        </button>
        <button
          onClick={() => {
            if (indexToShow - 1 > -1) setIndexToShow(indexToShow - 1);
          }}
          className="text-white text-[2.5rem]"
        >
          <TbCircleChevronLeft />
        </button>
        <div className="flex w-4/5 h-4/5 justify-center my-auto">
          {message?.image?.map((imageData: ImageType, index: number) => {
            if (indexToShow === index)
              return (
                <img
                  key={index}
                  src={imageData?.url}
                  alt="user uploaded"
                  className="object-scale-down w-full h-full my-auto"
                />
              );
            return <></>;
          })}
        </div>
        <button
          onClick={() => {
            if (indexToShow + 1 < (message?.image?.length || 0))
              setIndexToShow(indexToShow + 1);
          }}
          className="text-white text-[2.5rem]"
        >
          <TbCircleChevronRight />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <img
          className="rounded-full w-16 h-16"
          src={message?.sender?.image?.[0]?.url || user1}
          alt=""
        />
        <div className="">
          <div className="text-[#181818] font-[600]">
            {message?.sender?.email}
          </div>
          <div className="text-[#5C5C5C] text-sm">
            {`${timeSent.getDate()}-${timeSent.getMonth()}-${timeSent.getFullYear()} ${timeSent.getHours()}:${timeSent.getMinutes()}`}
          </div>
        </div>
      </div>
      <div
        className={
          message?.image?.length ? "pb-2 " : "border-b border-[#4D4C6675] pb-2"
        }
      >
        {message?.message}
      </div>
      <div
        className={
          (message?.image?.length ? "grid " : "hidden ") +
          "grid-cols-2 grid-rows-2 rouded-2xl border-b border-[#4D4C6675] pb-2"
        }
      >
        {message?.image?.length ? (
          message?.image?.map(
            (imageData: ImageType, index: number, array: ImageType[]) => {
              if (index < 4)
                return (
                  <div
                    className={
                      (array.length === 3 && index === 2
                        ? " col-span-2 "
                        : array.length === 1
                        ? " col-span-2 row-span-2 "
                        : array.length === 2
                        ? " row-span-2 "
                        : "") +
                      " w-full relative cursor-pointer h-32 hover:animate-pulse "
                    }
                    key={index}
                    onClick={() => {
                      setDisplay(true);
                      setIndexToShow(index);
                    }}
                  >
                    <img
                      src={imageData?.url}
                      alt={"user uploaded"}
                      className="object-cover w-full h-full"
                    />
                    {array.length > 4 && index === 3 ? (
                      <span className="absolute flex justify-center top-0 left-0 w-full h-full bg-black/70 text-white">
                        <span className="my-auto font-bold text-[1.5rem]">
                          +{array.length - index - 1}
                        </span>
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              return <></>;
            }
          )
        ) : (
          <></>
        )}
      </div>
      <button
        onClick={() => {
          if (!loginRedux?.serverResponse?.data?.id) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              timer: 5000,
              text: "Please login before Reacting to Messages",
            });
            return;
          }
          like();
        }}
        className="flex gap-2 items-center px-4"
      >
        <span className="font-[400]">{messageLikes.length || 0}</span>
        {userLiked ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
      </button>
    </div>
  );
};
export default GroupChatBody;
