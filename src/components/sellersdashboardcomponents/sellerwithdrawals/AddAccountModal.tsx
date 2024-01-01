import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import {
  sellerAddBankAccountAction,
  sellerAddPayoneerAccountAction,
  sellerAddPaypalAccountAction,
  sellerGetBalanceAction,
} from "../../../redux/actions/seller/seller-accounts.actions";
import {
  SELLER_ADD_BANK_RESET,
  SELLER_ADD_PAYONEER_RESET,
  SELLER_ADD_PAYPAL_RESET,
} from "../../../redux/constants/seller/seller-accounts.constants";
import { ReducersType } from "../../../redux/store";
import {
  BankAccountType,
  PayoneerAccountType,
  PaypalAccountType,
} from "../../../redux/types/accounts.types";
import { ReduxResponseType } from "../../../redux/types/general.types";

const AddAccountModal = ({ showModal, handleClose }: any) => {
  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // add account
  const [postType, setPostType] = useState<string>("bank");

  let sellerAddBankRedux = useSelector(
    (state: ReducersType) => state?.sellerAddBankAccount
  ) as ReduxResponseType;

  let sellerAddPaypalRedux = useSelector(
    (state: ReducersType) => state?.sellerAddPaypalAccount
  ) as ReduxResponseType;

  let sellerAddPayoneerRedux = useSelector(
    (state: ReducersType) => state?.sellerAddPayoneerAccount
  ) as ReduxResponseType;

  const [formDataBank, setFormDataBank] = useState<BankAccountType>({
    account_name: "",
    bank_name: "",
    account_number: "",
    routing_number: "",
  });
  const [formDataPaypal, setFormDataPaypal] = useState<PaypalAccountType>({
    email: "",
  });
  const [formDataPayoneer, setFormDataPayoneer] = useState<PayoneerAccountType>(
    { email: "" }
  );

  const onChangeBank = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataBank((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangePaypal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataPaypal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangePayoneer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataPayoneer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postType === "bank") {
      const { account_name, account_number, bank_name } = formDataBank;
      if (account_name && account_number && bank_name) {
        dispatch(sellerAddBankAccountAction(formDataBank) as any);
      }
    } else if (postType === "paypal") {
      const { email } = formDataPaypal;
      if (email) {
        dispatch(sellerAddPaypalAccountAction(formDataPaypal) as any);
      }
    } else if (postType === "payoneer") {
      const { email } = formDataPayoneer;
      if (email) {
        dispatch(sellerAddPayoneerAccountAction(formDataPayoneer) as any);
      }
    }
  };

  useEffect(() => {
    if (
      sellerAddBankRedux?.success ||
      sellerAddPaypalRedux?.success ||
      sellerAddPayoneerRedux?.success
    ) {
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text:
          sellerAddBankRedux?.serverResponse?.message +
          sellerAddPaypalRedux?.serverResponse?.message +
          sellerAddPayoneerRedux?.serverResponse?.message,
      });
    }

    if (
      sellerAddBankRedux?.success ||
      sellerAddPaypalRedux?.success ||
      sellerAddPayoneerRedux?.success
    ) {
      setTimeout(function () {
        handleClose();
        dispatch(sellerGetBalanceAction() as any);
      }, 4000);
      setTimeout(() => {
        dispatch({ type: SELLER_ADD_BANK_RESET });
        dispatch({ type: SELLER_ADD_PAYPAL_RESET });
        dispatch({ type: SELLER_ADD_PAYONEER_RESET });
      }, 4000);
    }
  }, [
    sellerAddBankRedux,
    sellerAddPaypalRedux,
    sellerAddPayoneerRedux,
    dispatch,
    navigate,
    handleClose,
  ]);
  return (
    <Modal
      className="modal top-[20%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <form onSubmit={handleSubmit}>
        <div className="border-b flex justify-between p-2">
          <div className="font-[600] text-lg">Add Account</div>
          <div>
            <span className="text-[1.5rem]" onClick={handleClose}>
              <AiOutlineCloseCircle />
            </span>
          </div>
        </div>
        <div className="py-6 px-3 flex flex-col gap-1 h-auto overflow-y-auto">
          <div className="text-[#5F6C72]">
            Money gotten from your buisness can be paid heres.
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-[400] text-sm" htmlFor="">
              Input Your Bank Name
            </label>
            <select
              className="border p-2 rounded-md"
              onChange={(e) => setPostType(e.target.value)}
            >
              <option value="bank">Bank</option>
              <option value="paypal">Paypal</option>
              <option value="payoneer">payoneer</option>
            </select>
          </div>
          {postType === "bank" && (
            <div className="flex flex-col w-full gap-2">
              <label className="font-[400] text-sm" htmlFor="">
                Input Your Bank Name
              </label>
              <input
                name="bank_name"
                className="border p-2 rounded-md"
                type="text"
                placeholder="Account Name"
                onChange={onChangeBank}
              />
            </div>
          )}
          {postType === "bank" && (
            <div className="flex flex-col w-full gap-2">
              <label className="font-[400] text-sm" htmlFor="">
                Input Your Account Number
              </label>
              <input
                name="account_number"
                className="border p-2 rounded-md"
                type="text"
                placeholder="Account Number"
                onChange={onChangeBank}
              />
            </div>
          )}
          {postType === "bank" && (
            <div className="flex flex-col w-full gap-2">
              <label className="font-[400] text-sm" htmlFor="">
                Input Your Account Name
              </label>
              <input
                name="account_name"
                className="border p-2 rounded-md"
                type="text"
                placeholder="Account Name"
                onChange={onChangeBank}
              />
            </div>
          )}
          {postType === "bank" && (
            <div className="flex flex-col w-full gap-2">
              <label className="font-[400] text-sm" htmlFor="">
                Input Your Rounting Number
              </label>
              <input
                name="routing_number"
                className="border p-2 rounded-md"
                type="text"
                placeholder="Account Name"
                onChange={onChangeBank}
              />
            </div>
          )}
          {postType === "paypal" && (
            <div className="flex flex-col w-full gap-2">
              <label className="font-[400] text-sm" htmlFor="">
                Input Paypal recepient Email
              </label>
              <input
                name="email"
                className="border p-2 rounded-md"
                type="email"
                placeholder="paypal email"
                onChange={onChangePaypal}
              />
            </div>
          )}
          {postType === "payoneer" && (
            <div className="flex flex-col w-full gap-2">
              <label className="font-[400] text-sm" htmlFor="">
                Input Payoneer recepient Email
              </label>
              <input
                name="email"
                className="border p-2 rounded-md"
                type="email"
                placeholder="payoneer email"
                onChange={onChangePayoneer}
              />
            </div>
          )}
        </div>
        <div className="">
          {sellerAddBankRedux?.error && (
            <div className="text-[#DB4444]">{sellerAddBankRedux?.error}</div>
          )}
        </div>
        <div className="">
          {sellerAddPaypalRedux?.error && (
            <div className="text-[#DB4444]">{sellerAddPaypalRedux?.error}</div>
          )}
        </div>
        <div className="">
          {sellerAddPayoneerRedux?.error && (
            <div className="text-[#DB4444]">
              {sellerAddPayoneerRedux?.error}
            </div>
          )}
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
            {sellerAddBankRedux?.loading ||
            sellerAddPaypalRedux?.loading ||
            sellerAddPayoneerRedux?.loading ? (
              <div className="" style={{ height: "25px" }}>
                <PulseLoader color="#ffffff" />
              </div>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAccountModal;
