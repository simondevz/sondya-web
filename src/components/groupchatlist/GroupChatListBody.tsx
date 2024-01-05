import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { Logo } from "../../images/logo";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { useCallback, useEffect, useState } from "react";
import {
  getUserGroupChatsAction,
  userGetGroupchatsAction,
} from "../../redux/actions/userDashboard/groupchat.actions";
import {
  adminGroupChatType,
  getGroupChatType,
} from "../../redux/types/groupchat.types";
import JoinBtn from "./joinBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginResponseType } from "../../redux/types/auth.types";
import { USER_GET_GROUPCHATS_RESET } from "../../redux/constants/userDashboard/groupchat.constats";

export type QueryType = {
  limit: number;
  page: number;
  search: string;
};

const GroupChatListBody = () => {
  const limit = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [groupchats, setGroupChats] = useState<adminGroupChatType[]>();
  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
    limit: limit,
  });

  // update query and url
  const updateQueryString = useCallback(
    (newParams: QueryType) => {
      const searchParams = new URLSearchParams(location.search);
      // Update or add new parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.set(key, String(value));
        } else {
          searchParams.delete(key);
        }
      });

      // Build the new search string
      const newSearch = searchParams.toString();

      // set query string
      setQueryString(newSearch);

      // Use navigate to change the URL
      navigate({
        pathname: location.pathname,
        search: newSearch,
      });
    },
    [location.pathname, location.search, navigate]
  );

  const prevPage = () => {
    setQuery((prev: QueryType) => {
      return {
        ...prev,
        page: prev.page--,
      };
    });
  };

  const nextPage = () => {
    setQuery((prev: QueryType) => {
      alert(prev.page++);
      return {
        ...prev,
        page: prev.page++,
      };
    });
  };

  const goToPage = (page: number) => {
    setQuery((prev: QueryType) => {
      return {
        ...prev,
        page: page,
      };
    });
  };

  const getGroupChatsRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.userGetGroupchats
  ) as ReduxResponseType<getGroupChatType>;

  const userGroupChatsRedux = useSelector(
    (state: ReducersType) => state?.getUserGroupchats
  ) as ReduxResponseType;

  const loginRedux = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType>;

  const userInGroup = (userGroups: any, group: adminGroupChatType) => {
    for (let index = 0; index < userGroups.length; index++) {
      const group_id = userGroups[index]?.group_id;
      if (group_id === group?._id) return true;
    }
    return false;
  };

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1500);
  }, [query, updateQueryString]);

  useEffect(() => {
    dispatch(userGetGroupchatsAction(queryString) as any);
  }, [dispatch, queryString]);

  useEffect(() => {
    if (loginRedux?.serverResponse?.data?.id)
      dispatch(getUserGroupChatsAction() as any);
  }, [dispatch, loginRedux?.serverResponse?.data?.id]);

  useEffect(() => {
    if (getGroupChatsRedux.success) {
      setTotalPages(
        Math.ceil(
          Number(getGroupChatsRedux?.serverResponse?.data?.count) / limit
        )
      );
      setGroupChats(getGroupChatsRedux?.serverResponse?.data?.groupChats);
      dispatch({ type: USER_GET_GROUPCHATS_RESET });
    }
  }, [
    getGroupChatsRedux?.success,
    getGroupChatsRedux?.serverResponse?.data,
    dispatch,
  ]);

  return (
    <section>
      <div className="flex flex-col gap-3 p-2">
        <div className="flex flex-col-reverse md:flex-row p-4  md:justify-around items-center text-center md:text-left gap-3">
          <div className="md:w-1/2 flex flex-col gap-2">
            <div className="text-2xl playfair-display font-[600]">
              Join our Community
            </div>
            <div className="text-[#9F9F9F] text-sm">
              Join our community and unlock a world of opportunities! Whether
              you're buying or selling, this is the place to connect with others
              who share your interests. Together, let's build something special!
              🛒
            </div>
          </div>
          <div className="flex flex-row md:w-1/3 gap-3">
            <div className="flex items-center border rounded-md border-[#EDB842] p-1 h-fit text-[#EDB842]">
              <input
                className="p-1 outline-none"
                type="text"
                placeholder="Search for anything..."
                value={query.search}
                onChange={(event) => {
                  setQuery({ ...query, search: event.target.value, page: 1 });
                }}
              />
              <BsSearch />
            </div>
            <button className="text-white bg-[#EDB842] px-5 py-2 rounded-md h-fit">
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          {groupchats?.length &&
            groupchats?.map((group: adminGroupChatType) => {
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
            })}
        </div>
        <div className="flex flex-row gap-2 items-center text-[#EDB842] self-center my-5">
          <button
            disabled={query.page <= 1}
            type="button"
            onClick={() => prevPage()}
            className="bg-[#EDB84233] p-2 rounded-md"
          >
            <BiSolidLeftArrow />
          </button>
          {Number.isInteger(totalPages) &&
            totalPages >= 0 &&
            Array.from({
              length: totalPages,
            }).map((_, i) => {
              if (i >= dotIndex && i <= dotIndex + 2) {
                return (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`${
                      query.page === i + 1 && "bg-[#EDB84233]"
                    } px-4 py-2 rounded-md`}
                  >
                    {i + 1}
                  </button>
                );
              }
              return <div className="hidden">...</div>;
            })}
          {Number.isInteger(totalPages) && totalPages > 3 && (
            <button
              onClick={() => {
                totalPages >= dotIndex
                  ? setDotIndex((prev: number) => prev + 3)
                  : setDotIndex(0);
              }}
              className="p-2 bg-[#EDB842] rounded-md text-white"
            >
              <BsThreeDots />
            </button>
          )}
          <button
            type="button"
            disabled={query.page >= totalPages}
            onClick={() => nextPage()}
            className="bg-[#EDB84233] p-2 rounded-md"
          >
            <BiSolidRightArrow />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GroupChatListBody;
