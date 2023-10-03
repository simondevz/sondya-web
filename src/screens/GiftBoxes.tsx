import { GiftBoxesBody } from "../components/giftboxes";
import { Footer, Nav } from "../components/layout";

const GiftBoxes = () => {
  return (
    <div className="overflow-x-scroll">
      <Nav />
      <GiftBoxesBody />
      <Footer />
    </div>
  );
};

export default GiftBoxes;
