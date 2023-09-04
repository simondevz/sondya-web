import { RegisterBody } from "../../components/authcomponents/register";
import { Footer } from "../../components/layout";
import AuthNav from "../../components/layout/AuthNav";

const SignUp = () => {
  return (
    <div>
      <AuthNav />
      <RegisterBody />
      <Footer />
    </div>
  );
};

export default SignUp;
