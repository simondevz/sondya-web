import { useCallback, useEffect, useMemo, useState } from "react";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import Swal from "sweetalert2";
import {
  adminDeleteCategoryAction,
  adminGetCategoriesAction,
} from "../../../redux/actions/admin/categories.actions";
import { ReducersType } from "../../../redux/store";
import { AdminGetCategoryType } from "../../../redux/types/categories.types";
import {
  Paginator,
  ReduxResponseType,
} from "../../../redux/types/general.types";

type QueryType = {
  page: number;
  category: string;
  search: string;
};
const AdminCategory = () => {
  const limit: number = 5;
  const [query, setQuery] = useState<QueryType>({
    page: 1,
    category: "",
    search: "",
  });

  const [totalPages, setTotalPages] = useState<number>(0);
  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);

  // fetch categories
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

  const adminGetCategoriesRedux = useSelector(
    (state: ReducersType) => state?.adminGetAllCategory
  ) as ReduxResponseType<Paginator<AdminGetCategoryType[]>>;

  const categories = useMemo(() => {
    return adminGetCategoriesRedux?.serverResponse?.data;
  }, [adminGetCategoriesRedux]);

  useEffect(() => {
    dispatch(adminGetCategoriesAction(queryString) as any);
  }, [dispatch, queryString]);

  // delete category
  const adminDeleteCategoryByIDRedux = useSelector(
    (state: ReducersType) => state?.adminDeleteCategory
  ) as ReduxResponseType<AdminGetCategoryType>;

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
        dispatch(adminDeleteCategoryAction({ id }) as any);

        if (!adminDeleteCategoryByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            adminDeleteCategoryByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            dispatch(adminGetCategoriesAction(queryString) as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", adminDeleteCategoryByIDRedux?.error, "error");
        }
      }
    });
  };

  const search = (
    e:
       React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuery({
      ...query,
      page: 1,
      [e.target.name]: e.target.value,
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
    adminGetCategoriesRedux?.serverResponse?.data?.count &&
      setTotalPages(
        Math.ceil(adminGetCategoriesRedux?.serverResponse?.data?.count / limit)
      );
  }, [adminGetCategoriesRedux?.serverResponse?.data?.count, query, setQuery]);

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
            <button
              onClick={() => navigate("/admin/category/add")}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add Category</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex border p-2 items-center rounded-md gap-3">
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
          <div className="flex flex-row gap-3 items-center">
            <div className="font-[600] text-lg">Category</div>
            <select
              name="category"
              onChange={search}
              className="border py-2 px-4 rounded-md bg-[#F9F9FC]"
            >
              <option value={""}>Choose ...</option>
              <option value={"Product"}>Product</option>
              <option value={"Service"}>Service</option>
            </select>
          </div>
          <div className="font-[600] p-2">
            Total Services: {categories.count}
          </div>
        </div>
        <div className="">
          <div className="mx-auto w-fit">
            {!adminGetCategoriesRedux.success && (
              <DotLoader
                cssOverride={{ margin: "30px" }}
                size={100}
                color="#EDB842"
              />
            )}
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="border-y">
                <th className="p-2 text-start text-[#1D1F2C]">Category</th>
                <th className="p-2 text-start text-[#1D1F2C]">Subcategory</th>
                <th className="p-2 text-start text-[#1D1F2C]">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.data &&
                categories.data.map((t, i) => {
                  return (
                    <tr className="border-b" key={i}>
                      <td className="p-3 text-[#1D1F2C]">{t.category}</td>
                      <td className="p-3 text-[#667085]">{t.name}</td>
                      <td className="p-3 text-[#667085]">
                        <div className="flex flex-row gap-2 items-center text-[#A3A9B6]">
                          <button
                            onClick={() =>
                              navigate(`/admin/category/edit/${t._id}`)
                            }
                          >
                            <FiEdit2 />
                          </button>
                          <button onClick={() => handleDelete(t._id)}>
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
            {categories.count && categories.count > limit
              ? query.page * limit
              : categories.count}{" "}
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

export default AdminCategory;
