import { Footer, Nav } from "../components/layout";
import { ServiceCheckoutBody } from "../components/servicecheckout";

const ServiceCheckout = () => {
  return (
    <div className="overflow-x-scroll">
      <Nav isHome />
      <ServiceCheckoutBody />
      <Footer />
    </div>
  );
};

export default ServiceCheckout;
