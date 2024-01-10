import { MdDelete } from "react-icons/md";
import { user2 } from "../../../images/users";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotificationAction,
  getNotificationsAction,
  markNotificationSeenAction,
} from "../../../redux/actions/notifications.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import {
  GetNotificationType,
  NotificationType,
} from "../../../redux/types/notifications.types";
import {
  GET_NOTIFICATIONS_RESET,
  MARK_NOTIFICATION_SEEN_RESET,
} from "../../../redux/constants/notifications.constants";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import FormatDate from "../../shareables/dateFormatter";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

export type QueryType = {
  page: number;
};

const NotificationsBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const limit = 10;
  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);

  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [query, setQuery] = useState<QueryType>({
    page: 0,
  });

  // update query and url
  const updateQueryString = useCallback(
    (newParams: QueryType) => {
      const searchParams = new URLSearchParams(location.search);
      // Update or add new parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          // value !== "" &&
          value !== 0
        ) {
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

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1500);
  }, [query, updateQueryString]);

  const notificationsRedux = useSelector(
    (state: ReducersType) => state.getNotifications
  ) as ReduxResponseType<GetNotificationType>;

  useEffect(() => {
    dispatch(
      getNotificationsAction("limit=" + limit + "&" + queryString) as any
    );
  }, [dispatch, queryString]);

  useEffect(() => {
    if (notificationsRedux?.success) {
      setTotalPages(
        Math.ceil(
          Number(notificationsRedux?.serverResponse?.data?.count) / limit
        )
      );
      setNotifications(notificationsRedux?.serverResponse?.data?.notifications);
      dispatch({ type: GET_NOTIFICATIONS_RESET });
    }

    if (notificationsRedux?.error)
      Swal.fire({
        title: "Error!!",
        text: notificationsRedux?.error,
        icon: "error",
        timer: 4000,
        confirmButtonText: "Okay",
      });
  }, [
    dispatch,
    notificationsRedux?.success,
    notificationsRedux?.error,
    notificationsRedux?.serverResponse?.data?.notifications,
    notificationsRedux?.serverResponse?.data?.count,
  ]);

  const markedSeenRedux = useSelector(
    (state: ReducersType) => state.markNotificationSeen
  ) as ReduxResponseType<NotificationType>;

  useEffect(() => {
    if (markedSeenRedux?.success) {
      dispatch({ type: MARK_NOTIFICATION_SEEN_RESET });
      navigate("/" + markedSeenRedux?.serverResponse?.data?.link);
    }
  }, [
    dispatch,
    markedSeenRedux?.serverResponse?.data?.link,
    markedSeenRedux?.success,
    navigate,
  ]);

  return (
    <section>
      <div className="flex flex-col gap-3 p-5">
        <div className="text-2xl font-[600]">Notifications</div>
        {notifications?.length ? (
          notifications.map((notification) => {
            return (
              <div
                key={notification?._id}
                className={
                  (notification?.seen ? "" : " bg-slate-500/20 ") +
                  "flex flex-col gap-3 shadow-md p-3 rounded-lg"
                }
              >
                <div className="flex items-start justify-between p-3">
                  <div
                    onClick={() =>
                      dispatch(
                        markNotificationSeenAction(notification?._id!) as any
                      )
                    }
                    className="flex gap-3 items-start w-2/3"
                  >
                    <img className="w-10 h-10" src={user2} alt="" />
                    <div className="flex flex-col">
                      <div className="font-[600] text-[#222222]">
                        {notification?.title}
                      </div>
                      <div className="font-[400] text-[#666C7E] text-sm">
                        {notification.message}
                      </div>
                      <div className="font-[400] text-[#666C7E] text-sm">
                        <FormatDate dateString={notification.createdAt || ""} />
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      dispatch(
                        deleteNotificationAction(notification?._id!) as any
                      )
                    }
                    className="text-3xl text-[#464D61] cursor-pointer"
                  >
                    <MdDelete />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Notifications yet...</div>
        )}
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
    </section>
  );
};

export default NotificationsBody;
