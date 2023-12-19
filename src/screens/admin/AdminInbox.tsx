import { UserInbox } from "../../components/dashboardcomponents/inbox";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminInbox = () => {
  return (
    <div className="">
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full h-full">
          <UserInbox />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminInbox;
