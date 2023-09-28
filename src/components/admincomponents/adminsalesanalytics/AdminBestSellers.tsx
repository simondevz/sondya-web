import { SellerLineChart } from "../admindashboard/AdminDashboardHero";

const AdminBestSellers = () => {
  return (
    <section className="w-full">
      <div className="flex flex-wrap md:flex-nowrap gap-3 w-full">
        <div className="flex flex-col gap-3 w-full md:w-1/2 shadow-md rounded-md">
          <div className="text-[#1C2A53] font-[600]">Bestsellers</div>
          <div className="w-full">
            <table className="w-full table-auto">
              <thead className="bg-[#F8F8F8] rounded-md text-[#8E95A9]">
                <tr>
                  <th className="p-2 text-start">Product</th>
                  <th className="p-2 text-start">Price</th>
                  <th className="p-2 text-start">Sold</th>
                  <th className="p-2 text-start">Profit</th>
                </tr>
              </thead>
              <tbody>
                {Bestsellers.map((t, i) => {
                  return (
                    <tr key={i} className="border-b">
                      <td className="text-[#555F7E] p-2">{t.product}</td>
                      <td className="text-[#555F7E] p-2">{t.price}</td>
                      <td className="text-[#555F7E] p-2">{t.sold}</td>
                      <td className="text-[#555F7E] p-2">{t.profit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col gap-3 shadow-sm rounded-md p-2">
          <div className="text-[#1C2A53] font-[600]">Sales forecast</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="w-[14rem] flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg max-w-[15rem]">
              <div className="flex flex-col gap-2">
                <div className="font-[400]">Revenue</div>
                <div className="font-[600] text-3xl">+24.2%</div>
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
                <div className="font-[600] text-3xl">+32.8%</div>
              </div>
              <div className="w-2/3">
                <SellerLineChart colors={"#FF392B"} dataArray={[40, 68, 45]} />
              </div>
            </div>
            <div className="w-[14rem] flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg max-w-[15rem]">
              <div className="flex flex-col gap-2">
                <div className="font-[400]">Visitors</div>
                <div className="font-[600] text-3xl">+60%</div>
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
                <div className="font-[400]">Net profit</div>
                <div className="font-[600] text-3xl">-2.5%</div>
              </div>
              <div className="w-2/3">
                <SellerLineChart
                  colors={"#FFA000"}
                  dataArray={[40, 45, 25, 75]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export type bestSellerDataType = {
  product: string;
  price: number;
  sold: number;
  profit: number;
};

export const Bestsellers: Array<bestSellerDataType> = [
  {
    product: "Deco accessory",
    price: 21.19,
    sold: 409,
    profit: 1822.87,
  },
  {
    product: "Pottery Vase",
    price: 14.18,
    sold: 396,
    profit: 1822.87,
  },
  {
    product: "Rose Holdback",
    price: 18.14,
    sold: 243,
    profit: 1822.87,
  },
  {
    product: "Flowering Cactus",
    price: 74.16,
    sold: 636,
    profit: 1822.87,
  },
];

export default AdminBestSellers;
