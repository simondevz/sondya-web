import { BiMap, BiSolidPackage } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import { PiNotebookLight } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { trackRod1 } from "../../../images/cart";
import { FormatNumber } from "../../shareables/FormatNumber";
import { useEffect, useState } from "react";
import { productImage1 } from "../../../images/products";
import { GetProductOrder } from "../../../redux/types/checkout.types";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userGetProductsOrderByOrderIdAction } from "../../../redux/actions/userDashboard/productsOrder.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { GET_PRODUCTS_ORDERS_RESET } from "../../../redux/constants/userDashboard/productsOrder.constants";

const TrackDetailsBody = () => {
  const [orderDetails, setOrderDetails] = useState<GetProductOrder>();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderRedux = useSelector(
    (state: ReducersType) => state.userGetProductOrderByOrderId
  ) as ReduxResponseType<GetProductOrder>;

  useEffect(() => {
    dispatch({ type: GET_PRODUCTS_ORDERS_RESET });
    setTimeout(() => {
      dispatch(
        userGetProductsOrderByOrderIdAction({
          order_id: params?.order_id,
        }) as any
      );
    }, 1000);
  }, [dispatch, params?.order_id]);

  useEffect(() => {
    if (orderRedux?.success) {
      setOrderDetails(orderRedux?.serverResponse?.data);
    }

    if (orderRedux?.error)
      Swal.fire({
        title: "Error!!",
        text: orderRedux?.error,
        icon: "error",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result?.isConfirmed) navigate(-1);
      });
  }, [
    orderRedux?.error,
    orderRedux?.serverResponse?.data,
    orderRedux?.success,
    navigate,
  ]);

  return (
    <section className="p-1 md:p-5 w-full">
      {orderDetails ? (
        <div className="w-full shadow-md p-2 md:p-3 flex flex-col gap-5">
          <div className="flex flex-row justify-between">
            <div className="playfair-display font-[600] text-2xl">
              Order ID:
              <span className="font-[700]">#{orderDetails?.order_id}</span>
            </div>
            <div className="flex flex-row gap-3">
              <button className="p-2 flex flex-row gap-3 items-center text-[#667085] border rounded-md">
                <span>
                  <MdDocumentScanner />
                </span>
                <span>Invoice</span>
              </button>
              <button className="p-2 flex flex-row gap-3 items-center bg-[#EDB842] text-white rounded-md">
                <span>Track order</span>
                <span>
                  <BiMap />
                </span>
              </button>
            </div>
          </div>
          {/* second */}
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="text-[#667085] font-[400]">Order date:</span>
            <span className="text-[#1D2939] font-[600]">
              {orderDetails?.checkout_items?.track_distance_time
                ?.deliveryDateShipping &&
                orderDetails?.checkout_items?.track_distance_time?.deliveryDateShipping.split(
                  " to "
                )[0]}
            </span>
            <div className="flex flex-row items-center gap-3 text-[#EDB842] font-[600]">
              <BsTruck />
              <span>
                Estimated delivery:{" "}
                {orderDetails?.checkout_items?.track_distance_time
                  ?.deliveryDateShipping &&
                  orderDetails?.checkout_items?.track_distance_time?.deliveryDateShipping.split(
                    " to "
                  )[1]}
              </span>
            </div>
          </div>
          <hr />
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
              <span>Packaging</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#EDB842]">
                <BsTruck />
              </span>
              <span>On The Road</span>
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
              className="object-cover mx-auto w-[75%] h-2"
              src={trackRod1}
              alt=""
            />
            {/* check the design and work with it */}
            <div className="w-full flex flex-row justify-around">
              <span className="p-1 bg-[#EDB842] h-fit w-fit rounded-full -mt-4">
                <span className="text-white text-xl">
                  <TiTick />
                </span>
              </span>
              <span className="p-1 bg-[#EDB842] h-fit w-fit rounded-full -mt-4">
                <span
                  className={
                    (orderDetails.order_status === "Packed" ||
                    orderDetails.order_status === "Shipping" ||
                    orderDetails.order_status === "Delivered" ||
                    orderDetails.order_status === "Completed"
                      ? ""
                      : "invisible ") + "text-white text-xl"
                  }
                >
                  <TiTick />
                </span>
              </span>
              <span
                className={
                  (orderDetails.order_status === "Shipping" ||
                  orderDetails.order_status === "Delivered" ||
                  orderDetails.order_status === "Completed"
                    ? "bg-[#EDB842] "
                    : "border-[#EDB842] bg-white border-2 ") +
                  "p-1 h-fit w-fit rounded-full -mt-4"
                }
              >
                <span
                  className={
                    (orderDetails.order_status === "Delivered" ||
                    orderDetails.order_status === "Completed"
                      ? ""
                      : "invisible ") + "text-white text-xl"
                  }
                >
                  <TiTick />
                </span>
              </span>
              <span
                className={
                  (orderDetails.order_status === "Delivered" ||
                  orderDetails.order_status === "Completed"
                    ? "bg-[#EDB842] "
                    : "border-[#EDB842] bg-white border-2 ") +
                  "p-1 h-fit w-fit rounded-full -mt-4"
                }
              >
                <span
                  className={
                    (orderDetails.order_status === "Completed"
                      ? ""
                      : "invisible ") + "text-white text-xl"
                  }
                >
                  <TiTick />
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-3">
            <div className="flex flex-row items-center gap-3">
              <img
                className="object-cover w-[6rem] h-[6rem] rounded-lg"
                src={
                  orderDetails?.checkout_items?.image?.[0]?.url || productImage1
                }
                alt=""
              />
              <div className="flex flex-row w-full justify-between">
                <div className="">
                  <div className="font-[400] text-[#344054] text-xl">
                    {orderDetails?.checkout_items?.name}
                  </div>
                  {orderDetails?.checkout_items?.selected_variants?.length ? (
                    <div className="flex flex-row gap-2 font-[400] text-[#667085] py-2 h-fit">
                      {orderDetails?.checkout_items?.selected_variants?.map(
                        (variant, index) => {
                          return <span key={index}>{variant[1]}</span>;
                        }
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[#1D2939] font-[600]">
                    $
                    <FormatNumber
                      price={orderDetails?.checkout_items?.total_price}
                    />
                  </div>
                  <div className="font-[400] text-[#667085]">
                    Qty:{orderDetails?.checkout_items?.order_quantity}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex flex-row justify-around p-3">
            <div className="font-[400] text-[#667085] text-sm">
              <div className="font-[600] text-black text-lg">Origin</div>
              <div className="">Address</div>
              <div className="">{orderDetails?.checkout_items?.address}</div>
              <div className="">
                {orderDetails?.checkout_items?.city},{" "}
                {orderDetails?.checkout_items?.country}
              </div>
              <div className="">
                {orderDetails?.checkout_items?.owner?.phone_number}
              </div>
            </div>
            <div className="font-[400] text-[#667085] text-sm">
              <div className="font-[600] text-black text-lg">Destination</div>
              <div className="">Address</div>
              <div className="">
                {orderDetails?.shipping_destination?.address}
              </div>
              <div className="">
                {orderDetails?.shipping_destination?.city},{" "}
                {orderDetails?.shipping_destination?.country}
              </div>
              <div className="">
                {orderDetails?.shipping_destination?.phone_number}
              </div>
            </div>
          </div>
          <hr />
          <div className="flex flex-col justify-between p-3 text-[#667085]">
            <div className="flex flex-row gap-3">
              <span className="p-2 text-[#1D1F2C] font-[600]">
                Current Locations
              </span>
            </div>
            <div className="w-full">
              <table className="table-auto w-full">
                <thead className="bg-[#F0F1F3]">
                  <tr className="text-[#1D1F2C] font-[600]">
                    <th className="py-2 px-3 text-start">Country</th>
                    <th className="py-2 px-3 text-start">State</th>
                    <th className="py-2 px-3 text-start">City</th>
                    <th className="py-2 px-3 text-start">Zip Code</th>
                    <th className="py-2 px-3 text-start">Order status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.order_location?.length ? (
                    orderDetails?.order_location?.map((location, index) => {
                      return (
                        <tr key={index} className="border">
                          <td className="text-[#1D1F2C] py-2 px-3">
                            {location?.country}
                          </td>
                          <td className="text-[#1D1F2C] py-2 px-3">
                            {location?.state}
                          </td>
                          <td className="text-[#1D1F2C] py-2 px-3">
                            {location?.city}
                          </td>
                          <td className="text-[#1D1F2C] py-2 px-3">
                            {location?.zip_code}
                          </td>
                          <td className="text-[#1D1F2C] py-2 px-3">
                            {location?.order_status}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div>No Update in Location Yet</div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <ClipLoader color="#EDB842" className="w-[5rem] mx-auto" />
        </div>
      )}
    </section>
  );
};

export default TrackDetailsBody;
