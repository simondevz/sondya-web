import { Helmet } from "react-helmet";
import { EmailVerficationBody } from "../../components/authcomponents/emailverification";
import { Footer, Nav } from "../../components/layout";

const EmailVerification = () => {
  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Helmet>
      <Nav isAuth />
      <EmailVerficationBody />
      <Footer />
    </div>
  );
};

export default EmailVerification;
