import { useEffect, useState } from "react";
import {
  BiExport,
  BiSolidLeftArrow,
  BiSolidRightArrow,
  BiSolidUpArrow,
} from "react-icons/bi";
import {
  BsCalendar2,
  BsCart2,
  BsFillClockFill,
  BsSearch,
  BsTrophyFill,
} from "react-icons/bs";
import { FaIdBadge, FaRegMoneyBillAlt } from "react-icons/fa";
import {
  MdEmail,
  MdLocationPin,
  MdOutlineAdd,
  MdSmartphone,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductsItemsdata } from "../../../data/productsItemsData";
import { user4, userBackground } from "../../../images/users";
import { adminGetUserByIdAction } from "../../../redux/actions/admin/users.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { adminUGetUserType } from "../../../redux/types/users.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const AdminUserDetailsBody = () => {
  const [whichTab, setwhichTab] = useState<string>("#1");
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
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2">
              <span className="text-[#EDB842]">
                <BiExport />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Export</span>
            </button>
            <button className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2">
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Create Users</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-row border rounded-md p-1 text-[#667085] gap-2 w-fit overflow-x-auto">
            <button
              onClick={() => setwhichTab("#1")}
              className={` ${
                whichTab === "#1" && "text-[#EDB842] bg-[#EDB84233]"
              } p-2 rounded-md whitespace-nowrap`}
            >
              All Status
            </button>
            <button
              onClick={() => setwhichTab("#2")}
              className={` ${
                whichTab === "#2" && "text-[#EDB842] bg-[#EDB84233]"
              } p-2 rounded-md`}
            >
              Active
            </button>
            <button
              onClick={() => setwhichTab("#3")}
              className={` ${
                whichTab === "#3" && "text-[#EDB842] bg-[#EDB84233]"
              } p-2 rounded-md`}
            >
              Blocked
            </button>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
              <BsSearch />
              <input
                className="p-1"
                type="text"
                placeholder="Search orders. . ."
              />
            </div>
            <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
              <BsCalendar2 />
              <input className="p-1" type="text" placeholder="Search Date" />
            </div>
          </div>
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
                className="object-cover mx-auto -m-10"
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
                    Customer ID
                  </div>
                  <div className="text-[#1D1F2C] font-[600]">ID-011221</div>
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
                    1833 Bel Meadow Drive, Fontana, California 92335, USA
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
                  <div className="text-[#1D1F2C] font-[600]">050 414 8778</div>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="bg-[#F0F1F3] p-2 text-[#667085] text-xl rounded-full">
                  <BsCart2 />
                </div>
                <div className="">
                  <div className="text-[#667085] font-[400] text-sm">
                    Last Transaction
                  </div>
                  <div className="text-[#1D1F2C] font-[600]">
                    12 December 2022
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
                <div className="text-2xl text-[#1D1F2C] font-[600]">2,400</div>
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
                  $100.00
                </div>
                <div className="flex gap-2">
                  <div className="whitespace-nowrap flex gap-1 items-center text-[#1A9882]">
                    10% <BiSolidUpArrow />
                  </div>
                  <div className="font-[400] text-[#858D9D]">+$10 today</div>
                </div>
              </div>
              {/* nos 3 */}
              <div className="flex flex-col gap-3 shadow-md p-5 rounded-xl w-[13rem] md:w-[16rem] max-w-[18rem]">
                <div className="flex justify-between items-center">
                  <span className="font-[400] text-[#777980]">
                    Reward Points
                  </span>{" "}
                  <span className="text-[#22CAAD] p-2 rounded-full bg-[#E9FAF7]">
                    <BsTrophyFill />
                  </span>
                </div>
                <div className="text-2xl text-[#1D1F2C] font-[600]">1,200</div>
                <div className="flex gap-2">
                  <div className="whitespace-nowrap flex gap-1 items-center text-[#1A9882]">
                    10% <BiSolidUpArrow />
                  </div>
                  <div className="font-[400] text-[#858D9D]">+120 today</div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="text-xl font-[700]">Transaction History</div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
                  <BsSearch />
                  <input
                    className="p-1"
                    type="text"
                    placeholder="Search orders. . ."
                  />
                </div>
                <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
                  <BsCalendar2 />
                  <input
                    className="p-1"
                    type="text"
                    placeholder="Search Date"
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
                    <th className="text-[#1D1F2C] text-start text-lg">
                      Product
                    </th>
                    <th className="text-[#1D1F2C] text-start text-lg">Price</th>
                    <th className="text-[#1D1F2C] text-start text-lg">
                      Status
                    </th>
                    <th className="text-[#1D1F2C] text-start text-lg">Added</th>
                  </tr>
                </thead>
                <tbody>
                  {ProductsItemsdata.map((t, i) => {
                    return (
                      <tr className="border-b" key={i}>
                        <td className="p-2 text-[#A3A9B6]">{t.sku}</td>
                        <td>
                          <div className="flex flex-col md:flex-row gap-2">
                            <img
                              className="object-contain w-16"
                              src={t.image}
                              alt=""
                            />
                            <div className="flex flex-col gap-2 text-sm">
                              <div className="">{t.name?.slice(0, 18)}...</div>
                              <div className="">{t.variants} Variants</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-[#A3A9B6]">
                          $<FormatNumber price={t.pricenow} />
                        </td>
                        <td>
                          {t.availablestatus === "Low Stock" ? (
                            <div className="p-1 text-[#F86624] bg-[#FFF0EA] w-fit h-fit rounded-lg">
                              {t.availablestatus}
                            </div>
                          ) : t.availablestatus === "Published" ? (
                            <div className="p-1 text-[#1A9882] bg-[#E9FAF7] w-fit h-fit rounded-lg">
                              {t.availablestatus}
                            </div>
                          ) : t.availablestatus === "Draft" ? (
                            <div className="p-1 text-[#667085] bg-[#F0F1F3] w-fit h-fit rounded-lg">
                              {t.availablestatus}
                            </div>
                          ) : (
                            <div className="p-1 text-[#EB3D4D] bg-[#FEECEE] w-fit h-fit rounded-lg">
                              {t.availablestatus}
                            </div>
                          )}
                        </td>
                        <td className="text-[#A3A9B6]">{t.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="text-[#667085]">Showing 1-10 from 100</div>
              <div className="flex flex-row gap-2 items-center text-[#EDB842] my-5">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUserDetailsBody;
