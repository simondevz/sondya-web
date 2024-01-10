import { OrderConfirmationBody } from "../../components/dashboardcomponents/orderconfirmation";
import { Footer, Nav } from "../../components/layout";

const OrderConfirmation = () => {
  return (
    <div className="">
      <Nav isUserDashBoard />
      <OrderConfirmationBody />
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
