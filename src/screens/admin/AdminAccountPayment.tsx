import { AdminAccountPaymentBody } from "../../components/admincomponents/adminaccountpayment";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminAccountPayment = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminAccountPaymentBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminAccountPayment;
