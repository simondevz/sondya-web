import { useRef, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Productsdata } from "../../data/productsData";
import {
  ProductsItemsdata,
  ProductsItemsdata2,
} from "../../data/productsItemsData";
import { DropdownProducts } from "../shareables/Dropdown";
import { FormatNumber } from "../shareables/FormatNumber";
import { Ratings } from "../shareables/Ratings";
import { Like } from "../shareables/like";

const Products = () => {
  const [like, setLike] = useState<boolean>(false);
  // const [like, setLike] = useState<productItemsType[]>(ProductsItemsdata);

  const limitedproductsdata = Productsdata.slice(0, 4);
  const filteredproductsdata = ProductsItemsdata.slice(0, 1).filter(
    (item) => item.hot === true
  );
  const limitedproductsdataitems = ProductsItemsdata.slice(1, 15);
  return (
    <div className="p-3 flex flex-col">
      <div className="flex flex-row gap-2 md:gap-4 w-full p-2 items-baseline text-[lg]">
        <div className="flex flex-row  w-10/12">
          <DropdownProducts options={limitedproductsdata} />
          <div className="hidden md:flex flex-row gap-2 overflow-x-scroll font-[600] border-b-[2px] border-[#000]">
            {limitedproductsdata.map((t, i) => {
              return (
                <div key={i} className="whitespace-nowrap">
                  {t.product}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row gap-1 md:gap-2 font-[600] whitespace-nowrap">
          View more{" "}
          <span className="text-2xl">
            <AiOutlineArrowRight />
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 border p-2">
          {filteredproductsdata.map((t, i) => {
            return (
              <div key={i} className="w-full relative flex flex-col gap-3">
                <img src={t.image} alt="" />
                <div className="flex flex-row gap-2">
                  <Ratings rating={t.rating} />
                  <span className="text-[#77878F]">
                    (<FormatNumber price={t.totalrating} />)
                  </span>
                </div>
                <div className="playfair-display font-[600]">{t.name}</div>
                <div className="flex gap-1">
                  <span className="text-[#929FA5] line-through">
                    {t.pricebefore && (
                      <span>
                        $<FormatNumber price={t.pricebefore!} />
                      </span>
                    )}
                  </span>
                  <span className="text-[#EDB842]">
                    $<FormatNumber price={t.pricenow!} />
                  </span>
                </div>
                <div className="text-[14px] font-[400]">{t.body}</div>
                <div className="flex flex-row text-lg items-center gap-1">
                  <div
                    className="p-2 bg-[#EDB84233]"
                    onClick={() => setLike(!like)}
                  >
                    {like ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
                  </div>
                  <div className="py-1 bg-[#EDB842] flex flex-row gap-1 text-white items-center px-3">
                    <span>
                      <AiOutlineShoppingCart />
                    </span>
                    <span>Add to cart</span>
                  </div>
                  <div className="p-2 bg-[#EDB84233]">
                    <AiOutlineEye />
                  </div>
                </div>
                {t.hot && (
                  <div className="absolute bg-[#EE5858] text-white p-1 top-0 left-0">
                    HOT
                  </div>
                )}
                {t.sold && (
                  <div className="absolute bg-[#000] text-white p-1 top-4 left-0">
                    SOLD OUT
                  </div>
                )}
                {t.priceoff && (
                  <div className="absolute bg-[#EDB842] text-white p-1 top-8 left-0">
                    {t.priceoff}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {limitedproductsdataitems.map((t, i) => {
            return (
              <div key={i} className=" flex flex-col gap-1 border p-2 relative">
                <div className="relative">
                  <img src={t.image} alt="" />
                  <div className="absolute gap-1  inset-0 bg-black bg-opacity-50 flex flex-row justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Like />
                    <div className="text-xl text-[#000000] bg-white p-1 rounded-full">
                      <AiOutlineShoppingCart />
                    </div>
                    <div className="text-xl bg-white text-[#000000] p-1 rounded-full">
                      <AiOutlineEye />
                    </div>
                  </div>
                </div>
                <div className="">{t.name}</div>
                <div className="flex gap-1">
                  <span className="text-[#929FA5] line-through">
                    {t.pricebefore && (
                      <span>
                        $<FormatNumber price={t.pricebefore!} />
                      </span>
                    )}
                  </span>
                  <span className="text-[#EDB842]">
                    $<FormatNumber price={t.pricenow!} />
                  </span>
                </div>
                {t.hot && (
                  <div className="absolute bg-[#EE5858] text-white p-1">
                    HOT
                  </div>
                )}
                {t.sold && (
                  <div className="absolute bg-[#000] text-white p-1">
                    SOLD OUT
                  </div>
                )}
                {t.priceoff && (
                  <div className="absolute bg-[#EDB842] text-white p-1">
                    {t.priceoff}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ProductsMultiCarousel />
    </div>
  );
};

const ProductsMultiCarousel = () => {
  const limitedproductsdataitems2 = ProductsItemsdata2.slice(0, 15);
  let [index, setIndex] = useState<number>(0);
  const outercontainerRef = useRef<HTMLDivElement | null>(null);
  const innercontainerRef = useRef<HTMLDivElement | null>(null);

  const prevItem = () => {
    if (outercontainerRef.current!.scrollLeft > 0) {
      setIndex((index -= innercontainerRef.current!.offsetWidth / 2));
      outercontainerRef.current!.scrollLeft = index;
    }
  };

  const nextItem = () => {
    if (
      outercontainerRef.current!.scrollLeft <
      outercontainerRef.current!.scrollWidth
    ) {
      setIndex((index += innercontainerRef.current!.offsetWidth / 2));
      outercontainerRef.current!.scrollLeft = index;
    }
  };

  return (
    <div className="flex flex-row relative">
      <button
        className="text-2xl text-[#EDB842] absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={prevItem}
      >
        <BsFillArrowLeftCircleFill />
      </button>
      <div
        className="flex flex-row gap-3 overflow-scroll w-full"
        ref={outercontainerRef}
      >
        {limitedproductsdataitems2.map((t, i) => {
          return (
            <div
              className="flex flex-col p-2 w-1/3"
              key={i}
              ref={innercontainerRef}
            >
              <img className="object-cover" src={t.image} alt="" />
              <div className="whitespace-nowrap" style={{ width: "200px" }}>
                {t.name}
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="text-2xl text-[#EDB842] absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={nextItem}
      >
        <BsFillArrowRightCircleFill />
      </button>
    </div>
  );
};

export default Products;
