import { KycPersonalInfoBody } from "../../components/kyccomponents/kycPersonalInfo";
import { Footer, Nav } from "../../components/layout";

const PersonalInfo = () => {
  return (
    <div>
      <Nav isAuth />
      <KycPersonalInfoBody />
      <Footer />
    </div>
  );
};

export default PersonalInfo;
