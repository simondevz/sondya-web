import { BsDot } from "react-icons/bs";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { cartDataItem } from "../../../data/cartData";
import { ProductsItemsdata } from "../../../data/productsItemsData";
import { FormatNumber } from "../../shareables/FormatNumber";
import { Ratings } from "../../shareables/Ratings";
import EmptyWishlisBody from "./EmptyWishlisBody";

const WishlistBody = () => {
  return (
    <>
      {cartDataItem.length === 0 ? (
        <EmptyWishlisBody />
      ) : (
        <section className="p-3 w-full">
          <div className="flex flex-col gap-3 w-full">
            {ProductsItemsdata.map((t, i) => {
              return (
                <div className="flex flex-row gap-3 p-3 w-full border rounded-md">
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col md:flex-row gap-2 w-4/5">
                      <img
                        className="object-cover w-1/3"
                        src={t.image}
                        alt=""
                      />
                      <div className="md:w-2/3 gap-2 h-full flex flex-col justify-around items-start">
                        <div className="font-[600] text-[#1C1C1C]">
                          {t.name}
                        </div>
                        <div className="font-[600] text-[#1C1C1C]">
                          $<FormatNumber price={t.pricenow} />
                        </div>
                        <div className="flex flex-row gap-0 text-sm">
                          <Ratings
                            rating={t.rating}
                            starColor={"text-[#FF9017]"}
                          />{" "}
                          <span className="font-[400] text-[#FF9017]">
                            {t.rating}
                          </span>{" "}
                          <span className="font-[400] text-[#8B96A5]">
                            <BsDot />
                          </span>
                          <span className="font-[400] text-[#8B96A5] whitespace-nowrap">
                            <FormatNumber price={t.totalrating} /> orders
                          </span>
                          <span className="font-[400] text-[#8B96A5]">
                            <BsDot />
                          </span>
                          <span className="font-[400] text-[#00B517] whitespace-nowrap">
                            Free shipping
                          </span>
                        </div>
                        <div className="text-[#505050] font-[400]">
                          {t.body}
                        </div>
                        <button className="text-[#EDB842] font-[600]">
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[#EDB842] text-2xl w-fit p-1 h-fit border-2 border-[#DEE2E7] rounded-full">
                        {true ? <MdOutlineFavoriteBorder /> : <MdFavorite />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default WishlistBody;
