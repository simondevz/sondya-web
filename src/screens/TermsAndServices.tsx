import { Footer, PrivacyPolicyNav } from "../components/layout";
import { TermsAndServicesBody } from "../components/termsandservices";

const TermsAndServices = () => {
  return (
    <div>
      <PrivacyPolicyNav title={"Term & Conditions"} />
      <TermsAndServicesBody />
      <Footer />
    </div>
  );
};

export default TermsAndServices;
