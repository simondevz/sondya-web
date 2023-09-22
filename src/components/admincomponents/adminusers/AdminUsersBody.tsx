import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsCalendar2, BsSearch, BsXCircle } from "react-icons/bs";
import { MdOutlineAdd, MdOutlineMoreVert } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { userDataItem } from "../../../data/users";
import { FormatNumber } from "../../shareables/FormatNumber";
import AdminCreateUserModal from "./AdminCreateUserModal";

const AdminUsersBody = () => {
  const [whichTab, setwhichTab] = useState<string>("#1");
  const [click, setClick] = useState<number | null>();

  // React state to control Modal visibility
  const [CreateAccountModal, setCreateAccountModal] = useState(false);
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
            <button
              onClick={() => setCreateAccountModal(true)}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {userDataItem.map((t, i) => {
            return (
              <div
                className="flex flex-col gap-2 text-center shadow-md rounded-md p-3 hover:border border-[#EDB842]"
                key={i}
              >
                <div className="flex flex-row justify-between">
                  <input type="checkbox" name="" id="" />
                  <img className="object-cover" src={t.image} alt="" />
                  <div className="relative">
                    <button
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        click !== i ? setClick(i) : setClick(null);
                      }}
                    >
                      <MdOutlineMoreVert />
                    </button>
                    {click === i && (
                      <div className="absolute top-12 right-9 bg-white border z-10 p-3 rounded-md text-[#464D61] flex flex-col gap-2 shadow-md">
                        <div className="flex gap-4 items-center">
                          <AiOutlineEye />{" "}
                          <span className="whitespace-nowrap">
                            View user Details
                          </span>
                        </div>
                        <div className="flex gap-4 items-center text-[#27C200]">
                          <TiTick />{" "}
                          <span className="whitespace-nowrap">Active</span>
                        </div>
                        <div className="flex gap-4 items-center text-[#FB5B01]">
                          <BsXCircle />{" "}
                          <span className="whitespace-nowrap">pending</span>
                        </div>
                        <div className="flex gap-4 items-center">
                          <AiOutlineEye />{" "}
                          <span className="whitespace-nowrap">Delete User</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-[#1D1F2C] font-[600]">{t.name}</div>
                <div
                  className={`${
                    t.status === "Active"
                      ? "bg-[#E9FAF7] text-[#1A9882]"
                      : "bg-[#FEECEE] text-[#EB3D4D]"
                  } w-fit p-1 mx-auto rounded-md`}
                >
                  {t.status}
                </div>
                <div className="border-b border-dashed"></div>
                <div className="flex flex-row justify-around">
                  <div className="">
                    <div className="text-[#667085] font-[400]">Orders</div>
                    <div className="text-[#1D1F2C] font-[600]">
                      <FormatNumber price={t.orders} />
                    </div>
                  </div>
                  <div className="">
                    <div className="text-[#667085] font-[400]">Balance</div>
                    <div className="text-[#1D1F2C] font-[600]">
                      <FormatNumber price={t.posted} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
        <div className="overflow-y-scroll">
          <AdminCreateUserModal
            showModal={CreateAccountModal}
            handleClose={() => setCreateAccountModal(false)}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminUsersBody;
