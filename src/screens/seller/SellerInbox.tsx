import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import { SellerInboxBody } from "../../components/sellersdashboardcomponents/sellerinbox";

const SellerInbox = () => {
  return (
    <div>
      <Nav isSellerDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full ">
          <SellerInboxBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerInbox;
