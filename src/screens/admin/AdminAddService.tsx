import { AdminAddServiceBody } from "../../components/admincomponents/adminaddservice";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminAddService = () => {
  return (
    <div>
      <Nav isAdminDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminAddServiceBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminAddService;
