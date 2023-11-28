import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
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
    }, 10000); // checks every 2 minutes
  }, [group?._id, loginRedux?.serverResponse?.data?.id, sendMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  console.log(connectionStatus);

  const handleSendMesage = () => {
    setSending(true);
    if (connectionStatus !== "Open") setSocketUrl(API_ROUTES.websocket);
    sendMessage(
      JSON.stringify({
        room_id: group?._id || "",
        user_id: loginRedux?.serverResponse?.data?.id || "",
        message,
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
          <div className="flex flex-col shadow-md py-3 px-6  gap-3 h-full min-h-[20rem]">
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
                  disabled={!message || sending}
                  onClick={() => {
                    handleSendMesage();
                  }}
                  className="text-white bg-[#EDB842] font-[600] text-2xl p-5 w-fit h-fit rounded-full"
                >
                  <AiOutlineSend />
                </button>
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
      <div className="border-b border-[#4D4C6675] pb-3">{message?.message}</div>
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
