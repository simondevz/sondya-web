import AdminServiceOrderDetailsBody from "../../components/admincomponents/adminserviceorderdetails/AdminServiceOrderDetailsBody";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminServiceOrderDetails = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminServiceOrderDetailsBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminServiceOrderDetails;
