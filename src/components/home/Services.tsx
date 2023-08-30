import { AiOutlineArrowRight, AiOutlineEye } from "react-icons/ai";
import { Servicesdata } from "../../data/servicesData";
import { serviceItemsdata } from "../../data/servicesitemdata";
import { DropdownServices } from "../shareables/Dropdown";
import { Like } from "../shareables/like";

const Services = () => {
  const limitedservicesdata = Servicesdata.slice(0, 4);
  const limitedservicedataitems = serviceItemsdata.slice(0, 10);
  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex flex-row gap-2 md:gap-4 w-full p-2 items-baseline text-[lg]">
        <div className="flex flex-row  w-10/12">
          <DropdownServices options={limitedservicesdata} />
          <div className="hidden md:flex  flex-row gap-2 overflow-x-scroll font-[600] border-b-[2px] border-[#000]">
            {limitedservicesdata.map((t, i) => {
              return (
                <div key={i} className="whitespace-nowrap">
                  {t.service}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row gap-1 md:gap-2 font-[600] whitespace-nowrap">
          View more{" "}
          <span className="text-2xl">
            <AiOutlineArrowRight />
          </span>
        </div>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {limitedservicedataitems.map((t, i) => {
          return (
            <div key={i} className=" flex flex-col gap-1 border p-2 relative">
              <div className="relative">
                <img src={t.image} alt="" />
                <div className="absolute gap-1  inset-0 bg-black bg-opacity-50 flex flex-row justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <Like />
                  {/* <div className="text-xl text-[#000000] bg-white p-1 rounded-full">
                    <AiOutlineShoppingCart />
                  </div> */}
                  <div className="text-xl bg-white text-[#000000] p-1 rounded-full">
                    <AiOutlineEye />
                  </div>
                </div>
              </div>
              <div className="">{t.name}</div>
            </div>
          );
        })}
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {limitedservicedataitems.map((t, i) => {
          return (
            <div key={i} className=" flex flex-col gap-1 border p-2 relative">
              <div className="relative">
                <img src={t.image} alt="" />
                <div className="absolute gap-1  inset-0 bg-black bg-opacity-50 flex flex-row justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <Like />
                  {/* <div className="text-xl text-[#000000] bg-white p-1 rounded-full">
                    <AiOutlineShoppingCart />
                  </div> */}
                  <div className="text-xl bg-white text-[#000000] p-1 rounded-full">
                    <AiOutlineEye />
                  </div>
                </div>
              </div>
              <div className="">{t.name}</div>
            </div>
          );
        })}
      </div>
      <div className="flex self-center w-1/2 md:w1/3 max-w-[100px]">
        <button className="flex flex-row gap-2 items-center whitespace-nowrap bg-[#EDB842C9] text-white p-3 rounded-md">
          {" "}
          <span>Explore all items</span>{" "}
          <span>
            <AiOutlineArrowRight />
          </span>
        </button>{" "}
      </div>
    </div>
  );
};

export default Services;
