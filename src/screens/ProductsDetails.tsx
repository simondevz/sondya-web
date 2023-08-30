import { LastComponent } from "../components/home";
import { Footer, Nav } from "../components/layout";
import { ProductsDetailsBody } from "../components/productsdetails";

const ProductsDetails = () => {
  return (
    <div className="">
      <Nav />
      <ProductsDetailsBody />
      <LastComponent />
      <Footer />
    </div>
  );
};

export default ProductsDetails;
