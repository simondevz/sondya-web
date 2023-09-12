import { useState } from "react";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BsXCircle } from "react-icons/bs";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { recentOrderData } from "../../../data/RecentOrderData";

const SellerLatestOrders = () => {
  const [click, setClick] = useState<string>("");
  return (
    <section className="flex flex-row gap-3 p-1">
      <div className="flex flex-col gap-3 shadow-md p-3 rounded-md overflow-x-hidden">
        <div className="font-[700]">Latest Orders</div>
        <div className="w-full overflow-x-scroll">
          <table className="table-auto w-full">
            <thead className="bg-[#EDB84233]">
              <tr>
                <th className="py-4 px-6 font-[400] text-[#292929]">
                  Products
                </th>
                <th className="py-4 px-6 font-[400] text-[#292929]">
                  Order ID
                </th>
                <th className="py-4 px-6 font-[400] text-[#292929]">Date</th>
                <th className="py-4 px-6 font-[400] text-[#292929]">
                  Customer name
                </th>
                <th className="py-4 px-6 font-[400] text-[#292929]">Status</th>
                <th className="py-4 px-6 font-[400] text-[#292929]">Amount</th>
                <th className="py-4 px-6 font-[400] text-[#292929]">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrderData.slice(0, 5).map((t, i) => {
                return (
                  <tr key={i}>
                    <td className="py-4 px-6 text-[#292929] font-[700] whitespace-nowrap">
                      {t.products}
                    </td>
                    <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                      {t.orderId}
                    </td>
                    <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                      {t.date}
                    </td>
                    <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                      {t.name}
                    </td>
                    <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap flex justify-around items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          t.status === "IN PROGRESS"
                            ? "bg-[#FA8232]"
                            : t.status === "COMPLETED"
                            ? "bg-[#2DB224]"
                            : "bg-[#EE5858]"
                        }`}
                      >
                        <div className=""></div>
                      </span>
                      {t.status}
                    </td>
                    <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                      {t.Total}
                    </td>
                    <td
                      className={`flex ${
                        click === t.orderId ? "justify-start" : "justify-center"
                      } relative gap-2`}
                    >
                      {click === t.orderId && (
                        <div className="bg-[#F5F7FA] flex flex-row gap-2 items-center p-2 rounded-md">
                          {" "}
                          <AiOutlineEdit /> <span>Edit</span>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          click === "" ? setClick(t.orderId) : setClick("");
                        }}
                        className="flex rounded-md"
                      >
                        <span
                          className={`p-2 w-fit h-fit ${
                            click === t.orderId &&
                            "text-white bg-[#EDB842] rounded-md"
                          }`}
                        >
                          <MdOutlineMoreHoriz />
                        </span>
                      </button>

                      {click === t.orderId && (
                        <div className="absolute top-12 right-9 bg-white border z-10 p-3 rounded-md text-[#464D61] flex flex-col gap-2 shadow-md">
                          <div className="flex gap-4 items-center">
                            <AiOutlineEye />{" "}
                            <span className="whitespace-nowrap">
                              View Customer Details
                            </span>
                          </div>
                          <div className="flex gap-4 items-center text-[#27C200]">
                            <TiTick />{" "}
                            <span className="whitespace-nowrap">Accept</span>
                          </div>
                          <div className="flex gap-4 items-center text-[#FB5B01]">
                            <BsXCircle />{" "}
                            <span className="whitespace-nowrap">Suspend</span>
                          </div>
                          <div className="flex gap-4 items-center">
                            <AiOutlineEye />{" "}
                            <span className="whitespace-nowrap">Delete</span>
                          </div>
                        </div>
                      )}
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

export default SellerLatestOrders;
