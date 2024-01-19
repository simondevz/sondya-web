import { AiOutlineArrowRight, AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { GetProductOrder } from "../../../redux/types/checkout.types";
import { ServiceOrderType } from "../../../redux/types/serviceOrders.types";
import { useNavigate } from "react-router-dom";

const AdminSalesLatestOrder = ({
  latestProductOrders,
  latestServiceOrders,
}: {
  latestProductOrders: GetProductOrder[];
  latestServiceOrders: ServiceOrderType[];
}) => {
  const navigate = useNavigate();
  return (
    <section className="w-full p-2">
      <div className="flex flex-col gap-3 p-3 shadow-md rounded-md">
        <div className="flex flex-row justify-between">
          <div className="text-[#1C2A53] text-lg font-[600]">
            Latest Product Orders
          </div>
          <div
            onClick={() => navigate("/admin/product/orders?page=1&limit=10")}
            className="flex flex-row gap-3 items-center text-[#1C2A53] text-lg font-[600]"
          >
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
              {latestProductOrders?.length &&
                latestProductOrders.map((t, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-[#555F7E] p-2">{t?.order_id}</td>
                      <td className="text-[#555F7E] p-2">
                        {t?.checkout_items?.name?.slice(0, 20) +
                          (t?.checkout_items?.name?.length > 20 ? "..." : "")}
                      </td>
                      <td className="text-[#555F7E] p-2">
                        {new Date(t.createdAt).toDateString()}
                      </td>
                      <td className="text-[#555F7E] p-2">
                        {t.checkout_items?.owner?.username}
                      </td>
                      <td className="text-[#555F7E] p-2">
                        ${t.checkout_items?.total_price}
                      </td>
                      <td className="text-[#555F7E] p-2">$60.76</td>
                      <td className="text-[#555F7E] p-2">{t.order_status}</td>
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

      <div className="flex flex-col gap-3 p-3 shadow-md rounded-md">
        <div className="flex flex-row justify-between">
          <div className="text-[#1C2A53] text-lg font-[600]">
            Latest Service Orders
          </div>
          <div
            onClick={() => navigate("/admin/service/orders?page=1&limit=10")}
            className="flex flex-row gap-3 items-center text-[#1C2A53] text-lg font-[600]"
          >
            <span className="text-[#555F7E]">More</span>
            <AiOutlineArrowRight />
          </div>
        </div>
        <div className="">
          <table className="w-full table-auto">
            <thead className="bg-[#F8F8F8] rounded-md text-[#8E95A9]">
              <tr>
                <th className="p-2 text-start">Order ID</th>
                <th className="p-2 text-start">Services</th>
                <th className="p-2 text-start">Date</th>
                <th className="p-2 text-start">Customer</th>
                <th className="p-2 text-start">Revenue</th>
                <th className="p-2 text-start">Net Profit</th>
                <th className="p-2 text-start">Status</th>
                <th className="p-2 text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              {latestServiceOrders?.length &&
                latestServiceOrders?.map((t, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-[#555F7E] p-2">{t.order_id}</td>
                      <td className="text-[#555F7E] p-2">
                        {t?.checkout_items?.name?.slice(0, 20) +
                          (t?.checkout_items?.name?.length > 20 ? "..." : "")}
                      </td>
                      <td className="text-[#555F7E] p-2">
                        {" "}
                        {new Date(t.createdAt).toDateString()}
                      </td>
                      <td className="text-[#555F7E] p-2">
                        {t.checkout_items?.owner?.username}
                      </td>
                      <td className="text-[#555F7E] p-2">
                        ${t.checkout_items?.terms?.amount}
                      </td>
                      <td className="text-[#555F7E] p-2">$60.76</td>
                      <td className="text-[#555F7E] p-2">{t.order_status}</td>
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
