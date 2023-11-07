import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ProductsItemsdata } from "../../../data/productsItemsData";
import { FormatNumber } from "../../shareables/FormatNumber";

const AdminProductsBody = () => {
  // fetch categories
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Product</div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => navigate("/admin/product/add")}
              className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2"
            >
              <span className="text-[#EDB842]">
                <BiExport />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Export</span>
            </button>
            <button
              onClick={() => navigate("/admin/product/add")}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add Products</span>
            </button>
          </div>
        </div>
        <div className="w-full">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-[#1D1F2C] text-start">Product</th>
                <th className="p-2 text-start text-[#1D1F2C]">SKU</th>
                <th className="text-[#1D1F2C] text-start">Category</th>
                <th className="text-[#1D1F2C] text-start">Stock</th>
                <th className="text-[#1D1F2C] text-start">Price</th>
                <th className="text-[#1D1F2C] text-start">Status</th>
                <th className="text-[#1D1F2C] text-start">Added</th>
                <th className="text-[#1D1F2C] text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {ProductsItemsdata.map((t, i) => {
                return (
                  <tr>
                    <td>
                      <div className="flex flex-col md:flex-row gap-2">
                        <img
                          className="object-contain w-16"
                          src={t.image}
                          alt=""
                        />
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="">{t.name?.slice(0, 18)}...</div>
                          <div className="">{t.variants} Variants</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-[#A3A9B6]">{t.sku}</td>
                    <td className="text-[#A3A9B6]">{t.category}</td>
                    <td className="text-[#A3A9B6]">{t.stock}</td>
                    <td className="text-[#A3A9B6]">
                      $<FormatNumber price={t.pricenow} />
                    </td>
                    <td>
                      {t.availablestatus === "Low Stock" ? (
                        <div className="p-1 text-[#F86624] bg-[#FFF0EA] w-fit h-fit rounded-lg">
                          {t.availablestatus}
                        </div>
                      ) : t.availablestatus === "Published" ? (
                        <div className="p-1 text-[#1A9882] bg-[#E9FAF7] w-fit h-fit rounded-lg">
                          {t.availablestatus}
                        </div>
                      ) : t.availablestatus === "Draft" ? (
                        <div className="p-1 text-[#667085] bg-[#F0F1F3] w-fit h-fit rounded-lg">
                          {t.availablestatus}
                        </div>
                      ) : (
                        <div className="p-1 text-[#EB3D4D] bg-[#FEECEE] w-fit h-fit rounded-lg">
                          {t.availablestatus}
                        </div>
                      )}
                    </td>
                    <td className="text-[#A3A9B6]">{t.date}</td>
                    <td>
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

export default AdminProductsBody;
