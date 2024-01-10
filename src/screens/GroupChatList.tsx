import { GroupChatListBody } from "../components/groupchatlist";
import { Footer, Nav } from "../components/layout";

const GroupChatList = () => {
  return (
    <div className="overflow-x-scroll">
      <Nav isHome />
      <GroupChatListBody />
      <Footer />
    </div>
  );
};

export default GroupChatList;
