import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { SendMessage } from "react-use-websocket";
import {
  getUserAction,
  userGetUsersAction,
} from "../../../../redux/actions/userDashboard/user.actions";
import { ReducersType } from "../../../../redux/store";
import {
  ChatUserType,
  GetChatsType,
} from "../../../../redux/types/chats.types";
import { ReduxResponseType } from "../../../../redux/types/general.types";
import { adminUGetUserType } from "../../../../redux/types/users.types";
import InboxListItem from "./inboxListItem";

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
  const params = useParams();

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
    const newRoomCheck = () => {
      if (loginRedux?.serverResponse?.data?.id)
        sendMessage(
          JSON.stringify({
            meta: "new_room_check",
            room_id: "lobby",
            user_id: loginRedux?.serverResponse?.data?.id,
            message: "",
          })
        );
    };
    newRoomCheck();
    const newRoomCheckInterval = setInterval(newRoomCheck, 45000); // checks every 10 seconds
    return clearInterval(newRoomCheckInterval);
  }, [loginRedux?.serverResponse?.data?.id, sendMessage]);

  return (
    <div
      className={
        (params?.id ? "hidden " : "flex ") +
        "md:flex flex-col gap-3 w-full md:w-1/2 lg:w-1/3 border p-4"
      }
    >
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

export default InboxList;
