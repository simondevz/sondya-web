import {
  AboutUsHero,
  Benefits,
  Testimonials,
  WhoWeAre,
} from "../components/aboutus";
import { Footer, Nav } from "../components/layout";

const AboutUs = () => {
  return (
    <div className="">
      <Nav />
      <AboutUsHero />
      <WhoWeAre />
      <Benefits />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default AboutUs;
