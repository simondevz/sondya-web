import { NotificationsBody } from "../../components/dashboardcomponents/notifications";
import { DashboardLocation, Footer, Nav } from "../../components/layout";
import { UserDashboardNav } from "../../components/layout/DashboardNav";

const Notifications = () => {
  return (
    <div className="">
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <UserDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <NotificationsBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
