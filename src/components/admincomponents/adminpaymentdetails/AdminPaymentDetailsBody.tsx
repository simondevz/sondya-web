import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { adminGetPaymentByIdAction } from "../../../redux/actions/admin/payments.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { OrderPaymentType } from "../../../redux/types/payments.types";
import { FormatNumber } from "../../shareables/FormatNumber";
const AdminPaymentDetailsBody = () => {
  // fetch product detail
  const dispatch = useDispatch();
  const params = useParams();

  const id = String(params.id);

  const paymentDetailsRedux = useSelector(
    (state: ReducersType) => state?.adminGetPaymentsById
  ) as ReduxResponseType<OrderPaymentType>;

  const paymentData = useMemo(() => {
    return paymentDetailsRedux?.serverResponse?.data;
  }, [paymentDetailsRedux]);

  useEffect(() => {
    dispatch(adminGetPaymentByIdAction({ id }) as any);
  }, [dispatch, id]);

  // console.log(paymentData);

  const dateString = paymentData?.createdAt ? paymentData?.createdAt : "";
  let formattedDate: any;
  if (dateString) {
    const dateObject = new Date(dateString);
    formattedDate = format(dateObject, "MMMM d, yyyy");
  }

  return (
    <section className="border w-full">
      <div className="flex flex-row justify-center font-[600] py-3 px-6">
        <span>Order Payments Details</span>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="w-full">
            <tr>
              <th className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Title
              </th>
              <th className=" py-2 px-8 font-[600] text-[#475156]">value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Payment ID
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {paymentData?.payment_id}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Paid by
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {paymentData?.buyer?.email},{paymentData?.buyer?.username}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Currency
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {paymentData?.currency}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                items(quantity)
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {paymentData?.checkout_items &&
                paymentData?.checkout_items?.length > 0
                  ? paymentData?.checkout_items?.map((t, i) => {
                      return (
                        <div className="text-[#475156]">
                          {t.name}({t.order_quantity} pcs)
                          {paymentData?.checkout_items?.length === i + 1
                            ? ""
                            : ","}
                        </div>
                      );
                    })
                  : ""}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Payment method
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {paymentData?.payment_method}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Status
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {paymentData?.payment_status}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Date
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {formattedDate}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Amount
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {" "}
                $
                {paymentData?.total_amount && (
                  <FormatNumber price={paymentData?.total_amount} />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminPaymentDetailsBody;
