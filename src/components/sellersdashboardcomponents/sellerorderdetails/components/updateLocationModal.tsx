import { FormEvent, ChangeEvent, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-overlays";
import {
  GetProductOrder,
  orderLocationType,
} from "../../../../redux/types/checkout.types";
import { sellerUpdateProductsOrderAction } from "../../../../redux/actions/seller/seller-orders.actions";
import { useDispatch } from "react-redux";

const UpdateLocationModal = ({
  showModal,
  handleClose,
  order,
}: {
  showModal: any;
  handleClose: any;
  order: GetProductOrder | undefined;
}) => {
  const dispatch = useDispatch();
  const [orderLocation, setOrderlocation] = useState<orderLocationType>({
    country: "",
    city: "",
    zip_code: "",
    state: "",
    order_status: order?.order_status || "",
  });

  // Backdrop JSX code
  const renderBackdrop = (props: any) => (
    <div className="backdrop" {...props} />
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (order) {
      dispatch(
        sellerUpdateProductsOrderAction({
          ...order,
          order_location: [...order.order_location, orderLocation],
        }) as any
      );
    }
    handleClose();
  }

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    setOrderlocation({
      ...orderLocation,
      [event.target.name]: event.target.value,
      order_status: order?.order_status as string,
    });
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
          <div className="font-[600] text-lg">Update Product Location</div>
          <div>
            <span className="text-[1.5rem]" onClick={handleClose}>
              <AiOutlineCloseCircle />
            </span>
          </div>
        </div>
        <div className="py-6 px-3 flex flex-row gap-1 h-[60vh] md:h-auto overflow-y-auto">
          <div className="flex flex-col gap-1 px-2 w-5/6">
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Country
                </label>
                <input
                  name="country"
                  className="border p-2 rounded-md"
                  type="text"
                  onChange={onChange}
                  autoFocus={true}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  State
                </label>
                <input
                  name="state"
                  className="border p-2 rounded-md w-full"
                  type="text"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  City
                </label>
                <input
                  name="city"
                  className="border p-2 rounded-md"
                  type="text"
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Zip Code
                </label>
                <input
                  name="zip_code"
                  className="border p-2 rounded-md w-full"
                  type="text"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-[400] text-sm" htmlFor="">
                  Order Status
                </label>
                <input
                  name="orderstatus"
                  className="border p-2 rounded-md w-full"
                  type="text"
                  value={order?.order_status}
                  readOnly
                />
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

export default UpdateLocationModal;
