import { AdminTestimonialBody } from "../../components/admincomponents/admintestimonial";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminTestimonial = () => {
  return (
    <div>
      <Nav isAdminDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminTestimonialBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminTestimonial;
