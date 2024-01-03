import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { ProductsItemsdata2 } from "../../data/productsItemsData";
import { productImage1 } from "../../images/products";
import {
  addToCartAction,
  totalCartAction,
} from "../../redux/actions/cart.actions";
import {
  homeGetProductCategoryAction,
  homeGetProductsAction,
} from "../../redux/actions/home.actions";
import { ReducersType } from "../../redux/store";
import { AdminGetCategoryType } from "../../redux/types/categories.types";
import { Paginator, ReduxResponseType } from "../../redux/types/general.types";
import { AdminGetProductType } from "../../redux/types/products.types";
import { DropdownProducts } from "../shareables/Dropdown";
import { FormatNumber } from "../shareables/FormatNumber";
import { Ratings } from "../shareables/Ratings";
import { Like } from "../shareables/like";
import { WishlistItemType } from "../../redux/types/wishlist.types";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../redux/actions/wishlist.actions";
import inWishlist from "../../utils/checkWhishlist";

type QueryType = {
  // page: number;
  search: string;
};

const Products = () => {
  const [like, setLike] = useState<boolean>(false);

  // fetch products
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [query, setQuery] = useState<QueryType>({
    // page: 1,
    search: "",
  });

  const [queryString, setQueryString] = useState<string>("");

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

      navigate({
        pathname: location.pathname,
        search: newSearch,
      });
    },
    [location.pathname, location.search, navigate]
  );

  const search = (e: string) => {
    setQuery({
      // page: 1,
      search: e,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1000);
  }, [query, updateQueryString]);

  //admin get categories
  const homeGetCategoriesRedux = useSelector(
    (state: ReducersType) => state?.homeGetProductCategory
  ) as ReduxResponseType<AdminGetCategoryType[]>;

  const categories = useMemo(() => {
    return homeGetCategoriesRedux?.serverResponse?.data;
  }, [homeGetCategoriesRedux]);

  useEffect(() => {
    dispatch(homeGetProductCategoryAction() as any);
  }, [dispatch, queryString]);

  //admin get products
  const homeGetProductsRedux = useSelector(
    (state: ReducersType) => state?.homeGetProducts
  ) as ReduxResponseType<Paginator<AdminGetProductType[]>>;

  const products = useMemo(() => {
    return homeGetProductsRedux?.serverResponse?.data;
  }, [homeGetProductsRedux]);

  useEffect(() => {
    dispatch(homeGetProductsAction(queryString) as any);
  }, [dispatch, queryString]);

  // add to cart
  const addToCart = useCallback(
    (product: AdminGetProductType) => {
      setTimeout(() => {
        const variant_keys = Object.keys(product?.variants);
        dispatch(
          addToCartAction({
            ...product,
            selected_variants: variant_keys.map((key) => {
              return [key, product?.variants[key][0]];
            }),
          }) as any
        );

        // send toast message
        toast("🛒 Added to cart!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(totalCartAction() as any);
      }, 1000);
    },
    [dispatch]
  );

  // add to wishlist
  const addToWishlist = useCallback(
    (item: WishlistItemType) => {
      setTimeout(() => {
        dispatch(addToWishlistAction(item) as any);

        // send toast message
        toast("Added to Wishlist!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
    },
    [dispatch]
  );

  const deleteWishlistItem = useCallback(
    (item: WishlistItemType) => {
      setTimeout(() => {
        dispatch(removeFromWishlistAction(item) as any);

        // send toast message
        toast("Removed from Wishlist!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
    },
    [dispatch]
  );

  return (
    <div className="p-3 flex flex-col">
      <div className="flex flex-row gap-2 md:gap-4 w-full p-2 items-baseline text-[lg]">
        <div className="flex flex-row  w-10/12">
          <DropdownProducts options={categories} click={search} />
          <div className="hidden md:flex flex-row gap-2 overflow-x-scroll font-[600] border-b-[2px] border-[#000]">
            {categories.slice(0, 15).map((t, i) => {
              return (
                <div
                  key={i}
                  className="whitespace-nowrap"
                  onClick={() => search(t.name)}
                >
                  {t.name}..
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => navigate("/products")}
          className="flex flex-row gap-1 md:gap-2 font-[600] whitespace-nowrap"
        >
          View more{" "}
          <span className="text-2xl">
            <AiOutlineArrowRight />
          </span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="w-full md:w-2/5 border p-2">
          {products.data &&
            products.data
              .slice(0, 1)
              // .filter((item) => item.product_status === "hot")
              .map((t, i) => {
                return (
                  <div key={i} className="w-full relative flex flex-col gap-3">
                    <img
                      className="object-cover"
                      src={
                        t.image && t.image.length > 0
                          ? t.image[0].url
                          : productImage1
                      }
                      alt=""
                    />
                    <div className="flex flex-row gap-2">
                      <Ratings rating={4} />
                      <span className="text-[#77878F]">
                        $
                        {t.current_price && (
                          <FormatNumber price={t.current_price} />
                        )}
                      </span>
                    </div>
                    <div className="playfair-display font-[600]">
                      {t.name && t.name}
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[#929FA5] line-through">
                        {t.old_price && (
                          <span>
                            $<FormatNumber price={t.old_price!} />
                          </span>
                        )}
                      </span>
                      <span className="text-[#EDB842]">
                        $
                        {t.current_price && (
                          <FormatNumber price={t.current_price} />
                        )}
                      </span>
                    </div>
                    <div className="text-[14px] font-[400]">
                      {t.description}
                    </div>
                    <div className="flex flex-row text-lg items-center gap-1">
                      <div
                        className="p-2 bg-[#EDB84233]"
                        onClick={() => setLike(!like)}
                      >
                        {like ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
                      </div>
                      <div
                        // onClick={() => addToCart(t)}
                        className="py-1 bg-[#EDB842] flex flex-row gap-1 text-white items-center px-3 active:bg-white active:text-[#EDB842]"
                      >
                        <span>
                          <AiOutlineShoppingCart />
                        </span>
                        <span>Add to cart</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(
                            `/product/details/${t._id}/${slugify(t.name)}`
                          )
                        }
                        className="p-2 bg-[#EDB84233]"
                      >
                        <AiOutlineEye />
                      </div>
                    </div>
                    {t.product_status === "hot" && (
                      <div className="absolute bg-[#EE5858] text-white p-1 top-0 left-0">
                        HOT
                      </div>
                    )}
                    {t.product_status === "sold" && (
                      <div className="absolute bg-[#000] text-white p-1 top-4 left-0">
                        SOLD OUT
                      </div>
                    )}
                    {t.discount_percentage && (
                      <div className="absolute bg-[#EDB842] text-white p-1 top-8 left-0">
                        {t.discount_percentage}% off
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-self-stretch">
          {products.data &&
            products.data?.slice &&
            products.data.slice(0, 8).map((t, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col gap-1 border p-2 relative"
                >
                  <div className="relative">
                    <img
                      className="h-56 object-cover w-full"
                      src={
                        t.image && t.image.length > 0
                          ? t.image[0].url
                          : productImage1
                      }
                      alt=""
                    />
                    <div className="absolute gap-1  inset-0 bg-black bg-opacity-50 flex flex-row justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <div
                        onClick={() => {
                          if (inWishlist({ ...t, isProduct: true })) {
                            deleteWishlistItem({ ...t, isProduct: true });
                          } else {
                            addToWishlist({ ...t, isProduct: true });
                          }
                        }}
                        className="text-xl rounded-full"
                      >
                        <Like
                          defaultValue={inWishlist({ ...t, isProduct: true })}
                        />
                      </div>
                      <div
                        onClick={() => addToCart(t)}
                        className="text-xl text-[#000000] bg-white p-1 rounded-full"
                      >
                        <AiOutlineShoppingCart />
                      </div>
                      <div
                        onClick={() =>
                          navigate(
                            `/product/details/${t._id}/${slugify(t.name)}`
                          )
                        }
                        className="text-xl bg-white text-[#000000] p-1 rounded-full"
                      >
                        <AiOutlineEye />
                      </div>
                    </div>
                  </div>
                  <div className="">{t.name && t.name}</div>
                  <div className="flex gap-1">
                    <span className="text-[#929FA5] line-through">
                      {t.current_price && (
                        <span>
                          ${t.old_price && <FormatNumber price={t.old_price} />}
                        </span>
                      )}
                    </span>
                    <span className="text-[#EDB842]">
                      $
                      {t.current_price && (
                        <FormatNumber price={t.current_price} />
                      )}
                    </span>
                  </div>
                  {t.product_status === "hot" && (
                    <div className="absolute bg-[#EE5858] text-white p-1">
                      HOT
                    </div>
                  )}
                  {t.product_status === "sold" && (
                    <div className="absolute bg-[#000] text-white p-1">
                      SOLD OUT
                    </div>
                  )}
                  {t.discount_percentage && (
                    <div className="absolute bg-[#EDB842] text-white p-1">
                      {t.discount_percentage}% off
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
