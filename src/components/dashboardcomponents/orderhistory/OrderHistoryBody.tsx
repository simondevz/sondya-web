import { AiOutlineArrowRight } from "react-icons/ai";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { recentOrderData } from "../../../data/RecentOrderData";

const OrderHistoryBody = () => {
  return (
    <section className="border w-full flex flex-col gap-1">
      <div className="flex flex-row justify-between font-[600] py-3 px-6">
        <span>Recent Order</span>
        <button className="text-[#EDB842] flex flex-row gap-2 items-center">
          <span>View All</span>
          <AiOutlineArrowRight />
        </button>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="bg-[#E4E7E9]">
            <tr className="">
              <th className="py-4 px-6 font-[400] text-[#475156]">Order ID</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Status</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Date</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Total</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((t, i) => {
              return (
                <tr key={i}>
                  <td className="py-4 px-6 text-[#000000] font-[700] whitespace-nowrap">
                    {t.orderId}
                  </td>
                  <td
                    className={`${
                      t.status === "IN PROGRESS"
                        ? "text-[#FA8232]"
                        : t.status === "COMPLETED"
                        ? "text-[#2DB224]"
                        : "text-[#EE5858]"
                    } py-4 px-6 font-[600] whitespace-nowrap`}
                  >
                    {t.status}
                  </td>
                  <td className="py-4 px-6 text-[#5F6C72] font-[400] whitespace-nowrap">
                    {t.date}
                  </td>
                  <td className="py-4 px-6 text-[#5F6C72] font-[400] whitespace-nowrap">
                    {t.Total}
                  </td>
                  <td className="py-4 px-6 font-[600]">
                    <button className="text-[#EDB842] flex flex-row gap-2 items-center whitespace-nowrap">
                      <span>View Details</span>
                      <AiOutlineArrowRight />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
    </section>
  );
};

export default OrderHistoryBody;
