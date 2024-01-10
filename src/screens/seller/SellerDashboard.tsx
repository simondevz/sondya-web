import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import {
  SellerDashboardHero,
  SellerMyProducts,
} from "../../components/sellersdashboardcomponents/sellerdashboard";
const SellerDashboard = () => {
  return (
    <div>
      <Nav isSellerDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerDashboardHero />
          <SellerMyProducts />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerDashboard;
