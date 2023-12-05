import { useCallback, useEffect, useMemo, useState } from "react";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsFillEyeFill, BsSearch, BsThreeDots } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { productImage1 } from "../../../images/products";
import {
  adminDeleteProductAction,
  adminGetProductsAction,
} from "../../../redux/actions/admin/products.actions";
import { ReducersType } from "../../../redux/store";
import {
  Paginator,
  ReduxResponseType,
} from "../../../redux/types/general.types";
import { AdminGetProductType } from "../../../redux/types/products.types";
import { FormatNumber } from "../../shareables/FormatNumber";

type QueryType = {
  page: number;
  search: string;
};

const AdminProductsBody = () => {
  const limit: number = 5;

  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
  });

  const [totalPages, setTotalPages] = useState<number>(0);
  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);

  // fetch products
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // update query and url
  const updateQueryString = useCallback(
    (newParams: QueryType) => {
      const searchParams = new URLSearchParams(location.search);
      // Update or add new parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.set(key, String(value));
        } else {
          searchParams.delete(key);
        }
      });

      // Build the new search string
      const newSearch = searchParams.toString();

      // set query string
      setQueryString(newSearch);

      // Use navigate to change the URL
      navigate({
        pathname: location.pathname,
        search: newSearch,
      });
    },
    [location.pathname, location.search, navigate]
  );

  const adminGetProductsRedux = useSelector(
    (state: ReducersType) => state?.adminGetAllProducts
  ) as ReduxResponseType<Paginator<AdminGetProductType[]>>;

  const products = useMemo(() => {
    return adminGetProductsRedux?.serverResponse?.data;
  }, [adminGetProductsRedux]);

  // delete products
  const adminDeleteProductsByIDRedux = useSelector(
    (state: ReducersType) => state?.adminDeleteProduct
  ) as ReduxResponseType<AdminGetProductType>;

  const handleDelete = useCallback(
    (id: string) => {
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
              dispatch(adminGetProductsAction(queryString) as any);
            }, 1000);
          } else {
            Swal.fire("Deleted!", adminDeleteProductsByIDRedux?.error, "error");
          }
        }
      });
    },
    [adminDeleteProductsByIDRedux, dispatch, queryString]
  );

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({
      page: 1,
      search: e.target.value,
    });
    setDotIndex(0);
  };

  const prevPage = () => {
    setQuery((prev) => {
      return {
        ...prev,
        page: prev.page--,
      };
    });
  };

  const nextPage = () => {
    setQuery((prev) => {
      return {
        ...prev,
        page: prev.page++,
      };
    });
  };

  const goToPage = (page: number) => {
    setQuery((prev) => {
      return {
        ...prev,
        page: page,
      };
    });
  };

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1000);
  }, [query, updateQueryString]);

  useEffect(() => {
    adminGetProductsRedux?.serverResponse?.data?.count &&
      setTotalPages(
        Math.ceil(adminGetProductsRedux?.serverResponse?.data?.count / limit)
      );
  }, [adminGetProductsRedux?.serverResponse?.data?.count, query, setQuery]);

  useEffect(() => {
    dispatch(adminGetProductsAction(queryString) as any);
  }, [dispatch, queryString]);

  // console.log(products.count);
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
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex border p-2 items-center rounded-md">
            <span className="text-[#EDB842]">
              <BsSearch />
            </span>
            <input
              name="search"
              value={query?.search}
              onChange={search}
              className="outline-none p-1"
              type="text"
            />
          </div>
          <div className="font-[600] p-2">Total Products: {products.count}</div>
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
              {products.data &&
                products.data.map((t, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <div className="flex flex-col md:flex-row gap-2">
                          <img
                            className="object-contain w-16"
                            src={
                              t.image && t.image.length > 0
                                ? t.image[0].url
                                : productImage1
                            }
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
                        $
                        {t.current_price && (
                          <FormatNumber price={t.current_price} />
                        )}
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
          <div className="text-[#667085]">
            Showing {(query.page - 1) * limit} -{" "}
            {products.count && products.count > limit
              ? query.page * limit
              : products.count}{" "}
            from page {query.page}
          </div>
          <div className="flex flex-row gap-2 items-center text-[#EDB842] my-5">
            <button
              disabled={query.page <= 1}
              type="button"
              onClick={() => prevPage()}
              className="bg-[#EDB84233] p-2 rounded-md"
            >
              <BiSolidLeftArrow />
            </button>
            {Number.isInteger(totalPages) &&
              totalPages >= 0 &&
              Array.from({
                length: totalPages,
              }).map((_, i) => {
                if (i >= dotIndex && i <= dotIndex + 2) {
                  return (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`${
                        query.page === i + 1 && "bg-[#EDB84233]"
                      } p-2 rounded-md`}
                    >
                      {i + 1}
                    </button>
                  );
                }
                return <div className="hidden">...</div>;
              })}
            {Number.isInteger(totalPages) && totalPages > 3 && (
              <button
                onClick={() => {
                  totalPages >= dotIndex
                    ? setDotIndex((prev) => prev + 3)
                    : setDotIndex(0);
                }}
                className="p-2 bg-[#EDB842] rounded-md text-white"
              >
                <BsThreeDots />
              </button>
            )}
            <button
              type="button"
              disabled={query.page >= totalPages}
              onClick={() => nextPage()}
              className="bg-[#EDB84233] p-2 rounded-md"
            >
              <BiSolidRightArrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProductsBody;
