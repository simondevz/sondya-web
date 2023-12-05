import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { FormatNumber } from "../shareables/FormatNumber";
import { Ratings } from "../shareables/Ratings";
import {
  ProductNav,
  ProductPopularBrands,
  ProductPopularTags,
  ProductPriceRange,
} from "./FilterProductsNav";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userGetProductsAction } from "../../redux/actions/userDashboard/products.action";
import { useLocation, useNavigate } from "react-router-dom";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import {
  UserGetProductType,
  userGetProductsType,
} from "../../redux/types/products.types";
import { productImage7 } from "../../images/products";

export type QueryType = {
  page: number;
  search: string;
  subcategory: string;
  priceRange: string;
};

const ProductBody = () => {
  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
    subcategory: "",
    priceRange: "",
  });

  return (
    <div className="flex flex-row px-5 py-6">
      <div className="w-3/12 px-3 py-4 md:flex hidden flex-col gap-3">
        <ProductNav query={query} setQuery={setQuery} />
        <ProductPriceRange query={query} setQuery={setQuery} />
        <ProductPopularBrands />
        <ProductPopularTags />
      </div>
      <ProductBodyMain query={query} setQuery={setQuery} />
    </div>
  );
};

const ProductBodyMain = ({
  query,
  setQuery,
}: {
  query: QueryType;
  setQuery: any;
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [queryString, setQueryString] = useState<string>("page=1");

  // update query and url
  const updateQueryString = useCallback(
    (newParams: QueryType) => {
      const searchParams = new URLSearchParams(location.search);
      // Update or add new parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.set(key, String(value));
        } else {
          searchParams.delete(key);
        }
      });

      // Build the new search string
      const newSearch = searchParams.toString();

      // set query string
      setQueryString(newSearch);

      // Use navigate to change the URL
      navigate({
        pathname: location.pathname,
        search: newSearch,
      });
    },
    [location.pathname, location.search, navigate]
  );

  const productsRedux = useSelector(
    (state: ReducersType) => state?.userGetProducts
  ) as ReduxResponseType<userGetProductsType>;

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1500);
  }, [query, updateQueryString]);

  useEffect(() => {
    dispatch(userGetProductsAction(queryString) as any);
  }, [dispatch, queryString]);

  return (
    <div className="flex flex-col w-full gap-3 md:w-9/12">
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-row gap-2">
          <input
            className="border-[#EDB842] outline-none border-[2px] rounded-md px-2 md:px-4"
            type="text"
            placeholder="Search for anything..."
          />
          <button className="text-white bg-[#EDB842] px-2 md:px-3 py-2 rounded-md">
            Search
          </button>
        </div>
        <div className="flex flex-row gap-2 items-center text-[#5F6C72]">
          <label htmlFor="">Sort by:</label>
          <select
            className="border-[2px] border-[#E4E7E9] p-2 rounded-md"
            name=""
            id=""
          >
            <option value="">Most Popular</option>
            <option value="">Most Popular</option>
            <option value="">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="bg-[#EDB84233] flex flex-row gap-2 justify-between p-2 rounded-md text-[#5F6C72] font-[600]">
        <div className="flex flex-row gap-2 items-center">
          <span className="font-[400] whitespace-nowrap">Active Filters:</span>
          <span className="hidden md:flex items-center gap-2">
            Electronics Devices <FaTimes />
          </span>
          <span className="hidden md:flex items-center gap-2">
            5 Star Rating <FaTimes />
          </span>
        </div>
        <div className="whitespace-nowrap">
          {productsRedux?.serverResponse?.data?.count} Results found.
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsRedux.success ? (
          productsRedux?.serverResponse?.data?.products?.map(
            (product: UserGetProductType) => {
              return (
                <div key={product._id} className="p-3 flex flex-col gap-3">
                  <img
                    className="h-[12rem] object-cover"
                    src={
                      (product.image && product.image[0]?.url) || productImage7
                    }
                    alt=""
                  />
                  <div className="flex flex-row gap-1 justify-between">
                    <Ratings rating={product.rating} />
                    <span className="text-[#A2A6B0] whitespace-nowrap">
                      Reviews ({product.total_rating})
                    </span>
                  </div>
                  <div className=""></div>
                  <div className="text-[#666666]">
                    {product.old_price && "$"}
                    {product.old_price ? (
                      <FormatNumber price={product.old_price} />
                    ) : (
                      <div className="invisible">hi</div>
                    )}
                  </div>
                  <div className="text-lg font-[700]">
                    $<FormatNumber price={product.current_price} />
                  </div>
                </div>
              );
            }
          )
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-row gap-2 items-center text-[#EDB842] self-center my-5">
        <span className="bg-[#EDB84233] p-2 rounded-md">
          <BiSolidLeftArrow />
        </span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">1</span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">2</span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">3</span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">4</span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">5</span>
        <span className="bg-[#EDB84233] px-3 py-2 rounded-md">...</span>
        <span className="bg-[#EDB84233] p-2 rounded-md">
          <BiSolidRightArrow />
        </span>
      </div>
    </div>
  );
};

export default ProductBody;
