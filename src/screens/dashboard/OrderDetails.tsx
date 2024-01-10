import { OrderDetailsBody } from "../../components/dashboardcomponents/orderdetails";
import { DashboardLocation, Footer, Nav } from "../../components/layout";
import { UserDashboardNav } from "../../components/layout/DashboardNav";

const OrderDetails = () => {
  return (
    <div className="">
      <Nav isUserDashBoard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <UserDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full p-5">
          <OrderDetailsBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;
