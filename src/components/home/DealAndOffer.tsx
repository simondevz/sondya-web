import {
  dealAndOffersItems,
  inDoorItems,
  outDoorItems,
} from "../../data/dealoffer";
import { bgExterior } from "../../images/exterior";
import { bgInterior } from "../../images/interior";

const DealAndOffer = () => {
  return (
    <section className="flex flex-col gap-5 p-5 md:p-10">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-2 p-3 border">
          <div className="playfair-display font-[600] text-2xl">
            Deals and offers
          </div>
          <div className="text-[#8B96A5]">Hygiene equipments</div>
        </div>
        <div className="flex flex-wrap w-full">
          {dealAndOffersItems.map((t, i) => {
            return (
              <div className="flex flex-col gap-2 border p-3 justify-around flex-grow max-w-[200px]">
                <img src={t.image} alt="" />
                <div className="whitespace-nowrap">{t.name}</div>
                <div className="bg-[#EDB84233] text-[#EB001B] rounded-2xl p-2 w-16 mx-auto">
                  {t.percentdiscount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div
          className="flex flex-col gap-3 p-6 bg-no-repeat bg-cover bg-center md:w-3/12"
          style={{ backgroundImage: `url(${bgInterior})` }}
        >
          <div className="playfair-display font-[600] text-2xl mx-auto">
            Home and outdoor
          </div>
          <button className="p-3 bg-white max-w-[300px] mx-auto rounded-md">
            Source now
          </button>
        </div>
        <div className="flex flex-wrap w-full">
          {inDoorItems.map((t, i) => {
            return (
              <div className="flex flex-row gap-2 border p-3 flex-grow max-w-[300px]">
                <div className="">
                  <div className="font-[500] text-[#1C1C1C] playfair-display">
                    {t.name}
                  </div>
                  <div className="text-[#8B96A5] text-sm">From</div>
                  <div className="text-[#8B96A5] text-sm">{t.price}</div>
                </div>
                <div className="w-1/2">
                  <img className="w-full self-end" src={t.image} alt="" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div
          className="flex flex-col gap-3 p-6 bg-no-repeat bg-cover bg-center md:w-3/12"
          style={{ backgroundImage: `url(${bgExterior})` }}
        >
          <div className="playfair-display font-[600] text-2xl mx-auto">
            Consumer electronics and gadgets
          </div>
          <button className="p-3 bg-white max-w-[300px] mx-auto rounded-md">
            Source now
          </button>
        </div>
        <div className="flex flex-wrap w-full">
          {outDoorItems.map((t, i) => {
            return (
              <div className="flex flex-row gap-2 border p-3 flex-grow max-w-[300px]">
                <div className="">
                  <div className="font-[500] text-[#1C1C1C] playfair-display">
                    {t.name}
                  </div>
                  <div className="text-[#8B96A5] text-sm">From</div>
                  <div className="text-[#8B96A5] text-sm">{t.price}</div>
                </div>
                <div className="w-1/2">
                  <img className="w-full self-end" src={t.image} alt="" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DealAndOffer;
