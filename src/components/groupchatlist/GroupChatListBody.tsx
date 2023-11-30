import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { Logo } from "../../images/logo";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { useEffect } from "react";
import {
  getUserGroupChatsAction,
  userGetGroupchatsAction,
} from "../../redux/actions/userDashboard/groupchat.actions";
import { adminGroupChatType } from "../../redux/types/groupchat.types";
import JoinBtn from "./joinBtn";
import { useNavigate } from "react-router-dom";

const GroupChatListBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getGroupChatsRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.userGetGroupchats
  ) as ReduxResponseType;

  const userGroupChatsRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.getUserGroupchats
  ) as ReduxResponseType;

  const loginRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType;

  const userInGroup = (userGroups: any, group: adminGroupChatType) => {
    for (let index = 0; index < userGroups.length; index++) {
      const group_id = userGroups[index]?.group_id;
      if (group_id === group?._id) return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(userGetGroupchatsAction() as any);
  }, [dispatch]);

  useEffect(() => {
    if (loginRedux?.serverResponse?.data?.id)
      dispatch(getUserGroupChatsAction() as any);
  }, [dispatch, loginRedux?.serverResponse?.data?.id]);

  return (
    <section>
      <div className="flex flex-col gap-3 p-2">
        <div className="flex flex-col-reverse md:flex-row p-4  md:justify-around items-center text-center md:text-left gap-3">
          <div className="md:w-1/2 flex flex-col gap-2">
            <div className="text-2xl playfair-display font-[600]">
              Join our Community
            </div>
            <div className="text-[#9F9F9F] text-sm">
              Lorem ipsum dolor sit amet consectetur. Iaculis enim pellentesque
              sollicitudin sit a Pharetra nunc ac nunc lectus sodales ut. Cras
              nulla netus.
            </div>
          </div>
          <div className="flex flex-row md:w-1/3 gap-3">
            <div className="flex items-center border rounded-md border-[#EDB842] p-1 h-fit text-[#EDB842]">
              <input
                className="p-1 outline-none"
                type="text"
                placeholder="Search for anything..."
              />
              <BsSearch />
            </div>
            <button className="text-white bg-[#EDB842] px-5 py-2 rounded-md h-fit">
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          {getGroupChatsRedux?.serverResponse?.data?.length &&
            getGroupChatsRedux?.serverResponse?.data?.map(
              (group: adminGroupChatType) => {
                return (
                  <div
                    key={group._id}
                    className={
                      (userInGroup(
                        userGroupChatsRedux?.serverResponse?.data,
                        group
                      )
                        ? "order-first "
                        : "") +
                      "flex gap-3 bg-[#F8F9FA] p-2 rounded-md shadow-md shadow-[#EDB842]"
                    }
                  >
                    <div className="">
                      <img
                        src={group?.image?.[0]?.url || Logo}
                        alt=""
                        className="w-20 h-20 object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      <div className="text-lg font-[600]">{group.name}</div>
                      <div className="text-[#5F5D64] text-sm">
                        {group.description}
                      </div>
                      <div className="flex self-end gap-4 ">
                        {!userInGroup(
                          userGroupChatsRedux?.serverResponse?.data,
                          group
                        ) && (
                          <button
                            onClick={() =>
                              navigate("/groupchats", {
                                state: { currentGroup: group },
                              })
                            }
                            className={
                              " text-[#EDB842] font-semibold font-semibold py-2 w-fit px-4 rounded-md "
                            }
                          >
                            View Messages
                          </button>
                        )}
                        <JoinBtn
                          group={group}
                          userGroups={userGroupChatsRedux?.serverResponse?.data}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
        <div className="flex flex-row gap-2 items-center text-[#EDB842] self-center my-5">
          <span className="bg-[#EDB84233] p-2 rounded-md">
            <BiSolidLeftArrow />
          </span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">1</span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">2</span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">3</span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">4</span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">5</span>
          <span className="bg-[#EDB84233] px-3 py-2 rounded-md">...</span>
          <span className="bg-[#EDB84233] p-2 rounded-md">
            <BiSolidRightArrow />
          </span>
        </div>
      </div>
    </section>
  );
};

export default GroupChatListBody;
