import { AiOutlineArrowRight } from "react-icons/ai";
import { Productsdata } from "../../data/productsData";
import { DropdownProducts } from "../shareables/Dropdown";

const Products = () => {
  const limitedproductsdata = Productsdata.slice(0, 4);
  return (
    <div className="p-3">
      <div className="flex flex-row gap-4 w-full p-2 items-baseline">
        <div className="flex flex-row  w-10/12">
          <DropdownProducts options={limitedproductsdata} />
          <div className="flex flex-row gap-2 overflow-x-scroll font-[600] border-b-[2px] border-[#000]">
            {limitedproductsdata.map((t, i) => {
              return <div className="whitespace-nowrap">{t.product}</div>;
            })}
          </div>
        </div>
        <div className="flex flex-row gap-2 font-[600] whitespace-nowrap">
          View more{" "}
          <span className="text-2xl">
            <AiOutlineArrowRight />
          </span>
        </div>
      </div>
      <div className=""></div>
      <ProductsMultiCarousel />
    </div>
  );
};

const ProductsMultiCarousel = () => {
  return <div>Products</div>;
};

export default Products;
