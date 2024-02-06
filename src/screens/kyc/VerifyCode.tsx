import KycVerifyCodeBody from "../../components/kyccomponents/kycVerifyCode/KycVerifyCodeBody";
import { Footer, Nav } from "../../components/layout";

const VerifyCode = () => {
  return (
    <div>
      <Nav isAuth />
      <KycVerifyCodeBody />
      <Footer />
    </div>
  );
};

export default VerifyCode;
