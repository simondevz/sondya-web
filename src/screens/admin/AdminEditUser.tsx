import { AdminEditUsersBody } from "../../components/admincomponents/adminedituser";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminEditUser = () => {
  return (
    <div>
      <Nav isAdminDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminEditUsersBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminEditUser;
