import { AdminEditTestimonialBody } from "../../components/admincomponents/adminedittestimonial";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminUpdateTestimonial = () => {
  return (
    <div>
      <Nav isAdminDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminEditTestimonialBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminUpdateTestimonial;
