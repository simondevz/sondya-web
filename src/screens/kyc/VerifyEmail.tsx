import { KycVerifyEmailBody } from "../../components/kyccomponents/kycVerifyEmail";
import { Footer, Nav } from "../../components/layout";

const VerifyEmail = () => {
  return (
    <div>
      <Nav isAuth />
      <KycVerifyEmailBody />
      <Footer />
    </div>
  );
};

export default VerifyEmail;
