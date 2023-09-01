import { cartEmpty } from "../../images";

const CartBody = () => {
  return (
    <section className="w-full h-[90vh] flex flex-col items-center">
      <div className="flex flex-col gap-3 m-auto w-full md:w-1/3 text-center justify-center items-center">
        <img
          className="object-cover h-[15vh] md:h-[30vh]"
          src={cartEmpty}
          alt=""
        />
        <div className="text-2xl font-[600]">Your cart is empty and sad :(</div>
        <div className="">Add something to make it happy!</div>
        <button className=" bg-[#EDB842] p-3 text-white rounded-md font-[700]">
          Continue Shopping
        </button>
      </div>
    </section>
  );
};

export default CartBody;
