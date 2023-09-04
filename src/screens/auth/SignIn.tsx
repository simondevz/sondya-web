import { LoginBody } from "../../components/authcomponents/login";
import { Footer } from "../../components/layout";
import AuthNav from "../../components/layout/AuthNav";

const SignIn = () => {
  return (
    <div>
      <AuthNav />
      <LoginBody />
      <Footer />
    </div>
  );
};

export default SignIn;
