import { AdminAddCategoryBody } from "../../components/admincomponents/adminaddcategory";
import { DashboardLocation, Footer, Nav } from "../../components/layout";
import AdminDashboardNav from "../../components/layout/AdminDashboardNav";

const AdminAddCategory = () => {
  return (
    <div>
      <Nav isAdminDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminAddCategoryBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminAddCategory;
