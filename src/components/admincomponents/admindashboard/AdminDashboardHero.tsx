import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ProductsItemsdata } from "../../../data/productsItemsData";
import { serviceItemsdata2 } from "../../../data/servicesitemdata";
import { FormatNumber } from "../../shareables/FormatNumber";
import { google } from "googleapis";
import { useEffect } from "react";

const AdminDashboardHero = () => {

// const scopes = "https://www.googleapis.com/auth/analytics.readonly";


// const jwt = new google.auth.JWT(
//   process.env.GA4_CLIENT_EMAIL,
//   undefined,
//   process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//   scopes
// );
// const view_id = "6635838970";

// useEffect(() => {
//   async function getViews(){
//     try {
//       await jwt.authorize();
//       google.analytics.
  
//       const response = await google.analytics("v4").data.ga.get({
//         auth: jwt,
//         ids: "ga:" + view_id,
//         "start-date": "30daysAgo",
//         "end-date": "today",
//         metrics: "ga:pageviews",
//       });
  
//       console.log(response);
  
//     } catch (err) {
//        console.log(err);
//     }
//   };
// })
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
        <div className="w-full flex flex-col gap-3 rounded-md p-3">
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
          <div className=""></div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-3">
          <div className="w-full md:w-1/2 flex flex-col gap-2 shadow-md rounded-md p-3">
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
          <div className="w-full md:w-1/2 flex flex-col gap-2 shadow-md rounded-md p-3">
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
