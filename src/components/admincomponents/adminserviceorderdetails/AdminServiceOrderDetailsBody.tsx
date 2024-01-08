import { BiSolidPackage } from "react-icons/bi";
import { FaHandshake, FaUserAlt } from "react-icons/fa";
import { MdEmail, MdPhoneEnabled } from "react-icons/md";
import { PiNotebookLight } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { ImgExample } from "../../../images";
import { trackRod1 } from "../../../images/cart";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { ServiceOrderType } from "../../../redux/types/serviceOrders.types";
import { FormatNumber } from "../../shareables/FormatNumber";
import { TimeLeft } from "../../shareables/dateFormatter";
import { adminGetServiceOrderByIdAction } from "../../../redux/actions/admin/serviceOrder.actions";
import { ADMIN_GET_SERVICE_ORDER_BYID_RESET } from "../../../redux/constants/admin/serviceOrder.constants";

const AdminServiceOrderDetailsBody = () => {
  const [currentOrder, setCurrentOrder] = useState<ServiceOrderType>();
  const dispatch = useDispatch();
  const params = useParams();

  const serviceOrderById = useSelector(
    (state: ReducersType) => state.adminGetServiceOrderById
  ) as ReduxResponseType<ServiceOrderType>;

  // Get service order details
  useEffect(() => {
    setTimeout(() => {
      dispatch(adminGetServiceOrderByIdAction({ id: params.id }) as any);
    }, 500);
  }, [dispatch, params.id]);

  // If get service by id is run setState
  useEffect(() => {
    if (serviceOrderById?.success) {
      setCurrentOrder(serviceOrderById?.serverResponse?.data);
      dispatch({ type: ADMIN_GET_SERVICE_ORDER_BYID_RESET });
    }
  }, [
    dispatch,
    serviceOrderById?.serverResponse?.data,
    serviceOrderById?.success,
    params?.order_id,
  ]);

  return (
    <section className="flex flex-col gap-6 w-full p-3">
      <div className="flex flex-row gap-3">
        <span className="p-2 font-[#1A9882]">Time Left</span>
        <TimeLeft
          utcDateString={currentOrder?.checkout_items?.delivery_time || ""}
          className="p-2 bg-[#E9FAF7] text-[#1A9882] rounded-md"
        />
      </div>
      <div className="w-full overflow-x-auto shadow-md">
        <table className="table-auto w-full">
          <thead className="bg-[#F0F1F3]">
            <tr className="text-[#1D1F2C] font-[600]">
              <th className="py-2 px-3 text-start">Service</th>
              <th className="py-2 px-3 text-start">Order ID</th>
              <th className="py-2 px-3 text-start whitespace-nowrap">
                Duration
              </th>
              <th className="py-2 px-3 text-start">Price</th>
              <th className="py-2 px-3 text-start">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="flex flex-col md:flex-row  gap-4 py-2 px-3 w-56 md:w-auto">
                <img
                  className="w-20 h-20"
                  src={
                    currentOrder?.checkout_items?.image?.[0]?.url || ImgExample
                  }
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <div className="font-[600] text-[#1D1F2C]">
                    {currentOrder?.checkout_items?.name}
                  </div>
                  <div className="font-[400] text-[#667085]">
                    {currentOrder?.checkout_items?.brief_description}
                  </div>
                </div>
              </td>
              <td className="text-[#666666] py-2 px-3">
                {currentOrder?.order_id}
              </td>
              <td className="text-[#666666] py-2 px-3">
                {currentOrder?.checkout_items?.terms?.duration}{" "}
                {currentOrder?.checkout_items?.terms?.durationUnit}
              </td>
              <td className="text-[#666666] py-2 px-3">
                {currentOrder?.checkout_items?.terms?.amount && (
                  <FormatNumber
                    price={currentOrder?.checkout_items?.terms?.amount}
                  />
                )}
              </td>
              <td className="text-[#666666] py-2 px-3">
                {(currentOrder?.checkout_items?.total_price ||
                  currentOrder?.checkout_items?.terms?.amount) && (
                  <FormatNumber
                    price={
                      currentOrder?.checkout_items?.total_price ||
                      currentOrder?.checkout_items?.terms?.amount
                    }
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-around text-lg md:text-xl text-[#191C1F]">
        <div className="flex flex-col items-center">
          <span className="text-[#2DB224]">
            <PiNotebookLight />
          </span>
          <span>Order Placed</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#EDB842]">
            <BiSolidPackage />
          </span>
          <span>Progress</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#EDB842]">
            <FaHandshake />
          </span>
          <span>Delivered</span>
        </div>
      </div>
      <div className="">
        <img
          className="object-cover mx-auto w-[67%] h-2"
          src={trackRod1}
          alt=""
        />
        <div className="w-full flex flex-row justify-around">
          <span className="p-1 bg-[#EDB842] h-fit w-fit rounded-full -mt-4">
            <span
              className={
                (currentOrder?.payment_status === "COMPLETED"
                  ? ""
                  : " invisible ") + "text-white text-xl"
              }
            >
              <TiTick />
            </span>
          </span>
          <span
            className={
              (currentOrder?.payment_status === "COMPLETED"
                ? " bg-[#EDB842] "
                : " bg-white border-[#EDB842] border-2 ") +
              "p-1 h-fit w-fit rounded-full -mt-4"
            }
          >
            <span
              className={
                (currentOrder?.order_status === "DELIVERED"
                  ? ""
                  : " invisible ") + "text-white text-xl"
              }
            >
              <TiTick />
            </span>
          </span>
          <span
            className={
              (currentOrder?.order_status === "DELIVERED"
                ? " bg-[#EDB842] "
                : " bg-white border-[#EDB842] border-2 ") +
              "p-1 h-fit w-fit rounded-full -mt-4"
            }
          >
            <span
              className={
                (currentOrder?.order_status === "COMPLETED"
                  ? ""
                  : " invisible ") + "text-white text-xl"
              }
            >
              <TiTick />
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap text-[0.875rem] justify-around w-full">
        <div className="flex flex-col gap-6 shadow-md p-4 rounded-md w-fit">
          <div className="font-[600]">Vendor</div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <FaUserAlt />
              </span>
              <span>Vendor</span>
            </div>
            <span>{currentOrder?.seller?.username}</span>
          </div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdEmail />
              </span>
              <span>Email</span>
            </div>
            <span>{currentOrder?.seller?.email}</span>
          </div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdPhoneEnabled />
              </span>
              <span>Phone</span>
            </div>
            <span>{currentOrder?.seller?.phone || "Nil"}</span>
          </div>
        </div>
        {/* custommer part */}
        <div className="flex flex-col gap-6 shadow-md p-4 rounded-md w-fit">
          <div className="font-[600]">Customer</div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <FaUserAlt />
              </span>
              <span>Customer</span>
            </div>
            <span>{currentOrder?.buyer?.username}</span>
          </div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdEmail />
              </span>
              <span>Email</span>
            </div>
            <span>{currentOrder?.buyer?.email}</span>
          </div>
          <div className="flex flex-row w-full justify-between gap-6 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdPhoneEnabled />
              </span>
              <span>Phone</span>
            </div>
            <span>{currentOrder?.buyer?.phone || "Nil"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminServiceOrderDetailsBody;
