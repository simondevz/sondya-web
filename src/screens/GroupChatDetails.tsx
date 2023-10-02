import { GroupChatDetailsBody } from "../components/groupchatdetails";
import { Footer, Nav } from "../components/layout";

const GroupChatDetails = () => {
  return (
    <div className="overflow-x-scroll">
      <Nav />
      <GroupChatDetailsBody />
      <Footer />
    </div>
  );
};

export default GroupChatDetails;
