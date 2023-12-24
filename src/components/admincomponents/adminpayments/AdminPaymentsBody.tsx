import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetPaymentsAction } from "../../../redux/actions/admin/payments.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { OrderPaymentType } from "../../../redux/types/payments.types";
import { FormatNumber } from "../../shareables/FormatNumber";
const AdminPaymentsBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPaymentsRedux = useSelector(
    (state: ReducersType) => state?.adminGetPayments
  ) as ReduxResponseType<OrderPaymentType[]>;

  const paymentsData = useMemo(() => {
    return getPaymentsRedux?.serverResponse?.data;
  }, [getPaymentsRedux]);

  useEffect(() => {
    dispatch(adminGetPaymentsAction("") as any);
  }, [dispatch]);

  console.log(paymentsData);
  return (
    <section className="border">
      <div className="flex flex-row justify-between font-[600] py-3 px-6">
        <span>Order Payments</span>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="bg-[#E4E7E9]">
            <tr className="">
              <th className="py-4 px-6 font-[400] text-[#475156]">
                Payment ID
              </th>
              <th className="py-4 px-6 font-[400] text-[#475156]">
                Payment method
              </th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Status</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Date</th>
              <th className="py-4 px-6 font-[400] text-[#475156]"> Amount</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentsData && paymentsData.length > 0 ? (
              paymentsData.slice(0, 5).map((t, i) => {
                const dateString = t.createdAt ? t.createdAt : "";
                const dateObject = new Date(dateString);
                const formattedDate = format(dateObject, "MMMM d, yyyy");
                return (
                  <tr key={i}>
                    <td className="py-4 px-6 text-[#000000] font-[700] whitespace-nowrap">
                      {t.payment_id}
                    </td>
                    <td className="py-4 px-6 text-[#000000] font-[700] whitespace-nowrap">
                      {t.payment_method}
                    </td>
                    <td
                      className={`${
                        t.payment_status === "IN PROGRESS"
                          ? "text-[#FA8232]"
                          : t.payment_status === "COMPLETED"
                          ? "text-[#2DB224]"
                          : "text-[#EE5858]"
                      } py-4 px-6 font-[600] whitespace-nowrap`}
                    >
                      {t.payment_status}
                    </td>
                    <td className="py-4 px-6 text-[#5F6C72] font-[400] whitespace-nowrap">
                      {formattedDate}
                    </td>
                    <td className="py-4 px-6 text-[#5F6C72] font-[400] whitespace-nowrap">
                      $
                      {t.total_amount && (
                        <FormatNumber price={t.total_amount} />
                      )}
                    </td>
                    <td className="py-4 px-6 font-[600]">
                      <button
                        onClick={() =>
                          navigate(`/admin/payment/details/${t._id}`)
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
              <tr className="w-full">
                <td>NO orders at this time</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminPaymentsBody;
