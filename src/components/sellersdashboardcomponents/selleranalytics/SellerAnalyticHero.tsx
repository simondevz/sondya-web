import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { IoMdWallet } from "react-icons/io";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { PiMonitorPlayBold } from "react-icons/pi";

const SellerAnalyticHero = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row w-full gap-3">
        <div className="p-2 shadow-md rounded-md w-full md:w-1/2">
          <SellerLineChart />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3 leading-[0.25rem] shadow-md p-4 rounded-xl">
            <div className="flex flex-row justify-between">
              <span className="p-2 bg-[#E8E8E8] rounded-full text-[#EDB842]">
                <BsFillBagCheckFill />
              </span>
              <span className="p-2 bg-[#E8E8E8] rounded-full">
                <MdOutlineMoreHoriz />
              </span>
            </div>
            <div className="text-[#606060] text-sm font-[400]">Total Sales</div>
            <div className="font-[700] text-lg text-[#000] -my-2">
              $86,784.93
            </div>
            <div className="flex flex-row gap-3 items-center text-[#16C098] text-sm">
              <FaArrowTrendUp /> <span>13.02%</span>{" "}
              <span className="text-[#606060]">From Jan</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 leading-[0.25rem] shadow-md p-4 rounded-xl">
            <div className="flex flex-row justify-between">
              <span className="p-2 bg-[#E8E8E8] rounded-full text-[#EDB842]">
                <IoMdWallet />
              </span>
              <span className="p-2 bg-[#E8E8E8] rounded-full">
                <MdOutlineMoreHoriz />
              </span>
            </div>
            <div className="text-[#606060] text-sm font-[400]">
              Avg. Order Value
            </div>
            <div className="font-[700] text-lg text-[#000] -my-2">$234.14</div>
            <div className="flex flex-row gap-3 items-center text-[#16C098] text-sm">
              <FaArrowTrendUp /> <span>3.02%</span>{" "}
              <span className="text-[#606060]">From Jan</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 leading-[0.25rem] shadow-md p-4 rounded-xl">
            <div className="flex flex-row justify-between">
              <span className="p-2 bg-[#E8E8E8] rounded-full text-[#EDB842]">
                <PiMonitorPlayBold />
              </span>
              <span className="p-2 bg-[#E8E8E8] rounded-full">
                <MdOutlineMoreHoriz />
              </span>
            </div>
            <div className="text-[#606060] text-sm font-[400]">
              Online Sessions
            </div>
            <div className="font-[700] text-lg text-[#000] -my-2">$143,422</div>
            <div className="flex flex-row gap-3 items-center text-[#16C098] text-sm">
              <FaArrowTrendUp /> <span>6.02%</span>{" "}
              <span className="text-[#606060]">From Jan</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 leading-[0.25rem] shadow-md p-4 rounded-xl">
            <div className="flex flex-row justify-between">
              <span className="p-2 bg-[#E8E8E8] rounded-full text-[#EDB842]">
                <IoMdWallet />
              </span>
              <span className="p-2 bg-[#E8E8E8] rounded-full">
                <MdOutlineMoreHoriz />
              </span>
            </div>
            <div className="text-[#606060] text-sm font-[400]">
              Conversion Rate
            </div>
            <div className="font-[700] text-lg text-[#000] -my-2">$82.94%</div>
            <div className="flex flex-row gap-3 items-center text-[#FF0000] text-sm">
              <FaArrowTrendDown /> <span>13.02%</span>{" "}
              <span className="text-[#606060]">From Jan</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-3">
        <div className="neumorphic-card p-2 shadow-md rounded-md w-full md:w-1/2">
          <SellerBarChart />
        </div>
        <div className="flex flex-col gap-3 leading-3 shadow-md p-4 rounded-xl w-full md:w-1/2">
          <div className="">Most Sold Items </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <span>Jeans</span>
              <span>70%</span>
            </div>
            <div className="w-full bg-[#E3E7FC] h-4 rounded-md">
              <div className="w-[70%] bg-[#EDB842] h-full rounded-md"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <span>Shirts</span>
              <span>40%</span>
            </div>
            <div className="w-full bg-[#E3E7FC] h-4 rounded-md">
              <div className="w-[40%] bg-[#EDB842] h-full rounded-md"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <span>Belt</span>
              <span>60%</span>
            </div>
            <div className="w-full bg-[#E3E7FC] h-4 rounded-md">
              <div className="w-[60%] bg-[#EDB842] h-full rounded-md"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <span>Caps</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-[#E3E7FC] h-4 rounded-md">
              <div className="w-[80%] bg-[#EDB842] h-full rounded-md"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <span>Others</span>
              <span>20%</span>
            </div>
            <div className="w-full bg-[#E3E7FC] h-4 rounded-md">
              <div className="w-[20%] bg-[#EDB842] h-full rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SellerBarChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 46, 89],
        backgroundColor: "#EDB842",
      },
      {
        label: "Dataset 2",
        data: [30, 50, 75, 90, 30, 20, 70],
        backgroundColor: "#E3E7FC",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};

const SellerLineChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Monthly Sales 1",
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: "#EDB842", // Line color
        tension: 0.4, // Adjust this value to control the curve (0 = straight, 1 = highly curved)
      },
      {
        label: "Monthly Sales 2",
        data: [30, 50, 75, 90, 30],
        fill: false,
        borderColor: "#1A2B88", // Line color
        borderWidth: 3, // Bar border width
        borderDash: [8, 3], // Array of numbers specifying the pattern of dashes and gaps
        tension: 0.4, // Adjust this value to control the curve (0 = straight, 1 = highly curved)
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default SellerAnalyticHero;
