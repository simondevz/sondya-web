import { wishListEmpty } from "../../images";

const WishlistBody = () => {
  return (
    <section className="w-full h-[90vh] flex flex-col items-center p-4">
      <div className="flex flex-col gap-3 m-auto w-full text-center justify-center items-center border shadow-lg p-4 md:w-1/2 xl:w-1/3 max-w-[450px] rounded-md">
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
        <button className=" bg-[#EDB842] p-3 text-white rounded-md font-[700]">
          Continue Shopping
        </button>
      </div>
    </section>
  );
};

export default WishlistBody;
