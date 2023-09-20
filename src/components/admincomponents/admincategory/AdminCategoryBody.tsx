import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { Productsdata } from "../../../data/productsData";

const AdminCategory = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-2xl w-auto text-[#1D1F2C]">
            Category
          </div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2">
              <span className="text-[#EDB842]">
                <BiExport />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Export</span>
            </button>
            <button className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2">
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add Category</span>
            </button>
          </div>
        </div>
        <div className="">
          <table className="table-auto w-full">
            <thead>
              <tr className="border-y">
                <th className="p-2 text-start text-[#1D1F2C]">Category Name</th>
                <th className="p-2 text-start text-[#1D1F2C]">Added</th>
                <th className="p-2 text-start text-[#1D1F2C]">Action</th>
              </tr>
            </thead>
            <tbody>
              {Productsdata.map((t, i) => {
                return (
                  <tr className="border-b">
                    <td className="p-3 text-[#1D1F2C]">{t.product}</td>
                    <td className="p-3 text-[#667085]">{t.date}</td>
                    <td className="p-3 text-[#667085]">
                      <div className="flex flex-row gap-2 items-center text-[#A3A9B6]">
                        <button>
                          <FiEdit2 />
                        </button>
                        <button>
                          <BsFillEyeFill />
                        </button>
                        <button>
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-[#667085]">Showing 1-10 from 100</div>
          <div className="flex flex-row gap-2 items-center text-[#EDB842] my-5">
            <span className="bg-[#EDB84233] p-2 rounded-md">
              <BiSolidLeftArrow />
            </span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">1</span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">2</span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">3</span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">4</span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">5</span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">...</span>
            <span className="bg-[#EDB84233] p-2 rounded-md">
              <BiSolidRightArrow />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminCategory;
