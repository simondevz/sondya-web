import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { groupChatMain } from "../../images";
import { groupChat2, groupChatMore } from "../../images/groupchat";
import { Logo } from "../../images/logo";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userGetGroupChatDetailsAction,
  userGetGroupChatMembersAction,
} from "../../redux/actions/userDashboard/groupchat.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { groupMemberType } from "../../redux/types/groupchat.types";
import useWebSocket from "react-use-websocket";
import { API_ROUTES } from "../../redux/routes";

const GroupChatDetailsBody = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const getDetailsRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.userGetGroupchatDetails
  ) as ReduxResponseType;

  const getMembersRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.userGetGroupchatMembers
  ) as ReduxResponseType;

  const loginRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType;

  const groupId: string = location?.state?.currentGroupId;
  const members: Array<groupMemberType> =
    location?.state?.members || getMembersRedux?.serverResponse?.data;
  const [onlineUsers, setOnlineUsers] = useState<Array<any>>(
    location?.state?.onlineUsers
  );

  useEffect(() => {
    dispatch(userGetGroupChatDetailsAction(groupId) as any);
    if (!members) dispatch(userGetGroupChatMembersAction(groupId) as any);
  }, [groupId, dispatch, members]);

  // Websocket related
  const { sendMessage, lastMessage } = useWebSocket(
    API_ROUTES.websocket.groupchat,
    {
      shouldReconnect: (closeEvent) => {
        return true;
      },
      reconnectAttempts: 5,
      reconnectInterval: 3000,
    }
  );

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage?.data);
      if (data?.meta === "users_online") {
        setOnlineUsers(() => {
          // if i was able to get the list of users in this group
          if (members) {
            return members
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
      }
    }
  }, [lastMessage, members]);

  // Effect to get the list of users online
  useEffect(() => {
    setInterval(() => {
      sendMessage(
        JSON.stringify({
          meta: "get_online_users",
          room_id: groupId || "",
          user_id: loginRedux?.serverResponse?.data?.id || "anonymous",
          message: "",
        })
      );
    }, 10000); // checks every 2 minutes
  }, [groupId, loginRedux?.serverResponse?.data?.id, sendMessage]);

  return (
    <div className="flex flex-col gap-5 items-center my-4">
      <div className="flex flex-col shadow-md p-3 w-full">
        <div className="flex flex-row justify-around">
          <div className="flex flex-row gap-3 items-center text-2xl font-[600]">
            <AiOutlineArrowLeft onClick={() => navigate(-1)} />
            <div className="">
              {getDetailsRedux?.serverResponse?.data?.name || "loading..."}
            </div>
          </div>
          <div className="">
            <img
              className="w-16"
              src={
                getDetailsRedux?.serverResponse?.data?.image?.[0]?.url || Logo
              }
              alt=""
            />
          </div>
        </div>
      </div>
      <img
        src={
          getDetailsRedux?.serverResponse?.data?.image?.[0]?.url ||
          groupChatMain
        }
        alt=""
      />
      <div className="">
        {getDetailsRedux?.serverResponse?.data?.name || "loading..."}
      </div>
      <div className="shadow-md p-4 max-w-[50rem] rounded-lg">
        <div className="flex gap-2 p-2 items-center">
          <div className="font-[600]">
            {getDetailsRedux?.serverResponse?.data?.description || "loading..."}
          </div>
        </div>
        <div className="font-[300] text-[#EDB842]">
          Group created by{" "}
          {loginRedux.serverResponse?.data?.id ===
          getDetailsRedux?.serverResponse?.data?.admin_id?._id
            ? "You"
            : getDetailsRedux?.serverResponse?.data?.admin_id?.username ||
              getDetailsRedux?.serverResponse?.data?.admin_id?.email ||
              "loading..."}
          , yesterday at 1:17 AM
        </div>
      </div>
      <div className="text-[#A4A4A4] font-[600]">
        Public group{" "}
        <span className="text-[#EDB842]">{members?.length || 0}</span> members.
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          {members?.length
            ? members?.map((member: groupMemberType, index: number) => {
                if (index < 5)
                  return (
                    <img
                      key={index}
                      src={member?.user_id?.image?.[0]?.url || groupChat2}
                      alt=""
                      className="w-12 h-12 object-fit rounded-md"
                    />
                  );

                if (index === 5)
                  return (
                    <div key={index} className="bg-black rounded-md">
                      <img
                        className="w-12 h-12 object-fit rounded-md"
                        src={groupChatMore}
                        alt=""
                      />
                    </div>
                  );

                return <></>;
              })
            : "loading..."}
          <button className="bg-[#2C37E1] p-2 text-white rounded-md">
            + Invite
          </button>
        </div>
        <div className=" p-2 border-b border-[#EDB842]">Members</div>
        <div className="bg-[#F7F7FC] py-1 px-3 text-[#ADB5BD] rounded-lg flex items-center gap-3">
          <span>
            <BsSearch />
          </span>
          <input
            placeholder="Search"
            className="p-2 bg-[#F7F7FC] outline-none"
            type="text"
          />
        </div>

        <div className="flex flex-col gap-3 p-2 w-full ">
          {members?.length
            ? members?.map((member: groupMemberType) => {
                return (
                  <div
                    className={
                      (member?.user_id?._id ===
                      loginRedux?.serverResponse?.data?.id
                        ? "order-first "
                        : " ") + "p-2 border-b flex gap-2 min-w-[20rem]"
                    }
                  >
                    <img
                      src={member?.user_id?.image?.[0]?.url || groupChat2}
                      alt=""
                      className="w-12 h-12 object-fit rounded-md"
                    />
                    <div className="">
                      <div className="text-[#0F1828] font-[600]">
                        {member?.user_id?._id ===
                        loginRedux?.serverResponse?.data?.id
                          ? "You"
                          : member?.user_id?.username || member?.user_id?.email}
                      </div>
                      <div className="text-[#ADB5BD] font-[400] text-sm">
                        {member?.user_id?._id ===
                        loginRedux?.serverResponse?.data?.id
                          ? "Online"
                          : (() => {
                              // evaluates if the user is online by comparing the online array and the membership array
                              const onlineUser = onlineUsers?.filter(
                                (user) => member?.user_id?._id === user?._id
                              );
                              if (onlineUser?.length > 0) return true;
                              return false;
                            })()
                          ? "Online"
                          : "Offline"}
                      </div>
                    </div>
                  </div>
                );
              })
            : "loading..."}
        </div>
      </div>
    </div>
  );
};

export default GroupChatDetailsBody;
