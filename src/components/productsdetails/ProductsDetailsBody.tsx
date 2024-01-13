import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsCart, BsFacebook, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import {
  PaymentMethod,
  ProductdetailImageMain,
} from "../../images/productdetails";
import { productImageA } from "../../images/products";
import { bgWhoAreWe } from "../../images/whoarewe";
import {
  addToCartAction,
  totalCartAction,
} from "../../redux/actions/cart.actions";
import {
  homeGetProductDetailsAction,
  youMayLikeProductsAction,
} from "../../redux/actions/home.actions";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../redux/actions/wishlist.actions";
import { ReducersType } from "../../redux/store";
import { Paginator, ReduxResponseType } from "../../redux/types/general.types";
import { AdminGetProductType } from "../../redux/types/products.types";
import { reviewStatType } from "../../redux/types/review.types";
import { WishlistItemType } from "../../redux/types/wishlist.types";
import inWishlist from "../../utils/checkWhishlist";
import {
  copyToClipboard,
  shareOnFacebook,
  shareOnTwitter,
  shareOnWhatsApp,
} from "../../utils/copytoClipboard.utils";
import { FormatNumber } from "../shareables/FormatNumber";
import { Ratings } from "../shareables/Ratings";
import Reviews from "../shareables/reviews";
import SelectVariant from "../shareables/selectVariants";

const ProductsDetailsBody = () => {
  let [count, setCount] = useState<number>(1);
  const navigate = useNavigate();
  const [selectedVariants, setSelectedVariants] =
    useState<Array<[string, string]>>();
  // console.log(selectedVariants);

  // fetch product detail
  const dispatch = useDispatch();
  const params = useParams();

  const id = String(params.id);
  const name = String(params.name);

  const homeGetProductDetailsRedux = useSelector(
    (state: ReducersType) => state?.homeGetProductDetails
  ) as ReduxResponseType<AdminGetProductType>;

  const reviewStatRedux = useSelector(
    (state: ReducersType) => state?.reviewStat
  ) as ReduxResponseType<reviewStatType>;

  const product = useMemo(() => {
    if (homeGetProductDetailsRedux?.serverResponse?.data?.variants) {
      const variant_keys = Object.keys(
        homeGetProductDetailsRedux?.serverResponse?.data?.variants || {}
      );
      setSelectedVariants(
        variant_keys.map((key) => {
          return [
            key,
            homeGetProductDetailsRedux?.serverResponse?.data?.variants[key][0],
          ];
        })
      );
    }
    return homeGetProductDetailsRedux?.serverResponse?.data;
  }, [homeGetProductDetailsRedux]);

  const [inWishlistBool, setInWishlist] = useState<boolean>(false);

  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    setInWishlist(inWishlist({ ...product, isProduct: true }));
  }, [pathname, product]);

  // add to cart
  const addToCart = useCallback(
    (product: AdminGetProductType) => {
      setTimeout(() => {
        dispatch(
          addToCartAction(
            {
              ...product,
              selected_variants: selectedVariants!,
            },
            count
          ) as any
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
    [count, dispatch, selectedVariants]
  );

  useEffect(() => {
    dispatch(homeGetProductDetailsAction({ id, name }) as any);
  }, [dispatch, id, name]);

  // image slider
  const [currentImage, setCurrentImage] = useState<string>(
    product.image && product.image.length > 0
      ? product.image[0].url
      : ProductdetailImageMain
  );

  useEffect(() => {
    setCurrentImage(
      product.image && product.image.length > 0
        ? product.image[0].url
        : ProductdetailImageMain
    );
  }, [product.image]);

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

  // console.log(product);

  return (
    <section className="p-3 flex flex-col gap-4">
      <div className="text-[#5F6C72] flex flex-row justify-start">
        <div className="hidden md:flex flex-row items-center gap-1">
          <FaHome /> <span>Home</span> <AiOutlineRight /> <span>Category</span>{" "}
          <AiOutlineRight /> <span>Product</span> <AiOutlineRight />{" "}
          <span>{product?.sub_category ?? "N/A"}</span>
          <AiOutlineRight /> <span>{product?.name ?? "N/A"}</span>{" "}
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-2 w-full md:w-4/5">
          <img
            style={{ height: "70vh" }}
            className="w-full object-cover border border-yellow-950 cursor-pointer"
            src={currentImage}
            alt=""
          />
          <div className="flex flex-row gap-2 overflow-x-scroll">
            {product.image && product.image?.length > 0
              ? product?.image?.map((image, index) => {
                  return (
                    <img
                      onClick={() => setCurrentImage(image.url)}
                      className="wrounded-sm object-contain h-20 border-2 border-yellow-950 cursor-pointer animate__animated animate__slideInLeft"
                      src={image.url}
                      alt=""
                      key={index}
                    />
                  );
                })
              : null}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-3">
          <div className="flex flex-row gap-4">
            <Ratings
              rating={reviewStatRedux?.serverResponse?.data?.averageRating || 0}
            />
            <span className="text-[#191C1F]">
              {reviewStatRedux?.serverResponse?.data?.averageRating || 0} Star
              Rating
            </span>
            <span className="text-[#5F6C72]">
              ({reviewStatRedux?.serverResponse?.data?.totalReviews || 0} User
              feedback)
            </span>
          </div>
          <div className="">
            {product?.name && (
              <h1 className="text-[#191C1F]">{product?.name}</h1>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <span className="text-[#5F6C72]">Model:</span>
              <span className="text-[#191C1F]">{product?.model ?? "N/A"}</span>
            </div>
            <div className="">
              <span className="text-[#5F6C72]">Availability:</span>
              <span className="text-[#EDB842] font-[600] capitalize">
                {product?.product_status}
              </span>
            </div>
            <div className="">
              <span className="text-[#5F6C72]">Brand:</span>
              <span className="text-[#191C1F]">{product?.brand ?? "N/A"}</span>
            </div>
            <div className="">
              <span className="text-[#5F6C72]">Category:</span>
              <span className="text-[#191C1F]">{product?.category}</span>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-baseline">
            <span className="text-[#EDB842] font-[600]">
              $
              {product?.current_price && (
                <FormatNumber price={product?.current_price} />
              )}
            </span>
            {product?.old_price && product?.old_price > 0 ? (
              <span className="text-[#5F6C72] font-[400] line-through">
                $
                {product?.old_price && (
                  <FormatNumber price={product?.old_price} />
                )}
              </span>
            ) : (
              <div className="hidden">i</div>
            )}
            {product?.discount_percentage &&
            product?.discount_percentage > 0 ? (
              <button className="p-2 bg-[#EDB842] rounded-md">
                {product.discount_percentage}% OFF
              </button>
            ) : (
              <div className="hidden">i</div>
            )}
          </div>
          <hr />
          <SelectVariant
            variants={product?.variants || {}}
            setSelectedVariants={setSelectedVariants}
          />
          <div className="flex flex-row gap-2 w-full justify-between">
            <div className="flex flex-row gap-2 border-2 p-2 rounded-md w-3/12 justify-center">
              <button onClick={() => setCount(--count)}>-</button>
              <input
                className="outline-none outline-0 border-none border-0 w-10 text-center"
                type="number"
                onChange={(event) => setCount(Number(event?.target?.value))}
                value={count}
              />
              <button onClick={() => setCount(++count)}>+</button>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-[#EDB842] text-white p-2 flex gap-2 rounded-md items-center w-5/12 justify-center"
            >
              <span>Add to cart</span>
              <BsCart />
            </button>
            <button
              onClick={() => {
                addToCart(product);
                setTimeout(() => {
                  navigate("/cart");
                }, 2000);
              }}
              className="border-2 border-[#EDB842] p-2 rounded-md text-[#EDB842] w-3/12 whitespace-nowrap"
            >
              Buy now
            </button>
          </div>
          <button
            onClick={() =>
              navigate("/user/inbox/" + product?.owner?.id, {
                state: {
                  product_id: product?._id,
                },
              })
            }
            className="p-2 border-2 border-[#62646A] text-[#62646A] rounded-md w-6/12 mx-auto"
          >
            Contact Seller
          </button>
          <div className="flex flex-row gap-3 py-2 text-[#475156] items-center">
            <span
              onClick={() => {
                if (inWishlist({ ...product, isProduct: true })) {
                  deleteWishlistItem({ ...product, isProduct: true });
                } else {
                  addToWishlist({ ...product, isProduct: true });
                }
                setInWishlist(inWishlist({ ...product, isProduct: true }));
              }}
              className="flex flex-col gap-2 items-center justify-center"
            >
              <span className="text-3xl">
                {inWishlistBool ? <MdFavoriteBorder /> : <MdFavorite />}
              </span>
              <span className="whitespace-nowrap">Add to Wishlist</span>
            </span>
            <span className="flex flex-col items-center gap-2 ms-auto justify-center">
              <span className="text-3xl">share to:</span>
              <div className="flex flex-wrap text-lg gap-2">
                <FiCopy onClick={() => copyToClipboard(window.location.href)} />{" "}
                <BsFacebook
                  onClick={() =>
                    shareOnFacebook(
                      "check out this product",
                      window.location.href
                    )
                  }
                />{" "}
                <BsTwitter
                  onClick={() =>
                    shareOnTwitter(
                      "check out this product",
                      window.location.href
                    )
                  }
                />{" "}
                <BsWhatsapp
                  onClick={() =>
                    shareOnWhatsApp(
                      "check out this product",
                      window.location.href
                    )
                  }
                />
              </div>
            </span>
          </div>
          <div className="flex flex-col text-[#191C1F] gap-2 border p-3 rounded-sm">
            <div className="">100% Guarantee Safe Checkout</div>
            <img className="object-cover w-1/2" src={PaymentMethod} alt="" />
          </div>
        </div>
      </div>
      <ProductsDetailsTab
        description={product?.description}
        owner={product?.owner} // owner
        address={product?.address}
        country={product?.country}
        state={product?.state}
        city={product?.city}
        zip_code={product?.zip_code}
        sub_category={product?.sub_category}
        model={product?.model}
        brand={product?.brand}
      />
      <Reviews product_id={product._id} product_type={"product"} />
    </section>
  );
};

export const ProductsDetailsTab = ({
  description,
  owner,
  address,
  country,
  state,
  city,
  zip_code,
  sub_category,
  model,
  brand,
}: any) => {
  const [TabItem, setTabItem] = useState<string>("item1");
  // console.log(owner);
  return (
    <div className="flex flex-row gap-2 p-3 justify-evenly">
      <div className="flex flex-col gap-2 w-full md:w-3/5">
        <div className="flex gap-2 border-b-2 px-2">
          <button
            className={`p-2 ${
              TabItem === "item1"
                ? "text-[#000000] border-b-4 border-[#EDB842]"
                : "text-[#505050]"
            }`}
            onClick={() => setTabItem("item1")}
          >
            Description
          </button>
          <button
            className={`p-2 ${
              TabItem === "item2"
                ? "text-[#000000] border-b-4 border-[#EDB842]"
                : "text-[#505050]"
            }`}
            onClick={() => setTabItem("item2")}
          >
            About Seller
          </button>
          <button
            className={`p-2 ${
              TabItem === "item3"
                ? "text-[#000000] border-b-4 border-[#EDB842]"
                : "text-[#505050]"
            }`}
            onClick={() => setTabItem("item3")}
          >
            Shipping
          </button>
        </div>
        <div className="">
          {TabItem === "item1" ? (
            <ProductsTab1
              description={description}
              sub_category={sub_category}
              model={model}
              brand={brand}
            />
          ) : TabItem === "item2" ? (
            <ProductsTab2 owner={owner} />
          ) : (
            <ProductsTab3
              address={address}
              country={country}
              state={state}
              city={city}
              zip_code={zip_code}
            />
          )}
        </div>
      </div>
      <YouMayLike sub_category={sub_category} />
    </div>
  );
};

export const YouMayLike = ({ sub_category }: any) => {
  // fetch products
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //you may like get products
  const youMayLikeRedux = useSelector(
    (state: ReducersType) => state?.youMayLikeProducts
  ) as ReduxResponseType<Paginator<AdminGetProductType[]>>;

  const products = useMemo(() => {
    return youMayLikeRedux?.serverResponse?.data;
  }, [youMayLikeRedux]);

  useEffect(() => {
    dispatch(
      youMayLikeProductsAction(
        "sub_category=" + sub_category + "&limit=4"
      ) as any
    );
  }, [sub_category, dispatch]);

  return (
    <div className="hidden border bg-white rounded-md p-4 space-y-4 md:flex md:flex-col md:w-1/3 lg:w-2/5 max-w-[280px]">
      <div className="font-[600] text-[#1C1C1C] text-xl">You may like</div>
      {products?.data && products?.data?.length > 0 ? (
        products?.data?.map((value, index) => {
          return (
            <div
              onDoubleClick={() =>
                navigate(
                  `/product/details/${value?._id}/${slugify(value?.name)}`
                )
              }
              key={index}
              className="flex flex-row space-x-2 w-full"
            >
              <img
                className="border rounded-md object-cover w-24 h-24"
                src={value?.image?.[0]?.url || productImageA}
                alt=""
              />
              <div className="flex flex-col">
                <div className="text-[#1C1C1C] text-md">{value?.name}</div>
                <div className="text-[#8B96A5] text-sm">
                  $
                  {value?.current_price ? (
                    <FormatNumber price={value?.current_price} />
                  ) : (
                    0.0
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Products Found</div>
      )}
    </div>
  );
};

const ProductsTab1 = ({ description, sub_category, brand, model }: any) => {
  return (
    <div
      className="border bg-no-repeat bg-contain bg-center text-[#505050] p-3 flex flex-col gap-3"
      style={{ backgroundImage: `url(${bgWhoAreWe})` }}
    >
      <div className="">{description || "N/A"}</div>
      <div className="text-[#505050]">
        <table className="table-auto w-full md:w-2/3">
          <tbody className="">
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Category</td>
              <td className="border p-2">{sub_category || "N/A"}</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Brand</td>
              <td className="border p-2">{brand || "N/A"}</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Model</td>
              <td className="border p-2">{model || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
const ProductsTab2 = ({ owner }: any) => {
  return (
    <div
      className="border bg-no-repeat bg-contain bg-center text-[#505050] p-3 flex flex-col gap-3"
      style={{ backgroundImage: `url(${bgWhoAreWe})` }}
    >
      <div className="text-[#505050] font-[600] text-xl">Seller Details</div>
      <div className="text-[#505050]">
        <table className="table-auto w-full md:w-2/3">
          <tbody className="">
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Username</td>
              <td className="border p-2">{owner?.username || "N/A"}</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Email</td>
              <td className="border p-2">{owner?.email || "N/A"}</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Phone</td>
              <td className="border p-2">{owner?.phone_number || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
const ProductsTab3 = ({ address, city, state, zip_code, country }: any) => {
  return (
    <div
      className="border bg-no-repeat bg-contain bg-center text-[#505050] p-3 flex flex-col gap-3"
      style={{ backgroundImage: `url(${bgWhoAreWe})` }}
    >
      <div className="">To be shipped from</div>
      <div className="text-[#505050]">
        <table className="table-auto w-full md:w-2/3">
          <tbody className="">
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Address</td>
              <td className="border p-2">{address ?? "N/A"}</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Country</td>
              <td className="border p-2">{country ?? "N/A"}</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">State</td>
              <td className="border p-2">{state ?? "N/A"}</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">City</td>
              <td className="border p-2">{city ?? "N/A"}</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Zip Code</td>
              <td className="border p-2">{zip_code ?? "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsDetailsBody;
