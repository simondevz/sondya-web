import { KycContactInfoBody } from "../../components/kyccomponents/kycContactInfo";
import { Footer, Nav } from "../../components/layout";

const ContactInfo = () => {
  return (
    <div>
      <Nav isAuth />
      <KycContactInfoBody />
      <Footer />
    </div>
  );
};

export default ContactInfo;
