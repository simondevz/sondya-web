import { KycCompanyInfoBody } from "../../components/kyccomponents/kycCompanyInfo";
import { Footer, Nav } from "../../components/layout";

const CompanyInfo = () => {
  return (
    <div>
      <Nav isAuth />
      <KycCompanyInfoBody />
      <Footer />
    </div>
  );
};

export default CompanyInfo;
