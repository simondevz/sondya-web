import { EmailVerficationBody } from "../../components/authcomponents/emailverification";
import { Footer } from "../../components/layout";
import AuthNav from "../../components/layout/AuthNav";

const EmailVerification = () => {
  return (
    <div>
      <AuthNav />
      <EmailVerficationBody />
      <Footer />
    </div>
  );
};

export default EmailVerification;
