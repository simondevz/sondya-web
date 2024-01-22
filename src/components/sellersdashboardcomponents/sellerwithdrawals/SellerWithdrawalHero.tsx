import { useEffect, useMemo, useState } from "react";
import { BsSend } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { gtBankPics } from "../../../images/withdrawal";
import {
  sellerDeleteBankAction,
  sellerDeletePayoneerAction,
  sellerDeletePaypalAction,
  sellerGetBalanceAction,
} from "../../../redux/actions/seller/seller-accounts.actions";
import { ReducersType } from "../../../redux/store";
import { GetBalanceType } from "../../../redux/types/accounts.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { FormatNumber } from "../../shareables/FormatNumber";
import AddAccountModal from "./AddAccountModal";
import RequestWithdrawalModal from "./RequestWithdrawalModal";
import { WithdrawalStatType } from "../../../redux/types/withdrawal.types";
import { sellerGetWithdrawalStatAction } from "../../../redux/actions/seller/seller-withdrawal.actions";
import { LoginResponseType } from "../../../redux/types/auth.types";
import { SELLER_GET_WITHDRAWAL_STATS_RESET } from "../../../redux/constants/seller/seller-withdrawals.constants";

const SellerWithdrawalHero = () => {
  // React state to control Modal visibility
  const [AddAccount, setAddAccount] = useState(false);
  const [RequestWithdrawal, setRequestWithdrawal] = useState(false);
  const [witdrawalStat, setWithdrawalStat] = useState<WithdrawalStatType>();

  // fetch balance
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();

  //seller get banks
  const sellerGetBalanceRedux = useSelector(
    (state: ReducersType) => state?.sellerGetBalance
  ) as ReduxResponseType<GetBalanceType>;

  const login = useSelector(
    (state: ReducersType) => state.login
  ) as ReduxResponseType<LoginResponseType>;

  const getBalance = useMemo(() => {
    return sellerGetBalanceRedux?.serverResponse?.data;
  }, [sellerGetBalanceRedux]);

  useEffect(() => {
    dispatch(sellerGetBalanceAction() as any);
  }, [dispatch]);

  // get withdrawal stat (pending and completed transactions)
  const withdrawalStatRedux = useSelector(
    (state: ReducersType) => state.sellerGetWithdrawalStat
  ) as ReduxResponseType<WithdrawalStatType>;

  useEffect(() => {
    if (login.serverResponse.data?.id)
      dispatch(
        sellerGetWithdrawalStatAction({
          user_id: login.serverResponse.data?.id,
        }) as any
      );
  }, [dispatch, login.serverResponse.data?.id]);

  useEffect(() => {
    if (withdrawalStatRedux?.success) {
      setWithdrawalStat(withdrawalStatRedux?.serverResponse?.data);
      dispatch({ type: SELLER_GET_WITHDRAWAL_STATS_RESET });
    }

    if (withdrawalStatRedux?.error)
      Swal.fire({
        title: "Error!!",
        text: withdrawalStatRedux?.error,
        icon: "error",
        timer: 4000,
        confirmButtonText: "Okay",
      }).finally(() => dispatch({ type: SELLER_GET_WITHDRAWAL_STATS_RESET }));
  }, [
    dispatch,
    withdrawalStatRedux?.error,
    withdrawalStatRedux?.serverResponse?.data,
    withdrawalStatRedux?.success,
  ]);

  // delete bank Accounts
  const sellerDeleteBankRedux = useSelector(
    (state: ReducersType) => state?.sellerDeleteBankAccount
  ) as ReduxResponseType<any>;

  // delete Paypal Accounts
  const sellerDeletePaypalRedux = useSelector(
    (state: ReducersType) => state?.sellerDeletePaypalAccount
  ) as ReduxResponseType<any>;

  // delete Payoneer Accounts
  const sellerDeletePayoneerRedux = useSelector(
    (state: ReducersType) => state?.sellerDeletePayoneerAccount
  ) as ReduxResponseType<any>;

  const handleDelete = (id: string, type: string) => {
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
        if (type === "bank") {
          dispatch(sellerDeleteBankAction({ id }) as any);
        } else if (type === "paypal") {
          dispatch(sellerDeletePaypalAction({ id }) as any);
        } else if (type === "payoneer") {
          dispatch(sellerDeletePayoneerAction({ id }) as any);
        }

        const deleteMessage =
          sellerDeleteBankRedux.serverResponse.message +
          sellerDeletePaypalRedux.serverResponse.message +
          sellerDeletePayoneerRedux.serverResponse.message;

        const deleteErrorMessage =
          sellerDeleteBankRedux?.error +
          sellerDeletePaypalRedux?.error +
          sellerDeletePayoneerRedux?.error;

        if (
          !sellerDeleteBankRedux.error ||
          !sellerDeletePaypalRedux.error ||
          !sellerDeletePayoneerRedux.error
        ) {
          Swal.fire("Deleted!", deleteMessage, "success");
          setTimeout(() => {
            dispatch(sellerGetBalanceAction() as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", deleteErrorMessage, "error");
        }
      }
    });
  };

  return (
    <section>
      <div className="flex flex-col gap-5">
        <div className="font-[700] text-[2rem] playfair-display">
          Withdrawal
        </div>
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[400] text-sm w-auto">
            Track and manage customer information and activities. Click transfer
            to send to your persoanl account
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => setAddAccount(true)}
              className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2"
            >
              <span className="text-[#EDB842]">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add account</span>
            </button>
            <button
              onClick={() => setRequestWithdrawal(true)}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span>
                <BsSend />
              </span>
              <span>Withdraw</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly gap-4">
          <div className="border p-8 rounded-md w-fit hit-fit text-center">
            <div className="font-[600] text-sm">Total Funds</div>
            <div className="font-[700] text-[2.3rem]">
              $
              {getBalance?.balance && (
                <FormatNumber price={getBalance?.balance} />
              )}
            </div>
          </div>
          <div className="border p-8 rounded-md w-fit hit-fit text-center">
            <div className="font-[600] text-sm">Pending Withdrawal</div>
            <div className="font-[700] text-[2.3rem]">
              $
              {witdrawalStat?.pending && (
                <FormatNumber price={witdrawalStat?.pending} />
              )}
            </div>
          </div>
          <div className="border p-8 rounded-md w-fit hit-fit text-center flex-1 md:max-w-[24rem]">
            <div className="font-[600] text-sm">Completed</div>
            <div className="font-[700] text-[2.3rem]">
              $
              {witdrawalStat?.completed && (
                <FormatNumber price={witdrawalStat?.completed} />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-evenly gap-4 overflow-x-scroll">
          {getBalance.bank_account &&
            getBalance.bank_account.length > 0 &&
            getBalance.bank_account.map((t, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-row gap-2 border p-2 rounded-md w-full md:w-1/3 max-w-[15rem] md:max-w-[19rem]"
                >
                  <div className="w-1/6 mt-2">
                    <img
                      className="object-cover rounded-full w-[80%]"
                      src={gtBankPics}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-4 flex-grow">
                    <div className="flex flex-row gap-3 justify-between items-center">
                      <span className="text-[#1D2939]">{t.bank_name}</span>{" "}
                      <div className="flex flex-row gap-3 items-center">
                        {/* <span className="bg-[#EDB84233] p-1 rounded-2xl text-[#EDB842]">
                          Primary
                        </span> */}
                        <span className="bg-[#FF8577] p-1 text-white rounded-full">
                          <TiTick />
                        </span>
                      </div>
                    </div>
                    <div className="text-[#5F6C72]">{t.account_number}</div>
                    <div className="text-[#5F6C72] -mt-4">{t.account_name}</div>
                    <div className="flex flex-row justify-around">
                      <button
                        type="button"
                        onClick={() => handleDelete(t.account_id ?? "", "bank")}
                        className="text-[#FF8577]"
                      >
                        Delete
                      </button>
                      {/* <button className="text-[#5F6C72]">Edit</button> */}
                    </div>
                  </div>
                </div>
              );
            })}
          {getBalance.paypal_account &&
            getBalance.paypal_account.length > 0 &&
            getBalance.paypal_account.map((t, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-row gap-2 border p-2 rounded-md w-full md:w-1/3 max-w-[15rem] md:max-w-[19rem]"
                >
                  <div className="w-1/6 mt-2">
                    <img
                      className="object-cover rounded-full w-[80%]"
                      src={gtBankPics}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-4 flex-grow">
                    <div className="flex flex-row gap-3 justify-between items-center">
                      <span className="text-[#1D2939]">PayPal Details</span>{" "}
                      <div className="flex flex-row gap-3 items-center">
                        {/* <span className="bg-[#EDB84233] p-1 rounded-2xl text-[#EDB842]">
                          Primary
                        </span> */}
                        <span className="bg-[#FF8577] p-1 text-white rounded-full">
                          <TiTick />
                        </span>
                      </div>
                    </div>
                    <div className="text-[#5F6C72]">{t.email}</div>
                    <div className="flex flex-row justify-around">
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(t.paypal_id ?? "", "paypal")
                        }
                        className="text-[#FF8577]"
                      >
                        Delete
                      </button>
                      {/* <button className="text-[#5F6C72]">Edit</button> */}
                    </div>
                  </div>
                </div>
              );
            })}
          {getBalance.payoneer_account &&
            getBalance.payoneer_account.length > 0 &&
            getBalance.payoneer_account.map((t, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-row gap-2 border p-2 rounded-md w-full md:w-1/3 max-w-[15rem] md:max-w-[19rem]"
                >
                  <div className="w-1/6 mt-2">
                    <img
                      className="object-cover rounded-full w-[80%]"
                      src={gtBankPics}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-4 flex-grow">
                    <div className="flex flex-row gap-3 justify-between items-center">
                      <span className="text-[#1D2939]">Payoneer Details</span>{" "}
                      <div className="flex flex-row gap-3 items-center">
                        {/* <span className="bg-[#EDB84233] p-1 rounded-2xl text-[#EDB842]">
                          Primary
                        </span> */}
                        <span className="bg-[#FF8577] p-1 text-white rounded-full">
                          <TiTick />
                        </span>
                      </div>
                    </div>
                    <div className="text-[#5F6C72]">{t.email}</div>
                    <div className="flex flex-row justify-around">
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(t.payoneer_id ?? "", "payoneer")
                        }
                        className="text-[#FF8577]"
                      >
                        Delete
                      </button>
                      {/* <button className="text-[#5F6C72]">Edit</button> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="">
          <AddAccountModal
            showModal={AddAccount}
            handleClose={() => setAddAccount(false)}
          />
          <RequestWithdrawalModal
            showModal={RequestWithdrawal}
            handleClose={() => setRequestWithdrawal(false)}
            bankData={getBalance}
          />
        </div>
      </div>
    </section>
  );
};

export default SellerWithdrawalHero;
