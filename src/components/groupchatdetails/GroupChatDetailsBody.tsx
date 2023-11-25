import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { groupChatMain } from "../../images";
import { groupChat2, groupChatMore } from "../../images/groupchat";
import { Logo } from "../../images/logo";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userGetGroupChatDetailsAction,
  userGetGroupChatMembersAction,
} from "../../redux/actions/userDashboard/groupchat.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { groupMemberType } from "../../redux/types/groupchat.types";

const GroupChatDetailsBody = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const groupId: string = location?.state?.currentGroupId;

  const getDetailsRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.userGetGroupchatDetails
  ) as ReduxResponseType;

  const getMembersRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.userGetGroupchatMembers
  ) as ReduxResponseType;

  const loginRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType;

  useEffect(() => {
    dispatch(userGetGroupChatDetailsAction(groupId) as any);
    dispatch(userGetGroupChatMembersAction(groupId) as any);
  }, [groupId, dispatch]);

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
      <img src={groupChatMain} alt="" />
      <div className="">Become Sondya Partner</div>
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
        <span className="text-[#EDB842]">
          {getMembersRedux?.serverResponse?.data?.length || 0}
        </span>{" "}
        members.
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          {getMembersRedux?.serverResponse?.data?.length
            ? getMembersRedux?.serverResponse?.data?.map(
                (member: groupMemberType, index: number) => {
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
                }
              )
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
        {getMembersRedux?.serverResponse?.data?.length
          ? getMembersRedux?.serverResponse?.data?.map(
              (member: groupMemberType) => {
                return (
                  <div className="p-2 border-b flex gap-2 min-w-[20rem]">
                    <img
                      src={member?.user_id?.image?.[0]?.url || groupChat2}
                      alt=""
                      className="w-12 h-12 object-fit rounded-md"
                    />
                    <div className="">
                      <div className="text-[#0F1828] font-[600]">
                        {member?.user_id?.username || member?.user_id?.email}
                      </div>
                      <div className="text-[#ADB5BD] font-[400] text-sm">
                        offline
                      </div>
                    </div>
                  </div>
                );
              }
            )
          : "loading..."}
      </div>
    </div>
  );
};

export default GroupChatDetailsBody;
