import { AiOutlineArrowRight, AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { recentOrderData } from "../../../data/RecentOrderData";

const AdminSalesLatestOrder = () => {
  return (
    <section className="w-full p-2">
      <div className="flex flex-col gap-3 p-3 shadow-md rounded-md">
        <div className="flex flex-row justify-between">
          <div className="text-[#1C2A53] text-lg font-[600]">Latest Orders</div>
          <div className="flex flex-row gap-3 items-center text-[#1C2A53] text-lg font-[600]">
            <span className="text-[#555F7E]">More</span>
            <AiOutlineArrowRight />
          </div>
        </div>
        <div className="">
          <table className="w-full table-auto">
            <thead className="bg-[#F8F8F8] rounded-md text-[#8E95A9]">
              <tr>
                <th className="p-2 text-start">Order ID</th>
                <th className="p-2 text-start">Products</th>
                <th className="p-2 text-start">Date</th>
                <th className="p-2 text-start">Customer</th>
                <th className="p-2 text-start">Revenue</th>
                <th className="p-2 text-start">Net Profit</th>
                <th className="p-2 text-start">Status</th>
                <th className="p-2 text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrderData.slice(0, 10).map((t, i) => {
                return (
                  <tr key={i}>
                    <td className="text-[#555F7E] p-2">{t.orderId}</td>
                    <td className="text-[#555F7E] p-2">{t.products}</td>
                    <td className="text-[#555F7E] p-2">{t.date}</td>
                    <td className="text-[#555F7E] p-2">{t.name}</td>
                    <td className="text-[#555F7E] p-2">$253.82</td>
                    <td className="text-[#555F7E] p-2">$60.76</td>
                    <td className="text-[#555F7E] p-2">{t.status}</td>
                    <td className="text-[#555F7E] p-2">
                      <div className="flex flex-row gap-3 items-center">
                        <AiOutlineEdit />
                        <MdDelete />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminSalesLatestOrder;
