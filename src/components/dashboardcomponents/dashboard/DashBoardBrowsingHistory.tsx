import { AiOutlineArrowRight } from "react-icons/ai";
import { ProductsItemsdata } from "../../../data/productsItemsData";
import { FormatNumber } from "../../shareables/FormatNumber";
import { Ratings } from "../../shareables/Ratings";

const DashBoardBrowsingHistory = () => {
  return (
    <section className="flex flex-col border rounded-md">
      <div className="flex flex-row justify-between font-[600] py-3 px-6 w-full">
        <span>Browsing History</span>
        <button className="text-[#EDB842] flex flex-row gap-2 items-center">
          <span>View All</span>
          <AiOutlineArrowRight />
        </button>
      </div>
      <div className="border flex flex-row flex-grow overflow-scroll gap-4 py-3 px-4">
        {ProductsItemsdata.map((t, i) => {
          return (
            <div key={i} className="flex flex-col gap-3 border-r-2 px-3">
              <img className="object-cover w-full h-3/5" src={t.image} alt="" />
              <div className="flex flex-row gap-1">
                <span className="text-sm">
                  <Ratings rating={t.rating} />
                </span>
                <span className="text-[#77878F] text-sm">
                  ({t.totalrating})
                </span>
              </div>
              <div className="font-[400] text-[#191C1F]">{t.name}</div>
              <div className="text-[#EDB842]">
                $<FormatNumber price={t.pricenow} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DashBoardBrowsingHistory;
