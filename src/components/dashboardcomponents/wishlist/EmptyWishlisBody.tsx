import { useNavigate } from "react-router-dom";
import { wishListEmpty } from "../../../images";

const EmptyWishlisBody = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full h-[90vh] flex flex-col items-center p-4">
      <div className="flex flex-col gap-3 m-auto w-full text-center justify-center items-center border shadow-lg p-4 md:w-3/5 max-w-[50rem]  rounded-md">
        <img
          className="object-cover h-[20vh] md:h-[30vh]"
          src={wishListEmpty}
          alt=""
        />
        <div className="text-2xl font-[600]">Your wishlist is empty.</div>
        <div className="">
          You don’t have any products in the wishlist yet. You will find a lot
          of interesting products on our Shop page.
        </div>
        <button
          onClick={() => navigate("/products")}
          className=" bg-[#EDB842] p-3 text-white rounded-md font-[700]"
        >
          Continue Shopping
        </button>
      </div>
    </section>
  );
};

export default EmptyWishlisBody;
