import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSellerServiceOrdersAction } from "../../../redux/actions/seller/seller-service-orders.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { ServiceOrderType } from "../../../redux/types/serviceOrders.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const SellerServiceOrderBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getServiceOrdersRedux = useSelector(
    (state: ReducersType) => state?.getSellerServiceOrders
  ) as ReduxResponseType<ServiceOrderType[]>;

  const serviceOrderData = useMemo(() => {
    return getServiceOrdersRedux?.serverResponse?.data;
  }, [getServiceOrdersRedux]);

  useEffect(() => {
    dispatch(getSellerServiceOrdersAction() as any);
  }, [dispatch]);

  return (
    <section className="flex flex-row gap-3 p-1">
      <div className="flex flex-col gap-3 shadow-md p-3 rounded-md overflow-x-hidden">
        <div className="font-[700]">Orders</div>
        <div className="w-full overflow-x-scroll">
          <table className="table-auto w-full">
            <thead className="bg-[#EDB84233]">
              <tr>
                <th className="py-4 px-6 font-[400] text-[#292929]">
                  Services
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
            <tbody className="text-[0.875rem]">
              {serviceOrderData && serviceOrderData.length > 0 ? (
                serviceOrderData.map((t, i) => {
                  const dateString = t.createdAt ? t.createdAt : "";
                  const dateObject = new Date(dateString);
                  const formattedDate = format(dateObject, "MMMM d, yyyy");
                  return (
                    <tr className="text-[0.85rem]" key={i}>
                      <td className="py-4 px-6 text-[#292929] font-[700] whitespace-nowrap">
                        {t?.checkout_items?.name}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                        {t?.order_id}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                        {formattedDate}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                        {t.buyer?.username}, {t.buyer?.email}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap flex justify-around items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            t.order_status === "IN PROGRESS"
                              ? "bg-[#FA8232]"
                              : t.order_status === "COMPLETED"
                              ? "bg-[#2DB224]"
                              : "bg-[#EE5858]"
                          }`}
                        >
                          <div className=""></div>
                        </span>
                        {t.order_status}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                        $
                        {(t?.checkout_items?.total_price ||
                          t.checkout_items?.terms?.amount) && (
                          <FormatNumber
                            price={
                              t?.checkout_items?.total_price ||
                              t?.checkout_items?.terms?.amount
                            }
                          />
                        )}
                      </td>
                      <td className={`flex justify-center gap-2`}>
                        <div
                          onClick={() =>
                            navigate(
                              `/seller/service/order/details/${t.order_id}`
                            )
                          }
                          className="flex gap-4 items-center"
                        >
                          <AiOutlineEye />{" "}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className="w-full">NO orders at this time</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SellerServiceOrderBody;
