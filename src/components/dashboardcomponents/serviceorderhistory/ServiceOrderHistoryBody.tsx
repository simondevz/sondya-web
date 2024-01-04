import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getServiceOrdersAction } from "../../../redux/actions/userDashboard/serviceOrder.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { ServiceOrderType } from "../../../redux/types/serviceOrders.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const ServiceOrderHistoryBody = () => {
  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getServiceOrdersRedux = useSelector(
    (state: ReducersType) => state?.getServiceOrders
  ) as ReduxResponseType<ServiceOrderType[]>;

  const serviceOrderData = useMemo(() => {
    return getServiceOrdersRedux?.serverResponse?.data;
  }, [getServiceOrdersRedux]);

  useEffect(() => {
    dispatch(getServiceOrdersAction() as any);
  }, [dispatch]);

  // console.log(serviceOrderData);
  return (
    <section className="border w-full flex flex-col gap-1">
      <div className="flex flex-row justify-between font-[600] py-3 px-6">
        <span>Recent Order</span>
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
            {serviceOrderData && serviceOrderData.length > 0 ? (
              serviceOrderData.map((t, i) => {
                const dateString = t.createdAt ? t.createdAt : "";
                const dateObject = new Date(dateString);
                const formattedDate = format(dateObject, "MMMM d, yyyy");
                return (
                  <tr key={i}>
                    <td className="py-4 px-6 text-[#000000] font-[700] whitespace-nowrap">
                      {t.order_id}
                    </td>
                    <td
                      className={`${
                        t.order_status === "IN PROGRESS"
                          ? "text-[#FA8232]"
                          : t.order_status === "COMPLETED"
                          ? "text-[#2DB224]"
                          : "text-[#EE5858]"
                      } py-4 px-6 font-[600] whitespace-nowrap`}
                    >
                      {t.order_status}
                    </td>
                    <td className="py-4 px-6 text-[#5F6C72] font-[400] whitespace-nowrap">
                      {formattedDate}
                    </td>
                    <td className="py-4 px-6 text-[#5F6C72] font-[400] whitespace-nowrap">
                      $
                      {(t.checkout_items?.total_price ||
                        t.checkout_items?.terms?.amount) && (
                        <FormatNumber
                          price={
                            t.checkout_items?.total_price ||
                            t.checkout_items?.terms?.amount
                          }
                        />
                      )}
                    </td>
                    <td className="py-4 px-6 font-[600]">
                      <button
                        onClick={() =>
                          navigate(`/user/order/service/details/${t.order_id}`)
                        }
                        className="text-[#EDB842] flex flex-row gap-2 items-center whitespace-nowrap"
                      >
                        <span>View Details</span>
                        <AiOutlineArrowRight />
                      </button>
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
    </section>
  );
};

export default ServiceOrderHistoryBody;
