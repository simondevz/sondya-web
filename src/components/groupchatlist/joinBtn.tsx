import { useLocation, useNavigate } from "react-router-dom";
import { adminGroupChatType } from "../../redux/types/groupchat.types";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserGroupChatsAction,
  userJoinGroupchatAction,
} from "../../redux/actions/userDashboard/groupchat.actions";
import Swal from "sweetalert2";
import { ReduxResponseType } from "../../redux/types/general.types";
import { ReducersType } from "../../redux/store";
import { useEffect } from "react";

export default function JoinBtn({
  group,
  userGroups,
}: {
  group: adminGroupChatType;
  userGroups: any;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user_id = location?.state?.user_id;
  const userGroupsFromUrl = location?.state?.userGroupsFromUrl;

  const loginRedux: ReduxResponseType = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType;

  useEffect(() => {
    if (loginRedux?.serverResponse?.data?.id || user_id)
      dispatch(getUserGroupChatsAction() as any);
  }, [dispatch, loginRedux?.serverResponse?.data?.id, user_id]);

  const userInGroup = ((userGroups: any) => {
    for (let index = 0; index < userGroups.length; index++) {
      const group_id = userGroups[index]?.group_id;
      if (group_id === group?._id) return true;
    }
    return false;
  })(userGroups || userGroupsFromUrl);

  const handleJoin = (group: adminGroupChatType) => {
    if (!loginRedux?.serverResponse?.data?.id) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: "Please login before Joining",
      });
      return;
    }
    if (!userInGroup) dispatch(userJoinGroupchatAction(group._id || "") as any);
    navigate("/groupchats/" + group?._id, {
      state: {
        currentGroup: group,
        user_id: loginRedux?.serverResponse?.data?.id,
        userGroupsFromUrl: userGroups,
      },
    });
  };

  return (
    <button
      onClick={() => handleJoin(group)}
      className={
        (userInGroup
          ? " text-[#EDB842] font-semibold "
          : " text-white bg-[#EDB842] ") +
        " font-semibold py-2 w-fit px-4 rounded-md self-end"
      }
    >
      {userInGroup ? "View Messages" : "Join now"}
    </button>
  );
}
