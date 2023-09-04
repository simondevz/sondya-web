import { AuthErrorBody } from "../../components/authcomponents/autherror";
import { Footer } from "../../components/layout";
import AuthNav from "../../components/layout/AuthNav";

const AuthError = () => {
  return (
    <div>
      <AuthNav />
      <AuthErrorBody />
      <Footer />
    </div>
  );
};

export default AuthError;
