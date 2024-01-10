import { Footer, Nav } from "../components/layout";
import { ProductBody } from "../components/products";

const Products = () => {
  return (
    <div className="flex flex-col gap-3">
      <Nav isHome />
      <ProductBody />
      <Footer />
    </div>
  );
};

export default Products;
