import { ForgotPasswordBody } from "../../components/authcomponents/forgotpassword";
import { Footer, Nav } from "../../components/layout";

const ForgotPassword = () => {
  return (
    <div>
      <Nav />
      <ForgotPasswordBody />
      <Footer />
    </div>
  );
};

export default ForgotPassword;
