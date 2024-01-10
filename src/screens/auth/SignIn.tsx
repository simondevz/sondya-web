import { Helmet } from "react-helmet";
import { LoginBody } from "../../components/authcomponents/login";
import { Footer, Nav } from "../../components/layout";

const SignIn = () => {
  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Helmet>
      <Nav isAuth />
      <LoginBody />
      <Footer />
    </div>
  );
};

export default SignIn;
