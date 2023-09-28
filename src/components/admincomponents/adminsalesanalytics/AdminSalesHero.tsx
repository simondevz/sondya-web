import {
  SellerLineChart,
  SellerLineChartTraffic,
} from "../admindashboard/AdminDashboardHero";

const AdminSalesHero = () => {
  return (
    <section>
      <div className="flex flex-col gap-5">
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
        <div className="flex flex-col gap-3">
          <div className="font-[400] text-[#1C2A53]">Orders Update</div>
          <SellerLineChartTraffic />
        </div>
      </div>
    </section>
  );
};

export default AdminSalesHero;
