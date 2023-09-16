import { BsSearch } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
const SellerWithdrawalHistory = () => {
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
        <div className="w-full border p-3 rounded-md">
          <table className="table-auto w-full">
            <thead>
              <tr className="font-[400] text-[#667085] ">
                <th className="flex items-center gap-2 bg-[#FAFBFB] p-2">
                  <input type="checkbox" />
                  Payment
                </th>
                <th className="bg-[#FAFBFB] p-2">Charges</th>
                <th className="bg-[#FAFBFB] p-2">Total Amount Settled</th>
                <th className="bg-[#FAFBFB] p-2">Status</th>
                <th className="bg-[#FAFBFB] p-2">Uploaded by</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SellerWithdrawalHistory;
