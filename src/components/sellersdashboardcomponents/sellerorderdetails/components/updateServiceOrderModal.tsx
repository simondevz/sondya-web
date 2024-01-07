import { FormEvent, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import { GetProductOrder } from "../../../../redux/types/checkout.types";
import { sellerUpdateProductsOrderAction } from "../../../../redux/actions/seller/seller-orders.actions";
import { useDispatch } from "react-redux";
import "../../../../css/modal.css";

const UpdateOrderStatusModal = ({
  showModal,
  handleClose,
  order,
}: {
  showModal: any;
  handleClose: any;
  order: GetProductOrder | undefined;
}) => {
  const dispatch = useDispatch();
  const [productOrder, setProductOrder] = useState<GetProductOrder | undefined>(
    order
  );

  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (productOrder) {
      dispatch(sellerUpdateProductsOrderAction(productOrder) as any);
      handleClose();
    }
  }

  return (
    <Modal
      className="modal top-[20%] w-[90%] left-[5%] md:left-[30%] md:w-3/5 md:max-w-[36rem] rounded-md"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="border-b flex justify-between p-4">
          <div className="font-[600] text-lg">Update Order Status</div>
          <div>
            <span className="text-[1.5rem]" onClick={handleClose}>
              <AiOutlineCloseCircle />
            </span>
          </div>
        </div>
        <div className="py-6 px-3 flex flex-row gap-1 h-[60vh] md:h-auto overflow-y-auto">
          <div className="flex flex-col gap-1 px-2 w-5/6">
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col justify-center w-full md:w-1/2">
                <select
                  className="border p-2 rounded-md"
                  onChange={(event) => {
                    if (order)
                      setProductOrder({
                        ...order,
                        order_status: event.target.value,
                      });
                  }}
                  autoFocus={true}
                >
                  <option value={"Order Placed"}>Order Placed</option>
                  <option value={"Processing"}>Processing</option>
                  <option value={"Packed"}>Packed</option>
                  <option value={"Shipping"}>Shipping</option>
                  <option value={"Delivered"}>Delivered</option>
                  <option value={"Cancelled"}>Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t flex justify-end gap-3 p-3">
          <button
            className="p-2 border text-white bg-[#6f442b] rounded-md"
            type="button"
            onClick={handleClose}
          >
            Close
          </button>
          <button className="p-2 border text-white bg-[#EDB842] rounded-md">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateOrderStatusModal;
