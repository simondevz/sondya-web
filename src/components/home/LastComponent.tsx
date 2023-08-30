import { ProductsItemsdata } from "../../data/productsItemsData";
import { FormatNumber } from "../shareables/FormatNumber";

const LastComponent = () => {
  const limitedproductsdata = ProductsItemsdata.slice(0, 3);
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4 gap-3">
      <div className="flex flex-col gap-3">
        <div className="playfair-display font-[600] text-[18px]">
          FLASH SALE TODAY
        </div>
        <div className="flex flex-col gap-2">
          {limitedproductsdata.map((t, i) => {
            return (
              <div className="flex flex-row border p-3 justify-between gap-2">
                <img className="w-1/2 object-cover" src={t.image} alt="" />
                <div className="flex flex-col justify-around">
                  <div className="font-[600] text-[11px] md:text-[13px]">
                    {t.name}
                  </div>
                  <div className="text-[#EDB842]">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="playfair-display font-[600] text-[18px]">
          BEST SELLERS
        </div>
        <div className="flex flex-col gap-2">
          {limitedproductsdata.map((t, i) => {
            return (
              <div className="flex flex-row border p-3 justify-between gap-2">
                <img className="w-1/2 object-cover" src={t.image} alt="" />
                <div className="flex flex-col justify-around">
                  <div className="font-[600] text-[11px] md:text-[13px]">
                    {t.name}
                  </div>
                  <div className="text-[#EDB842]">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="playfair-display font-[600] text-[18px]">TOP RATED</div>
        <div className="flex flex-col gap-2">
          {limitedproductsdata.map((t, i) => {
            return (
              <div className="flex flex-row border p-3 justify-between gap-2">
                <img className="w-1/2 object-cover" src={t.image} alt="" />
                <div className="flex flex-col justify-around">
                  <div className="font-[600] text-[11px] md:text-[13px]">
                    {t.name}
                  </div>
                  <div className="text-[#EDB842]">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="playfair-display font-[600] text-[18px]">
          NEW ARRIVAL
        </div>
        <div className="flex flex-col gap-2">
          {limitedproductsdata.map((t, i) => {
            return (
              <div className="flex flex-row border p-3 justify-between gap-2">
                <img className="w-1/2 object-cover" src={t.image} alt="" />
                <div className="flex flex-col justify-around">
                  <div className="font-[600] text-[11px] md:text-[13px]">
                    {t.name}
                  </div>
                  <div className="text-[#EDB842]">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LastComponent;
