import {
  DealAndOffer,
  Enhance,
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
      <LastComponent />
      <Footer />
    </div>
  );
};

export default Home;
