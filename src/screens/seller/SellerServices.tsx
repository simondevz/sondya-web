import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import { SellerServiceBody } from "../../components/sellersdashboardcomponents/sellerservices";

const SellerServices = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerServiceBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerServices;
