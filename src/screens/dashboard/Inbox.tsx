import { UserInbox } from "../../components/dashboardcomponents/inbox";
import { DashboardLocation, Footer, Nav } from "../../components/layout";
import { UserDashboardNav } from "../../components/layout/DashboardNav";

const Inbox = () => {
  return (
    <div className="">
      <Nav isUserDashBoard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <UserDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full h-full">
          <UserInbox />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inbox;
