import { ForgotPasswordBody } from "../../components/authcomponents/forgotpassword";
import { Footer } from "../../components/layout";
import AuthNav from "../../components/layout/AuthNav";

const ForgotPassword = () => {
  return (
    <div>
      <AuthNav />
      <ForgotPasswordBody />
      <Footer />
    </div>
  );
};

export default ForgotPassword;
