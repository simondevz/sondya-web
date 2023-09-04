import { AuthSuccessBody } from "../../components/authcomponents/authsuccess";
import { Footer, Nav } from "../../components/layout";

const AuthSuccess = () => {
  return (
    <div>
      <Nav />
      <AuthSuccessBody />
      <Footer />
    </div>
  );
};

export default AuthSuccess;
