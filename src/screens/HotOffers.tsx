import { HotOffersBody } from "../components/hotoffers";
import { Footer, Nav } from "../components/layout";

const HotOffers = () => {
  return (
    <div className="overflow-x-scroll">
      <Nav />
      <HotOffersBody />
      <Footer />
    </div>
  );
};

export default HotOffers;
