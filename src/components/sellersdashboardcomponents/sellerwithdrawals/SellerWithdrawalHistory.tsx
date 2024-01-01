import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { MdDateRange, MdDelete, MdMoreVert, MdViewList } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  withdrawalDataItem,
  withdrawalDataType,
} from "../../../data/withdrawal";
import {
  sellerDeleteWithdrawalAction,
  sellerGetWithdrawalsAction,
} from "../../../redux/actions/seller/seller-withdrawal.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { WithdrawalResponseType } from "../../../redux/types/withdrawal.types";
import { FormatNumber } from "../../shareables/FormatNumber";
const SellerWithdrawalHistory = () => {
  const newArray: withdrawalDataType[] = [];

  for (let i = 0; i < 5; i++) {
    newArray.push(...withdrawalDataItem);
  }

  const [dropDown, setDropDown] = useState<number | undefined>();

  // fetch withdrawals
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();

  //seller get banks
  const sellerGetWithdrawalRedux = useSelector(
    (state: ReducersType) => state?.sellerGetWithdrawals
  ) as ReduxResponseType<WithdrawalResponseType[]>;

  const getWithdrawal = useMemo(() => {
    return sellerGetWithdrawalRedux?.serverResponse?.data;
  }, [sellerGetWithdrawalRedux]);

  useEffect(() => {
    dispatch(sellerGetWithdrawalsAction("") as any);
  }, [dispatch]);

  // console.log(getWithdrawal);
  // delete withdrawal
  const sellerDeleteWithdrawalByIDRedux = useSelector(
    (state: ReducersType) => state?.sellerDeleteWithdrawal
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
        dispatch(sellerDeleteWithdrawalAction({ id }) as any);

        if (!sellerDeleteWithdrawalByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            sellerDeleteWithdrawalByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            dispatch(sellerGetWithdrawalsAction("") as any);
          }, 1000);
        } else {
          Swal.fire(
            "Deleted!",
            sellerDeleteWithdrawalByIDRedux?.error,
            "error"
          );
        }
      }
    });
  };

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 justify-between items-center">
          <div className="font-[600] text-2xl playfair-display">
            Withdrawal History
          </div>
          {/* <button className="flex gap-2 items-center p-2 border rounded-md">
            <GrDocumentText />
            <span>Export</span>
          </button> */}
        </div>
        <div className="w-full border p-3 rounded-md overflow-x-auto">
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
              {getWithdrawal && getWithdrawal.length > 0 ? (
                getWithdrawal.map((t, i) => {
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
                                onClick={() =>
                                  navigate(
                                    `/seller/withdrawal/details/${t._id}`
                                  )
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
        </div>
      </div>
    </section>
  );
};

export default SellerWithdrawalHistory;
