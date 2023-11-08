import { useEffect, useState } from "react";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { productImage1 } from "../../../images/products";
import {
  adminDeleteProductAction,
  adminGetProductsAction,
} from "../../../redux/actions/admin/products.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminGetProductType } from "../../../redux/types/products.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const AdminProductsBody = () => {
  // fetch categories
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState<AdminGetProductType[]>([]);
  const adminGetProductsRedux = useSelector(
    (state: ReducersType) => state?.adminGetAllProducts
  ) as ReduxResponseType<AdminGetProductType[]>;

  useEffect(() => {
    dispatch(adminGetProductsAction() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adminGetProductsRedux?.serverResponse.data) {
      setProducts(adminGetProductsRedux?.serverResponse?.data);
    }
  }, [adminGetProductsRedux?.serverResponse, dispatch]);

  // delete products
  const adminDeleteProductsByIDRedux = useSelector(
    (state: ReducersType) => state?.adminDeleteProduct
  ) as ReduxResponseType<AdminGetProductType>;

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(adminDeleteProductAction({ id }) as any);

        if (!adminDeleteProductsByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            adminDeleteProductsByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            dispatch(adminGetProductsAction() as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", adminDeleteProductsByIDRedux?.error, "error");
        }
      }
    });
  };

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
              {products.map((t, i) => {
                return (
                  <tr>
                    <td>
                      <div className="flex flex-col md:flex-row gap-2">
                        <img
                          className="object-contain w-16"
                          src={productImage1}
                          alt=""
                        />
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="">{t.name?.slice(0, 18)}...</div>
                          <div className="">{t.total_variants} Variants</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-[#A3A9B6]">{t.model}</td>
                    <td className="text-[#A3A9B6]">{t.category}</td>
                    <td className="text-[#A3A9B6]">{t.total_stock}</td>
                    <td className="text-[#A3A9B6]">
                      $<FormatNumber price={t.current_price} />
                    </td>
                    <td>
                      {t.product_status === "hot" ? (
                        <div className="p-1 text-[#F86624] bg-[#FFF0EA] w-fit h-fit rounded-lg">
                          {t.product_status}
                        </div>
                      ) : t.product_status === "available" ? (
                        <div className="p-1 text-[#1A9882] bg-[#E9FAF7] w-fit h-fit rounded-lg">
                          {t.product_status}
                        </div>
                      ) : t.product_status === "draft" ? (
                        <div className="p-1 text-[#667085] bg-[#F0F1F3] w-fit h-fit rounded-lg">
                          {t.product_status}
                        </div>
                      ) : (
                        <div className="p-1 text-[#EB3D4D] bg-[#FEECEE] w-fit h-fit rounded-lg">
                          {t.product_status}
                        </div>
                      )}
                    </td>
                    <td className="text-[#A3A9B6]">{"09/08/2012"}</td>
                    <td>
                      <div className="flex flex-row gap-2 items-center text-[#A3A9B6]">
                        <button
                          onClick={() =>
                            navigate(`/admin/product/edit/${t._id}`)
                          }
                          type="button"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/product/details/${t._id}`)
                          }
                          type="button"
                        >
                          <BsFillEyeFill />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          type="button"
                        >
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
