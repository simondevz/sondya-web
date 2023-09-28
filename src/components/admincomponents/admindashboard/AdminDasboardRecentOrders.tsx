import { useState } from "react";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BsXCircle } from "react-icons/bs";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ComposableMap, Geographies, Geography } from "react-simple-map";
import "../../../css/map.css";
import { recentOrderData } from "../../../data/RecentOrderData";
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const AdminDasboardRecentOrders = () => {
  const [click, setClick] = useState<string>("");
  return (
    <section className="m-3">
      <div className="flex flex-wrap md:flex-nowrap gap-3">
        <div className="flex flex-col gap-3 shadow-md p-3 rounded-md overflow-x-hidden w-full md:w-2/3">
          <div className="flex flex-row justify-between">
            <div className="flex gap-3">
              <div className="text-xl font-[600]">Recent Orders</div>
              <div className="font-[600] text-[#1A9882] h-fit p-2 bg-[#E9FAF7] rounded-lg">
                +2 Orders
              </div>
            </div>
            <div className="flex gap-3">
              <div className="border p-2 rounded-md">
                <input className="outline-none" type="date" />
              </div>
              <div className="border p-2 rounded-md h-fit bg-[#EDB84233] text-[#EDB842] w-fit">
                See all
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-scroll flex flex-col gap-2">
            <table className="table-auto w-full">
              <thead className="bg-[#EDB84233]">
                <tr>
                  <th className="py-4 px-6 font-[400] text-[#292929]">
                    Products
                  </th>
                  <th className="py-4 px-6 font-[400] text-[#292929]">
                    Order ID
                  </th>
                  <th className="py-4 px-6 font-[400] text-[#292929]">Date</th>
                  <th className="py-4 px-6 font-[400] text-[#292929]">
                    Customer name
                  </th>
                  <th className="py-4 px-6 font-[400] text-[#292929]">
                    Status
                  </th>
                  <th className="py-4 px-6 font-[400] text-[#292929]">
                    Amount
                  </th>
                  <th className="py-4 px-6 font-[400] text-[#292929]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrderData.slice(0, 6).map((t, i) => {
                  return (
                    <tr key={i}>
                      <td className="py-4 px-6 text-[#292929] font-[700] whitespace-nowrap">
                        {t.products}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                        {t.orderId}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                        {t.date}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                        {t.name}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap flex justify-around items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            t.status === "IN PROGRESS"
                              ? "bg-[#FA8232]"
                              : t.status === "COMPLETED"
                              ? "bg-[#2DB224]"
                              : "bg-[#EE5858]"
                          }`}
                        >
                          <div className=""></div>
                        </span>
                        {t.status}
                      </td>
                      <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                        {t.Total}
                      </td>
                      <td
                        className={`flex ${
                          click === t.orderId
                            ? "justify-start"
                            : "justify-center"
                        } relative gap-2`}
                      >
                        {click === t.orderId && (
                          <div className="bg-[#F5F7FA] flex flex-row gap-2 items-center p-2 rounded-md">
                            {" "}
                            <AiOutlineEdit /> <span>Edit</span>
                          </div>
                        )}
                        <button
                          onClick={() => {
                            click === "" ? setClick(t.orderId) : setClick("");
                          }}
                          className="flex rounded-md"
                        >
                          <span
                            className={`p-2 w-fit h-fit ${
                              click === t.orderId &&
                              "text-white bg-[#EDB842] rounded-md"
                            }`}
                          >
                            <MdOutlineMoreHoriz />
                          </span>
                        </button>

                        {click === t.orderId && (
                          <div className="absolute top-12 right-9 bg-white border z-10 p-3 rounded-md text-[#464D61] flex flex-col gap-2 shadow-md">
                            <div className="flex gap-4 items-center">
                              <AiOutlineEye />{" "}
                              <span className="whitespace-nowrap">
                                View Customer Details
                              </span>
                            </div>
                            <div className="flex gap-4 items-center text-[#27C200]">
                              <TiTick />{" "}
                              <span className="whitespace-nowrap">Accept</span>
                            </div>
                            <div className="flex gap-4 items-center text-[#FB5B01]">
                              <BsXCircle />{" "}
                              <span className="whitespace-nowrap">Suspend</span>
                            </div>
                            <div className="flex gap-4 items-center">
                              <AiOutlineEye />{" "}
                              <span className="whitespace-nowrap">Delete</span>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-1/3 shadow-md rounded-md p-3">
          <div className="text-xl font-[600] text-[#1D1F2C]">
            Customer Growth
          </div>
          <div className="text-[#777980] text-sm font-[400]">
            Based on Country
          </div>
          <MapApp />
          <div className="flex flex-row gap-3 justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="p-4 bg-[#E0E2E7] rounded-full w-fit h-fit"></div>
              <div className="">
                <div className="">USA</div>
                <div className="text-sm text-[#667085] font-[400] whitespace-nowrap">
                  1,240 Customers
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 w-1/2">
              <div className="bg-[#E0E2E7] h-4 rounded-lg w-full">
                <div className="bg-[#22CAAD] w-[80%] h-full rounded-lg"></div>
              </div>
              <div className="">80%</div>
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="p-4 bg-[#E0E2E7] rounded-full w-fit h-fit"></div>
              <div className="">
                <div className="">Japan</div>
                <div className="text-sm text-[#667085] font-[400] whitespace-nowrap">
                  1,240 Customers
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 w-1/2">
              <div className="bg-[#E0E2E7] h-4 rounded-lg w-full">
                <div className="bg-[#F86624] w-[60%] h-full rounded-lg"></div>
              </div>
              <div className="">80%</div>
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="p-4 bg-[#E0E2E7] rounded-full w-fit h-fit"></div>
              <div className="">
                <div className="">France</div>
                <div className="text-sm text-[#667085] font-[400] whitespace-nowrap">
                  1,240 Customers
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 w-1/2">
              <div className="bg-[#E0E2E7] h-4 rounded-lg w-full">
                <div className="bg-[#F9C80E] w-[49%] h-full rounded-lg"></div>
              </div>
              <div className="">80%</div>
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="p-4 bg-[#E0E2E7] rounded-full w-fit h-fit"></div>
              <div className="">
                <div className="">Germany</div>
                <div className="text-sm text-[#667085] font-[400] whitespace-nowrap">
                  1,240 Customers
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 w-1/2">
              <div className="bg-[#E0E2E7] h-4 rounded-lg w-full">
                <div className="bg-[#EDB842] w-[100%] h-full rounded-lg"></div>
              </div>
              <div className="">80%</div>
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="p-4 bg-[#E0E2E7] rounded-full w-fit h-fit"></div>
              <div className="">
                <div className="">South Korea</div>
                <div className="text-sm text-[#667085] font-[400] whitespace-nowrap">
                  1,240 Customers
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 w-1/2">
              <div className="bg-[#E0E2E7] h-4 rounded-lg w-full">
                <div className="bg-[#EB3D4D] w-[50%] h-full rounded-lg"></div>
              </div>
              <div className="">80%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// use react-simple-maps d3-geo library
const MapApp = () => (
  <div className="">
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  </div>
);
export default AdminDasboardRecentOrders;
