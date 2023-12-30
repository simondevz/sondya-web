import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdDateRange, MdDelete, MdMoreVert, MdViewList } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  adminDeleteWithdrawalAction,
  adminGetPendingWithdrawalsAction,
} from "../../../redux/actions/admin/withdrawal.actions";
import { ReducersType } from "../../../redux/store";
import {
  Paginator,
  ReduxResponseType,
} from "../../../redux/types/general.types";
import { WithdrawalResponseType } from "../../../redux/types/withdrawal.types";
import { FormatNumber } from "../../shareables/FormatNumber";
import TransferPaymentModal from "./TransferPaymentModal";

const AdminAccountPaymentBody = () => {
  return (
    <section>
      <div className="flex flex-col gap-3 md:gap-14">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Account Withdrawal</div>
          <div className="flex flex-row gap-2">
            <Link
              to={"/admin/withdrawal/history"}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              Withdrawal History
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 md:gap-3 justify-around">
          <div className="flex flex-col gap-3 m-1">
            <div className="flex flex-wrap gap-3">
              <div className="p-5 bg-[#6EE087] flex flex-col rounded-lg text-white">
                <div className="font-[600]">Balance</div>
                <div className="font-[700] text-3xl">$45.500,12</div>
                <div className="text-[0.7rem] font-[400]">
                  Monday, 17th September
                </div>
              </div>
              <div className="p-5 bg-[#00000040] flex flex-col rounded-lg text-white">
                <div className="font-[600]">Total Withdrawal</div>
                <div className="font-[700] text-3xl">$45.500,12</div>
                <div className="text-[0.7rem] font-[400]">
                  Monday, 17th September
                </div>
              </div>
              <div className="p-5 bg-[#EDB842] flex flex-col rounded-lg text-white">
                <div className="font-[600]">Pending</div>
                <div className="font-[700] text-3xl">$5.500,12</div>
                <div className="text-[0.7rem] font-[400]">
                  Monday, 17th September
                </div>
              </div>
            </div>
          </div>
        </div>
        <AccountTable />
      </div>
    </section>
  );
};

type QueryType = {
  page: number;
};

const AccountTable = () => {
  const limit: number = 20;

  // fetch categories
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [query, setQuery] = useState<QueryType>({
    page: 1,
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
        if (value !== undefined && value !== null) {
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

  const adminGetPendingWithdrawalsRedux = useSelector(
    (state: ReducersType) => state?.adminGetPendingWithdrawal
  ) as ReduxResponseType<Paginator<WithdrawalResponseType[]>>;

  const Pendingwithdrawals = useMemo(() => {
    return adminGetPendingWithdrawalsRedux?.serverResponse?.data;
  }, [adminGetPendingWithdrawalsRedux]);

  useEffect(() => {
    dispatch(adminGetPendingWithdrawalsAction(queryString) as any);
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
            dispatch(adminGetPendingWithdrawalsAction(queryString) as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", adminDeleteWithdrawalByIDRedux?.error, "error");
        }
      }
    });
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
    adminGetPendingWithdrawalsRedux?.serverResponse?.data?.count &&
      setTotalPages(
        Math.ceil(
          adminGetPendingWithdrawalsRedux?.serverResponse?.data?.count / limit
        )
      );
  }, [
    adminGetPendingWithdrawalsRedux?.serverResponse?.data?.count,
    query,
    setQuery,
  ]);

  const [dropDown, setDropDown] = useState<number | undefined>();
  const [TransferMoneyModal, setTransferMoneyModal] = useState(false);

  const [dataW, setDataW] = useState<WithdrawalResponseType>({
    _id: "",
    user: {
      id: "",
      email: "",
      username: "",
    },
    currency: "",
    withdrawal_amount: 0,
    withdrawal_mode: "",
    withdrawal_account: null,
    withdrawal_status: "",
  });
  return (
    <>
      <div className="w-full p-3 shadow-md m-3 overflow-auto">
        <table className="table-auto w-full">
          <thead className="bg-[#EDB84233] rounded-md">
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
            {Pendingwithdrawals?.data && Pendingwithdrawals?.data.length > 0 ? (
              Pendingwithdrawals?.data.map((t, i) => {
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
                      <div className="relative">
                        <span
                          onClick={() => {
                            dropDown === undefined
                              ? setDropDown(i)
                              : setDropDown(undefined);
                          }}
                          className="mx-auto text-[#98A2B3]"
                        >
                          <MdMoreVert />
                        </span>
                        {dropDown === i && (
                          <div className="absolute bg-white -left-28 flex flex-col gap-2 z-20 border px-3 py-2 rounded-lg">
                            <div
                              onClick={() => {
                                setTransferMoneyModal(true);
                                setDataW(t);
                              }}
                              className="flex gap-3 font-[600] items-center text-[#27C200]"
                            >
                              <TiTick />{" "}
                              <span className="whitespace-nowrap">
                                Make Payment
                              </span>
                            </div>
                            <div
                              onClick={() =>
                                navigate(`/admin/withdrawals/details/${t._id}`)
                              }
                              className="flex gap-3 font-[600] items-center text-[#464D61]"
                            >
                              <MdViewList />
                              <span>View Details</span>
                            </div>
                            <div
                              onClick={() => handleDelete(t._id)}
                              className="flex gap-3 font-[600] items-center text-[#464D61]"
                            >
                              <MdDelete />
                              <span>Delete</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>No Withdrawal History</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex flex-row justify-between items-center">
          <div className="text-[#667085]">
            Showing {(query.page - 1) * limit} -{" "}
            {Pendingwithdrawals.count && Pendingwithdrawals.count > limit
              ? query.page * limit
              : Pendingwithdrawals.count}
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
        <TransferPaymentModal
          showModal={TransferMoneyModal}
          handleClose={() => setTransferMoneyModal(false)}
          dataW={dataW}
        />
      </div>
    </>
  );
};

export default AdminAccountPaymentBody;
