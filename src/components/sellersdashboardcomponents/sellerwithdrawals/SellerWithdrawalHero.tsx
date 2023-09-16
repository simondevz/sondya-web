import { BsSend } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { gtBankPics } from "../../../images/withdrawal";

const SellerWithdrawalHero = () => {
  return (
    <section>
      <div className="flex flex-col gap-5">
        <div className="font-[700] text-[2rem] playfair-display">
          Withdrawal
        </div>
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[400] text-sm w-auto">
            Track and manage customer information and activities. Click transfer
            to send to your persoanl account
          </div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2">
              <span className="text-[#EDB842]">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add account</span>
            </button>
            <button className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2">
              <span>
                <BsSend />
              </span>
              <span>Withdraw</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly gap-4">
          <div className="border p-8 rounded-md w-fit hit-fit text-center">
            <div className="font-[600] text-sm">Total Funds</div>
            <div className="font-[700] text-[2.3rem]">N1,400</div>
          </div>
          <div className="border p-8 rounded-md w-fit hit-fit text-center">
            <div className="font-[600] text-sm">Pending Withdrawal</div>
            <div className="font-[700] text-[2.3rem]">N400,294</div>
          </div>
          <div className="border p-8 rounded-md w-fit hit-fit text-center flex-1 md:max-w-[24rem]">
            <div className="font-[600] text-sm">Completed</div>
            <div className="font-[700] text-[2.3rem]">N1,400,294</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly gap-4">
          <SellerWithdrawalBanks />
          <SellerWithdrawalBanks />
          <SellerWithdrawalBanks />
        </div>
      </div>
    </section>
  );
};

const SellerWithdrawalBanks = () => {
  return (
    <div className="flex flex-row gap-2 border p-2 rounded-md w-full md:w-1/3 md:max-w-[19rem]">
      <div className="w-1/6 mt-2">
        <img
          className="object-cover rounded-full w-[80%]"
          src={gtBankPics}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex flex-row gap-3 justify-between items-center">
          <span className="text-[#1D2939]">UBA</span>{" "}
          <div className="flex flex-row gap-3 items-center">
            <span className="bg-[#EDB84233] p-1 rounded-2xl text-[#EDB842]">
              Primary
            </span>
            <span className="bg-[#FF8577] p-1 text-white rounded-full">
              <TiTick />
            </span>
          </div>
        </div>
        <div className="text-[#5F6C72]">1234567890</div>
        <div className="text-[#5F6C72] -mt-4">Olivia Rhye. GT Bank</div>
        <div className="flex flex-row justify-around">
          <button className="text-[#FF8577]">Delete</button>
          <button className="text-[#5F6C72]">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default SellerWithdrawalHero;
