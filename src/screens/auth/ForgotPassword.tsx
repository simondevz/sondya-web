import { Helmet } from "react-helmet";
import { ForgotPasswordBody } from "../../components/authcomponents/forgotpassword";
import { Footer, Nav } from "../../components/layout";

const ForgotPassword = () => {
  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Helmet>
      <Nav isAuth />
      <ForgotPasswordBody />
      <Footer />
    </div>
  );
};

export default ForgotPassword;
