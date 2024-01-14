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
import { useEffect, useMemo } from "react";
import { Bar, Line } from "react-chartjs-2";
import { BsFillBagCheckFill } from "react-icons/bs";
import { IoMdWallet } from "react-icons/io";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { PiMonitorPlayBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { sellerGetAnalysisAction } from "../../../redux/actions/seller/seller-analysis.actions";
import { ReducersType } from "../../../redux/store";
import {
  GraphDataType,
  SellerAnalysisReportType,
} from "../../../redux/types/analysis.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { SortSellerAnalysisData } from "../../../utils/sortAnalysisData";
import { FormatNumber } from "../../shareables/FormatNumber";

const SellerAnalyticHero = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // for seller analysis
  const getSellerAnalysisRedux = useSelector(
    (state: ReducersType) => state?.sellerGetAnalysis
  ) as ReduxResponseType<SellerAnalysisReportType>;

  const analysisData = useMemo(() => {
    return getSellerAnalysisRedux?.serverResponse?.data;
  }, [getSellerAnalysisRedux]);

  useEffect(() => {
    dispatch(sellerGetAnalysisAction() as any);
  }, [dispatch]);

  // analyse graph data to fit use case;
  const GraphData: GraphDataType[] = useMemo(() => {
    return SortSellerAnalysisData(analysisData);
  }, [analysisData]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row w-full gap-3">
        <div className="p-2 shadow-md rounded-md w-full md:w-1/2">
          <SellerLineChart analysisData={GraphData} />
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
            <div className="text-[#606060] text-sm font-[400]">
              Total Prod Sales
            </div>
            <div className="font-[700] text-lg text-[#000] -my-2">
              $
              {analysisData?.total_product_sales_amount && (
                <FormatNumber
                  price={analysisData?.total_product_sales_amount}
                />
              )}
            </div>
            <div className="flex flex-row gap-3 items-center text-[#16C098] text-sm">
              <span className="text-[#606060]">For Last 12 months</span>
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
              Avg. Prod Sales
            </div>
            <div className="font-[700] text-lg text-[#000] -my-2">
              $
              {analysisData?.avg_total_product_sales_amount && (
                <FormatNumber
                  price={analysisData?.avg_total_product_sales_amount}
                />
              )}
            </div>
            <div className="flex flex-row gap-3 items-center text-[#16C098] text-sm">
              <span className="text-[#606060]">For Last 12 months</span>
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
              Total Serv Sales
            </div>
            <div className="font-[700] text-lg text-[#000] -my-2">
              $
              {analysisData?.total_service_sales_amount && (
                <FormatNumber
                  price={analysisData?.total_service_sales_amount}
                />
              )}
            </div>
            <div className="flex flex-row gap-3 items-center text-[#16C098] text-sm">
              <span className="text-[#606060]">For Last 12 months</span>
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
              Avg Serv Sales
            </div>
            <div className="font-[700] text-lg text-[#000] -my-2">
              {" "}
              $
              {analysisData?.avg_total_service_sales_amount && (
                <FormatNumber
                  price={analysisData?.avg_total_service_sales_amount}
                />
              )}
            </div>
            <div className="flex flex-row gap-3 items-center text-[#FF0000] text-sm">
              <span className="text-[#606060]">For Last 12 months</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-3">
        <div className="neumorphic-card p-2 shadow-md rounded-md w-full md:w-1/2">
          <SellerBarChart analysisData={GraphData} />
        </div>
        <div className="flex flex-col gap-3 leading-3 shadow-md p-4 rounded-xl w-full md:w-1/2">
          <div className="">Most Sold Items </div>
          {analysisData?.most_sold_items &&
          analysisData?.most_sold_items?.length > 0 ? (
            analysisData?.most_sold_items.map((t, i) => {
              const pct = t?.percentageCount + "%";
              const elementStyle = {
                width: pct, // Set the width in pixels or any other valid CSS unit
              };
              return (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex flex-row justify-between">
                    <span>{t._id.name}</span>
                    <span>{t.percentageCount}%</span>
                  </div>
                  <div className="w-full bg-[#E3E7FC] h-4 rounded-md">
                    <div
                      style={elementStyle}
                      className="bg-[#EDB842] h-full rounded-md"
                    ></div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Products sold in the last One year</div>
          )}
        </div>
      </div>
    </section>
  );
};

const SellerBarChart = ({ analysisData }: any) => {
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

  const productData: number[] = [];
  const serviceData: number[] = [];
  const labels: string[] = [];

  if (analysisData && analysisData?.length > 0)
    analysisData.forEach((item: GraphDataType) => {
      labels.push(item._id.month);
      productData.push(item.ProductTotalAmount);
      serviceData.push(item.ServiceTotalAmount);
    });

  const data = {
    labels,
    datasets: [
      {
        label: "Product data",
        data: productData,
        backgroundColor: "#EDB842",
      },
      {
        label: "Service Data",
        data: serviceData,
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

const SellerLineChart = ({ analysisData }: any) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const productData: number[] = [];
  const serviceData: number[] = [];
  const labels: string[] = [];

  if (analysisData && analysisData?.length > 0)
    analysisData.forEach((item: GraphDataType) => {
      labels.push(item._id.month);
      productData.push(item.ProductTotalAmount);
      serviceData.push(item.ServiceTotalAmount);
    });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Monthly Sales 1",
        data: productData,
        fill: false,
        borderColor: "#EDB842", // Line color
        tension: 0.4, // Adjust this value to control the curve (0 = straight, 1 = highly curved)
      },
      {
        label: "Monthly Sales 2",
        data: serviceData,
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
