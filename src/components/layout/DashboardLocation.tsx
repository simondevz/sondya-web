import { useEffect, useMemo, useState } from "react";
import { AiOutlineBell, AiOutlineRight } from "react-icons/ai";
import { FaHome, FaTimes } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { user1 } from "../../images/users";
import {
  get4NotificationsAction,
  getNotificationsUnseenCountAction,
  markNotificationSeenAction,
} from "../../redux/actions/notifications.actions";
import {
  GET_NOTIFICATIONS_RESET,
  MARK_NOTIFICATION_SEEN_RESET,
} from "../../redux/constants/notifications.constants";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import {
  GetNotificationType,
  NotificationType,
} from "../../redux/types/notifications.types";
import FormatDate from "../shareables/dateFormatter";

const DashboardLocation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [status, setStatus] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const unseenCountRedux = useSelector(
    (state: ReducersType) => state.getNotificationUnseenCount
  ) as ReduxResponseType<number>;

  const unseenCount = useMemo(
    () => unseenCountRedux?.serverResponse?.data,
    [unseenCountRedux?.serverResponse?.data]
  );

  useEffect(() => {
    dispatch(getNotificationsUnseenCountAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(get4NotificationsAction() as any);
  }, [dispatch]);

  const notificationRedux = useSelector(
    (state: ReducersType) => state.get4Notifications
  ) as ReduxResponseType<GetNotificationType>;

  const markedSeenRedux = useSelector(
    (state: ReducersType) => state.markNotificationSeen
  ) as ReduxResponseType<NotificationType>;

  useEffect(() => {
    if (notificationRedux?.success) {
      setNotifications(notificationRedux?.serverResponse?.data?.notifications);
      dispatch({ type: GET_NOTIFICATIONS_RESET });
    }
  }, [
    notificationRedux?.serverResponse?.data?.notifications,
    notificationRedux?.success,
    dispatch,
  ]);

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

  //put location
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  return (
    <div className="relative flex flex-row justify-between items-center gap-1 bg-[#000000] text-white py-5 px-8">
      <div className="flex flex-row justify-between items-center gap-1">
        <FaHome /> <span>Home</span>
        {pathSegments.map((t, i) => {
          return (
            <div
              key={i}
              className="flex flex-row justify-between items-center gap-1"
            >
              <AiOutlineRight /> <span>{t}</span>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setStatus(!status)}
        className="relative text-xl text-[#EDB842]"
      >
        <span
          className={`absolute -top-4 -right-2 rounded-full bg-[#EDB842] text-white p-[0.3rem] w-fit h-fit font-[600] text-sm animate__animated animate__bounce ${
            unseenCount ? "animate__bounceIn" : ""
          }`}
        >
          {unseenCount < 100 ? unseenCount : "99+"}
        </span>
        <AiOutlineBell />
      </button>
      {status && (
        <div className="absolute bg-white text-[#222529] flex flex-col right-3 top-11 w-[18rem] shadow-md rounded-md">
          <div className="flex gap-3 p-3  justify-between border-b">
            <span>Notifications</span>{" "}
            <button onClick={() => setStatus(false)}>
              <FaTimes />
            </button>
          </div>
          {notifications?.length ? (
            notifications?.map((notification) => {
              return (
                <div
                  key={notification?._id}
                  onClick={() => {
                    dispatch(
                      markNotificationSeenAction(notification?._id!) as any
                    );
                  }}
                  className={
                    (notification?.seen ? "" : " bg-slate-500/20 ") +
                    "flex gap-4 justify-between p-2 items-center "
                  }
                >
                  <div className="flex text-sm items-center gap-3">
                    <img
                      className="w-8 h-8 object-contain"
                      src={user1}
                      alt=""
                    />
                    <div className="">
                      <div className="text-[#222529] font-[600] text-[1rem]">
                        {notification.title}
                      </div>
                      <div className="text-[#4C525A]">
                        {notification?.title}
                      </div>
                      <div className="text-[#4C525A]">
                        <FormatDate dateString={notification?.createdAt!} />
                      </div>
                    </div>
                  </div>
                  <button className="">
                    <div className=""></div>
                    <button>
                      <MdArrowForwardIos />
                    </button>
                  </button>
                </div>
              );
            })
          ) : (
            <div>No Notifications Yet</div>
          )}
          <button
            onClick={() => navigate("/user/notifications")}
            className="text-[#EDB842] p-3 bg-[#EDB84230] text-xl font-[600] text-center"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardLocation;
