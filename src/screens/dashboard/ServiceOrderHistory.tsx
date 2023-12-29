import ServiceOrderHistoryBody from "../../components/dashboardcomponents/serviceorderhistory/ServiceOrderHistoryBody";
import { DashboardLocation, Footer, Nav } from "../../components/layout";
import { UserDashboardNav } from "../../components/layout/DashboardNav";

const ServiceOrderHistory = () => {
  return (
    <div className="">
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <UserDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5">
          <ServiceOrderHistoryBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceOrderHistory;
