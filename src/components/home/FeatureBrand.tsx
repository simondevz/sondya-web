import { BsChevronRight } from "react-icons/bs";
import { featureBrandItems } from "../../data/dealoffer";

const FeatureBrand = () => {
  return (
    <section className="flex flex-col p-5 gap-3 md:p-10">
      <div className="flex flex-row justify-between border-b-[0.5px] border-b-[#EDB842]">
        <span className="whitespace-nowrap  border-b-[4px] border-b-[#EDB842] font-[700] playfair-display">
          Featured Brands
        </span>{" "}
        <span className="whitespace-nowrap flex flex-row gap-2 items-center">
          {" "}
          <span>View All</span>{" "}
          <span className="text-[#EDB842] text-xl font-[900]">
            <BsChevronRight />
          </span>
        </span>
      </div>
      <div className="flex flex-row gap-3 whitespace-nowrap overflow-x-scroll">
        {featureBrandItems.map((t, i) => {
          return (
            <div className="w-3/5">
              <img className="w-full" src={t.image} alt="" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureBrand;
