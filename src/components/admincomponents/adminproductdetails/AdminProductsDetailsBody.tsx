import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ProductdetailImageMain } from "../../../images/productdetails";
import { adminGetProductByIdAction } from "../../../redux/actions/admin/products.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminGetProductType } from "../../../redux/types/products.types";
import { ProductsDetailsTab } from "../../productsdetails/ProductsDetailsBody";
import { FormatNumber } from "../../shareables/FormatNumber";
import { Ratings } from "../../shareables/Ratings";
import SelectVariant from "../../shareables/selectVariants";

const AdminProductsDetailsBody = () => {
  // let [count, setCount] = useState<number>(2);

  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [products, setProducts] = useState<AdminGetProductType | null>(null);
  const [, setSelectedVariants] = useState<Array<[string, string]>>();
  const adminGetProductByIdRedux = useSelector(
    (state: ReducersType) => state?.adminGetByIdProduct
  ) as ReduxResponseType<AdminGetProductType>;

  useEffect(() => {
    dispatch(adminGetProductByIdAction({ id }) as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // image slider
  const [currentImage, setCurrentImage] = useState<string>(
    products?.image && products?.image.length > 0
      ? products?.image[0].url
      : ProductdetailImageMain
  );

  useEffect(() => {
    setCurrentImage(
      products?.image && products.image.length > 0
        ? products.image[0].url
        : ProductdetailImageMain
    );
  }, [products?.image]);

  useEffect(() => {
    if (adminGetProductByIdRedux?.serverResponse.data) {
      const variant_keys = Object.keys(
        adminGetProductByIdRedux?.serverResponse?.data?.variants || {}
      );
      setSelectedVariants(
        variant_keys.map((key) => {
          return [
            key,
            adminGetProductByIdRedux?.serverResponse?.data?.variants[key][0],
          ];
        })
      );
      setProducts({
        ...adminGetProductByIdRedux?.serverResponse?.data,
      });
    }
  }, [adminGetProductByIdRedux?.serverResponse, dispatch, id]);

  // console.log(products);
  return (
    <section className="p-3 flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-3"
        >
          <AiOutlineArrowLeft />
          <div className="text-lg text-[#1D1F2C] font-[600]">
            Product Details
          </div>
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/admin/product/edit/${products?._id}`)}
            className="bg-[#EDB84233] rounded-md p-2 text-[#EDB842]"
          >
            Edit
          </button>
          <button className="flex items-center gap-2 bg-[#E52626B2] text-white p-2 rounded-md">
            {" "}
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
              <span className="text-[#5F6C72]">Model:</span>
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
                {products.discount_percentage}% OFF
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
      <ProductsDetailsTab
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
      {/* <AdminAboutSeller /> */}
    </section>
  );
};

export default AdminProductsDetailsBody;
