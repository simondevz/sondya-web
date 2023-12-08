import { useCallback, useEffect, useState } from "react";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsEye, BsSearch, BsThreeDots } from "react-icons/bs";
import { MdDelete, MdEdit, MdMoreVert, MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { serviceImage1 } from "../../../images/serviceimages";
import {
  sellerDeleteServiceAction,
  sellerGetServicesAction,
} from "../../../redux/actions/seller/seller-services.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import {
  AdminGetServiceType,
  sellerGetServicesType,
} from "../../../redux/types/services.types";
import { FormatNumber } from "../../shareables/FormatNumber";

export type QueryType = {
  page: number;
  search: string;
};

const SellerServiceBody = () => {
  const [Open, setOpen] = useState<number | undefined>();

  const [services, setServices] = useState<AdminGetServiceType[]>([]);

  const limit: number = 5;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
  });

  const sellerGetServicesRedux = useSelector(
    (state: ReducersType) => state?.sellerGetAllService
  ) as ReduxResponseType<sellerGetServicesType>;

  useEffect(() => {
    dispatch(sellerGetServicesAction(queryString as string) as any);
  }, [dispatch, queryString]);

  useEffect(() => {
    if (sellerGetServicesRedux?.serverResponse.data) {
      setServices(sellerGetServicesRedux?.serverResponse?.data?.services);
    }
  }, [sellerGetServicesRedux?.serverResponse, dispatch]);

  // delete service
  const sellerDeleteServiceByIDRedux = useSelector(
    (state: ReducersType) => state?.sellerDeleteService
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
        dispatch(sellerDeleteServiceAction({ id }) as any);

        if (!sellerDeleteServiceByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            sellerDeleteServiceByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            dispatch(sellerGetServicesAction(queryString) as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", sellerDeleteServiceByIDRedux?.error, "error");
        }
      }
    });
  };

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

  const prevPage = () => {
    setQuery((prev: QueryType) => {
      return {
        ...prev,
        page: prev.page--,
      };
    });
  };

  const nextPage = () => {
    setQuery((prev: QueryType) => {
      alert(prev.page++);
      return {
        ...prev,
        page: prev.page++,
      };
    });
  };

  const goToPage = (page: number) => {
    setQuery((prev: QueryType) => {
      return {
        ...prev,
        page: page,
      };
    });
  };

  const servicesRedux = useSelector(
    (state: ReducersType) => state?.sellerGetAllService
  ) as ReduxResponseType<sellerGetServicesType>;

  useEffect(() => {
    if (servicesRedux.success)
      setTotalPages(
        Math.ceil(Number(servicesRedux?.serverResponse?.data?.count) / limit)
      );
  }, [servicesRedux?.success, servicesRedux?.serverResponse?.data?.count]);

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1500);
  }, [query, updateQueryString]);

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
            <Link
              to={"/seller/service/post"}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add Services</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex border p-2 items-center rounded-md">
            <span className="text-[#EDB842]">
              <BsSearch />
            </span>
            <input
              className="outline-none p-1"
              type="text"
              placeholder="Search services..."
              value={query.search}
              onChange={(event) => {
                setQuery({ ...query, search: event.target.value, page: 1 });
              }}
            />
          </div>
          <div className="flex gap-2">
            <select className="border p-3 rounded-md" name="" id="">
              <option className="" value="">
                Category
              </option>
            </select>
            <select className="border p-3 rounded-md" name="" id="">
              <option className="" value="">
                Recently posted
              </option>
            </select>
            <select className="border p-3 rounded-md" name="" id="">
              <option className="" value="">
                All
              </option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services?.map((t: AdminGetServiceType, i: number) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-3 border border-[#EFEFF0] rounded-md"
              >
                <img
                  className="rounded-t-md h-40"
                  src={
                    t.image && t.image.length >= 1
                      ? t.image[0].url
                      : serviceImage1
                  }
                  alt=""
                />
                <div className="flex gap-3 px-3">
                  <div className="p-3 rounded-full bg-[#EDB842] w-fit h-fit"></div>
                  <div className="">{t.owner?.username}</div>
                </div>
                <div className="h-12 overflow-y-hidden px-3">{t.name}</div>
                <div className="px-3">
                  ${t.current_price && <FormatNumber price={t.current_price} />}
                </div>
                <div className="relative border-t border-[#EFEFF0] flex justify-between p-2 items-center">
                  <button
                    onClick={() => navigate(`/seller/service/edit/${t._id}`)}
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
                      <div
                        onClick={() =>
                          navigate(`/seller/service/details/${t._id}`)
                        }
                        className="flex gap-5 text-[#464D61] items-center"
                      >
                        <BsEye />
                        <div className="whitespace-nowrap">
                          View Service Details
                        </div>
                      </div>
                      <div
                        onClick={() => handleDelete(`${t._id}`)}
                        className="flex gap-5 text-[#464D61] items-center"
                      >
                        <MdDelete />
                        <div className="whitespace-nowrap">Delete Details</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-[#667085]">Showing 1-10 from 100</div>

          <div className="flex flex-row gap-2 items-center text-[#EDB842] self-center my-5">
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
                      } px-4 py-2 rounded-md`}
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
                    ? setDotIndex((prev: number) => prev + 3)
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

export default SellerServiceBody;
