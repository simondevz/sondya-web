import { BiSolidPackage } from "react-icons/bi";
import { FaHandshake, FaUserAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhoneEnabled } from "react-icons/md";
import { PiNotebookLight } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { ImgExample } from "../../../images";
import { trackRod1 } from "../../../images/cart";
import ReviewTerms from "../../shareables/reviewTerms";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getServiceOrderByIdAction } from "../../../redux/actions/userDashboard/serviceOrder.actions";
import { GET_SERVICE_ORDER_BYID_RESET } from "../../../redux/constants/userDashboard/serviceOrder.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { ServiceOrderType } from "../../../redux/types/serviceOrders.types";
import { ServiceDetailsChat } from "../../servicesdetails/ServiceDetailsBody";
// import { ServiceDetailsChat } from "../../servicesdetails/ServiceDetailsBody";

const SellerServiceOrderDetailsBody = () => {
  const [currentOrder, setCurrentOrder] = useState<ServiceOrderType>();
  const dispatch = useDispatch();
  const params = useParams();

  const serviceOrderById = useSelector(
    (state: ReducersType) => state.getServiceOrderById
  ) as ReduxResponseType<ServiceOrderType>;

  // Get service order details
  useEffect(() => {
    if (!currentOrder?._id) {
      dispatch(
        getServiceOrderByIdAction({ order_id: params?.order_id || "" }) as any
      );
    }
  }, [dispatch, params?.order_id, currentOrder?._id]);

  // If get service by id is run setState
  useEffect(() => {
    if (serviceOrderById?.success) {
      setCurrentOrder(serviceOrderById?.serverResponse?.data);
      dispatch({ type: GET_SERVICE_ORDER_BYID_RESET });
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
        <span className="p-2 font-[#1A9882]">Order List</span>
        <span className="p-2 bg-[#E9FAF7] text-[#1A9882] rounded-md">
          +2 Orders
        </span>
      </div>
      <div className="w-full overflow-x-auto shadow-md">
        <table className="table-auto w-full">
          <thead className="bg-[#F0F1F3]">
            <tr className="text-[#1D1F2C] font-[600]">
              <th className="py-2 px-3 text-start">Service</th>
              <th className="py-2 px-3 text-start">SKU</th>
              <th className="py-2 px-3 text-start whitespace-nowrap">
                Total qty
              </th>
              <th className="py-2 px-3 text-start">Price</th>
              <th className="py-2 px-3 text-start">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="flex flex-col md:flex-row  gap-2 py-2 px-3 justify-center w-56 md:w-auto">
                <img className="w-20 h-20" src={ImgExample} alt="" />
                <div className="flex flex-col gap-1">
                  <div className="font-[600] text-[#1D1F2C]">Web Design</div>
                  <div className="font-[400] text-[#667085]">
                    Package includes Only Laptop-scenes Includes, Background
                    Music,Logo, and 720HD Video
                  </div>
                </div>
              </td>
              <td className="text-[#666666] py-2 px-3">302011</td>
              <td className="text-[#666666] py-2 px-3">1 pcs</td>
              <td className="text-[#666666] py-2 px-3">$121.00</td>
              <td className="text-[#666666] py-2 px-3">$121.00</td>
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
            <span className="text-white text-xl">
              <TiTick />
            </span>
          </span>
          <span className="p-1 bg-[#EDB842] h-fit w-fit rounded-full -mt-4">
            <span className="text-white text-xl invisible">
              <TiTick />
            </span>
          </span>
          <span className="p-1 border-[#EDB842] bg-white border-2 h-fit w-fit rounded-full -mt-4">
            <span className="text-white text-xl invisible">
              <TiTick />
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-between w-full">
        <div className="flex flex-col gap-3 shadow-md p-4 rounded-md max-w-[20rem]">
          <div className="font-[600]">Vendor</div>
          <div className="flex flex-row w-full justify-between gap-3 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <FaUserAlt />
              </span>
              <span>Vendor</span>
            </div>
            <span>Josh Adam</span>
          </div>
          <div className="flex flex-row w-full justify-between gap-3 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdEmail />
              </span>
              <span>Email</span>
            </div>
            <span>joshadam@mail.com</span>
          </div>
          <div className="flex flex-row w-full justify-between gap-3 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdPhoneEnabled />
              </span>
              <span>Phone</span>
            </div>
            <span>909 427 2910</span>
          </div>
        </div>
        {/* address part */}
        <div className="flex flex-col gap-3 shadow-md p-4 rounded-md max-w-[20rem]">
          <div className="font-[600]">Address</div>
          <div className="flex flex-row w-full justify-between gap-3 items-center">
            <div className="flex flex-row gap-1 items-center">
              <span className="p-2 bg-[#F0F1F3] rounded-full text-[#EDB842]">
                <MdLocationOn />
              </span>
              <div className="flex flex-col gap-1">
                <div className="">Billing Address:</div>
                <div className="">
                  1833 Bel Meadow Drive, Fontana, California 92335, USA
                </div>
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
              <div className="">Shipping Address:</div>
              <div className="">
                1833 Bel Meadow Drive, Fontana, California 92335, USA
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewTerms
        setCurrentOrder={setCurrentOrder}
        currentOrder={currentOrder}
      />
      {/* the owner_id is the id of the person recieving the messages. */}
      {/* In this particular case the person recieving the messages will be the buyer since it is the seller that will be sending the messages */}
      {/* The componenet was originally made for the customer to contact the seller without leaving the details page hence the variable name "owner_id" */}
      <ServiceDetailsChat
        owner_id={currentOrder?.buyer?.id || ""}
        service_id={currentOrder?.service_id || ""}
      />
    </section>
  );
};

export default SellerServiceOrderDetailsBody;
