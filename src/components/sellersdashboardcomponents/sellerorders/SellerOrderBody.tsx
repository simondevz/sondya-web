import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sellerGetProductsOrdersAction } from "../../../redux/actions/seller/seller-orders.actions";
import { ReducersType } from "../../../redux/store";
import { GetProductOrder } from "../../../redux/types/checkout.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const SellerOrderBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductOrdersRedux = useSelector(
    (state: ReducersType) => state?.sellerGetProductsOrders
  ) as ReduxResponseType<GetProductOrder[]>;

  const productOrderData = useMemo(() => {
    return getProductOrdersRedux?.serverResponse?.data;
  }, [getProductOrdersRedux]);

  useEffect(() => {
    dispatch(sellerGetProductsOrdersAction("") as any);
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
              {productOrderData && productOrderData.length > 0 ? (
                productOrderData.map((t, i) => {
                  const dateString = t.createdAt ? t.createdAt : "";
                  const dateObject = new Date(dateString);
                  const formattedDate = format(dateObject, "MMMM d, yyyy");
                  return (
                    <tr key={i}>
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
                        <span className={`w-3 h-3 rounded-full bg-[#2DB224]`}>
                          <div className=""></div>
                        </span>
                        {t.order_status}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                        $
                        {t.checkout_items.total_price && (
                          <FormatNumber
                            price={t?.checkout_items?.total_price}
                          />
                        )}
                      </td>
                      <td className={`flex justify-center  gap-2`}>
                        <div
                          onClick={() =>
                            navigate(`/seller/order/details/${t._id}`)
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

export default SellerOrderBody;
