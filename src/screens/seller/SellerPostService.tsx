import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import { SellerPostServiceBody } from "../../components/sellersdashboardcomponents/sellerpostservice";

const SellerPostService = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerPostServiceBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerPostService;
