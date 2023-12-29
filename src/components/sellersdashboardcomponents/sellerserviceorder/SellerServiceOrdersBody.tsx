import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { FormatNumber } from "../../shareables/FormatNumber";
import { getSellerServiceOrdersAction } from "../../../redux/actions/seller/seller-service-orders.actions";
import { ServiceOrderType } from "../../../redux/types/serviceOrders.types";

const SellerServiceOrderBody = () => {
  const [click, setClick] = useState<string>("");

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

  console.log(serviceOrderData);

  // delete user
  //   const sellerDeleteOrderByIDRedux = useSelector(
  //     (state: ReducersType) => state?.sellerDeleteProductsOrderById
  //   ) as ReduxResponseType<GetProductOrder>;

  //   const handleDelete = useCallback(
  //     (id: string) => {
  //       // console.log(id);
  //       Swal.fire({
  //         title: "Are you sure?",
  //         text: "You won't be able to revert this!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes, delete it!",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           dispatch(sellerDeleteProductsOrderByIdAction({ id }) as any);

  //           if (!sellerDeleteOrderByIDRedux.error) {
  //             Swal.fire(
  //               "Deleted!",
  //               sellerDeleteOrderByIDRedux.serverResponse.message,
  //               "success"
  //             );
  //             setTimeout(() => {
  //               dispatch(sellerGetProductsOrdersAction("") as any);
  //             }, 1000);
  //           } else {
  //             Swal.fire("Deleted!", sellerDeleteOrderByIDRedux?.error, "error");
  //           }
  //         }
  //       });
  //     },
  //     [sellerDeleteOrderByIDRedux, dispatch]
  //   );

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
                      <td
                        className={`flex ${
                          click === t.order_id
                            ? "justify-start"
                            : "justify-center"
                        } relative gap-2`}
                      >
                        {click === t.order_id && (
                          <div className="bg-[#F5F7FA] flex flex-row gap-2 items-center p-2 rounded-md">
                            {" "}
                            <AiOutlineEdit /> <span>Edit</span>
                          </div>
                        )}
                        <button
                          onClick={() => {
                            click === "" ? setClick(t.order_id) : setClick("");
                          }}
                          className="flex rounded-md"
                        >
                          <span
                            className={`p-2 w-fit h-fit ${
                              click === t.order_id &&
                              "text-white bg-[#EDB842] rounded-md"
                            }`}
                          >
                            <MdOutlineMoreHoriz />
                          </span>
                        </button>

                        {click === t.order_id && (
                          <div className="absolute top-12 right-9 bg-white border z-[50] p-3 rounded-md text-[#464D61] flex flex-col gap-2 shadow-md">
                            <div
                              onClick={() =>
                                navigate(
                                  `/seller/service/order/details/${t.order_id}`
                                )
                              }
                              className="flex gap-4 items-center"
                            >
                              <AiOutlineEye />{" "}
                              <span className="whitespace-nowrap">
                                View Order Details
                              </span>
                            </div>
                            <div
                              //   onClick={() => handleDelete(t._id)}
                              className="flex gap-4 items-center"
                            >
                              <AiOutlineEye />{" "}
                              <span className="whitespace-nowrap">Delete</span>
                            </div>
                          </div>
                        )}
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
        <div className="flex flex-row gap-2 items-center text-[#EDB842] self-center my-5">
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
    </section>
  );
};

export default SellerServiceOrderBody;
