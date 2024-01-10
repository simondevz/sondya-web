import {
  DashboardHero,
  DashboardRecentOrders,
} from "../../components/dashboardcomponents/dashboard";
import { DashboardLocation, Footer, Nav } from "../../components/layout";
import { UserDashboardNav } from "../../components/layout/DashboardNav";

const Dashboard = () => {
  return (
    <div className="">
      <Nav isUserDashBoard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <UserDashboardNav isSmScreen={false} />
        <div className="overflow-x-hidden flex flex-col gap-5">
          <DashboardHero />
          <DashboardRecentOrders />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
