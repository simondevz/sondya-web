import { ResetPasswordBody } from "../../components/authcomponents/resetpassword";
import { Footer, Nav } from "../../components/layout";

const ResetPassword = () => {
  return (
    <div>
      <Nav isAuth />
      <ResetPasswordBody />
      <Footer />
    </div>
  );
};

export default ResetPassword;
