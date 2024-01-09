import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { productImage1 } from "../../../images/products";
import { adminGetUserOrdersAction } from "../../../redux/actions/admin/users.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminGetUserOrder } from "../../../redux/types/users.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const AdminUsersTransactionHistory = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const adminGetUserOrderRedux = useSelector(
    (state: ReducersType) => state?.adminGetUserOrders
  ) as ReduxResponseType<AdminGetUserOrder>;

  const orderData = useMemo(() => {
    return adminGetUserOrderRedux?.serverResponse?.data;
  }, [adminGetUserOrderRedux]);

  useEffect(() => {
    dispatch(adminGetUserOrdersAction(id) as any);
  }, [dispatch, id]);

  // console.log(orderData);
  return (
    <div className="flex flex-col gap-3 overflow-x-hidden">
      {" "}
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl font-[700]">Transaction History</div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
            <BsSearch />
            <input
              className="p-1 outline-none"
              type="text"
              placeholder="Search orders. . ."
            />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-[50rem]">
          <thead className="bg-[#F0F1F3] rounded-md">
            <tr>
              <th className="p-2 text-start text-[#1D1F2C] text-lg">
                Order ID
              </th>
              <th className="text-[#1D1F2C] text-start text-lg">Product</th>
              <th className="text-[#1D1F2C] text-start text-lg">Price</th>
              <th className="text-[#1D1F2C] text-start text-lg">Status</th>
              <th className="text-[#1D1F2C] text-start text-lg">Added</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.ProductOrders && orderData?.ProductOrders.length > 0 ? (
              orderData?.ProductOrders?.map((t, i) => {
                const dateString = t?.createdAt ? t?.createdAt : "";
                let formattedDate: any;
                if (dateString) {
                  const dateObject = new Date(dateString);
                  formattedDate = format(dateObject, "MMMM d, yyyy");
                }
                return (
                  <tr className="border-b" key={i}>
                    <td className="p-2 text-[#A3A9B6]">{t.order_id}</td>
                    <td>
                      <div className="flex flex-col md:flex-row gap-2">
                        <img
                          className="object-contain w-16"
                          src={
                            t?.checkout_items?.image &&
                            t?.checkout_items?.image.length > 0
                              ? t?.checkout_items?.image[0].url
                              : productImage1
                          }
                          alt=""
                        />
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="">
                            {t?.checkout_items?.name?.slice(0, 18)}...
                          </div>
                          <div className="">
                            {t?.checkout_items?.order_quantity} qty
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-[#A3A9B6]">
                      $
                      {t?.checkout_items?.current_price && (
                        <FormatNumber
                          price={t?.checkout_items?.current_price}
                        />
                      )}
                    </td>
                    <td>
                      <div className="p-1 text-[#1A9882] bg-[#E9FAF7] w-fit h-fit rounded-lg">
                        {t?.order_status}
                      </div>
                    </td>
                    <td className="text-[#A3A9B6]">{formattedDate}</td>
                  </tr>
                );
              })
            ) : (
              <div></div>
            )}
            {orderData?.ServiceOrders && orderData?.ServiceOrders.length > 0 ? (
              orderData?.ServiceOrders?.map((t, i) => {
                const dateString = t?.createdAt ? t?.createdAt : "";
                let formattedDate: any;
                if (dateString) {
                  const dateObject = new Date(dateString);
                  formattedDate = format(dateObject, "MMMM d, yyyy");
                }
                return (
                  <tr className="border-b" key={i}>
                    <td className="p-2 text-[#A3A9B6]">{t.order_id}</td>
                    <td>
                      <div className="flex flex-col md:flex-row gap-2">
                        <img
                          className="object-contain w-16"
                          src={
                            t?.checkout_items?.image &&
                            t?.checkout_items?.image.length > 0
                              ? t?.checkout_items?.image[0].url
                              : productImage1
                          }
                          alt=""
                        />
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="">
                            {t?.checkout_items?.name?.slice(0, 18)}...
                          </div>
                          <div className="">
                            {t?.checkout_items?.delivery_time} duration
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-[#A3A9B6]">
                      $
                      {t?.checkout_items?.current_price && (
                        <FormatNumber
                          price={t?.checkout_items?.current_price}
                        />
                      )}
                    </td>
                    <td>
                      <div className="p-1 text-[#1A9882] bg-[#E9FAF7] w-fit h-fit rounded-lg">
                        {t?.order_status}
                      </div>
                    </td>
                    <td className="text-[#A3A9B6]">{formattedDate}</td>
                  </tr>
                );
              })
            ) : (
              <div></div>
            )}
            <div className="">
              {orderData?.ServiceOrders &&
                orderData?.ProductOrders &&
                orderData?.ServiceOrders.length +
                  orderData?.ProductOrders.length <=
                  0 && (
                  <div className="mx-auto font-[600] text-lg text-center w-full">
                    Empty Order
                  </div>
                )}
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersTransactionHistory;
