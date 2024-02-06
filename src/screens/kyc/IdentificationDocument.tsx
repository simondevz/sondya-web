import { KycDocumentBody } from "../../components/kyccomponents/kycDocument";
import { Footer, Nav } from "../../components/layout";

const IdentificationDocument = () => {
  return (
    <div>
      <Nav isAuth />
      <KycDocumentBody />
      <Footer />
    </div>
  );
};

export default IdentificationDocument;
