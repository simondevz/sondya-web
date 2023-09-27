import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { MdDateRange, MdDelete, MdMoreVert } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const AdminWithdrawalOrdersBody = () => {
  const [payment, setPayment] = useState("all");
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto flex gap-3 items-center">
            <AiOutlineArrowLeft />
            {payment === "pending" ? (
              <span>Pending Orders</span>
            ) : payment === "paid" ? (
              <span>Paid Orders</span>
            ) : payment === "declined" ? (
              <span>Declined Orders</span>
            ) : (
              <span>All Orders</span>
            )}
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => setPayment("all")}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              All
            </button>
            <button
              onClick={() => setPayment("paid")}
              className="flex flex-row items-center p-2 rounded-md bg-[#6EE087] text-white gap-2"
            >
              Paid
            </button>
            <button
              onClick={() => setPayment("pending")}
              className="flex flex-row items-center p-2 rounded-md bg-[#BBBBBB] text-white gap-2"
            >
              Pending Orders
            </button>
            <button
              onClick={() => setPayment("declined")}
              className="flex flex-row items-center p-2 rounded-md bg-[#F22424CC] text-white gap-2"
            >
              Declined
            </button>
          </div>
        </div>
        <div className="">
          <WithdrawTable />
        </div>
      </div>
    </section>
  );
};

const WithdrawTable = () => {
  type data1Type = {
    username: string;
    orderId: string;
    product: string;
    quality: number;
    amount: number;
    date: string;
    time: string;
    status: string;
    balance: number;
    accountNumber: string;
    bankName: string;
  };
  const data1: data1Type = {
    username: "Afaq Karim",
    orderId: "#11232",
    product: "Iphone 13 Pro",
    quality: 100,
    amount: 400.0,
    date: "Jun 29,2022",
    time: "12:25PM",
    status: "Complete",
    balance: 234947000,
    accountNumber: "2110963585",
    bankName: "UBA",
  };
  const data2: Array<data1Type> = [];
  for (let index = 0; index < 10; index++) {
    data2.push(data1);
  }

  const [dropDown, setDropDown] = useState<number | undefined>();

  return (
    <div className="w-full p-3 shadow-md m-3 overflow-auto">
      <table className="table-auto w-full">
        <thead className="bg-[#FAFBFB]  rounded-md">
          <tr>
            <th className="p-2 text-start text-[#667085] font-[600] whitespace-nowrap">
              Order Date
            </th>
            <th className="p-2 text-start text-[#667085] font-[600] whitespace-nowrap">
              Sellers Name
            </th>
            <th className="p-2 text-start text-[#667085] font-[600]">
              Account Details
            </th>
            <th className="p-2 text-start text-[#667085] font-[600]">Amount</th>
            <th className="p-2 text-start text-[#667085] font-[600]">
              Balance
            </th>
            <th className="p-2 text-start text-[#667085] font-[600]">Status</th>
            <th className="p-2 text-start text-[#667085] font-[600]">Action</th>
          </tr>
        </thead>
        <tbody>
          {data2.map((t, i) => {
            return (
              <tr>
                <td className="p-3 text-[#292929] whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-[#F5F6F7] rounded-full text-[#7A8699]">
                      <MdDateRange />
                    </span>
                    <div className="flex flex-col gap-1">
                      <div className="font-[600]">{t.date}</div>
                      <div className="font-[400] text-sm text-[#5F6C72]">
                        {t.time}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-[#667085]">{t.username}</td>
                <td className="p-3 text-[#292929]">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-[#F5F6F7] rounded-full text-[#7A8699]">
                      <MdDateRange />
                    </span>
                    <div className="flex flex-col gap-1">
                      <div className="font-[600]">{t.bankName}</div>
                      <div className="font-[400] text-sm text-[#5F6C72]">
                        {t.accountNumber}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap">{t.amount}</td>
                <td className="p-3">{t.balance}</td>
                <td className="p-3">{t.status}</td>
                <td className="">
                  <div className="relative">
                    <span
                      onClick={() => {
                        dropDown === undefined
                          ? setDropDown(i)
                          : setDropDown(undefined);
                      }}
                      className="mx-auto text-[#98A2B3]"
                    >
                      <MdMoreVert />
                    </span>
                    {dropDown === i && (
                      <div className="absolute bg-white -left-28 flex flex-col gap-2 z-20 border px-3 py-2 rounded-lg">
                        <div className="flex gap-3 font-[600] items-center text-[#27C200]">
                          <TiTick />{" "}
                          <span className="whitespace-nowrap">
                            Make Payment
                          </span>
                        </div>
                        <div className="flex gap-3 font-[600] items-center text-[#EDB842]">
                          <FaTimes />
                          <span>Mark Pending</span>
                        </div>
                        <div className="flex gap-3 font-[600] items-center text-[#464D61]">
                          <MdDelete />
                          <span>Decline</span>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row justify-between items-center w-full">
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
  );
};

export default AdminWithdrawalOrdersBody;
