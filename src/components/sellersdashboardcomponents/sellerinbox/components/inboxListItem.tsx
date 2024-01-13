import { useState, useEffect } from "react";
import { RiImageFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { user3 } from "../../../../images/users";
import { ReducersType } from "../../../../redux/store";
import { LoginResponseType } from "../../../../redux/types/auth.types";
import {
  ChatUserType,
  GetChatsType,
  chatMessageType,
} from "../../../../redux/types/chats.types";
import { ReduxResponseType } from "../../../../redux/types/general.types";
import { adminUGetUserType } from "../../../../redux/types/users.types";
import FormatDate from "../../../shareables/dateFormatter";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const params = useParams();

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
        navigate("/user/inbox/" + chattingWith._id!, {
          replace: params?.id ? true : false,
        });
      }}
      className={"flex flex-row gap-2 w-full"}
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

export default InboxListItem;
