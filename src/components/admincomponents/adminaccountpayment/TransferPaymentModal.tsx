import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { circleWavy, circleWavyFailure } from "../../../images";
import {
  adminGetPendingWithdrawalsAction,
  adminWithdrawalPaymentAction,
} from "../../../redux/actions/admin/withdrawal.actions";
import { ADMIN_WITHDRAWAL_PAYMENT_RESET } from "../../../redux/constants/admin/admin-withdrawal.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import {
  AdminWithdrawalPaymentType,
  WithdrawalResponseType,
} from "../../../redux/types/withdrawal.types";

type TransferPaymentModalType = {
  showModal: any;
  handleClose: any;
  dataW: WithdrawalResponseType;
};

const TransferPaymentModal = ({
  showModal,
  handleClose,
  dataW,
}: TransferPaymentModalType) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  // create categories
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [status, setStatus] = useState<string>("");

  const [formData, setFormData] = useState<AdminWithdrawalPaymentType>({
    withdrawal_status: "success",
    withdrawal_amount: 0,
    id: "",
  });

  useEffect(() => {
    setTimeout(function () {
      setFormData({
        ...formData,
        // withdrawal_status: "",
        withdrawal_amount: dataW.withdrawal_amount,
        id: dataW._id,
      });
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataW]);

  // console.log(formData);

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

  const { id, withdrawal_amount, withdrawal_status } = formData;

  let adminMakeTransferRedux = useSelector(
    (state: ReducersType) => state?.adminWithdrawalPayment
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // console.log("submitted");
    console.log(formData);
    e.preventDefault();
    if (id && withdrawal_amount > 0 && withdrawal_status !== "pending") {
      dispatch(adminWithdrawalPaymentAction(formData) as any);
    }
  };

  useEffect(() => {
    adminMakeTransferRedux?.error && setStatus("failed");
    // Swal.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   timer: 5000,
    //   text: adminMakeTransferRedux?.error,
    // });
    adminMakeTransferRedux?.success && setStatus("success");
    // Swal.fire({
    //   icon: "success",
    //   title: "Successful",
    //   timer: 5000,
    //   text: adminMakeTransferRedux?.serverResponse?.message,
    // });
    if (adminMakeTransferRedux?.success) {
      setTimeout(function () {
        adminGetPendingWithdrawalsAction("");
        // navigate("/admin/withdrawals");
        setStatus("");
        handleClose();
      }, 4000);
    }
    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch({ type: ADMIN_WITHDRAWAL_PAYMENT_RESET });
    }, 2000);
  }, [adminMakeTransferRedux, dispatch, handleClose]);

  // console.log(dataW);
  return (
    <Modal
      className="modal top-[20%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div className="p-2">
        {status === "failed" && dataW?._id === formData?.id ? (
          <TransferFailure
            showModal={showModal}
            handleClose={() => handleClose(false)}
            errorMessage={adminMakeTransferRedux?.error}
          />
        ) : status === "success" && dataW?._id === formData?.id ? (
          <TransferSuccess
            showModal={showModal}
            handleClose={() => handleClose(false)}
            successMessage={adminMakeTransferRedux?.serverResponse?.message}
          />
        ) : (
          <form onSubmit={handleSubmit} className="">
            <div className="border-b flex justify-between p-2">
              <div className="font-[600] text-lg">
                Transfer to <span>({dataW?.withdrawal_mode})</span>
              </div>
              <div>
                <span className="text-[1.5rem]" onClick={handleClose}>
                  <AiOutlineCloseCircle />
                </span>
              </div>
            </div>
            <div className="py-6 px-3 flex flex-wrap gap-2 h-auto overflow-y-auto">
              <div className="flex flex-col w-full">
                <div className="">
                  Mode of Payment (
                  <span className="text-lg font-[600]">
                    {dataW?.withdrawal_mode}
                  </span>
                  )
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label className="font-[400] text-sm" htmlFor="">
                  User Data (Not payment email)
                </label>
                <input
                  className="border p-2 rounded-md bg-[#D9D9D970] text-sm text-[#5d5a5a]"
                  type="text"
                  placeholder="Adekunle Scoba"
                  defaultValue={dataW?.user?.email}
                  readOnly
                />
              </div>
              <div className="flex flex-col w-2/5">
                <label className="font-[400] text-sm" htmlFor="">
                  Withdrawal Amount in
                  <span className="text-lg font-[600]">
                    ({dataW?.currency})
                  </span>
                </label>
                <input
                  name="withdrawal_amount"
                  className="border p-2 rounded-md bg-[#D9D9D970]"
                  type="number"
                  placeholder="Email"
                  defaultValue={dataW?.withdrawal_amount}
                  value={formData?.withdrawal_amount}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col w-2/5 flex-1 justify-end">
                <label className="font-[400] text-sm" htmlFor="">
                  Select Payment Status
                </label>
                <select
                  name="withdrawal_status"
                  onChange={onChange}
                  className="border p-2 rounded-md bg-[#D9D9D970]"
                  defaultValue={dataW?.withdrawal_status}
                  value={formData?.withdrawal_status}
                >
                  <option value={"success"} selected>
                    Success
                  </option>
                  <option value={"failure"}>Failure</option>
                  <option value={"pending"}>Pending</option>
                  <option value={"decline"}>Decline</option>
                </select>
              </div>

              {dataW?.withdrawal_mode === "bank" && (
                <div className="flex flex-col w-2/5">
                  <label className="font-[400] text-sm" htmlFor="">
                    Bank Name
                  </label>
                  <input
                    className="border p-2 rounded-md bg-[#D9D9D970]"
                    type="text"
                    placeholder="First Bank"
                    defaultValue={dataW?.withdrawal_account?.bank_name}
                  />
                </div>
              )}
              {dataW?.withdrawal_mode === "bank" && (
                <div className="flex flex-col w-2/5  flex-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Account Name
                  </label>
                  <input
                    className="border p-2 rounded-md bg-[#D9D9D970]"
                    type="text"
                    placeholder="John kels"
                    defaultValue={dataW?.withdrawal_account?.account_name}
                  />
                </div>
              )}

              {dataW?.withdrawal_mode === "bank" && (
                <div className="flex flex-col w-2/5">
                  <label className="font-[400] text-sm" htmlFor="">
                    Account Number
                  </label>
                  <input
                    className="border p-2 rounded-md bg-[#D9D9D970]"
                    type="text"
                    placeholder="0398383883"
                    defaultValue={dataW?.withdrawal_account?.account_number}
                  />
                </div>
              )}

              {dataW?.withdrawal_mode === "bank" && (
                <div className="flex flex-col w-2/5 flex-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Routing/sort Number
                  </label>
                  <input
                    className="border p-2 rounded-md bg-[#D9D9D970]"
                    type="text"
                    placeholder="0398383883"
                    defaultValue={dataW?.withdrawal_account?.routing_number}
                  />
                </div>
              )}

              {dataW?.withdrawal_mode === "paypal" && (
                <div className="flex flex-col w-full">
                  <label className="font-[600] text-lg" htmlFor="">
                    Transfer To (Payment Email)
                  </label>
                  <input
                    className="border p-2 rounded-md bg-[#D9D9D970] font-[700] text-lg"
                    type="text"
                    placeholder="r@mail.com"
                    defaultValue={dataW?.withdrawal_account?.email}
                  />
                </div>
              )}
              {dataW?.withdrawal_mode === "payoneer" && (
                <div className="flex flex-col w-full">
                  <label className="font-[600] text-lg" htmlFor="">
                    Transfer To (Payment Email)
                  </label>
                  <input
                    className="border p-2 rounded-md bg-[#D9D9D970] font-[700] text-lg"
                    type="text"
                    placeholder="0398383883"
                    defaultValue={dataW?.withdrawal_account?.email}
                  />
                </div>
              )}
            </div>
            <div className="border-t flex justify-end gap-3 p-3">
              <button
                type="submit"
                className="py-2 px-5 border text-white bg-[#EDB842] rounded-md"
              >
                {adminMakeTransferRedux?.loading ? (
                  <div className="" style={{ height: "25px" }}>
                    <PulseLoader color="#ffffff" />
                  </div>
                ) : (
                  "Confirm"
                )}
              </button>
              <button
                className="py-2 px-5 border text-white bg-[#ED4242B0] rounded-md"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

const TransferSuccess = ({ showModal, handleClose, successMessage }: any) => {
  return (
    <div className="w-full h-[45vh] flex flex-col items-center justify-center text-center p-3 md:p-5">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <img src={circleWavy} alt="" />
        <div className="text-3xl font-[700] playfair-display">
          Payment is sucessful
        </div>
        <div className="text-sm text-[#767E94]">
          {successMessage && successMessage}
        </div>
        <div className="flex flex-row gap-3">
          <button
            onClick={handleClose}
            className="rounded-md border-2 border-[#EDB842] p-2 text-[#EDB842]"
          >
            Go back
          </button>
          <button className="flex flex-row gap-2 items-center text-white bg-[#EDB842] rounded-md p-2">
            <span>View details</span>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
const TransferFailure = ({ showModal, handleClose, errorMessage }: any) => {
  return (
    <div className="w-full h-[45vh] flex flex-col items-center justify-center text-center p-3 md:p-5">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <img src={circleWavyFailure} alt="" />
        <div className="text-3xl font-[700] playfair-display">
          Payment was unsucessful
        </div>
        <div className="text-sm text-[#767E94]">
          {errorMessage && errorMessage}
        </div>
        <div className="flex flex-row gap-3">
          <button
            onClick={handleClose}
            className="rounded-md border-2 border-[#EDB842] p-2 text-[#EDB842]"
          >
            Go back
          </button>
          <button className="flex flex-row gap-2 items-center text-white bg-[#EDB842] rounded-md p-2">
            <span>View details</span>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferPaymentModal;
