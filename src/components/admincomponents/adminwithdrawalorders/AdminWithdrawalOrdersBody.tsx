import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { MdDateRange, MdDelete, MdViewList } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  adminDeleteWithdrawalAction,
  adminGetWithdrawalsAction,
} from "../../../redux/actions/admin/withdrawal.actions";
import { ReducersType } from "../../../redux/store";
import {
  Paginator,
  ReduxResponseType,
} from "../../../redux/types/general.types";
import { WithdrawalResponseType } from "../../../redux/types/withdrawal.types";
import { FormatNumber } from "../../shareables/FormatNumber";

type QueryType = {
  page: number;
  search: string;
  status: string;
};

const AdminWithdrawalOrdersBody = () => {
  const limit: number = 20;
  const [payment, setPayment] = useState("all");

  // fetch categories
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
    status: "",
  });

  const [totalPages, setTotalPages] = useState<number>(0);
  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);

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

  const adminGetWithdrawalsRedux = useSelector(
    (state: ReducersType) => state?.adminGetWithdrawals
  ) as ReduxResponseType<Paginator<WithdrawalResponseType[]>>;

  const withdrawalsHistory = useMemo(() => {
    return adminGetWithdrawalsRedux?.serverResponse?.data;
  }, [adminGetWithdrawalsRedux]);

  useEffect(() => {
    dispatch(adminGetWithdrawalsAction(queryString) as any);
  }, [dispatch, queryString]);

  // delete withdrawal
  const adminDeleteWithdrawalByIDRedux = useSelector(
    (state: ReducersType) => state?.adminDeleteWithdrawal
  ) as ReduxResponseType<WithdrawalResponseType>;

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
        dispatch(adminDeleteWithdrawalAction({ id }) as any);

        if (!adminDeleteWithdrawalByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            adminDeleteWithdrawalByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            dispatch(adminGetWithdrawalsAction(queryString) as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", adminDeleteWithdrawalByIDRedux?.error, "error");
        }
      }
    });
  };

  const search = (
    e:
      | React.ChangeEvent<HTMLInputElement>
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
    adminGetWithdrawalsRedux?.serverResponse?.data?.count &&
      setTotalPages(
        Math.ceil(adminGetWithdrawalsRedux?.serverResponse?.data?.count / limit)
      );
  }, [adminGetWithdrawalsRedux?.serverResponse?.data?.count, query, setQuery]);

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto flex gap-3 items-center">
            <button
              onClick={() => navigate("/admin/withdrawals")}
              className="text-[#EDB842]"
            >
              <AiOutlineArrowLeft />
            </button>
            {payment === "pending" ? (
              <span>Pending Orders</span>
            ) : payment === "paid" ? (
              <span>Paid Orders</span>
            ) : payment === "declined" ? (
              <span>Failed Orders</span>
            ) : (
              <span>All Orders</span>
            )}
          </div>
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
              placeholder="user search"
            />
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => {
                setPayment("all");
                setQuery({
                  ...query,
                  page: 1,
                  status: "",
                });
              }}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              All
            </button>
            <button
              onClick={() => {
                setPayment("success");
                setQuery({
                  ...query,
                  page: 1,
                  status: "success",
                });
              }}
              className="flex flex-row items-center p-2 rounded-md bg-[#6EE087] text-white gap-2"
            >
              Success
            </button>
            <button
              onClick={() => {
                setPayment("pending");
                setQuery({
                  ...query,
                  page: 1,
                  status: "pending",
                });
              }}
              className="flex flex-row items-center p-2 rounded-md bg-[#BBBBBB] text-white gap-2"
            >
              Pending
            </button>
            <button
              onClick={() => {
                setPayment("failed");
                setQuery({
                  ...query,
                  page: 1,
                  status: "failed",
                });
              }}
              className="flex flex-row items-center p-2 rounded-md bg-[#F22424CC] text-white gap-2"
            >
              Failed
            </button>
          </div>
        </div>
        <div className="">
          <div className="w-full p-3 shadow-md m-3 overflow-auto">
            <table className="table-auto w-full">
              <thead className="bg-[#FAFBFB]  rounded-md">
                <tr>
                  <th className="p-2 text-start text-[#667085] font-[600] whitespace-nowrap">
                    Order Date
                  </th>
                  <th className="p-2 text-start text-[#667085] font-[600] whitespace-nowrap">
                    Sellers Name
                  </th>
                  <th className="p-2 text-start text-[#667085] font-[600]">
                    Account Details
                  </th>
                  <th className="p-2 text-start text-[#667085] font-[600]">
                    Amount
                  </th>
                  <th className="p-2 text-start text-[#667085] font-[600]">
                    Withdrawal Mode
                  </th>
                  <th className="p-2 text-start text-[#667085] font-[600]">
                    Status
                  </th>
                  <th className="p-2 text-start text-[#667085] font-[600]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {withdrawalsHistory?.data &&
                withdrawalsHistory?.data.length > 0 ? (
                  withdrawalsHistory?.data.map((t, i) => {
                    const dateString = t.createdAt ? t.createdAt : "";
                    const dateObject = new Date(dateString);
                    const formattedDate = format(dateObject, "MMMM d, yyyy");
                    const formattedTime = format(dateObject, "hh:mm a");
                    return (
                      <tr key={i}>
                        <td className="p-3 text-[#292929] whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="p-2 bg-[#F5F6F7] rounded-full text-[#7A8699]">
                              <MdDateRange />
                            </span>
                            <div className="flex flex-col gap-1">
                              <div className="font-[600]">{formattedDate}</div>
                              <div className="font-[400] text-sm text-[#5F6C72]">
                                {formattedTime}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-[#667085]">{t?.user?.email}</td>
                        <td className="p-3 text-[#292929]">
                          <div className="flex items-center gap-2">
                            {t?.withdrawal_mode === "bank" ? (
                              <div className="flex flex-col gap-1">
                                <div className="font-[600]">
                                  {t?.withdrawal_account?.bank_name}
                                </div>
                                <div className="font-[600]">
                                  {t?.withdrawal_account?.account_name}
                                </div>
                                <div className="font-[400] text-sm text-[#5F6C72]">
                                  {t?.withdrawal_account?.account_number}
                                </div>
                              </div>
                            ) : t?.withdrawal_mode === "paypal" ? (
                              <div className="flex flex-col gap-1">
                                <div className="font-[600]">
                                  {t?.withdrawal_account?.email}
                                </div>
                              </div>
                            ) : t?.withdrawal_mode === "payoneer" ? (
                              <div className="flex flex-col gap-1">
                                <div className="font-[600]">
                                  {t?.withdrawal_account?.email}
                                </div>
                              </div>
                            ) : (
                              <div className="">No account chosen</div>
                            )}
                          </div>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          $
                          {t?.withdrawal_amount && (
                            <FormatNumber price={t.withdrawal_amount} />
                          )}
                        </td>
                        <td className="p-3">{t.withdrawal_mode}</td>
                        <td className="p-3">{t.withdrawal_status}</td>
                        <td className="">
                          <button
                            type="button"
                            onClick={() => handleDelete(t._id)}
                            className="gap-3 font-[600] me-0 text-[#464D61]"
                          >
                            <MdDelete />
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/admin/withdrawals/details/${t._id}`)
                            }
                          >
                            {" "}
                            <MdViewList />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="text-center">No Withdrawal History</div>
                )}
              </tbody>
            </table>
            <div className="flex flex-row justify-between items-center">
              <div className="text-[#667085]">
                Showing {(query.page - 1) * limit} -{" "}
                {withdrawalsHistory.count && withdrawalsHistory.count > limit
                  ? query.page * limit
                  : withdrawalsHistory.count}
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
        </div>
      </div>
    </section>
  );
};

export default AdminWithdrawalOrdersBody;
