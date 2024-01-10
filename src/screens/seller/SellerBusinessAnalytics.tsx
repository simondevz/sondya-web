import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import {
  SellerAnalyticHero,
  SellerLatestOrders,
} from "../../components/sellersdashboardcomponents/selleranalytics";

const SellerBusinessAnalytics = () => {
  return (
    <div>
      <Nav isSellerDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerAnalyticHero />
          <SellerLatestOrders />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerBusinessAnalytics;
