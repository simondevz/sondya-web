export type GraphDataType = {
  _id: {
    month: string;
    year: number;
  };
  ProductTotalAmount: number;
  ServiceTotalAmount: number;
  ProductTotalCount: number;
  ServiceTotalCount: number;
};

type MonthlyOrderGroup = {
  _id: {
    month: string;
    year: number;
  };
  totalAmount: number;
  totalCount: number;
  averageAmount: number;
};

type MostSoldItem = {
  _id: {
    id: string;
    name: string;
  };
  totalAmount: number;
  totalCount: number;
  percentageCount: number;
};

export type SellerAnalysisReportType = {
  total_product_sales_amount: number;
  total_service_sales_amount: number;
  avg_total_product_sales_amount: number;
  avg_total_service_sales_amount: number;
  product_monthly_order_group: MonthlyOrderGroup[];
  service_monthly_order_group: MonthlyOrderGroup[];
  most_sold_items: MostSoldItem[];
};
