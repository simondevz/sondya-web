import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import { SellerServiceDetailsBody } from "../../components/sellersdashboardcomponents/sellerservicedetails";

const SellerServiceDetails = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerServiceDetailsBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerServiceDetails;
