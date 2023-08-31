import { AiOutlineRight, AiOutlineShareAlt } from "react-icons/ai";
import { FaFlag, FaHome } from "react-icons/fa";
import { MdFavoriteBorder, MdMenu } from "react-icons/md";

const ProductsDetailsBody = () => {
  return (
    <section className="p-3">
      <div className="text-[#5F6C72] flex flex-row justify-between">
        <div className="hidden md:flex flex-row items-center gap-1">
          <FaHome /> <span>Home</span> <AiOutlineRight /> <span>Category</span>{" "}
          <AiOutlineRight /> <span>Product</span> <AiOutlineRight />{" "}
          <span>Electronics Devices</span>
          <AiOutlineRight /> <span>Macbook Pro</span>{" "}
        </div>
        <div className="flex flex-row items-center gap-3 ms-auto">
          <MdMenu />
          <MdFavoriteBorder />
          <span className="border border-[#DADBDD] p-1 rounded-md">2,767</span>
          <span className="border border-[#DADBDD] p-2 rounded-md">
            <FaFlag />
          </span>
          <span className="border border-[#DADBDD] p-2 rounded-md text-[#EDB842]">
            {" "}
            <AiOutlineShareAlt />
          </span>
        </div>
      </div>
      <div className="flex flex-row">
        <div className=""></div>
        <div className=""></div>
      </div>
    </section>
  );
};

export default ProductsDetailsBody;
