import { RiCloseFill } from "react-icons/ri";
import { TiArrowForward } from "react-icons/ti";
import { productImage2 } from "../../../../images/products";
import { AdminGetProductType } from "../../../../redux/types/products.types";
import { AdminGetServiceType } from "../../../../redux/types/services.types";
import { useLocation } from "react-router-dom";

const Attachment = ({
  data,
  showforward,
  setAttachment,
}: {
  data: (AdminGetProductType | AdminGetServiceType) & { isProduct: boolean };
  showforward: boolean;
  setAttachment: React.Dispatch<
    React.SetStateAction<
      | ((AdminGetProductType | AdminGetServiceType) & { isProduct: boolean })
      | undefined
    >
  >;
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const nullifyShowForward = pathname.includes("service/details");

  return (
    <div className="flex relative border w-fit gap-4 rounded-lg p-2 pr-6 justify-between">
      <button
        onClick={() => setAttachment?.(undefined)}
        className={
          (!showforward ? "flex " : "hidden ") + "absolute right-2 top-2"
        }
      >
        <RiCloseFill />
      </button>
      <img
        src={data?.image?.[0]?.url || productImage2}
        alt={data?.name}
        className="w-20 h-20 object-fit rounded-lg"
      />
      <span className="flex flex-col justify-between text-[0.875rem]">
        <span>{data?.name}</span>
        <span className="text-red-500">${data?.current_price}.00</span>
      </span>
      <button
        onClick={() => setAttachment?.(data)}
        className={
          (showforward && !nullifyShowForward ? " flex" : " hidden") +
          " absolute bottom-1/2 right-[-1.5rem]"
        }
      >
        <TiArrowForward />
      </button>
    </div>
  );
};

export default Attachment;
