import { AiFillStar } from "react-icons/ai";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { serviceItemsdata2 } from "../../data/servicesitemdata";
import { FormatNumber } from "../shareables/FormatNumber";
import {
  ServicesNav,
  ServicesPopularBrands,
  ServicesPopularTags,
  ServicesPriceRange,
} from "./FilterServiceNav";

const ServiceBody = () => {
  return (
    <div className="flex flex-row px-5 py-6">
      <div className="w-3/12 px-3 py-4 md:flex hidden flex-col gap-3">
        <ServicesNav />
        <ServicesPriceRange />
        <ServicesPopularBrands />
        <ServicesPopularTags />
      </div>
      <ServiceBodyMain />
    </div>
  );
};

const ServiceBodyMain = () => {
  return (
    <div className="flex flex-col w-full gap-3 md:w-9/12">
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-row gap-2">
          <input
            className="border-[#EDB842] outline-none border-[2px] rounded-md px-2 md:px-4"
            type="text"
            placeholder="Search for anything..."
          />
          <button className="text-white bg-[#EDB842] px-2 md:px-3 py-2 rounded-md">
            Search
          </button>
        </div>
        <div className="flex flex-row gap-2 items-center text-[#5F6C72]">
          <label htmlFor="">Sort by:</label>
          <select
            className="border-[2px] border-[#E4E7E9] p-2 rounded-md"
            name=""
            id=""
          >
            <option value="">Most Popular</option>
            <option value="">Most Popular</option>
            <option value="">Most Popular</option>
          </select>
        </div>
      </div>
      <div className="bg-[#EDB84233] flex flex-row gap-2 justify-between p-2 rounded-md text-[#5F6C72] font-[600]">
        <div className="flex flex-row gap-2 items-center">
          <span className="font-[400] whitespace-nowrap">Active Filters:</span>
          <span className="hidden md:flex items-center gap-2">
            Electronics Devices <FaTimes />
          </span>
          <span className="hidden md:flex items-center gap-2">
            5 Star Rating <FaTimes />
          </span>
        </div>
        <div className="whitespace-nowrap">65,867 Results found.</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {serviceItemsdata2.map((t, i) => {
          return (
            <div className="flex flex-col gap-3 border rounded-md">
              <img
                className="h-[12rem] object-cover rounded-md"
                src={t.image}
                alt=""
              />
              <div className="flex flex-col gap-3 p-2">
                <div className="text-[#222325] font-[600]">{t.user}</div>
                <div className="h-16 text-[#222325] font-[400]">{t.name}</div>
                <div className="flex flex-row gap-2 justify-start text-lg items-center text-[#EDB842]">
                  <AiFillStar /> <span>{t.rating}</span>
                  <span className="text-[#A2A6B0] whitespace-nowrap">
                    ({t.totalrating})
                  </span>
                </div>
                <hr />
                <div className="flex flex-row gap-1 justify-between">
                  <button className="bg-[#EDB842] text-white p-2 rounded-md">
                    Access
                  </button>
                  <div className="flex flex-col gap-1 font-[700] text-[#404145]">
                    <span className="text-[#74767E] text-[11px]">
                      STARTING AT
                    </span>
                    <span>
                      $<FormatNumber price={t.pricenow} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-2 items-center text-[#EDB842] self-center my-5">
        <span className="bg-[#EDB84233] p-2 rounded-md">
          <BiSolidLeftArrow />
        </span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">1</span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">2</span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">3</span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">4</span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">5</span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">...</span>
        <span className="bg-[#EDB84233] p-2 rounded-md">
          <BiSolidRightArrow />
        </span>
      </div>
    </div>
  );
};

export default ServiceBody;
