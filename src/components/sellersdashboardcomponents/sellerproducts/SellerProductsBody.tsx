import { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete, MdOutlineAdd, MdOutlineMoreHoriz } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { productImage1 } from "../../../images/products";
import {
  sellerDeleteProductAction,
  sellerGetProductsAction,
} from "../../../redux/actions/seller/seller-products.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminGetProductType } from "../../../redux/types/products.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const SellerProductsBody = () => {
  const [click, setClick] = useState<number | null>(null);

  // fetch products
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState<AdminGetProductType[]>([]);

  const sellerGetProductsRedux = useSelector(
    (state: ReducersType) => state?.sellerGetAllProducts
  ) as ReduxResponseType<AdminGetProductType[]>;

  useEffect(() => {
    dispatch(sellerGetProductsAction() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sellerGetProductsRedux?.serverResponse.data) {
      setProducts(sellerGetProductsRedux?.serverResponse?.data);
    }
  }, [sellerGetProductsRedux?.serverResponse, dispatch]);

  // delete products
  const sellerDeleteProductsByIDRedux = useSelector(
    (state: ReducersType) => state?.sellerDeleteProduct
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
        dispatch(sellerDeleteProductAction({ id }) as any);

        if (!sellerDeleteProductsByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            sellerDeleteProductsByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            dispatch(sellerGetProductsAction() as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", sellerDeleteProductsByIDRedux?.error, "error");
        }
      }
    });
  };

  return (
    <section className="flex flex-col gap-5 w-full overflow-x-hidden">
      <div className="flex flex-wrap gap-3 justify-between">
        <div className="font-[600] text-2xl w-auto text-[#1D1F2C]">
          Products
        </div>
        <div className="flex flex-row gap-2">
          <button className="flex flex-row items-center p-2 rounded-md bg-[#EDB84233] gap-2">
            <span className="text-[#EDB842]">
              <BiExport />
            </span>
            <span className="whitespace-nowrap text-[#EDB842]">Export</span>
          </button>
          <button
            onClick={() => {
              navigate("/seller/products/post");
            }}
            className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
          >
            <span className="text-2xl">
              <MdOutlineAdd />
            </span>
            <span className="whitespace-nowrap">Add Product</span>
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-3 justify-between">
        <div className="flex flex-row border px-2 py-1 rounded-lg items-center">
          <span className="text-[#EDB842]">
            <BsSearch />
          </span>
          <input
            className="outline-none p-1 w-[15rem]"
            type="text"
            placeholder="Search in browsing history"
          />
        </div>
        <div className="flex gap-2">
          <select className="border py-2 px-3 rounded-md" name="" id="">
            <option value="">All Category</option>
          </select>
          <select className="border py-2 px-3 rounded-md" name="" id="">
            <option value="">Recently posted</option>
          </select>
          <select className="border py-2 px-3 rounded-md" name="" id="">
            <option value="">All </option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="border-b">
            <tr>
              <th className="p-2 pb-3 text-start">Products</th>
              <th className="p-2 text-start">Stock</th>
              <th className="p-2 text-start">Prices</th>
              <th className="p-2 text-start">Status</th>
              <th className="p-2 text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((t, i) => {
              return (
                <tr key={i}>
                  <td className="p-2 text-start">
                    <div className="flex flex-col md:flex-row gap-2 items-center">
                      <img
                        className="w-32 h-32"
                        src={
                          t.image && t.image.length >= 1
                            ? t.image[0].url
                            : productImage1
                        }
                        alt=""
                      />
                      <span className="w-52">{t.name}</span>
                    </div>
                  </td>
                  <td className="p-2 text-start text-[#767E94] text-sm font-[600] whitespace-nowrap">
                    {t.total_stock}
                  </td>
                  <td className="p-2 text-start text-[#636A80] text-sm font-[600]">
                    $<FormatNumber price={t.current_price} />
                  </td>
                  <td className="p-2 text-[#292929] font-[400] whitespace-nowrap text-start">
                    {t.product_status === "available" ? (
                      <div className="text-[#2DB224] flex gap-2 items-center">
                        <span>
                          <TiTick />
                        </span>
                        {t.product_status}
                      </div>
                    ) : t.product_status === "sold" ? (
                      <div className="text-[#EE5858] flex gap-2 items-center">
                        <span>
                          <TiTick />
                        </span>
                        {t.product_status}
                      </div>
                    ) : t.product_status === "draft" ? (
                      <div className="text-[#3b3939] flex gap-2 items-center">
                        <span>
                          <TiTick />
                        </span>
                        {t.product_status}
                      </div>
                    ) : (
                      <div className="text-[#EE5858] flex gap-2 items-center">
                        <span>
                          <FaTimes />
                        </span>
                        {t.product_status}
                      </div>
                    )}
                  </td>
                  {/* <td>button</td> */}
                  <td
                    className={`flex ${
                      click === i ? "justify-start" : "justify-center"
                    } relative gap-2`}
                  >
                    {click === i && (
                      <div className="bg-[#F5F7FA] flex flex-row gap-2 items-center p-2 rounded-md">
                        {" "}
                        <AiOutlineEdit /> <span>Edit</span>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        click === null ? setClick(i) : setClick(null);
                      }}
                      className="flex rounded-md"
                    >
                      <span
                        className={`p-2 w-fit h-fit ${
                          click === i && "text-white bg-[#EDB842] rounded-md"
                        }`}
                      >
                        <MdOutlineMoreHoriz />
                      </span>
                    </button>

                    {click === i && (
                      <div className="absolute top-12 right-9 bg-white border z-10 p-3 rounded-md text-[#464D61] flex flex-col gap-2 shadow-md">
                        <div
                          onClick={() =>
                            navigate(`/seller/products/details/${t._id}`)
                          }
                          className="flex gap-4 items-center"
                        >
                          <AiOutlineEye />{" "}
                          <span className="whitespace-nowrap">
                            View Product Details
                          </span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/seller/products/edit/${t._id}`)
                          }
                          className="flex gap-4 items-center text-[#27C200]"
                        >
                          <FiEdit2 />
                          <span className="whitespace-nowrap">Edit</span>
                        </div>
                        <div
                          onClick={() => handleDelete(t._id)}
                          className="flex gap-4 items-center"
                        >
                          <MdDelete />{" "}
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
        <div className="flex flex-row gap-2 items-center text-[#EDB842] self-center my-5">
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
        <button className="px-4 py-2 text-white bg-[#EDB842] rounded-md w-fit self-center font-[700]">
          ADD PRODUCT
        </button>
      </div>
    </section>
  );
};

export default SellerProductsBody;
