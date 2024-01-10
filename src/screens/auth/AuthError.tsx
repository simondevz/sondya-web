import { AuthErrorBody } from "../../components/authcomponents/autherror";
import { Footer, Nav } from "../../components/layout";

const AuthError = () => {
  return (
    <div>
      <Nav isAuth />
      <AuthErrorBody />
      <Footer />
    </div>
  );
};

export default AuthError;
