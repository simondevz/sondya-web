import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { MdMoreVert } from "react-icons/md";
import { Link } from "react-router-dom";
import TransferPaymentModal from "./TransferPaymentModal";

const AdminAccountPaymentBody = () => {
  const [TransferMoneyModal, setTransferMoneyModal] = useState(false);
  return (
    <section>
      <div className="flex flex-col gap-3 md:gap-14">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Account Payment</div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => setTransferMoneyModal(true)}
              className="flex flex-row items-center p-2 rounded-md bg-[#6EE087] text-white gap-2"
            >
              Make Transfer
            </button>
            <Link
              to={"/admin/withdrawal/orders"}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              Withdrawal Orders
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 md:gap-3 justify-around">
          <div className="flex flex-col gap-3 m-1">
            <div className="flex flex-wrap gap-3">
              <div className="p-5 bg-[#6EE087] flex flex-col rounded-lg text-white">
                <div className="font-[600]">Balance</div>
                <div className="font-[700] text-3xl">$45.500,12</div>
                <div className="text-[0.7rem] font-[400]">
                  Monday, 17th September
                </div>
              </div>
              <div className="p-5 bg-[#00000040] flex flex-col rounded-lg text-white">
                <div className="font-[600]">Total Withdrawal</div>
                <div className="font-[700] text-3xl">$45.500,12</div>
                <div className="text-[0.7rem] font-[400]">
                  Monday, 17th September
                </div>
              </div>
              <div className="p-5 bg-[#EDB842] flex flex-col rounded-lg text-white">
                <div className="font-[600]">Pending</div>
                <div className="font-[700] text-3xl">$5.500,12</div>
                <div className="text-[0.7rem] font-[400]">
                  Monday, 17th September
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 md:gap-3 items-center">
              <div className="font-[600] text-xl">Earning Source</div>
              <AdminDoughnutCharts />
            </div>
          </div>
          <div className="shadow-md p-2 flex-grow m-3 flex flex-col gap-1 rounded-lg max-w-[20rem]">
            <div className="flex flex-row justify-around w-full font-[500] text-xl items-center border-b p-2">
              <span>Transfer History</span> <MdMoreVert />
            </div>
            <DepositRow />
            <DepositRow />
            <WithdrawalRow />
            <WithdrawalRow />
          </div>
        </div>
        <AccountTable />
      </div>
      <TransferPaymentModal
        showModal={TransferMoneyModal}
        handleClose={() => setTransferMoneyModal(false)}
      />
    </section>
  );
};

const AccountTable = () => {
  type data1Type = {
    username: string;
    orderId: string;
    product: string;
    quality: number;
    amount: number;
    date: string;
    status: string;
  };
  const data1: data1Type = {
    username: "Afaq Karim",
    orderId: "#11232",
    product: "Iphone 13 Pro",
    quality: 100,
    amount: 400.0,
    date: "Jun 29,2022",
    status: "Complete",
  };
  const data2: Array<data1Type> = [];
  for (let index = 0; index < 10; index++) {
    data2.push(data1);
  }

  return (
    <>
      <div className="w-full p-3 shadow-md m-3 overflow-auto">
        <table className="table-auto w-full">
          <thead className="bg-[#EDB84233] rounded-md">
            <tr>
              <th className="p-2 text-start text-[#1D1F2C] font-[600]">
                Username
              </th>
              <th className="p-2 text-start text-[#1D1F2C] font-[600] whitespace-nowrap">
                Order ID
              </th>
              <th className="p-2 text-start text-[#1D1F2C] font-[600]">
                Product
              </th>
              <th className="p-2 text-start text-[#1D1F2C] font-[600]">
                Quality
              </th>
              <th className="p-2 text-start text-[#1D1F2C] font-[600]">
                Amount
              </th>
              <th className="p-2 text-start text-[#1D1F2C] font-[600]">Date</th>
              <th className="p-2 text-start text-[#1D1F2C] font-[600]">
                Status
              </th>
              <th className="p-2 text-start text-[#1D1F2C] font-[600]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data2.map((t, i) => {
              return (
                <tr>
                  <td className="p-3 text-[#292929] whitespace-nowrap">
                    {t.username}
                  </td>
                  <td className="p-3 text-[#292929] whitespace-nowrap">
                    {t.orderId}
                  </td>
                  <td className="p-3 text-[#292929] whitespace-nowrap">
                    {t.product}
                  </td>
                  <td className="p-3 text-[#292929]">{t.quality}</td>
                  <td className="p-3 text-[#292929]">{t.amount}</td>
                  <td className="p-3 text-[#292929] whitespace-nowrap">
                    {t.date}
                  </td>
                  <td className="p-3 text-[#292929]">
                    <span className="p-1 bg-[#DCFCE7] text-[#16A34A] rounded-lg">
                      {t.status}
                    </span>
                  </td>
                  <td className="">
                    <span className="mx-auto">
                      <MdMoreVert />
                    </span>
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
    </>
  );
};

const DepositRow = () => {
  return (
    <div className="flex flex-row gap-3 items-center w-full justify-between px-4">
      <div className="flex flex-row gap-2 items-center">
        <div className="p-2 text-[#2BC155] text-2xl font-[900]">
          <BsArrowDown />
        </div>
        <div className="">
          <div className="text-xl font-[400]">Deposit</div>
          <div className="text-[0.6rem] text-[#8696A0] font-[400]">
            06:24:45 AM
          </div>
        </div>
      </div>
      <div className="text-[#2BC155]">+$912</div>
    </div>
  );
};
const WithdrawalRow = () => {
  return (
    <div className="flex flex-row gap-3 items-center w-full justify-between px-4">
      <div className="flex flex-row gap-2 items-center">
        <div className="p-2 text-[#FF3E3E] text-2xl font-[900]">
          <BsArrowUp />
        </div>
        <div className="">
          <div className="text-xl font-[400]">Withdraw</div>
          <div className="text-[0.6rem] text-[#8696A0] font-[400]">
            06:24:45 AM
          </div>
        </div>
      </div>
      <div className="text-[#FF3E3E]">+$912</div>
    </div>
  );
};

const AdminDoughnutCharts = () => {
  ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

  const data1 = {
    labels: ["Red", "white"],
    datasets: [
      {
        label: "# of Votes",
        data: [66, 44],
        backgroundColor: ["#EDB842", "#F0F0F0"],
        borderColor: ["#EDB842", "#F0F0F0"],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: ["Red", "white"],
    datasets: [
      {
        label: "# of Votes",
        data: [31, 69],
        backgroundColor: ["#1DC624", "#F0F0F0"],
        borderColor: ["#1DC624", "#F0F0F0"],
        borderWidth: 1,
        cutoutPercentage: 10,
      },
    ],
  };
  const data3 = {
    labels: ["Red", "white"],
    datasets: [
      {
        label: "# of Votes",
        data: [7, 93],
        fill: false,
        backgroundColor: ["#9E9E9E", "#F0F0F0"],
        borderColor: ["#9E9E9E", "#F0F0F0"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Hide legend labels
      },
    },
  };
  return (
    <div className="flex gap-2">
      <div className="h-[9rem] flex flex-col gap-1 text-center">
        <Doughnut data={data1} options={options} />
        <div className="font-[600]">Bank Transfer</div>
        <div className="font-[400]">$10,000</div>
      </div>
      <div className="h-[9rem] flex flex-col gap-1 text-center">
        <Doughnut data={data2} options={options} />
        <div className="font-[600]">Paypal</div>
        <div className="font-[400]">$1500</div>
      </div>
      <div className="h-[9rem] flex flex-col gap-1 text-center">
        <Doughnut data={data3} options={options} />
        <div className="font-[600]">Others</div>
        <div className="font-[400]">$2600</div>
      </div>
    </div>
  );
};

export default AdminAccountPaymentBody;
