import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsCalendar2, BsFillEyeFill, BsSearch } from "react-icons/bs";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetProductsOrdersAction } from "../../../redux/actions/admin/productsOrder.actions";
import { ReducersType } from "../../../redux/store";
import { GetProductOrder } from "../../../redux/types/checkout.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const AdminOrdersBody = () => {
  const [whichTab, setwhichTab] = useState<string>("#1");

  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductOrdersRedux = useSelector(
    (state: ReducersType) => state?.adminGetProductsOrders
  ) as ReduxResponseType<GetProductOrder[]>;

  const productOrderData = useMemo(() => {
    return getProductOrdersRedux?.serverResponse?.data;
  }, [getProductOrdersRedux]);

  useEffect(() => {
    dispatch(adminGetProductsOrdersAction("") as any);
  }, [dispatch]);

  console.log(productOrderData);

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Order</div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2">
              <span className="text-[#EDB842]">
                <BiExport />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Export</span>
            </button>
            <button className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2">
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add Order</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-row border rounded-md p-1 text-[#667085] gap-2 w-fit overflow-x-auto">
            <button
              onClick={() => setwhichTab("#1")}
              className={` ${
                whichTab === "#1" && "text-[#883DCF] bg-[#F4ECFB]"
              } p-2 rounded-md whitespace-nowrap`}
            >
              All Status
            </button>
            <button
              onClick={() => setwhichTab("#2")}
              className={` ${
                whichTab === "#2" && "text-[#883DCF] bg-[#F4ECFB]"
              } p-2 rounded-md`}
            >
              Processing
            </button>
            <button
              onClick={() => setwhichTab("#3")}
              className={` ${
                whichTab === "#3" && "text-[#883DCF] bg-[#F4ECFB]"
              } p-2 rounded-md`}
            >
              Shiped
            </button>
            <button
              onClick={() => setwhichTab("#4")}
              className={` ${
                whichTab === "#4" && "text-[#883DCF] bg-[#F4ECFB]"
              } p-2 rounded-md`}
            >
              Delivered
            </button>
            <button
              onClick={() => setwhichTab("#5")}
              className={` ${
                whichTab === "#5" && "text-[#883DCF] bg-[#F4ECFB]"
              } p-2 rounded-md`}
            >
              Cancelled
            </button>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
              <BsSearch />
              <input
                className="p-1"
                type="text"
                placeholder="Search orders. . ."
              />
            </div>
            <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
              <BsCalendar2 />
              <input className="p-1" type="text" placeholder="Search Date" />
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-[#1D1F2C] text-start">Product</th>
                <th className="text-[#1D1F2C] text-start">Total products</th>
                <th className="text-[#1D1F2C] text-start">Total Price</th>
                <th className="text-[#1D1F2C] text-start">Order Status</th>
                <th className="text-[#1D1F2C] text-start">Added</th>
                <th className="text-[#1D1F2C] text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {productOrderData && productOrderData.length > 0
                ? productOrderData.map((t, i) => {
                    const dateString = t.createdAt ? t.createdAt : "";
                    const dateObject = new Date(dateString);
                    const formattedDate = format(dateObject, "MMMM d, yyyy");
                    return (
                      <tr key={i}>
                        <td>
                          <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex flex-col gap-2 text-sm">
                              {t?.checkout_items?.name}
                            </div>
                          </div>
                        </td>
                        <td className="text-[#A3A9B6]">
                          {t?.checkout_items?.order_quantity}
                        </td>
                        <td className="text-[#A3A9B6]">
                          {}
                          $
                          <FormatNumber
                            price={t?.checkout_items?.total_price}
                          />
                        </td>
                        <td>
                          {t.order_status === "Low Stock" ? (
                            <div className="p-1 text-[#F86624] bg-[#FFF0EA] w-fit h-fit rounded-lg">
                              {t.order_status}
                            </div>
                          ) : t.order_status === "Published" ? (
                            <div className="p-1 text-[#1A9882] bg-[#E9FAF7] w-fit h-fit rounded-lg">
                              {t.order_status}
                            </div>
                          ) : t.order_status === "Draft" ? (
                            <div className="p-1 text-[#667085] bg-[#F0F1F3] w-fit h-fit rounded-lg">
                              {t.order_status}
                            </div>
                          ) : (
                            <div className="p-1 text-[#EB3D4D] bg-[#FEECEE] w-fit h-fit rounded-lg">
                              {t.order_status}
                            </div>
                          )}
                        </td>
                        <td className="text-[#A3A9B6]">{formattedDate}</td>
                        <td>
                          <div className="flex flex-row gap-2 items-center text-[#A3A9B6]">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/admin/order/details/${t._id}`)
                              }
                            >
                              <BsFillEyeFill />
                            </button>
                            <button>
                              <MdDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-[#667085]">Showing 1-10 from 100</div>
          <div className="flex flex-row gap-2 items-center text-[#EDB842] my-5">
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
      </div>
    </section>
  );
};

export default AdminOrdersBody;
