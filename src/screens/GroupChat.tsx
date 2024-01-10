import { GroupChatBody } from "../components/groupchat";
import { Footer, Nav } from "../components/layout";

const GroupChat = () => {
  return (
    <div className="overflow-x-scroll">
      <Nav isHome />
      <GroupChatBody />
      <Footer />
    </div>
  );
};

export default GroupChat;
