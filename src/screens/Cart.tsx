import { CartBody } from "../components/cart";
import { Footer, Nav } from "../components/layout";

const Cart = () => {
  return (
    <div className="overflow-x-scroll">
      <Nav />
      <CartBody />
      <Footer />
    </div>
  );
};

export default Cart;
