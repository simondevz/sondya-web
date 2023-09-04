import { ResetPasswordBody } from "../../components/authcomponents/resetpassword";
import { Footer } from "../../components/layout";
import AuthNav from "../../components/layout/AuthNav";

const ResetPassword = () => {
  return (
    <div>
      <AuthNav />
      <ResetPasswordBody />
      <Footer />
    </div>
  );
};

export default ResetPassword;
