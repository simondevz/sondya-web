import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import { SellerOrderDetailsBody } from "../../components/sellersdashboardcomponents/sellerorderdetails";

const SellerOrderDetails = () => {
  return (
    <div>
      <Nav isSellerDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerOrderDetailsBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerOrderDetails;
