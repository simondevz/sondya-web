import { AdminGetProductType } from "./products.types";
import { AdminGetServiceType } from "./services.types";

export type GraphDataType = number[];

export type RevenueAnalyticsType = {
  totalRevenue: number;
  graphData: GraphDataType;
  graphDates: string[];
};

export type OrdersAnalyticsType = {
  totalOrders: number;
  graphData: GraphDataType;
  graphDates: string[];
};

export type TopProductsType = {
  count: number;
  product: AdminGetProductType;
};

export type TopServiceType = {
  count: number;
  service: AdminGetServiceType;
};
