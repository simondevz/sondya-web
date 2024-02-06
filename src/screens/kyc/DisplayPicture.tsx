import { KycPictureBody } from "../../components/kyccomponents/kycPicture";
import { Footer, Nav } from "../../components/layout";

const DisplayPicture = () => {
  return (
    <div>
      <Nav isAuth />
      <KycPictureBody />
      <Footer />
    </div>
  );
};

export default DisplayPicture;
