import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ProductdetailImageMain } from "../../../images/productdetails";
import { bgWhoAreWe } from "../../../images/whoarewe";
import {
  sellerDeleteProductAction,
  sellerGetProductByIdAction,
} from "../../../redux/actions/seller/seller-products.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminGetProductType } from "../../../redux/types/products.types";
import { FormatNumber } from "../../shareables/FormatNumber";
import { Ratings } from "../../shareables/Ratings";
import Reviews from "../../shareables/reviews";
import SelectVariant from "../../shareables/selectVariants";

const SellerProductDetailsBody = () => {
  // let [count, setCount] = useState<number>(2);

  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [products, setProducts] = useState<AdminGetProductType | null>(null);
  const [, setSelectedVariants] = useState<Array<[string, string]>>();
  // image slider
  const [currentImage, setCurrentImage] = useState<string>(
    products?.image && products?.image.length > 0
      ? products?.image[0].url
      : ProductdetailImageMain
  );
  const sellerGetProductByIdRedux = useSelector(
    (state: ReducersType) => state?.sellerGetByIdProduct
  ) as ReduxResponseType<AdminGetProductType>;

  useEffect(() => {
    dispatch(sellerGetProductByIdAction({ id }) as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sellerGetProductByIdRedux?.serverResponse.data) {
      const variant_keys = Object.keys(
        sellerGetProductByIdRedux?.serverResponse?.data?.variants || {}
      );
      setSelectedVariants(
        variant_keys.map((key) => {
          return [
            key,
            sellerGetProductByIdRedux?.serverResponse?.data?.variants[key][0],
          ];
        })
      );
      setProducts({
        ...sellerGetProductByIdRedux?.serverResponse?.data,
      });
      setCurrentImage(
        sellerGetProductByIdRedux?.serverResponse?.data?.image &&
          sellerGetProductByIdRedux?.serverResponse?.data?.image.length > 0
          ? sellerGetProductByIdRedux?.serverResponse?.data?.image[0].url
          : ProductdetailImageMain
      );
    }
  }, [sellerGetProductByIdRedux?.serverResponse, dispatch, id]);

  // delete products
  const sellerDeleteProductsByIDRedux = useSelector(
    (state: ReducersType) => state?.sellerDeleteProduct
  ) as ReduxResponseType<AdminGetProductType>;

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(sellerDeleteProductAction({ id }) as any);

        if (!sellerDeleteProductsByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            sellerDeleteProductsByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            navigate("/seller/products");
            // dispatch(sellerGetProductsAction() as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", sellerDeleteProductsByIDRedux?.error, "error");
        }
      }
    });
  };

  return (
    <section className="p-3 flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div
          onClick={() => navigate("/seller/products")}
          className="flex items-center gap-3"
        >
          <AiOutlineArrowLeft />
          <div className="text-lg text-[#1D1F2C] font-[600]">Products</div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() =>
              navigate(`/seller/products/edit/${products?._id as string}`)
            }
            className="bg-[#EDB84233] rounded-md p-2 text-[#EDB842]"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(products?._id as string)}
            className="flex items-center gap-2 bg-[#E52626B2] text-white p-2 rounded-md"
          >
            <MdDelete />
            <span>Delete Product</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 w-full md:w-4/5">
          <img
            style={{ height: "70vh" }}
            className="w-full object-cover border border-yellow-950 cursor-pointer"
            src={currentImage}
            alt=""
          />
          <div className="flex flex-row gap-2 overflow-x-scroll">
            {products?.image && products?.image?.length > 0
              ? products?.image?.map((image, index) => {
                  return (
                    <img
                      onClick={() => setCurrentImage(image.url)}
                      className="wrounded-sm object-contain h-20 border-2 border-yellow-950 cursor-pointer animate__animated animate__slideInLeft"
                      src={image?.url}
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
            {" "}
            <Ratings rating={products?.rating} />
            <span className="text-[#191C1F]">
              {products?.rating} Star Rating
            </span>
            <span className="text-[#5F6C72]">
              ({products?.total_rating} User feedback)
            </span>
          </div>
          <div className="">{products?.name}</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <span className="text-[#5F6C72]">Sku:</span>
              <span className="text-[#191C1F]">{products?.model}</span>
            </div>
            <div className="">
              <span className="text-[#5F6C72]">Availability:</span>
              <span className="text-[#EDB842]">{products?.product_status}</span>
            </div>
            <div className="">
              <span className="text-[#5F6C72]">Brand:</span>
              <span className="text-[#191C1F]">{products?.brand}</span>
            </div>
            <div className="">
              <span className="text-[#5F6C72]">Category:</span>
              <span className="text-[#191C1F]">{products?.category}</span>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-baseline">
            <span className="text-[#EDB842] font-[600]">
              $
              {products?.current_price && (
                <FormatNumber price={products?.current_price} />
              )}
            </span>
            {products?.old_price && products?.old_price > 0 ? (
              <span className="text-[#5F6C72] font-[400] line-through">
                $
                {products?.old_price && (
                  <FormatNumber price={products?.old_price} />
                )}
              </span>
            ) : (
              <div className="hidden">i</div>
            )}
            {products?.discount_percentage &&
            products?.discount_percentage > 0 ? (
              <button className="p-2 bg-[#EDB842] rounded-md">
                {products?.discount_percentage}% OFF
              </button>
            ) : (
              <div className="hidden">i</div>
            )}
          </div>
          <hr />
          <SelectVariant
            variants={products?.variants || {}}
            setSelectedVariants={setSelectedVariants}
          />
        </div>
      </div>
      <SellerProductsDetailsTab
        product_id={products?._id as string}
        owner_id={products?.owner?.id || ""}
        description={products?.description}
        owner={products?.owner} // owner
        address={products?.address}
        country={products?.country}
        state={products?.state}
        city={products?.city}
        zip_code={products?.zip_code}
        sub_category={products?.sub_category}
        model={products?.model}
        brand={products?.brand}
      />
    </section>
  );
};

export const SellerProductsDetailsTab = ({
  product_id,
  owner_id,
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
  return (
    <div className="flex flex-row gap-2 p-3 justify-evenly">
      <div className="flex flex-col gap-2 w-full lg:w-3/5">
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
            Reviews
          </button>
          <button
            className={`p-2 ${
              TabItem === "item3"
                ? "text-[#000000] border-b-4 border-[#EDB842]"
                : "text-[#505050]"
            }`}
            onClick={() => setTabItem("item3")}
          >
            About Seller
          </button>
          <button
            className={`p-2 ${
              TabItem === "item4"
                ? "text-[#000000] border-b-4 border-[#EDB842]"
                : "text-[#505050]"
            }`}
            onClick={() => setTabItem("item4")}
          >
            Shipping
          </button>
        </div>
        <div className="flex w-full">
          {TabItem === "item1" ? (
            <ProductsTab1
              description={description}
              sub_category={sub_category}
              model={model}
              brand={brand}
            />
          ) : TabItem === "item2" ? (
            <ProductsTab2 product_id={product_id} owner_id={owner_id} />
          ) : TabItem === "item3" ? (
            <ProductsTab3 owner={owner} />
          ) : (
            <ProductsTab4
              address={address}
              country={country}
              state={state}
              city={city}
              zip_code={zip_code}
            />
          )}
        </div>
      </div>
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
const ProductsTab2 = ({
  product_id,
  owner_id,
}: {
  product_id: string;
  owner_id: string;
}) => {
  return (
    <Reviews
      product_id={product_id}
      product_type={"product"}
      owner_id={owner_id}
    />
  );
};

const ProductsTab3 = ({ owner }: any) => {
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
const ProductsTab4 = ({ address, city, state, zip_code, country }: any) => {
  return (
    <div
      className="border bg-no-repeat bg-contain bg-center text-[#505050] p-3 flex flex-col gap-3"
      style={{ backgroundImage: `url(${bgWhoAreWe})` }}
    >
      <div className="">To be shipped from</div>
      <div className="text-[#505050]">
        <table className="table-auto w-full">
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
export default SellerProductDetailsBody;
