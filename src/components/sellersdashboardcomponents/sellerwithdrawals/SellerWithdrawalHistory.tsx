import { BsCalendar3, BsSearch } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
import { MdMoreVert } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import {
  withdrawalDataItem,
  withdrawalDataType,
} from "../../../data/withdrawal";
const SellerWithdrawalHistory = () => {
  const newArray: withdrawalDataType[] = [];

  for (let i = 0; i < 5; i++) {
    newArray.push(...withdrawalDataItem);
  }
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 justify-between items-center">
          <div className="font-[600] text-2xl playfair-display">
            Withdrawal History
          </div>
          <div className="flex justify-center items-center border w-fit p-2 rounded-md">
            <BsSearch />
            <input className="p-1" type="text" placeholder="Search" />
          </div>
          <button className="flex gap-2 items-center p-2 border rounded-md">
            <GrDocumentText />
            <span>Export</span>
          </button>
        </div>
        <div className="w-full border p-3 rounded-md overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="font-[400] text-[#667085] h-full">
                <th className="bg-[#FAFBFB] gap-2 text-start">
                  <input className="mx-2 mt-2" type="checkbox" />
                  <span className="">Payment</span>
                </th>
                <th className="bg-[#FAFBFB] p-2 text-start">Charges</th>
                <th className="bg-[#FAFBFB] p-2 text-start">
                  Total Amount Settled
                </th>
                <th className="bg-[#FAFBFB] p-2 text-start">Status</th>
                <th className="bg-[#FAFBFB] p-2 text-start whitespace-nowrap">
                  Uploaded by
                </th>
              </tr>
            </thead>
            <tbody>
              {newArray.map((t, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div className="flex flex-row gap-2 items-center p-2">
                        <input
                          className="border-[#F0F2F5] border outline-none"
                          type="checkbox"
                        />
                        <div className="">
                          <BsCalendar3 />
                        </div>
                        <div className="">
                          <div className="text-sm font-[600] whitespace-nowrap">
                            {t.date}
                          </div>
                          <div className="text-[#5F6C72] text-sm font-[400] whitespace-nowrap">
                            {t.time}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-[400] text-[#FF8577] p-2">
                      {t.charge}
                    </td>
                    <td className="font-[700] p-2">{t.amount}</td>
                    <td className="flex flex-row gap-1 p-2">
                      <div className="p-1 bg-[#05CD99] text-white rounded-full">
                        <TiTick />
                      </div>
                      <span className="text-[#091E42]">{t.status}</span>
                    </td>
                    <td className="p-2">{t.uploadedby}</td>
                    <td>
                      <MdMoreVert />
                    </td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SellerWithdrawalHistory;
