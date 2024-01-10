import { AuthSuccessBody } from "../../components/authcomponents/authsuccess";
import { Footer, Nav } from "../../components/layout";

const AuthSuccess = () => {
  return (
    <div>
      <Nav isAuth />
      <AuthSuccessBody />
      <Footer />
    </div>
  );
};

export default AuthSuccess;
