import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { ProductsItemsdata } from "../../../data/productsItemsData";
import { serviceItemsdata2 } from "../../../data/servicesitemdata";
import { FormatNumber } from "../../shareables/FormatNumber";

const AdminDashboardHero = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 w-full">
          <div className="w-[14rem] flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg max-w-[15rem]">
            <div className="flex flex-col gap-2">
              <div className="font-[400]">Revenue</div>
              <div className="font-[600] text-3xl">$7,825</div>
            </div>
            <div className="w-2/3">
              <SellerLineChart
                colors={"#FF8901"}
                dataArray={[50, 70, 40, 80]}
              />
            </div>
          </div>
          <div className="w-[14rem] flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg max-w-[15rem]">
            <div className="flex flex-col gap-2">
              <div className="font-[400]">Orders</div>
              <div className="font-[600] text-3xl">920</div>
            </div>
            <div className="w-2/3">
              <SellerLineChart colors={"#FF392B"} dataArray={[40, 68, 45]} />
            </div>
          </div>
          <div className="w-[14rem] flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg max-w-[15rem]">
            <div className="flex flex-col gap-2">
              <div className="font-[400]">Visitors</div>
              <div className="font-[600] text-3xl">15.5K</div>
            </div>
            <div className="w-2/3">
              <SellerLineChart
                colors={"#279F51"}
                dataArray={[40, 50, 25, 75]}
              />
            </div>
          </div>
          <div className="w-[14rem] flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg max-w-[15rem]">
            <div className="flex flex-col gap-2">
              <div className="font-[400]">Conversion</div>
              <div className="font-[600] text-3xl">28%</div>
            </div>
            <div className="w-2/3">
              <SellerLineChart
                colors={"#FFA000"}
                dataArray={[40, 45, 25, 75]}
              />
            </div>
          </div>
        </div>
        <div className="p-3 flex flex-wrap gap-3">
          <div className=" w-full md:w-[16rem] flex flex-col gap-1 shadow-md rounded-md p-3 items-center">
            <div className="">Target</div>
            <div className="font-[400] text-[#667085] -mb-12">
              Revenue Target
            </div>
            <HalfDoughnut />
            <div className="w-full text-center font-[400] text-[#667085] -mt-12">
              You succeed earn $240 today, its higher than yesterday
            </div>
            <div className="flex flex-row gap-3">
              <div className="">
                <div className="font-[400] text-[#667085]">Target</div>
                <div className="">$20k</div>
              </div>
              <div className="">
                <div className=" font-[400] text-[#667085]">Revenue</div>
                <div className="">$16k</div>
              </div>
              <div className="">
                <div className=" font-[400] text-[#667085]">Today</div>
                <div className="">$1.5k</div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 flex grow max-w-[50rem] shadow-md rounded-md p-3">
            <SellerLineChartLong />
          </div>
        </div>
        <div className="flex flex-wrap md:flex-nowrap md:flex-row gap-3">
          <div className="flex flex-col gap-3 shadow-md rounded-md p-3 w-full items-center md:w-2/5">
            <div className="text-2xl font-[600]">Revenue by device</div>
            <FullDoughnut />
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="p-1 bg-[#EDB842] w-fit h-fit rounded-full"></div>
                  <div className="">Desktop</div>
                  <div className="">64.2%</div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 bg-[#EDB842] w-fit h-fit rounded-full"></div>
                  <div className="">Mobile</div>
                  <div className="">64.2%</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="p-1 bg-[#EDB842] w-fit h-fit rounded-full"></div>
                  <div className="">Tablet</div>
                  <div className="">64.2%</div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-1 bg-[#EDB842] w-fit h-fit rounded-full"></div>
                  <div className="">Unknown</div>
                  <div className="">64.2%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 shadow-md rounded-md p-3 md:w-3/5">
            <div className="text-[#1C2A53] text-xl font-[500]">Traffic</div>
            <div className="flex flex-row gap-3">
              <div className="flex flex-col gap-2 shadow-lg rounded-lg p-6 w-1/2">
                <div className="flex flex-row gap-2 w-full justify-between">
                  <div className="font-[500] text-[#8E95A9]">Store Visists</div>
                  <div className="font-[700] text-[#279F51]">+ 22%</div>
                </div>
                <div className="text-2xl font-[600] text-[#1C2A53]">8950</div>
              </div>
              <div className="flex flex-col gap-2 shadow-lg rounded-lg p-6 w-1/2">
                <div className="flex flex-row gap-2 w-full justify-between">
                  <div className="font-[500] text-[#8E95A9]">Vistors</div>
                  <div className="font-[700] text-[#EDB842]">- 24%</div>
                </div>
                <div className="text-2xl font-[600] text-[#1C2A53]">1520</div>
              </div>
            </div>
            <div className="">
              <SellerLineChartTraffic />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-3">
          <div className="w-full md:w-1/3 flex flex-col gap-2 shadow-md rounded-md p-3 items-center">
            <div className="">Sales Source</div>
            <FullDoughnutSalesSource />
            <div className="flex gap-2 items-center">
              <div className="p-1 bg-[#EDB842] w-fit h-fit rounded-full"></div>
              <div className="">Official Website</div>
              <div className="">$10,000</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-1 bg-[#EDB842] w-fit h-fit rounded-full"></div>
              <div className="">Offline Store</div>
              <div className="">$10,000</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-1 bg-[#EDB842] w-fit h-fit rounded-full"></div>
              <div className="">Amazon Store</div>
              <div className="">$10,000</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-1 bg-[#EDB842] w-fit h-fit rounded-full"></div>
              <div className="">Reseller</div>
              <div className="">$10,000</div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-2 shadow-md rounded-md p-3">
            <div className="font-[600] text-lg text-[#1D1F2C]">Top Product</div>
            <div className="text-sm text-[#777980] font-[400]">
              Top Product in This Month
            </div>
            {ProductsItemsdata.slice(0, 8).map((t, i) => {
              return (
                <div
                  key={i}
                  className="text-sm flex flex-row justify-between gap-2 items-center"
                >
                  <div className="flex flex-row gap-3">
                    <div className="bg-[#E0E2E7] w-8 h-8 border border-[#E0E2E7] rounded-md">
                      <img
                        className="object-contain w-full h-full"
                        src={t.image}
                        alt=""
                      />
                    </div>
                    <div className="">
                      <div className="">{t.name?.slice(0, 20)}...</div>
                      <div className="text-[#667085] text-[0.8rem]">
                        {t.category}
                      </div>
                    </div>
                  </div>
                  <div className="font-[400] text-[#1D1F2C]">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-2 shadow-md rounded-md p-3">
            <div className="font-[600] text-lg text-[#1D1F2C]">Top Service</div>
            <div className="text-sm text-[#777980] font-[400]">
              Top Service in This Month
            </div>
            {serviceItemsdata2.slice(0, 8).map((t, i) => {
              return (
                <div className="text-sm flex flex-row justify-between gap-2 items-center">
                  <div className="flex flex-row gap-3">
                    <div className="bg-[#E0E2E7] w-8 h-8 border border-[#E0E2E7] rounded-md">
                      <img
                        className="object-contain w-full h-full"
                        src={t.image}
                        alt=""
                      />
                    </div>
                    <div className="">
                      <div className="">{t.name?.slice(0, 20)}...</div>
                      <div className="text-[#667085] text-[0.8rem]">
                        {t.user}
                      </div>
                    </div>
                  </div>
                  <div className="font-[400] text-[#1D1F2C]">
                    $<FormatNumber price={t.pricenow} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const FullDoughnutSalesSource = () => {
  ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Official Website", "Offline Store", "Amazon Store", "Reseller"],
    datasets: [
      {
        label: "# of Votes",
        data: [64.2, 1.3, 48.6, 8.6],
        backgroundColor: ["#FF392B", "#2F80ED", "#00C3F8", "#EDB842"],
        borderColor: ["#FF392B", "#2F80ED", "#00C3F8", "#EDB842"],
        // borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      // tooltip: {
      //   enabled: false,
      // },
    },
    cutout: "85%",
    maintainAspectRatio: true,
    responsive: true,
  };
  return (
    <div className="relative h-[14rem]">
      <Doughnut data={data} options={options} />
      <div className="absolute top-24 left-20 text-2xl font-[700]">75.55%</div>
    </div>
  );
};

export const SellerLineChartTraffic = () => {
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
    labels: ["8", "10", "15", "20", "25"],
    datasets: [
      {
        label: "Revenue",
        data: [65, 59, 70, 61, 56, 51, 69, 71, 69, 52, 56, 71, 67, 53],
        fill: false,
        borderColor: "#EDB842", // Line color
        tension: 0.5, // Adjust this value to control the curve (0 = straight, 1 = highly curved)
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide X-axis grid lines
        },
        // display: true, // Hide X-axis scale
      },
      y: {
        grid: {
          display: true, // Hide Y-axis grid lines
        },
        // display: false, // Hide Y-axis scale
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Jan 16 - Jan 30 store visits chart",
      },
    },
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};
const FullDoughnut = () => {
  ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Desktop", "Table", "Mobile", "Unknown"],
    datasets: [
      {
        label: "# of Votes",
        data: [64.2, 1.3, 48.6, 8.6],
        backgroundColor: ["#FF392B", "#2F80ED", "#00C3F8", "#EDB842"],
        borderColor: ["#FF392B", "#2F80ED", "#00C3F8", "#EDB842"],
        // borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      // tooltip: {
      //   enabled: false,
      // },
    },
    cutout: "70%",
    maintainAspectRatio: true,
    responsive: true,
  };
  return (
    <div className="relative h-[14rem]">
      <Doughnut data={data} options={options} />
      <div className="absolute top-24 left-20 text-2xl font-[700]">75.55%</div>
    </div>
  );
};

const SellerLineChartLong = () => {
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
        label: "Revenue",
        data: [65, 59, 70, 61, 56, 51, 69, 71, 69, 52, 56, 71, 67, 53],
        fill: false,
        borderColor: "#EDB842", // Line color
        tension: 0.8, // Adjust this value to control the curve (0 = straight, 1 = highly curved)
      },
      {
        label: "Sales",
        data: [61, 56, 51, 69, 71, 69, 52, 56, 71, 67, 53, 65, 59, 70],
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
        text: "Revenue and Sales Line Chart",
      },
    },
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

const HalfDoughnut = () => {
  ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Red", "white"],
    datasets: [
      {
        label: "# of Votes",
        data: [75.55, 44],
        backgroundColor: ["#EDB842", "#F0F0F0"],
        borderColor: ["#EDB842", "#F0F0F0"],
        // borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      // tooltip: {
      //   enabled: false,
      // },
    },
    rotation: -90,
    circumference: 180,
    cutout: "70%",
    maintainAspectRatio: true,
    responsive: true,
  };
  return (
    <div className="relative h-[14rem]">
      <Doughnut data={data} options={options} />
      <div className="absolute top-32 left-20 text-2xl font-[700]">75.55%</div>
    </div>
  );
};

export const SellerLineChart = ({ colors, dataArray }: any) => {
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
        // data: [65, 59, 80, 81, 56],
        data: dataArray,
        fill: false,
        // borderColor: "#EDB842", // Line color
        borderColor: colors, // Line color
        tension: 0.4, // Adjust this value to control the curve (0 = straight, 1 = highly curved)
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Hide X-axis scale
      },
      y: {
        display: false, // Hide Y-axis scale
      },
    },
    responsive: true,
    plugins: {
      legend: {
        // position: "top" as const,
        display: false, // Hide legend labels
      },
      title: {
        // display: true,
        // text: "Chart.js Line Chart",
        display: false,
      },
    },
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default AdminDashboardHero;
