import { AdminCreateGroupChatBody } from "../../components/admincomponents/admincreategroupchat";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminCreateGroupChat = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5 ">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full ">
          <AdminCreateGroupChatBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminCreateGroupChat;
