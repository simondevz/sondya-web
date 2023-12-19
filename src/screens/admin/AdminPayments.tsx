import { AdminPaymentsBody } from "../../components/admincomponents/adminpayments";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminPayments = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminPaymentsBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPayments;
