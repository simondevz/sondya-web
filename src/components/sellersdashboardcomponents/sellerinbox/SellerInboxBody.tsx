import { API_ROUTES } from "../../../redux/routes";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { ReducersType } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatUserType,
  GetChatsType,
  chatMessageType,
} from "../../../redux/types/chats.types";
import { adminUGetUserType } from "../../../redux/types/users.types";
import { userGetChatsAction } from "../../../redux/actions/userDashboard/chats.actions";
import { getUserAction } from "../../../redux/actions/userDashboard/user.actions";
import { useParams } from "react-router-dom";
import ChatBox from "./components/chatBox";
import InboxList from "./components/inboxList";

const SellerInboxBody = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [receiver, setReceiver] = useState<adminUGetUserType | ChatUserType>();
  const [chatId, setChatId] = useState<string>("");
  const [userChats, setUserChats] = useState<GetChatsType[]>();

  const userChatsRedux = useSelector(
    (state: ReducersType) => state?.getUserChats
  ) as ReduxResponseType<GetChatsType[]>;

  //details of the person the current user is trying to chat with
  const recieverRedux = useSelector(
    (state: ReducersType) => state?.userGetUser
  ) as ReduxResponseType<adminUGetUserType>;

  useEffect(() => {
    if (recieverRedux?.success)
      setReceiver(recieverRedux?.serverResponse?.data);
  }, [recieverRedux?.serverResponse?.data, recieverRedux?.success]);

  useEffect(() => {
    dispatch(userGetChatsAction() as any);
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      setChatId(params.id);
      dispatch(getUserAction(params.id) as any);
    }
  }, [params.id, dispatch]);

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

export default SellerInboxBody;
