import { Footer, PrivacyPolicyNav } from "../components/layout";
import { PrivacyPolicyBody } from "../components/privacypolicy";

const PrivacyPolicy = () => {
  return (
    <div>
      <PrivacyPolicyNav title={"Privacy Policy"} />
      <PrivacyPolicyBody />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
