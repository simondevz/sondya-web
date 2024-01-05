import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import SellerProductsPostingRulesBody from "../../components/sellersdashboardcomponents/sellerproductspostingrules/SellerProductsPostingRulesBody";

const SellerProductsPostingRules = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerProductsPostingRulesBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerProductsPostingRules;
