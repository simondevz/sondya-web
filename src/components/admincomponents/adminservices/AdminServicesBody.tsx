import { useCallback, useEffect, useMemo, useState } from "react";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsEye, BsSearch, BsThreeDots } from "react-icons/bs";
import { MdDelete, MdEdit, MdMoreVert, MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { carRepair } from "../../../images/services";
import {
  adminDeleteServiceAction,
  adminGetServicesAction,
} from "../../../redux/actions/admin/services.actions";
import { ReducersType } from "../../../redux/store";
import {
  Paginator,
  ReduxResponseType,
} from "../../../redux/types/general.types";
import { AdminGetServiceType } from "../../../redux/types/services.types";
import { FormatNumber } from "../../shareables/FormatNumber";

type QueryType = {
  page: number;
  search: string;
};

const AdminServicesBody = () => {
  const [Open, setOpen] = useState<number | undefined>();

  const limit: number = 5;
  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
  });

  const [totalPages, setTotalPages] = useState<number>(0);
  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);

  // fetch data for service details
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const adminGetServicesRedux = useSelector(
    (state: ReducersType) => state?.adminGetAllService
  ) as ReduxResponseType<Paginator<AdminGetServiceType[]>>;

  const services = useMemo(() => {
    return adminGetServicesRedux?.serverResponse?.data;
  }, [adminGetServicesRedux]);

  useEffect(() => {
    dispatch(adminGetServicesAction(queryString) as any);
  }, [dispatch, queryString]);

  // delete service
  const adminDeleteServiceByIDRedux = useSelector(
    (state: ReducersType) => state?.adminDeleteService
  ) as ReduxResponseType<AdminGetServiceType>;

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
        dispatch(adminDeleteServiceAction({ id }) as any);

        if (!adminDeleteServiceByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            adminDeleteServiceByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            dispatch(adminGetServicesAction(queryString) as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", adminDeleteServiceByIDRedux?.error, "error");
        }
      }
    });
  };

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
    adminGetServicesRedux?.serverResponse?.data?.count &&
      setTotalPages(
        Math.ceil(adminGetServicesRedux?.serverResponse?.data?.count / limit)
      );
  }, [adminGetServicesRedux?.serverResponse?.data?.count, query, setQuery]);

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-2xl w-auto text-[#1D1F2C]">
            Services
          </div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md bg-[#EDB84233] gap-2">
              <span className="text-[#EDB842]">
                <BiExport />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Export</span>
            </button>
            <button
              onClick={() => navigate("/admin/service/add")}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add Services</span>
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
          <div className="font-[600] p-2">Total Services: {services.count}</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.data &&
            services.data.map((t, i) => {
              return (
                <div
                  key={i}
                  // onClick={() => navigate("/admin/service/details/" + t?._id)}
                  className="flex flex-col gap-3 border border-[#EFEFF0] rounded-md"
                >
                  <img
                    className="rounded-t-md h-48 object-cover"
                    src={
                      t.image && t.image.length > 0 ? t.image[0].url : carRepair
                    }
                    alt=""
                  />
                  <div className="flex gap-3 px-3">
                    <div className="p-3 rounded-full bg-[#EDB842] w-fit h-fit"></div>
                    <div className="">{t.user}</div>
                  </div>
                  <div className="h-12 overflow-y-hidden px-3">{t.name}</div>
                  <div className="px-3">
                    $
                    {t.current_price && (
                      <FormatNumber price={t.current_price} />
                    )}
                  </div>
                  <div className="relative border-t border-[#EFEFF0] flex justify-between p-2 items-center">
                    <button
                      onClick={() => navigate(`/admin/service/edit/${t._id}`)}
                      className="flex p-2 bg-[#EDB842] text-white items-center rounded-md"
                    >
                      <MdEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        Open === undefined ? setOpen(i) : setOpen(undefined);
                      }}
                    >
                      <MdMoreVert />
                    </button>
                    {Open === i && (
                      <div className="absolute bg-white z-20 p-3 top-10 rounded-md">
                        <button
                          onClick={() =>
                            navigate(`/admin/service/details/${t._id}`)
                          }
                          className="flex gap-5 text-[#464D61] items-center"
                        >
                          <BsEye />
                          <div className="whitespace-nowrap">
                            View Service Details
                          </div>
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="flex gap-5 text-[#464D61] items-center"
                        >
                          <MdDelete />
                          <div className="whitespace-nowrap">
                            Delete Service
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-[#667085]">
            Showing {(query.page - 1) * limit} -{" "}
            {services.count && services.count > limit
              ? query.page * limit
              : services.count}{" "}
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

export default AdminServicesBody;
