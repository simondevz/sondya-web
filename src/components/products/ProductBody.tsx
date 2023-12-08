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
import { BsThreeDots } from "react-icons/bs";

export type QueryType = {
  page: number;
  search: string;
  subcategory: string;
  priceRange: string;
  popularBrands: string[];
  sortBy: string;
};

const ProductBody = () => {
  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
    subcategory: "",
    priceRange: "",
    popularBrands: [],
    sortBy: "",
  });

  return (
    <div className="flex flex-row px-5 py-6">
      <div className="w-3/12 px-3 py-4 md:flex hidden flex-col gap-3">
        <ProductNav query={query} setQuery={setQuery} />
        <ProductPriceRange query={query} setQuery={setQuery} />
        <ProductPopularBrands query={query} setQuery={setQuery} />
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
  const limit: number = 20;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // update query and url
  const updateQueryString = useCallback(
    (newParams: QueryType) => {
      const searchParams = new URLSearchParams(location.search);
      // Update or add new parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          (value as string[]).length !== 0
        ) {
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

  const prevPage = () => {
    setQuery((prev: QueryType) => {
      return {
        ...prev,
        page: prev.page--,
      };
    });
  };

  const nextPage = () => {
    setQuery((prev: QueryType) => {
      alert(prev.page++);
      return {
        ...prev,
        page: prev.page++,
      };
    });
  };

  const goToPage = (page: number) => {
    setQuery((prev: QueryType) => {
      return {
        ...prev,
        page: page,
      };
    });
  };

  const productsRedux = useSelector(
    (state: ReducersType) => state?.userGetProducts
  ) as ReduxResponseType<userGetProductsType>;

  useEffect(() => {
    if (productsRedux.success)
      setTotalPages(
        Math.ceil(Number(productsRedux?.serverResponse?.data?.count) / limit)
      );
  }, [productsRedux?.success, productsRedux?.serverResponse?.data?.count]);

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
            value={query.search}
            onChange={(event) => {
              setQuery({ ...query, search: event.target.value, page: 1 });
            }}
          />
        </div>
        <div className="flex flex-row gap-2 items-center text-[#5F6C72]">
          <label htmlFor="sortBy">Sort by:</label>
          <select
            className="border-[2px] border-[#E4E7E9] p-2 rounded-md"
            name=""
            value={query.sortBy}
            id="sortBy"
            onChange={(event) =>
              setQuery({ ...query, sortBy: event.target.value, page: 1 })
            }
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">Alphabetical (A - Z)</option>
            <option value="z-a">Alphabetical (Z - A)</option>
          </select>
        </div>
      </div>

      <div className="bg-[#EDB84233] flex flex-row gap-2 justify-between p-2 rounded-md text-[#5F6C72] font-[600]">
        <div className="flex flex-row gap-2 items-center">
          <span className="font-[400] whitespace-nowrap">Active Filters:</span>
          {/* Active subategory filter */}
          {query.subcategory && (
            <span className="hidden md:flex items-center gap-2">
              {query.subcategory}
              <button
                onClick={() =>
                  setQuery({
                    ...query,
                    subcategory: "",
                    page: 1,
                  })
                }
              >
                <FaTimes />
              </button>
            </span>
          )}

          {/* Active price range */}
          {query.priceRange && (
            <span className="hidden md:flex items-center gap-2">
              $
              {Number(query.priceRange.split("_")[0])
                ? query.priceRange.split("_")[0]
                : 0}{" "}
              - $
              {Number(query.priceRange.split("_")[1])
                ? query.priceRange.split("_")[1]
                : 0}
              <button
                onClick={() =>
                  setQuery({
                    ...query,
                    priceRange: "",
                    page: 1,
                  })
                }
              >
                <FaTimes />
              </button>
            </span>
          )}

          {/* Active popular Brands */}
          {query.popularBrands.length ? (
            query.popularBrands.map((brand: string, index: number) => {
              return (
                <span key={index} className="hidden md:flex items-center gap-2">
                  {brand}
                  <button
                    onClick={() =>
                      setQuery({
                        ...query,
                        popularBrands: query.popularBrands.filter(
                          (otherBrands: string) => brand !== otherBrands
                        ),
                        page: 1,
                      })
                    }
                  >
                    <FaTimes />
                  </button>
                </span>
              );
            })
          ) : (
            <></>
          )}

          {/* No active filters */}
          {!query.popularBrands.length &&
          !query.priceRange &&
          !query.subcategory ? (
            <span className="hidden md:flex items-center gap-2">
              No Active Filters
            </span>
          ) : (
            <></>
          )}
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
                  <div className="">{product.name}</div>
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
        <button
          disabled={query.page <= 1}
          type="button"
          onClick={() => prevPage()}
          className="bg-[#EDB84233] p-2 rounded-md"
        >
          <BiSolidLeftArrow />
        </button>
        {Number.isInteger(totalPages) &&
          totalPages >= 0 &&
          Array.from({
            length: totalPages,
          }).map((_, i) => {
            if (i >= dotIndex && i <= dotIndex + 2) {
              return (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`${
                    query.page === i + 1 && "bg-[#EDB84233]"
                  } px-4 py-2 rounded-md`}
                >
                  {i + 1}
                </button>
              );
            }
            return <div className="hidden">...</div>;
          })}
        {Number.isInteger(totalPages) && totalPages > 3 && (
          <button
            onClick={() => {
              totalPages >= dotIndex
                ? setDotIndex((prev: number) => prev + 3)
                : setDotIndex(0);
            }}
            className="p-2 bg-[#EDB842] rounded-md text-white"
          >
            <BsThreeDots />
          </button>
        )}
        <button
          type="button"
          disabled={query.page >= totalPages}
          onClick={() => nextPage()}
          className="bg-[#EDB84233] p-2 rounded-md"
        >
          <BiSolidRightArrow />
        </button>
      </div>
    </div>
  );
};

export default ProductBody;
