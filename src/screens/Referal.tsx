import { Footer, Nav } from "../components/layout";
import { ReferalBody } from "../components/referal";

const Referal = () => {
  return (
    <div className="overflow-x-scroll">
      <Nav isHome />
      <ReferalBody />
      <Footer />
    </div>
  );
};

export default Referal;
