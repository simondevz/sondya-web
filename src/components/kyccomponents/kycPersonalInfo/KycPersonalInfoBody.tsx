import { AiOutlineArrowRight } from "react-icons/ai";

const KycPersonalInfoBody = () => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col p-3 md:p-10 h-full w-full justify-center items-center my-10">
        <div className="bg-[#EDB84233] flex flex-row p-3 md:p-10 text-center items-center max-w-xl rounded-sm">
          <form className="bg-[#FFFFFF] m-0 w-full py-8 px-3 md:px-6 rounded-md shadow-lg flex flex-col gap-4">
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Personal Infomation
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Fill in the information below
            </div>

            <label className="text-[#191C1F] font-[400] text-left">
              First Name
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="email"
              placeholder="Enter your First Name"
              autoFocus={true}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Last Name
            </label>
            <input
              type="text"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="email"
              placeholder="Enter your Last Name"
              autoFocus={true}
            />
            <label className="text-[#191C1F] font-[400] text-left">
              Gender
            </label>
            <select
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name=""
              id=""
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

            <label className="text-[#191C1F] font-[400] text-left">
              Marital Status
            </label>
            <select
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name=""
              id=""
              required
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
            <label className="text-[#191C1F] font-[400] text-left">
              Date of Birth
            </label>
            <input
              type="date"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="email"
              placeholder="Enter your Date of Birth"
              autoFocus={true}
            />

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

export default KycPersonalInfoBody;
