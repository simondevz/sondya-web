import { AiOutlineArrowRight } from "react-icons/ai";
import countryData from "../../../data/countries.json";

const KycContactInfoBody = () => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col p-3 md:p-10 h-full w-full justify-center items-center my-10">
        <div className="bg-[#EDB84233] flex flex-row p-3 md:p-10 text-center items-center max-w-xl rounded-sm">
          <form className="bg-[#FFFFFF] m-0 w-full py-8 px-3 md:px-6 rounded-md shadow-lg flex flex-col gap-4">
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Contact Infomation
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Fill in the information below
            </div>

            <label className="text-[#191C1F] font-[400] text-left">
              Residential Address
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="email"
              placeholder="Enter your Residential Address"
              autoFocus={true}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Phone Number
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="email"
              placeholder="Enter your Phone Number"
              autoFocus={true}
            />
            <label className="text-[#191C1F] font-[400] text-left">City</label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="email"
              placeholder="Enter your City"
              autoFocus={true}
            />
            <label className="text-[#191C1F] font-[400] text-left">State</label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="email"
              placeholder="Enter your State"
              autoFocus={true}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Country
            </label>
            <select
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="country"
              id="country"
              // onChange={onChange}
              required
            >
              {countryData.map((t, i) => {
                return <option value={t.label}>{t.label}</option>;
              })}
            </select>

            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              <span>Continue</span>
              <AiOutlineArrowRight />
            </button>

            <hr />
            <div className="text-[#475156] text-[11px] md:text-[15px]">
              Fill in the required information and click continue to proceed to
              next section
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default KycContactInfoBody;
