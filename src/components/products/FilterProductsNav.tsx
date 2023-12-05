import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../redux/store";
import { AdminGetCategoryType } from "../../redux/types/categories.types";
import { ReduxResponseType } from "../../redux/types/general.types";
import { QueryType } from "./ProductBody";
import { userGetProductsCategoriesAction } from "../../redux/actions/userDashboard/products.action";

export const ProductNav = ({
  query,
  setQuery,
}: {
  query: QueryType;
  setQuery: any;
}) => {
  const [openProducts, setOpenProducts] = useState(true);
  const ClickOpenProducts = () => setOpenProducts((prev) => !prev);
  const dispatch = useDispatch();

  // get list of categories for services
  let productCategoriesRedux = useSelector(
    (state: ReducersType) => state?.userGetProductsCategories
  ) as ReduxResponseType<AdminGetCategoryType[]>;

  useEffect(() => {
    if (!productCategoriesRedux?.success)
      dispatch(userGetProductsCategoriesAction() as any);
  }, [dispatch, productCategoriesRedux?.success]);

  return (
    <div className="flex flex-col border-b-[2px] py-5 gap-2">
      <button
        className="flex gap-2 items-center p-2 rounded-md font-[700] text-[#191C1F]"
        onClick={ClickOpenProducts}
      >
        Products {openProducts ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      {openProducts && (
        <div>
          {productCategoriesRedux?.serverResponse?.data
            .slice(0, 5)
            .map((subcategory, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row gap-2 text-[#475156] items-center"
                >
                  <input
                    name="product"
                    id={`product_${index}`}
                    type="radio"
                    onChange={() => {
                      setQuery({
                        ...query,
                        subcategory: subcategory.name,
                      });
                    }}
                  />
                  <label htmlFor={`product_${index}`}>{subcategory.name}</label>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export const ProductPriceRange = ({
  query,
  setQuery,
}: {
  query: QueryType;
  setQuery: any;
}) => {
  const [openProducts, setOpenProducts] = useState(true);
  const ClickOpenProducts = () => setOpenProducts((prev) => !prev);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [range, setRange] = useState<number>(minPrice || 0);

  return (
    <div className="flex flex-col border-b-[2px] py-5 gap-2">
      <button
        className="flex gap-2 items-center p-2 rounded-md font-[700] uppercase text-[#191C1F]"
        onClick={ClickOpenProducts}
      >
        Price Range {openProducts ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      {openProducts && (
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row gap-2">
            <input
              type="range"
              min={minPrice || 0}
              max={maxPrice || 100}
              value={range}
              onChange={(event) => {
                const range = Number(event.target.value);
                setRange(range);

                if (range > (maxPrice as number)) return;
                setQuery({
                  ...query,
                  priceRange: `${minPrice || 0}_${range}`,
                });
              }}
            />
          </div>
          <div className="flex flex-row gap-2">
            <input
              className="outline-none border p-2 w-1/2 rounded-md"
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(event) => {
                const min = Number(event.target.value);
                setMinPrice(min);

                if (min > (maxPrice as number)) return;
                setQuery({
                  ...query,
                  priceRange: `${min}_${maxPrice}`,
                });
              }}
            />
            <input
              className="outline-none border p-2 w-1/2 rounded-md"
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(event) => {
                const max = Number(event.target.value);
                setMaxPrice(max);

                if (max < (minPrice as number)) return;
                setQuery({
                  ...query,
                  priceRange: `${minPrice}_${max}`,
                });
              }}
            />
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input
              name="product"
              type="radio"
              id="All_Prices"
              onChange={() =>
                setQuery({
                  ...query,
                  priceRange: "",
                })
              }
            />
            <label htmlFor="All_Prices">All Prices</label>
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input
              name="product"
              type="radio"
              id="radio_20"
              onChange={() =>
                setQuery({
                  ...query,
                  priceRange: "0_20",
                })
              }
            />
            <label htmlFor="radio_20">Under $20</label>
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input
              name="product"
              type="radio"
              id="radio_25_100"
              onChange={() =>
                setQuery({
                  ...query,
                  priceRange: "25_100",
                })
              }
            />
            <label htmlFor="radio_25_100">$25 to $100</label>
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input
              name="product"
              type="radio"
              id="radio_100_300"
              onChange={() =>
                setQuery({
                  ...query,
                  priceRange: "100_300",
                })
              }
            />
            <label htmlFor="radio_100_300">$100 to $300</label>
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input
              name="product"
              type="radio"
              id="radio_300_500"
              onChange={() =>
                setQuery({
                  ...query,
                  priceRange: "300_500",
                })
              }
            />
            <label htmlFor="radio_300_500">$300 to $500</label>
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input
              name="product"
              type="radio"
              id="radio_500_1000"
              onChange={() =>
                setQuery({
                  ...query,
                  priceRange: "500_1000",
                })
              }
            />
            <label htmlFor="radio_500_1000">$500 to $1,000</label>
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input
              name="product"
              type="radio"
              id="radio_1000_10000"
              onChange={() =>
                setQuery({
                  ...query,
                  priceRange: "1000_10000",
                })
              }
            />
            <label htmlFor="radio_1000_10000">$1,000 to $10,000</label>
          </div>
        </div>
      )}
    </div>
  );
};

export const ProductPopularBrands = () => {
  const [openProducts, setOpenProducts] = useState(false);
  const ClickOpenProducts = () => setOpenProducts((prev) => !prev);
  return (
    <div className="flex flex-col border-b-[2px] py-5 gap-2">
      <button
        className="flex gap-2 items-center p-2 rounded-md font-[700] uppercase text-[#191C1F]"
        onClick={ClickOpenProducts}
      >
        popular Brands {openProducts ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      {openProducts && (
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            Apple
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            Google
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            Microsoft
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Samsung
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Dell
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            Hp
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Symphony
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Xiaomi
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Sony
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            Panasonic
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            LG
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Intel
          </div>
        </div>
      )}
    </div>
  );
};

export const ProductPopularTags = () => {
  const [openProducts, setOpenProducts] = useState(false);
  const ClickOpenProducts = () => setOpenProducts((prev) => !prev);
  return (
    <div className="flex flex-col border-b-[2px] py-5 gap-2">
      <button
        className="flex gap-2 items-center p-2 rounded-md font-[700] uppercase text-[#191C1F]"
        onClick={ClickOpenProducts}
      >
        popular Brands {openProducts ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      {openProducts && (
        <div className="flex flex-wrap gap-2 text-[#191C1F]">
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Game
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Iphone
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            TV
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Asus Laptops
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            MacBook
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            SSD
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Graphics Card
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Power Bank
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Smart TV
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Speaker
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Tablet
          </span>
        </div>
      )}
    </div>
  );
};
