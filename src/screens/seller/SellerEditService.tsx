import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import { SellerEditServiceBody } from "../../components/sellersdashboardcomponents/sellereditservice";

const SellerEditService = () => {
  return (
    <div>
      <Nav isSellerDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerEditServiceBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerEditService;
