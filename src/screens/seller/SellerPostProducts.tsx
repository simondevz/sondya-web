import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import { SellerPostProductBody } from "../../components/sellersdashboardcomponents/sellerpostproducts";

const SellerPostProducts = () => {
  return (
    <div>
      <Nav isSellerDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerPostProductBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerPostProducts;
