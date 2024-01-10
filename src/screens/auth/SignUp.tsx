import { Helmet } from "react-helmet";
import { RegisterBody } from "../../components/authcomponents/register";
import { Footer, Nav } from "../../components/layout";

const SignUp = () => {
  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Helmet>
      <Nav isAuth />
      <RegisterBody />
      <Footer />
    </div>
  );
};

export default SignUp;
