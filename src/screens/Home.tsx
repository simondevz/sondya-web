import {
  DealAndOffer,
  Enhance,
  FeatureBrand,
  Hero,
  LastComponent,
  Products,
  Services,
} from "../components/home";
import { Footer, Nav } from "../components/layout";

const Home = () => {
  return (
    <div className="">
      <Nav />
      <Hero />
      <Products />
      <Enhance />
      <Services />
      <DealAndOffer />
      <FeatureBrand />
      <LastComponent />
      <Footer />
    </div>
  );
};

export default Home;
