import { BiSearch } from "react-icons/bi";
import { FaCalendarAlt, FaBell } from "react-icons/fa";
import {
  MdOutlineAdd,
  MdArrowLeft,
  MdArrowRight,
  MdArrowDropDown,
} from "react-icons/md";
import { TbMailFilled } from "react-icons/tb";
import { user5 } from "../../../images/users";
import logo from "../../../images/logo/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminActivateGroupchatAction,
  adminDeleteGroupchatAction,
  adminGetGroupChatAction,
  adminSuspendGroupchatAction,
} from "../../../redux/actions/admin/groupchat.actions";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { ReducersType } from "../../../redux/store";
import { adminGroupChatType } from "../../../redux/types/groupchat.types";
import { PulseLoader } from "react-spinners";

function AdminGroupChatListBody() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenuId, setShowMenuId] = useState<string>("");

  const adminGetChatsRedux = useSelector(
    (state: ReducersType) => state?.adminGetGroupchats
  ) as ReduxResponseType;

  const adminDeleteChatsRedux = useSelector(
    (state: ReducersType) => state?.adminDeleteGroupchat
  ) as ReduxResponseType;

  const adminSuspendChatsRedux = useSelector(
    (state: ReducersType) => state?.adminSuspendGroupchat
  ) as ReduxResponseType;

  const adminActivateChatsRedux = useSelector(
    (state: ReducersType) => state?.adminActivateGroupchat
  ) as ReduxResponseType;

  const numberOfGroups =
    adminGetChatsRedux?.serverResponse?.data?.numberOfChats;
  const [startIndex, setStartIndex] = useState<number>(0); // start index for the buttons at the buttom of the page
  const [pagination, setPagination] = useState<number>(1); // currently selected page
  const numberOfPages: number = Math.ceil(numberOfGroups / 10) || 1;
  console.log(numberOfPages);

  const [deleting, setDeleting] = useState<string>("");
  const [suspending, setSuspending] = useState<string>("");
  const [activating, setActivating] = useState<string>("");

  useEffect(() => {
    dispatch(adminGetGroupChatAction() as any);
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full gap-4">
        <div className="flex gap-6 w-full my-auto">
          <span className="flex w-full bg-[#EDB84233] rounded-md p-2 gap-2 my-auto">
            <BiSearch className="my-auto text-[#EDB842] text-[1.3rem]" />
            <input
              className="bg-transparent outline-none border-none focus:outline-none text-[0.875rem] my-auto"
              placeholder="Search"
            />
          </span>
          <span className="my-auto flex">
            <FaCalendarAlt className="text-[#858D9D]" />
          </span>
          <span className="my-auto flex">
            <FaBell className="text-[#858D9D]" />
          </span>
          <span className="my-auto flex">
            <TbMailFilled className="text-[#858D9D]" />
          </span>
        </div>

        <span className="flex bg-[#F0F1F3] w-[0.1rem] h-full"></span>

        <div className="flex gap-2 my-auto">
          <span className="flex rounded-full w-10 h-10 my-auto">
            <img src={user5} alt="admin" className="object-cover" />
          </span>
          <span className="flex flex-col my-auto">
            <span className="font-semibold whitespace-nowrap text-[0.875rem]">
              Jay Hargudson
            </span>
            <span className="flex text-[#4A4C56] text-[0.75rem] font-semibold">
              Manager
            </span>
          </span>
        </div>
      </div>

      <div className="flex justify-between py-8 px-2">
        <h2 className="flex font-bold text-[1.5rem]">Group Chat</h2>
        <button
          onClick={() => {
            navigate("/admin/groupchat/create", {
              state: { index: "admin-group-chats" },
            });
          }}
          className="flex gap-2 bg-[#EDB842] rounded-md px-4 py-2"
        >
          <MdOutlineAdd className="my-auto text-white text-[1.3rem]" />
          <span className="flex my-auto text-white font-semibold">
            Create Group
          </span>
        </button>
      </div>

      <ul className="flex gap-4 w-full flex-col overflow-y-auto h-[30rem] py-4">
        {/* TODO: add loading sign while fetching list of groupchats */}
        {adminGetChatsRedux?.serverResponse?.data?.chats &&
          adminGetChatsRedux?.serverResponse?.data?.chats.map(
            (groupchat: adminGroupChatType, index: number) => {
              return (
                <li
                  key={groupchat._id}
                  className={
                    ((Math.ceil(index / 10) || 1) === pagination
                      ? "flex "
                      : "hidden ") +
                    " w-full shadow-md shadow-[#EDB842] rounded-lg justify-between bg-[#F5F5F594] px-6 py-2"
                  }
                >
                  <div className="flex gap-2">
                    <span className="flex my-auto">
                      <img
                        src={groupchat?.image?.[0]?.url || logo}
                        alt="logo"
                        className="object-cover w-16 h-16"
                      />
                    </span>
                    <span className="font-semibold text-[1.2rem] my-auto">
                      {groupchat?.name}
                    </span>
                  </div>

                  <div className="flex relative gap-4 my-auto mx-2">
                    <button
                      onClick={() => {
                        navigate("/admin/groupchat/details", {
                          state: { gruopDetails: groupchat },
                        });
                      }}
                      className="md:flex hidden px-4 py-[0.35rem] rounded-md font-semibold text-[0.875rem] text-white bg-[#EDB842]"
                    >
                      View Details
                    </button>
                    {groupchat?.status === "suspended" && (
                      <button
                        onClick={() => {
                          setActivating(groupchat?._id || "");
                          dispatch(
                            adminActivateGroupchatAction(
                              groupchat?._id || ""
                            ) as any
                          );
                        }}
                        className="md:flex hidden px-4 py-[0.35rem] rounded-md font-semibold text-[0.875rem] text-white bg-[#4CE13F]"
                      >
                        {adminActivateChatsRedux?.loading &&
                        activating === groupchat?._id ? (
                          <div className="" style={{ height: "25px" }}>
                            <PulseLoader color="#ffffff" />
                          </div>
                        ) : (
                          "Activate"
                        )}
                      </button>
                    )}
                    {groupchat?.status === "active" && (
                      <button
                        onClick={() => {
                          setSuspending(groupchat?._id || "");
                          dispatch(
                            adminSuspendGroupchatAction(
                              groupchat?._id || ""
                            ) as any
                          );
                        }}
                        className="md:flex hidden px-4 py-[0.35rem] rounded-md font-semibold text-[0.875rem] text-[#EDB842] bg-[#EDB84233]"
                      >
                        {adminSuspendChatsRedux?.loading &&
                        suspending === groupchat?._id ? (
                          <div className="" style={{ height: "25px" }}>
                            <PulseLoader color="#ffffff" />
                          </div>
                        ) : (
                          "Suspend"
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setDeleting(groupchat?._id || "");
                        dispatch(
                          adminDeleteGroupchatAction(
                            groupchat?._id || ""
                          ) as any
                        );
                      }}
                      className="md:flex hidden px-4 py-[0.35rem] rounded-md font-semibold text-[0.875rem] text-white bg-[#EA4335]"
                    >
                      {adminDeleteChatsRedux?.loading &&
                      deleting === groupchat?._id ? (
                        <div className="" style={{ height: "25px" }}>
                          <PulseLoader color="#ffffff" />
                        </div>
                      ) : (
                        "Delete"
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (!showMenuId) setShowMenuId(groupchat._id || "");
                        if (showMenuId) setShowMenuId("");
                      }}
                      className="flex md:hidden px-4 py-[0.35rem] rounded-md font-semibold text-[0.875rem] text-white bg-[#EDB842]"
                    >
                      <span>Options</span>
                      <MdArrowDropDown className="my-auto" />
                    </button>
                    <ul
                      className={
                        (showMenuId === groupchat?._id ? "flex " : "hidden ") +
                        " flex-col absolute bg-white rounded-md gap-2 p-2 z-50 top-[2.25rem] left-[-1.25rem]"
                      }
                    >
                      <li>
                        <button
                          onClick={() => {
                            navigate("/admin/groupchat/details", {
                              state: { gruopDetails: groupchat },
                            });
                          }}
                          className="rounded-lg whitespace-nowrap px-4 py-[0.35rem] flex font-semibold w-full hover:bg-gray-300/40"
                        >
                          View Details
                        </button>
                      </li>
                      {groupchat?.status === "suspended" && (
                        <li>
                          <button
                            onClick={() => {
                              setActivating(groupchat?._id || "");
                              dispatch(
                                adminActivateGroupchatAction(
                                  groupchat?._id || ""
                                ) as any
                              );
                            }}
                            className="rounded-lg whitespace-nowrap px-4 py-[0.35rem] flex font-semibold w-full hover:bg-gray-300/40"
                          >
                            {adminActivateChatsRedux?.loading &&
                            activating === groupchat?._id ? (
                              <div className="" style={{ height: "20px" }}>
                                <PulseLoader color="#EDB842" />
                              </div>
                            ) : (
                              "Activate"
                            )}
                          </button>
                        </li>
                      )}
                      {groupchat?.status === "active" && (
                        <li>
                          <button
                            onClick={() => {
                              setSuspending(groupchat?._id || "");
                              dispatch(
                                adminSuspendGroupchatAction(
                                  groupchat?._id || ""
                                ) as any
                              );
                            }}
                            className="rounded-lg whitespace-nowrap px-4 py-[0.35rem] flex font-semibold w-full hover:bg-gray-300/40"
                          >
                            {adminSuspendChatsRedux?.loading &&
                            suspending === groupchat?._id ? (
                              <div className="" style={{ height: "20px" }}>
                                <PulseLoader color="#EDB842" />
                              </div>
                            ) : (
                              "Suspend"
                            )}
                          </button>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={() => {
                            setDeleting(groupchat?._id || "");
                            dispatch(
                              adminDeleteGroupchatAction(
                                groupchat?._id || ""
                              ) as any
                            );
                          }}
                          className="rounded-lg whitespace-nowrap px-4 py-[0.35rem] flex font-semibold w-full text-[#EA4335] hover:bg-gray-300/40"
                        >
                          {adminDeleteChatsRedux?.loading &&
                          deleting === groupchat?._id ? (
                            <div className="" style={{ height: "20px" }}>
                              <PulseLoader color="#EA4335" />
                            </div>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              );
            }
          )}
      </ul>

      <div className="flex justify-around w-full py-6">
        <div className="flex gap-2">
          <button
            onClick={() => {
              let lastPage: number = pagination - 1;
              if (lastPage === startIndex) setStartIndex(startIndex - 5);
              if (lastPage > 0) setPagination(lastPage);
            }}
            className={
              "bg-[#EDB84233] text-[#EDB842] p-2 rounded-md text-[1.3rem]"
            }
          >
            <MdArrowLeft />
          </button>
          {startIndex >= 5 && (
            <button
              onClick={() => {
                setStartIndex(startIndex - 5);
              }}
              className={"bg-[#EDB84233] text-[#EDB842] py-2 px-4 rounded-md "}
            >
              <span>...</span>
            </button>
          )}

          {Array(numberOfPages)
            .fill(1)
            .map((value: number, index: number) => {
              if (index < 5 + startIndex && index >= startIndex)
                return (
                  <button
                    onClick={() => {
                      setPagination(index + value);
                    }}
                    className={
                      (index + value === pagination
                        ? "bg-[#EDB842] text-[#ffff] "
                        : "bg-[#EDB84233] text-[#EDB842] ") +
                      "py-2 px-4 rounded-md "
                    }
                    key={index}
                  >
                    {index + value}
                  </button>
                );
              return <></>;
            })}

          {!(startIndex + 5 >= numberOfPages) && (
            <button
              onClick={() => {
                setStartIndex(startIndex + 5);
              }}
              className={"bg-[#EDB84233] text-[#EDB842] py-2 px-4 rounded-md "}
            >
              <span>...</span>
            </button>
          )}
          <button
            onClick={() => {
              let newPage: number = pagination + 1;
              if (newPage === startIndex + 5 + 1) setStartIndex(startIndex + 5);
              if (newPage < numberOfPages) setPagination(newPage);
            }}
            className={
              "bg-[#EDB84233] text-[#EDB842] p-2 rounded-md text-[1.3rem]"
            }
          >
            <MdArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminGroupChatListBody;
