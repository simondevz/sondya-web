import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { ProductsItemsdata } from "../../../data/productsItemsData";
import { FormatNumber } from "../../shareables/FormatNumber";
import { Ratings } from "../../shareables/Ratings";
import Switch from "../../shareables/Switch";

const BrowseHistoryBody = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked);
  };
  return (
    <section className="p-4 flex flex-col gap-3">
      <div className="flex flex-row justify-between">
        <div className="font-[600] playfair-display text-lg">
          Browsing History
        </div>
        <div className="flex flex-row gap-3">
          <div className="font-[600]">Turn Browsing History on/off</div>
          <Switch checked={isChecked} onChange={handleSwitchChange} />
        </div>
      </div>
      <div className="flex flex-row gap-3 justify-start">
        <div className="flex flex-row border px-2 py-1 rounded-lg items-center">
          <span className="text-[#EDB842]">
            <BsSearch />
          </span>
          <input
            className="outline-none p-1 w-[15rem]"
            type="text"
            placeholder="Search in browsing history"
          />
        </div>
        <div className="flex flex-row border px-2 py-1 rounded-lg items-center">
          {/* <span className="text-[#EDB842]">
            <MdDateRange />
          </span> */}
          <input
            className="outline-none px-2 py-1 w-[15rem]"
            type="date"
            placeholder="Search in browsing history"
            id="datemil"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {/* first date */}
        <div className="border rounded-md">
          <div className="p-2 border">17 Oct, 2020</div>
          <div className="p-2 flex flex-wrap gap-1 border">
            {ProductsItemsdata.slice(0, 4).map((t, i) => {
              return (
                <div className="flex max-w-[12rem] flex-col gap-2 border-r p-2 justify-around">
                  <img className="object-contain h-20" src={t.image} alt="" />
                  <div className="flex flex-row gap-2 text-sm">
                    <Ratings rating={t.rating} />
                    <span className="text-[#77878F]">{t.totalrating}</span>
                  </div>
                  <div className="text-sm">{t.name}</div>
                  <div className="">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* another date */}
        <div className="border rounded-md">
          <div className="p-2 border">17 Oct, 2020</div>
          <div className="p-2 flex flex-wrap gap-1 border">
            {ProductsItemsdata.slice(0, 3).map((t, i) => {
              return (
                <div className="flex max-w-[12rem] flex-col gap-2 border-r p-2 justify-around">
                  <img className="object-contain h-20" src={t.image} alt="" />
                  <div className="flex flex-row gap-2 text-sm">
                    <Ratings rating={t.rating} />
                    <span className="text-[#77878F]">{t.totalrating}</span>
                  </div>
                  <div className="text-sm">{t.name}</div>
                  <div className="">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* another date */}
        <div className="border rounded-md">
          <div className="p-2 border">24 May, 2020</div>
          <div className="p-2 flex flex-wrap gap-1 border">
            {ProductsItemsdata.slice(0, 5).map((t, i) => {
              return (
                <div className="flex max-w-[12rem] flex-col gap-2 border-r p-2 justify-around">
                  <img className="object-contain h-20" src={t.image} alt="" />
                  <div className="flex flex-row gap-2 text-sm">
                    <Ratings rating={t.rating} />
                    <span className="text-[#77878F]">{t.totalrating}</span>
                  </div>
                  <div className="text-sm">{t.name}</div>
                  <div className="">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* another date */}
        <div className="border rounded-md">
          <div className="p-2 border">21 Sep, 2020</div>
          <div className="p-2 flex flex-wrap gap-1 border">
            {ProductsItemsdata.slice(0, 4).map((t, i) => {
              return (
                <div className="flex max-w-[12rem] flex-col gap-2 border-r p-2 justify-around">
                  <img className="object-contain h-20" src={t.image} alt="" />
                  <div className="flex flex-row gap-2 text-sm">
                    <Ratings rating={t.rating} />
                    <span className="text-[#77878F]">{t.totalrating}</span>
                  </div>
                  <div className="text-sm">{t.name}</div>
                  <div className="">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* another date */}
        <div className="border rounded-md">
          <div className="p-2 border">22 Oct, 2020</div>
          <div className="p-2 flex flex-wrap gap-1 border">
            {ProductsItemsdata.slice(0, 1).map((t, i) => {
              return (
                <div className="flex max-w-[12rem] flex-col gap-2 border-r p-2 justify-around">
                  <img className="object-contain h-20" src={t.image} alt="" />
                  <div className="flex flex-row gap-2 text-sm">
                    <Ratings rating={t.rating} />
                    <span className="text-[#77878F]">{t.totalrating}</span>
                  </div>
                  <div className="text-sm">{t.name}</div>
                  <div className="">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* another date */}
        <div className="border rounded-md">
          <div className="p-2 border">21 Sep, 2020</div>
          <div className="p-2 flex flex-wrap gap-1 border">
            {ProductsItemsdata.slice(0, 3).map((t, i) => {
              return (
                <div className="flex max-w-[12rem] flex-col gap-2 border-r p-2 justify-around">
                  <img className="object-contain h-20" src={t.image} alt="" />
                  <div className="flex flex-row gap-2 text-sm">
                    <Ratings rating={t.rating} />
                    <span className="text-[#77878F]">{t.totalrating}</span>
                  </div>
                  <div className="text-sm">{t.name}</div>
                  <div className="">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseHistoryBody;
