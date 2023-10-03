import { AcknowledgementBody } from "../components/acknowledgement";
import { Footer, PrivacyPolicyNav } from "../components/layout";

const Acknowledgement = () => {
  return (
    <div>
      <PrivacyPolicyNav title={"Acknowlegdement"} />
      <AcknowledgementBody />
      <Footer />
    </div>
  );
};

export default Acknowledgement;
