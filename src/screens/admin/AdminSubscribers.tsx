import AdminSubscribersBody from "../../components/admincomponents/adminsuscribers/AdminSubscribersBody";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminSubscribers = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminSubscribersBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSubscribers;
