import { useEffect, useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { BsCart2, BsFillClockFill } from "react-icons/bs";
import { FaIdBadge, FaRegMoneyBillAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin, MdSmartphone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { user4, userBackground } from "../../../images/users";
import { adminGetUserByIdAction } from "../../../redux/actions/admin/users.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { adminUGetUserType } from "../../../redux/types/users.types";
import { FormatNumber } from "../../shareables/FormatNumber";
import AdminUsersTransactionHistory from "./AdminUsersTransactionHistory";

const AdminUserDetailsBody = () => {
  const [status] = useState<string>("Active");

  // fetch data
  const dispatch = useDispatch();
  const { id } = useParams();

  const adminGetUsersRedux = useSelector(
    (state: ReducersType) => state?.adminGetByIdUser
  ) as ReduxResponseType<adminUGetUserType>;

  useEffect(() => {
    dispatch(adminGetUserByIdAction(id as string) as any);
  }, [dispatch, id]);
  const userDetail = adminGetUsersRedux.serverResponse.data;

  return (
    <section>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Users</div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-3 p-3 md:max-w-[19rem] shadow-md w-full">
            <div className="">
              <img
                className="object-cover w-full"
                src={userBackground}
                alt=""
              />
              <img
                className="object-cover mx-auto h-20 -m-10"
                src={
                  userDetail && userDetail.image && userDetail.image.length > 0
                    ? userDetail?.image[0].url
                    : user4
                }
                alt=""
              />
            </div>
            <br />
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="font-[600] text-lg">
                {userDetail.first_name + " " + userDetail.last_name}
              </div>
              <div
                className={`${
                  status === "Active"
                    ? "bg-[#E9FAF7] text-[#1A9882]"
                    : "bg-[#FEECEE] text-[#EB3D4D]"
                } w-fit p-1 mx-auto rounded-md`}
              >
                {status}
              </div>
            </div>
            <hr />
            <div className="flex flex-col justify-start gap-3">
              <div className="flex flex-row gap-2 items-center">
                <div className="bg-[#F0F1F3] p-2 text-[#667085] text-xl rounded-full">
                  <FaIdBadge />
                </div>
                <div className="">
                  <div className="text-[#667085] font-[400] text-sm">
                    Username
                  </div>
                  <div className="text-[#1D1F2C] font-[600]">
                    {userDetail?.username}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="bg-[#F0F1F3] p-2 text-[#667085] text-xl rounded-full">
                  <MdEmail />
                </div>
                <div className="">
                  <div className="text-[#667085] font-[400] text-sm">
                    E-mail
                  </div>
                  <div className="text-[#1D1F2C] font-[600]">
                    {userDetail?.email}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="bg-[#F0F1F3] p-2 text-[#667085] text-xl rounded-full">
                  <MdLocationPin />
                </div>
                <div className="">
                  <div className="text-[#667085] font-[400] text-sm">
                    Address
                  </div>
                  <div className="text-[#1D1F2C] font-[600]">
                    {userDetail?.address}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="bg-[#F0F1F3] p-2 text-[#667085] text-xl rounded-full">
                  <MdSmartphone />
                </div>
                <div className="">
                  <div className="text-[#667085] font-[400] text-sm">
                    Phone Number
                  </div>
                  <div className="text-[#1D1F2C] font-[600]">
                    {userDetail?.phone_number}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="bg-[#F0F1F3] p-2 text-[#667085] text-xl rounded-full">
                  <BsCart2 />
                </div>
                <div className="">
                  <div className="text-[#667085] font-[400] text-sm">Type</div>
                  <div className="text-[#1D1F2C] font-[600] capitalize">
                    {userDetail?.type}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="bg-[#F0F1F3] p-2 text-[#667085] text-xl rounded-full">
                  <BsFillClockFill />
                </div>
                <div className="">
                  <div className="text-[#667085] font-[400] text-sm">
                    Last Online
                  </div>
                  <div className="text-[#1D1F2C] font-[600]">1 Day Ago</div>
                </div>
              </div>
              <div className="flex flex-row w-full gap-2 justify-around">
                <button className="bg-[#4CE13F] text-white p-2 rounded-md">
                  Activate
                </button>
                <button className="bg-[#EDB84233] text-[#EDB842] p-2 rounded-md">
                  Suspend
                </button>
                <button className="bg-[#EA4335] text-white p-2 rounded-md">
                  Block
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 overflow-x-hidden">
            <div className="flex flex-wrap gap-3">
              {/* nos 1 */}
              <div className="flex flex-col gap-3 shadow-md p-5 rounded-xl w-[13rem] md:w-[16rem] max-w-[18rem]">
                <div className="flex justify-between items-center">
                  <span className="font-[400] text-[#777980]">
                    Total Orders
                  </span>{" "}
                  <span className="text-[#F86624] p-2 rounded-full bg-[#FFF0EA]">
                    <BsCart2 />
                  </span>
                </div>
                <div className="text-2xl text-[#1D1F2C] font-[600]">
                  {userDetail?.order_total}
                </div>
                <div className="flex gap-2">
                  <div className="whitespace-nowrap flex gap-1 items-center text-[#1A9882]">
                    1% <BiSolidUpArrow />
                  </div>
                  <div className="font-[400] text-[#858D9D]">
                    +24 this month
                  </div>
                </div>
              </div>
              {/* nos 2 */}
              <div className="flex flex-col gap-3 shadow-md p-5 rounded-xl w-[13rem] md:w-[16rem] max-w-[18rem]">
                <div className="flex justify-between items-center">
                  <span className="font-[400] text-[#777980]">
                    Total Balance
                  </span>{" "}
                  <span className="text-[#EDB842] p-2 rounded-full bg-[#F4ECFB]">
                    <FaRegMoneyBillAlt />
                  </span>
                </div>
                <div className="text-2xl text-[#1D1F2C] font-[600]">
                  $
                  {userDetail?.balance && (
                    <FormatNumber price={userDetail?.balance} />
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="whitespace-nowrap flex gap-1 items-center text-[#1A9882]">
                    10% <BiSolidUpArrow />
                  </div>
                  <div className="font-[400] text-[#858D9D]">+$10 today</div>
                </div>
              </div>
            </div>
            <AdminUsersTransactionHistory id={userDetail?._id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUserDetailsBody;
