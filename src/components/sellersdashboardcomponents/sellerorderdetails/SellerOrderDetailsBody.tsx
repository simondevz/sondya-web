import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { BiSolidTruck } from "react-icons/bi";
import {
  BsBox2Fill,
  BsFillCalendarMinusFill,
  BsFillCreditCard2BackFill,
  BsFillEnvelopeFill,
  BsFillPhoneFill,
  BsTrophyFill,
} from "react-icons/bs";
import { FaFileInvoice, FaReceipt, FaUserAlt } from "react-icons/fa";
import { MdEdit, MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Divider, ImgExample } from "../../../images";
import {
  trackDelivered,
  trackOrderPlaced,
  trackPacked,
  trackProcessing,
  trackShipping,
} from "../../../images/cart";
import { sellerGetProductsOrderByIdAction } from "../../../redux/actions/seller/seller-orders.actions";
import { ReducersType } from "../../../redux/store";
import { GetProductOrder } from "../../../redux/types/checkout.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const SellerOrderDetailsBody = () => {
  // fetch product detail
  const dispatch = useDispatch();
  const params = useParams();

  const id = String(params.id);

  const productOrderDetailsRedux = useSelector(
    (state: ReducersType) => state?.sellerGetProductsOrderByID
  ) as ReduxResponseType<GetProductOrder>;

  const productOrder = useMemo(() => {
    return productOrderDetailsRedux?.serverResponse?.data;
  }, [productOrderDetailsRedux]);

  useEffect(() => {
    dispatch(sellerGetProductsOrderByIdAction({ id }) as any);
  }, [dispatch, id]);

  const dateString = productOrder?.createdAt ? productOrder?.createdAt : "";
  let formattedDate: any;
  if (dateString) {
    const dateObject = new Date(dateString);
    formattedDate = format(dateObject, "MMMM d, yyyy");
  }

  console.log(productOrder);

  return (
    <section className="p-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <div className="font-[600] text-lg">Order Details </div>
          <div className="flex gap-2">
            <button className="flex gap-2 items-center bg-[#EDB842] text-white p-2 rounded-md">
              <MdEdit />
              <span>Update Destination</span>
            </button>
            <button className="flex gap-2 items-center bg-[#EDB842] text-white p-2 rounded-md">
              <MdEdit />
              <span>Update Order status</span>
            </button>
            <button className="flex gap-2 items-center bg-[#EDB842] text-white p-2 rounded-md">
              <FaFileInvoice />
              <span>Invoice</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* box 1 */}
          <div className="flex flex-col w-1/3 gap-3 shadow-md p-4 rounded-lg max-w-[24rem] min-w-[18rem] flex-grow">
            <div className="flex gap-3 items-center justify-between w-full font-[600]">
              <div className="flex gap-3 items-center">
                <span className="text-lg whitespace-nowrap">
                  Order #{productOrder?.order_id}
                </span>
                <span className="p-2 bg-[#EDB84233] text-[#EDB842] rounded-md">
                  {productOrder?.order_status}
                </span>
              </div>
              <span className="text-[#A3A9B6]">
                <MdEdit />
              </span>
            </div>
            <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
              <div className="flex gap-3 items-center">
                <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                  <BsFillCalendarMinusFill />
                </span>
                <span>Added</span>
              </div>
              <div className="">{formattedDate && formattedDate}</div>
            </div>
            <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
              <div className="flex gap-3 items-center">
                <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                  <BsFillCreditCard2BackFill />
                </span>
                <span>Payment Status</span>
              </div>
              <div className="">{productOrder?.payment_status}</div>
            </div>
            <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
              <div className="flex gap-3 items-center">
                <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                  <BiSolidTruck />
                </span>
                <span>Shipping to </span>
              </div>
              <div className="break-words">
                {productOrder?.shipping_destination?.country} ,{" "}
                {productOrder?.shipping_destination?.state} ,{" "}
                {productOrder?.shipping_destination?.city}
              </div>
            </div>
          </div>
          {/* box 2 */}
          <div className="flex flex-col w-1/3 gap-3 shadow-md p-4 rounded-lg max-w-[24rem] min-w-[18rem] flex-grow">
            <div className="flex gap-3 items-center justify-between w-full font-[600]">
              <div className="flex gap-3 items-center text-lg">Customer</div>
            </div>
            <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
              <div className="flex gap-3 items-center">
                <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                  <FaUserAlt />
                </span>
                <span>Customer</span>
              </div>
              <div className="">{productOrder?.buyer?.username}</div>
            </div>
            <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
              <div className="flex gap-3 items-center">
                <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                  <BsFillEnvelopeFill />
                </span>
                <span>Email</span>
              </div>
              <div className="">{productOrder?.buyer?.email}</div>
            </div>
            <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
              <div className="flex gap-3 items-center">
                <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                  <BsFillPhoneFill />
                </span>
                <span>Phone</span>
              </div>
              <div className="">{productOrder?.buyer?.phone_number}</div>
            </div>
          </div>
          {/* box 3 */}
          <div className="flex flex-col w-1/3 gap-3 shadow-md p-4 rounded-lg max-w-[24rem] min-w-[18rem] flex-grow">
            <div className="flex gap-3 items-center justify-between w-full font-[600]">
              <div className="flex gap-3 items-center text-lg">Document</div>
            </div>
            <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
              <div className="flex gap-3 items-center">
                <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                  <FaReceipt />
                </span>
                <span>Invoice</span>
              </div>
              <div className="">INV-32011</div>
            </div>
            <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
              <div className="flex gap-3 items-center">
                <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                  <BsBox2Fill />
                </span>
                <span>Order ID</span>
              </div>
              <div className="">{productOrder?.order_id}</div>
            </div>
            <div className="flex w-full justify-between text-[#1D1F2C] font-[400]">
              <div className="flex gap-3 items-center">
                <span className="text-[#EDB842] p-2 bg-[#F0F1F3] rounded-full">
                  <BsTrophyFill />
                </span>
                <span>Payment Status</span>
              </div>
              <div className="">{productOrder?.payment_status}</div>
            </div>
          </div>
        </div>
        {/* second section */}
        <div className="flex flex-col lg:flex-row gap-3 justify-between">
          <div className="flex flex-col gap-3 shadow-md h-fit flex-grow">
            <div className="flex flex-row gap-3">
              <span className="p-2 font-[#1A9882]">Order List</span>
              <span className="p-2 bg-[#E9FAF7] text-[#1A9882] rounded-md">
                +{productOrder?.checkout_items?.order_quantity} Orders
              </span>
              <button className="flex gap-2 items-center bg-[#EDB842] text-white p-2 rounded-md">
                <MdEdit />
                <span>Update Destination</span>
              </button>
              <button className="flex gap-2 items-center bg-[#EDB842] text-white p-2 rounded-md">
                <MdEdit />
                <span>Update Order status</span>
              </button>
            </div>
            <div className="w-full">
              <table className="table-auto w-full">
                <thead className="bg-[#F0F1F3]">
                  <tr className="text-[#1D1F2C] font-[600]">
                    <th className="py-2 px-3">Product</th>
                    <th className="py-2 px-3">SKU</th>
                    <th className="py-2 px-3">Total qty</th>
                    <th className="py-2 px-3">Price</th>
                    <th className="py-2 px-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td className="flex flex-col md:flex-row  gap-2 py-2 px-3 justify-center">
                      <img
                        className="object-cover w-[80px] h-[80px] rounded-md"
                        src={
                          productOrder?.checkout_items?.image !== undefined &&
                          productOrder?.checkout_items?.image &&
                          productOrder?.checkout_items?.image?.length > 0
                            ? productOrder?.checkout_items?.image[0]?.url
                            : ImgExample
                        }
                        alt=""
                      />
                      <div className="flex flex-col gap-1">
                        <div className="font-[600] text-[#1D1F2C]">
                          {productOrder?.checkout_items?.name}
                        </div>
                        <div className="font-[400] text-[#667085]">Black</div>
                      </div>
                    </td>
                    <td className="text-[#666666] py-2 px-3">
                      {productOrder?.checkout_items?.model}
                    </td>
                    <td className="text-[#666666] py-2 px-3">
                      {productOrder?.checkout_items?.order_quantity} pcs
                    </td>
                    <td className="text-[#666666] py-2 px-3">
                      $
                      {productOrder?.checkout_items?.current_price && (
                        <FormatNumber
                          price={productOrder?.checkout_items?.current_price}
                        />
                      )}
                    </td>
                    <td className="text-[#666666] py-2 px-3">
                      $
                      {productOrder?.checkout_items?.sub_total && (
                        <FormatNumber
                          price={productOrder?.checkout_items?.sub_total}
                        />
                      )}
                    </td>
                  </tr>
                  <tr className="border">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-[#1D1F2C] py-2 px-3">VAT(0)%</td>
                    <td className="text-[#1D1F2C] py-2 px-3">
                      {" "}
                      $
                      {productOrder?.checkout_items?.tax && (
                        <FormatNumber
                          price={productOrder?.checkout_items?.tax}
                        />
                      )}
                    </td>
                  </tr>
                  <tr className="border">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-[#1D1F2C] py-2 px-3">Tax</td>
                    <td className="text-[#1D1F2C] py-2 px-3">
                      {" "}
                      $
                      {productOrder?.checkout_items?.tax && (
                        <FormatNumber
                          price={productOrder?.checkout_items?.tax}
                        />
                      )}
                    </td>
                  </tr>
                  <tr className="border">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-[#1D1F2C] py-2 px-3">Shipping Rate</td>
                    <td className="text-[#1D1F2C] py-2 px-3">
                      {" "}
                      $
                      {productOrder?.checkout_items?.shipping_fee && (
                        <FormatNumber
                          price={productOrder?.checkout_items?.shipping_fee}
                        />
                      )}
                    </td>
                  </tr>
                  <tr className="border">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-[#1D1F2C] py-2 px-3">Total</td>
                    <td className="text-[#1D1F2C] py-2 px-3">
                      {" "}
                      $
                      {productOrder?.checkout_items?.total_price && (
                        <FormatNumber
                          price={productOrder?.checkout_items?.total_price}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {/* address */}
            <div className="flex flex-col gap-3 shadow-md p-4 rounded-md max-w-[20rem]">
              <div className="font-[600]">Address</div>
              <div className="flex flex-row w-full justify-between gap-3 items-center">
                <div className="flex flex-row gap-1 items-center">
                  <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                    <MdLocationOn />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="">Address:</div>
                  <div className="">
                    {productOrder?.shipping_destination?.address}
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full justify-between gap-3 items-center">
                <div className="flex flex-row gap-1 items-center">
                  <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                    <MdLocationOn />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="">Location:</div>
                  <div className="">
                    {productOrder?.shipping_destination?.country},
                    {productOrder?.shipping_destination?.state},
                    {productOrder?.shipping_destination?.city}
                  </div>
                </div>
              </div>
            </div>
            {/* order status starts here */}
            <div className="flex flex-col gap-3 shadow-md p-4 rounded-md w-[20rem] max-w-[20rem]">
              <div className="font-[600]">Order Status</div>
              <div className="flex flex-col w-full gap-0 p-2">
                <div className="flex flex-row gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="p-2 bg-[#EDB84233] rounded-full text-[#EDB842]">
                      <img src={trackOrderPlaced} alt="" />
                    </span>
                    <img
                      className="w-[0.16rem] h-[2.5rem]"
                      src={Divider}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D1F2C] font-[500] text-[16px]">
                      Order Placed
                    </div>
                    <div className="text-[#4A4C56] font-[400] text-[14px]">
                      An order has been placed.
                    </div>
                    <div className="text-[#858D9D] font-[400] text-[12px]">
                      12/12/2022, 03:00
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="p-2 bg-[#EDB84233] rounded-full text-[#EDB842]">
                      <img src={trackProcessing} alt="" />
                    </span>
                    <img
                      className="w-[0.16rem] h-[2rem]"
                      src={Divider}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D1F2C] font-[500] text-[16px]">
                      Processing
                    </div>
                    <div className="text-[#4A4C56] font-[400] text-[14px]">
                      Seller has proccessed your order.
                    </div>
                    <div className="text-[#858D9D] font-[400] text-[12px]">
                      12/12/2022, 03:15
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                      <img src={trackPacked} alt="" />
                    </span>
                    <img
                      className="w-[0.16rem] h-[2rem]"
                      src={Divider}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D1F2C] font-[500] text-[16px]">
                      Packed
                    </div>
                    <div className="text-[#4A4C56] font-[400] text-[14px]">
                      Seller has proccessed your order.
                    </div>
                    <div className="text-[#858D9D] font-[400] text-[12px]">
                      12/12/2022, 03:15
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                      <img src={trackShipping} alt="" />
                    </span>
                    <img
                      className="w-[0.16rem] h-[2rem]"
                      src={Divider}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D1F2C] font-[500] text-[16px]">
                      Shipping
                    </div>
                    <div className="text-[#4A4C56] font-[400] text-[14px]">
                      Seller has proccessed your order.
                    </div>
                    <div className="text-[#858D9D] font-[400] text-[12px]">
                      12/12/2022, 03:15
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                      <img src={trackDelivered} alt="" />
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#1D1F2C] font-[500] text-[16px]">
                      Delivered
                    </div>
                    <div className="text-[#4A4C56] font-[400] text-[14px]">
                      Seller has proccessed your order.
                    </div>
                    <div className="text-[#858D9D] font-[400] text-[12px]">
                      12/12/2022, 03:15
                    </div>
                  </div>
                </div>

                {/* another one? */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerOrderDetailsBody;
