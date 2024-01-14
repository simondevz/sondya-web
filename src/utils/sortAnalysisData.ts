import {
  GraphDataType,
  SellerAnalysisReportType,
} from "../redux/types/analysis.types";

export const SortSellerAnalysisData = (
  analysisData: SellerAnalysisReportType
): GraphDataType[] => {
  const GraphData: GraphDataType[] = [];

  // add product data to array
  if (
    analysisData?.product_monthly_order_group &&
    analysisData?.product_monthly_order_group.length > 0
  )
    analysisData.product_monthly_order_group.forEach((item) => {
      GraphData.push({
        _id: {
          month: item._id.month,
          year: item._id.year,
        },
        ProductTotalAmount: item.totalAmount,
        ProductTotalCount: item.totalCount,
        ServiceTotalAmount: 0,
        ServiceTotalCount: 0,
      });
    });

  // add service data to array

  if (
    analysisData?.service_monthly_order_group &&
    analysisData?.service_monthly_order_group.length > 0
  )
    analysisData.service_monthly_order_group.forEach((item) => {
      GraphData.push({
        _id: {
          month: item._id.month,
          year: item._id.year,
        },
        ProductTotalAmount: 0,
        ProductTotalCount: 0,
        ServiceTotalAmount: item.totalAmount,
        ServiceTotalCount: item.totalCount,
      });
    });

  // Sort the array based on month and year
  GraphData.sort((a, b) => {
    const aDate: any = new Date(`${a._id.year}-${getMonthNumber(a._id.month)}`);
    const bDate: any = new Date(`${b._id.year}-${getMonthNumber(b._id.month)}`);
    return aDate - bDate;
  });

  // Group objects based on "month" and "year"
  const groupedArray = GraphData.reduce((acc: any, obj: any) => {
    const key = `${obj._id.month}_${obj._id.year}`;
    if (!acc[key]) {
      acc[key] = { ...obj };
    } else {
      // Merge data of objects with the same month and year
      acc[key] = {
        ...acc[key],
        ProductTotalAmount:
          acc[key].ProductTotalAmount + obj.ProductTotalAmount,
        ProductTotalCount: acc[key].ProductTotalCount + obj.ProductTotalCount,
        ServiceTotalAmount:
          acc[key].ServiceTotalAmount + obj.ServiceTotalAmount,
        ServiceTotalCount: acc[key].ServiceTotalCount + obj.ServiceTotalCount,
      };
    }
    return acc;
  }, {});

  const resultArray: GraphDataType[] = Object.values(groupedArray);

  return resultArray;
};

function getMonthNumber(month: string) {
  const monthMap: any = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  return monthMap[month];
}
