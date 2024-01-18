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
import { FormatNumber } from "../../shareables/FormatNumber";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  adminAnalytictsTopProductsAction,
  adminAnalytictsTopServicesAction,
  adminAnalytictsLatestProductOrdersAction,
  adminAnalytictsLatestServiceOrdersAction,
  adminAnalyticsRevenuAndOrderAction,
} from "../../../redux/actions/admin/analytics.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import {
  ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_RESET,
  ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_RESET,
  ADMIN_ANALYTICS_REVENUE_AND_ORDER_RESET,
  ADMIN_ANALYTICS_TOPPRODUCTS_RESET,
  ADMIN_ANALYTICS_TOPSERVICES_RESET,
} from "../../../redux/constants/admin/analytics.constatnts";
import {
  OrdersAnalyticsType,
  RevenueAnalyticsType,
  TopProductsType,
  TopServiceType,
} from "../../../redux/types/admin_analytics.types";
import { productImage1 } from "../../../images/products";
import { GetProductOrder } from "../../../redux/types/checkout.types";
import { ServiceOrderType } from "../../../redux/types/serviceOrders.types";
import AdminSalesLatestOrder from "./AdminSalesLatestOrder";

const AdminDashboardHero = () => {
  const dispatch = useDispatch();

  // Fetch data from backend
  useEffect(() => {
    dispatch(adminAnalytictsTopProductsAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminAnalytictsTopServicesAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminAnalytictsLatestProductOrdersAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminAnalytictsLatestServiceOrdersAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminAnalyticsRevenuAndOrderAction() as any);
  }, [dispatch]);

  //  the redux state
  const revenueAndOrderAnalyticsRedux = useSelector(
    (state: ReducersType) => state.adminAnalyticsRevenueAndOrder
  ) as ReduxResponseType<{
    revenueAnalytics: RevenueAnalyticsType;
    ordersAnalytics: OrdersAnalyticsType;
  }>;

  const latestProductOrdersRedux = useSelector(
    (state: ReducersType) => state.adminAnalytictsLatestProductOrders
  ) as ReduxResponseType<GetProductOrder[]>;
  const latestServiceOrdersRedux = useSelector(
    (state: ReducersType) => state.adminAnalytictsLatestServiceOrders
  ) as ReduxResponseType<ServiceOrderType[]>;

  const topProductsRedux = useSelector(
    (state: ReducersType) => state.adminAnalytictsTopProducts
  ) as ReduxResponseType<TopProductsType[]>;
  const topservicesRedux = useSelector(
    (state: ReducersType) => state.adminAnalytictsTopServices
  ) as ReduxResponseType<TopServiceType[]>;

  // Set the state and reset the redux state
  const [revenueAnalytics, setRevenueAnalytics] =
    useState<RevenueAnalyticsType>();
  const [latestProductOrders, setLatestProductOrders] = useState<
    GetProductOrder[]
  >([]);
  const [latestServiceOrders, setLatestServiceOrders] = useState<
    ServiceOrderType[]
  >([]);

  const [orderAnalytics, setOrderAnalytics] = useState<OrdersAnalyticsType>();
  const [topProducts, setTopProducts] = useState<TopProductsType[]>([]);
  const [topservices, setTopservices] = useState<TopServiceType[]>([]);

  useEffect(() => {
    if (topProductsRedux.success) {
      setTopProducts(topProductsRedux?.serverResponse?.data);
      dispatch({ type: ADMIN_ANALYTICS_TOPPRODUCTS_RESET });
    }
  }, [
    dispatch,
    topProductsRedux?.serverResponse?.data,
    topProductsRedux.success,
  ]);

  useEffect(() => {
    if (topservicesRedux.success) {
      setTopservices(topservicesRedux?.serverResponse?.data);
      dispatch({ type: ADMIN_ANALYTICS_TOPSERVICES_RESET });
    }
  }, [
    dispatch,
    topservicesRedux?.serverResponse?.data,
    topservicesRedux.success,
  ]);

  useEffect(() => {
    if (latestProductOrdersRedux.success) {
      setLatestProductOrders(latestProductOrdersRedux?.serverResponse?.data);
      dispatch({ type: ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_RESET });
    }
  }, [
    dispatch,
    latestProductOrdersRedux?.serverResponse?.data,
    latestProductOrdersRedux.success,
  ]);

  useEffect(() => {
    if (latestServiceOrdersRedux.success) {
      setLatestServiceOrders(latestServiceOrdersRedux?.serverResponse?.data);
      dispatch({ type: ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_RESET });
    }
  }, [
    dispatch,
    latestServiceOrdersRedux?.serverResponse?.data,
    latestServiceOrdersRedux.success,
  ]);

  useEffect(() => {
    if (revenueAndOrderAnalyticsRedux.success) {
      setRevenueAnalytics(
        revenueAndOrderAnalyticsRedux?.serverResponse?.data?.revenueAnalytics
      );
      setOrderAnalytics(
        revenueAndOrderAnalyticsRedux?.serverResponse?.data?.ordersAnalytics
      );
      dispatch({ type: ADMIN_ANALYTICS_REVENUE_AND_ORDER_RESET });
    }
  }, [
    dispatch,
    revenueAndOrderAnalyticsRedux?.serverResponse?.data,
    revenueAndOrderAnalyticsRedux.success,
  ]);

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 w-full">
          <div className="flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg w-[20rem]">
            <div className="flex flex-col gap-2">
              <div className="font-[400]">Revenue</div>
              <div className="font-[600] text-3xl">
                ${revenueAnalytics?.totalRevenue}
              </div>
            </div>
            <div className="w-2/3">
              <SellerLineChart
                colors={"#FF8901"}
                dataArray={revenueAnalytics?.graphData}
                label={"Month's Sales"}
                dates={revenueAnalytics?.graphDates}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg w-[20rem]">
            <div className="flex flex-col gap-2">
              <div className="font-[400]">Orders</div>
              <div className="font-[600] text-3xl">
                {orderAnalytics?.totalOrders}
              </div>
            </div>
            <div className="w-2/3">
              <SellerLineChart
                colors={"#FF392B"}
                dataArray={orderAnalytics?.graphData}
                label={"Month's Orders"}
                dates={orderAnalytics?.graphDates}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 rounded-md p-3">
          <div className="text-[#1C2A53] text-xl font-[500]">Traffic</div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg w-[20rem]">
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
            <div className="flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg w-[20rem]">
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
          <div className=""></div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-3">
          <div className="w-full md:w-1/2 flex flex-col gap-2 shadow-md rounded-md p-3">
            <div className="font-[600] text-lg text-[#1D1F2C]">Top Product</div>
            <div className="text-sm text-[#777980] font-[400]">
              Top Product in This Month
            </div>
            {topProducts?.length &&
              topProducts.map((t) => {
                return (
                  <div
                    key={t.product._id}
                    className="text-sm flex flex-row justify-between gap-2 items-center"
                  >
                    <div className="flex flex-row gap-3">
                      <div className="bg-[#E0E2E7] w-8 h-8 border border-[#E0E2E7] rounded-md">
                        <img
                          className="object-contain w-full h-full"
                          src={t.product.image?.[0]?.url || productImage1}
                          alt=""
                        />
                      </div>
                      <div className="">
                        <div className="">
                          {t.product.name?.slice(0, 20)}...
                        </div>
                        <div className="text-[#667085] text-[0.8rem]">
                          {t.product.sub_category}
                        </div>
                      </div>
                    </div>
                    <div className="font-[400] text-[#1D1F2C]">
                      $<FormatNumber price={t.product.current_price} />
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
            {topservices?.length &&
              topservices.map((t, i) => {
                return (
                  <div className="text-sm flex flex-row justify-between gap-2 items-center">
                    <div className="flex flex-row gap-3">
                      <div className="bg-[#E0E2E7] w-8 h-8 border border-[#E0E2E7] rounded-md">
                        <img
                          className="object-contain w-full h-full"
                          src={t.service.image?.[0]?.url}
                          alt=""
                        />
                      </div>
                      <div className="">
                        <div className="">
                          <div className="">
                            {t.service.name?.slice(0, 20)}...
                          </div>
                          <div className="text-[#667085] text-[0.8rem]">
                            {t.service.sub_category}
                          </div>
                        </div>
                        <div className="text-[#667085] text-[0.8rem]">
                          {t.service.user}
                        </div>
                      </div>
                    </div>
                    <div className="font-[400] text-[#1D1F2C]">
                      $<FormatNumber price={t.service.current_price} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <AdminSalesLatestOrder
        latestProductOrders={latestProductOrders || []}
        latestServiceOrders={latestServiceOrders || []}
      />
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

export const SellerLineChart = ({ colors, dataArray, label, dates }: any) => {
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
    labels: dates,
    datasets: [
      {
        label: label,
        data: dataArray,
        fill: false,
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
