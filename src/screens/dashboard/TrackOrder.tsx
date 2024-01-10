import { TrackOrderBody } from "../../components/dashboardcomponents/trackorder";
import { DashboardLocation, Footer, Nav } from "../../components/layout";
import { UserDashboardNav } from "../../components/layout/DashboardNav";

const TrackOrder = () => {
  return (
    <div className="">
      <Nav isUserDashBoard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <UserDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5">
          <TrackOrderBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;
