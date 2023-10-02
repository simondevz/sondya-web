import { AdminServicesBody } from "../../components/admincomponents/adminservices";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminServices = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminServicesBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminServices;
