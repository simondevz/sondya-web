import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import {
  sellerGetWithdrawalsAction,
  sellerWithdrawAction,
} from "../../../redux/actions/seller/seller-withdrawal.actions";
import { SELLER_WITHDRAWAL_RESET } from "../../../redux/constants/seller/seller-withdrawals.constants";
import { ReducersType } from "../../../redux/store";
import { GetBalanceType } from "../../../redux/types/accounts.types";
import { LoginResponseType } from "../../../redux/types/auth.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { SellerWithdrawalType } from "../../../redux/types/withdrawal.types";

const RequestWithdrawalModal = ({ showModal, handleClose, bankData }: any) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let sellerWithdrawalRedux = useSelector(
    (state: ReducersType) => state?.sellerWithdraw
  ) as ReduxResponseType;

  // get uploader details starts
  let login = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType>;

  const [formData, setFormData] = useState<SellerWithdrawalType>({
    user: {
      id: login?.serverResponse?.data?.id,
      username: login?.serverResponse?.data?.username as string,
      email: login?.serverResponse?.data?.email,
    },
    currency: "USD",
    withdrawal_amount: 0,
    withdrawal_mode: "bank",
    withdrawal_account: "",
  });
  const { currency, withdrawal_amount, withdrawal_mode, withdrawal_account } =
    formData;

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      withdrawal_amount &&
      withdrawal_mode &&
      withdrawal_account &&
      currency
    ) {
      dispatch(sellerWithdrawAction(formData) as any);
    }
  };

  useEffect(() => {
    if (sellerWithdrawalRedux?.success) {
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: sellerWithdrawalRedux?.serverResponse?.message,
      });
    }
    if (sellerWithdrawalRedux?.success) {
      setTimeout(function () {
        handleClose();
        dispatch(sellerGetWithdrawalsAction("") as any);
      }, 4000);
      setTimeout(() => {
        dispatch({ type: SELLER_WITHDRAWAL_RESET });
      }, 4000);
    }
  }, [sellerWithdrawalRedux, dispatch, navigate, handleClose]);

  const bankDataType: GetBalanceType = bankData;

  console.log(formData);
  return (
    <Modal
      className="modal top-[30%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <form onSubmit={handleSubmit}>
        <div className="border-b flex justify-between p-2">
          <div className="font-[600] text-lg">Request Withdrawal</div>
          <div>
            <span className="text-[1.5rem]" onClick={handleClose}>
              <AiOutlineCloseCircle />
            </span>
          </div>
        </div>
        <div className="py-6 px-3 flex flex-col gap-1 h-auto overflow-y-auto">
          <div className="text-[#5F6C72] my-2">
            Enter amount to be received in your account
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-[400] text-sm" htmlFor="">
              Enter Account
            </label>
            <input
              name="withdrawal_amount"
              onChange={onChange}
              className="border p-2 rounded-md"
              type="number"
              placeholder="Enter Account"
              required
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-[400] text-sm" htmlFor="">
              Select Withdrawal Mode
            </label>
            <select
              name="withdrawal_mode"
              className="border p-2 rounded-md"
              onChange={onChange}
              required
            >
              <option value="bank">Bank</option>
              <option value="paypal">Paypal</option>
              <option value="payoneer">payoneer</option>
            </select>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-[400] text-sm" htmlFor="">
              Select from existing accounts
            </label>
            <select
              name="withdrawal_account"
              // onChange={onChange}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  withdrawal_account: JSON.parse(e.target.value),
                }));
              }}
              className="border p-2 rounded-md"
              id=""
              required
            >
              <option value="">Select withdrawal Account </option>
              {formData.withdrawal_mode === "bank" &&
                bankDataType.bank_account &&
                bankDataType.bank_account.length > 0 &&
                bankDataType.bank_account.map((t, i) => (
                  <option key={i} value={JSON.stringify(t)}>
                    {t.bank_name},{t.account_name}
                  </option>
                ))}
              {formData.withdrawal_mode === "paypal" &&
                bankDataType.paypal_account &&
                bankDataType.paypal_account.length > 0 &&
                bankDataType.paypal_account.map((t, i) => (
                  <option key={i} value={JSON.stringify(t)}>
                    {t.email} (Paypal)
                  </option>
                ))}
              {formData.withdrawal_mode === "payoneer" &&
                bankDataType.payoneer_account &&
                bankDataType.payoneer_account.length > 0 &&
                bankDataType.payoneer_account.map((t, i) => (
                  <option key={i} value={JSON.stringify(t)}>
                    {t.email} (payoneer)
                  </option>
                ))}
            </select>
          </div>
          <div className="">
            {sellerWithdrawalRedux?.error && (
              <div className="text-[#DB4444]">
                {sellerWithdrawalRedux?.error}
              </div>
            )}
          </div>
        </div>
        <div className="border-t flex justify-end gap-3 p-3">
          <button
            className="p-2 border text-white bg-[#6f442b] rounded-md"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 border text-white bg-[#EDB842] rounded-md"
          >
            {sellerWithdrawalRedux?.loading ? (
              <div className="" style={{ height: "25px" }}>
                <PulseLoader color="#ffffff" />
              </div>
            ) : (
              <span>Continue</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RequestWithdrawalModal;
