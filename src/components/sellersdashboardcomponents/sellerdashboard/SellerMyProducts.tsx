import { ProductsItemsdata } from "../../../data/productsItemsData";
import { FormatNumber } from "../../shareables/FormatNumber";
import { Ratings } from "../../shareables/Ratings";

const SellerMyProducts = () => {
  return (
    <section className="flex flex-col gap-3">
      <div className=" font-[700] playfair-display text-lg">
        Product Category
      </div>
      <div className="bg-[#EDB84233] p-2 md:p-5 flex flex-col gap-3">
        <div className="flex flex-wrap gap-4">
          {ProductsItemsdata.map((t, i) => {
            return (
              <div
                key={i}
                className="flex gap-3 flex-col w-2/5 max-w-[18rem] flex-grow"
              >
                <div className="bg-white rounded-md">
                  <img
                    className="h-[16rem] w-full rounded-md max-w-[16rem]"
                    src={t.image}
                    alt=""
                  />
                </div>
                <div className="">
                  <div className="flex flex-row gap-2 text-sm">
                    <Ratings rating={t.rating} />
                    <span>({t.totalrating})</span>
                  </div>
                  <div className="">{t.name}</div>
                  <div className="text-[#EDB842]">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="bg-[#EDB842] py-2 px-4 rounded-md text-white self-center">
          View More
        </button>
      </div>
    </section>
  );
};

export default SellerMyProducts;
