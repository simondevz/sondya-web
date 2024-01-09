import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../../../css/modal.css";
import { adminGetWithdrawalByIdAction } from "../../../redux/actions/admin/withdrawal.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { WithdrawalResponseType } from "../../../redux/types/withdrawal.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const AdminWithdrawalDetailsBody = () => {
  // fetch withdrawal detail
  const dispatch = useDispatch();
  const params = useParams();

  const id = String(params.id);

  const withdrawalDetailsRedux = useSelector(
    (state: ReducersType) => state?.adminGetWithdrawalById
  ) as ReduxResponseType<WithdrawalResponseType>;

  const withdrawalData = useMemo(() => {
    return withdrawalDetailsRedux?.serverResponse?.data;
  }, [withdrawalDetailsRedux]);

  useEffect(() => {
    dispatch(adminGetWithdrawalByIdAction({ id }) as any);
  }, [dispatch, id]);

  const dateString = withdrawalData?.createdAt ? withdrawalData?.createdAt : "";
  let formattedDate: any;
  if (dateString) {
    const dateObject = new Date(dateString);
    formattedDate = format(dateObject, "MMMM d, yyyy");
  }

  return (
    <section className="border w-full">
      <div className="flex flex-row justify-center font-[600] py-3 px-6">
        <span>Withdrawal Details</span>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="w-full">
            <tr>
              <th className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Title
              </th>
              <th className=" py-2 px-8 font-[600] text-[#475156]">value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Withdrawal ID
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {withdrawalData?._id}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Withdrawn by
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {withdrawalData?.user?.email},{withdrawalData?.user?.username}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Currency
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {withdrawalData?.currency}
              </td>
            </tr>

            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Withdrawal method
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {withdrawalData?.withdrawal_mode}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Status
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {withdrawalData?.withdrawal_status}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Date
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {formattedDate}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E4E7E9] py-2 px-8 font-[600] text-[#475156]">
                Amount
              </td>
              <td className=" py-2 px-8 font-[600] text-[#475156]">
                {" "}
                $
                {withdrawalData?.withdrawal_amount && (
                  <FormatNumber price={withdrawalData?.withdrawal_amount} />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminWithdrawalDetailsBody;
