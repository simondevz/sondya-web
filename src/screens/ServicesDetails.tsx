import { Footer, Nav } from "../components/layout";
import { ServiceDetailsBody } from "../components/servicesdetails";

const ServicesDetails = () => {
  return (
    <div className="">
      <Nav isHome />
      <ServiceDetailsBody />
      {/* <LastComponent /> */}
      <Footer />
    </div>
  );
};

export default ServicesDetails;
