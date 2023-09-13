import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import { SellerProductsBody } from "../../components/sellersdashboardcomponents/sellerproducts";

const SellerProducts = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerProductsBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerProducts;
