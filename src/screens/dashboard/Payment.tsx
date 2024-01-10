import { PaymentBody } from "../../components/dashboardcomponents/payment";
import { DashboardLocation, Footer, Nav } from "../../components/layout";
import { UserDashboardNav } from "../../components/layout/DashboardNav";

const Payment = () => {
  return (
    <div className="">
      <Nav isUserDashBoard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <UserDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5">
          <PaymentBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
