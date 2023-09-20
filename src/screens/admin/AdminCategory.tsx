import { AdminCategoryBody } from "../../components/admincomponents/admincategory";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminCategory = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5 ">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full ">
          <AdminCategoryBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminCategory;
