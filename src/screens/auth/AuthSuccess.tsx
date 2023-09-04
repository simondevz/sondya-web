import { AuthSuccessBody } from "../../components/authcomponents/authsuccess";
import { Footer } from "../../components/layout";
import AuthNav from "../../components/layout/AuthNav";

const AuthSuccess = () => {
  return (
    <div>
      <AuthNav />
      <AuthSuccessBody />
      <Footer />
    </div>
  );
};

export default AuthSuccess;
