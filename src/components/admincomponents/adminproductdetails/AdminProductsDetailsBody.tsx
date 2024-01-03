import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ProductdetailImage1,
  ProductdetailImage2,
  ProductdetailImage3,
  ProductdetailImage4,
  ProductdetailImage5,
  ProductdetailImage6,
  ProductdetailImageMain,
} from "../../../images/productdetails";
import { user2 } from "../../../images/users";
import { bgWhoAreWe } from "../../../images/whoarewe";
import { adminGetProductByIdAction } from "../../../redux/actions/admin/products.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminGetProductType } from "../../../redux/types/products.types";
import { Ratings } from "../../shareables/Ratings";
import Reviews from "../../shareables/reviews";
import SelectVariant from "../../shareables/selectVariants";

const AdminProductsDetailsBody = () => {
  let [count, setCount] = useState<number>(2);

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

  useEffect(() => {
    if (adminGetProductByIdRedux?.serverResponse.data) {
      const variant_keys = Object.keys(
        adminGetProductByIdRedux?.serverResponse?.data?.variants
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
        <div className="flex flex-col gap-2">
          <img src={ProductdetailImageMain} alt="" />
          <div className="flex flex-row gap-2 overflow-x-scroll">
            <span>
              <img src={ProductdetailImage1} alt="" />
            </span>
            <span>
              <img src={ProductdetailImage2} alt="" />
            </span>
            <span>
              <img src={ProductdetailImage3} alt="" />
            </span>
            <span>
              <img src={ProductdetailImage4} alt="" />
            </span>
            <span>
              <img src={ProductdetailImage5} alt="" />
            </span>
            <span>
              <img src={ProductdetailImage6} alt="" />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-3">
          <div className="flex flex-row gap-4">
            {" "}
            <Ratings rating={4.7} />
            <span className="text-[#191C1F]">4.7 Star Rating</span>
            <span className="text-[#5F6C72]">(21,671 User feedback)</span>
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
              ${products?.current_price}
            </span>
            <span className="text-[#5F6C72] font-[400]">
              ${products?.old_price}
            </span>
            <button className="p-2 bg-[#EDB842] rounded-md">
              {products?.discount_percentage}% OFF
            </button>
          </div>
          <hr />
          <SelectVariant
            variants={products?.variants || {}}
            setSelectedVariants={setSelectedVariants}
          />
          <div className="flex flex-row gap-2 w-full justify-between">
            <div className="flex flex-row gap-2 border-2 p-2 rounded-md w-3/12 justify-center">
              <button onClick={() => setCount(--count)}>-</button>
              <input
                className="outline-none outline-0 border-none border-0 w-10 text-center"
                type="number"
                value={count}
              />
              <button onClick={() => setCount(++count)}>+</button>
            </div>
            <button className="bg-[#EDB842] text-white p-2 flex gap-2 rounded-md items-center w-5/12 justify-center">
              <span>Add to card</span>
              <BsCart />
            </button>
            <button className="border-2 border-[#EDB842] p-2 rounded-md text-[#EDB842] w-3/12">
              Buy now
            </button>
          </div>
        </div>
      </div>
      <AdminProductsDetailsTab product={products} />
      <AdminAboutSeller />
    </section>
  );
};

const AdminAboutSeller = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-[700] text-2xl">About The Seller</div>
      <div className="flex flex-row gap-4 items-center md:w-2/3 max-w-[60rem]">
        <div className="">
          <img src={user2} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-lg font-[700] text-[#0E0E0F]">
            Marjorie Asturias
          </div>
          <div className="font-[400] text-[#95979D] ">
            WordPress expert with 10+ years working with business owners,
            influencers and bloggers to expand their online audience.
          </div>
          <div className="flex items-center gap-3 text-[#95979D]">
            <Ratings rating={4} />
            (974)
          </div>
        </div>
      </div>
      <div className="border p-5 rounded-md text-[#62646A] font-[400] text-sm md:w-2/3 max-w-[60rem]">
        <div className="flex flex-row gap-3 justify-between py-3">
          <div className="flex flex-col gap-3">
            <div className="">
              <div className="text-[#74767E] font-[400]">From</div>
              <div className="text-[#62646A] font-[600]">Sri Lanka</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">
                Avg. response time
              </div>
              <div className="text-[#62646A] font-[600]">1 hour</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">Languages</div>
              <div className="text-[#62646A] font-[600]">English</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="">
              <div className="text-[#74767E] font-[400]">Member since</div>
              <div className="text-[#62646A] font-[600]">Aug 2019</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">Aug 2019</div>
              <div className="text-[#62646A] font-[600]">about 3 hours</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="py-3">
          At Airbluesoft Premium Digital Studio we create all kinds of creative
          videos, specializing in Creating Promos( Website, Apps, Fashion, Real
          Estate, Youtube, NFT) and all other promos and all instructional
          videos.
          <br />
          <br />
          We Create Basic To High-End Videos.
          <br />
          <br />
          Creativity Beyond the Limits. -Airbluesoft Premium Digital Studio-
        </div>
      </div>
    </div>
  );
};

export const AdminProductsDetailsTab = ({
  product,
}: {
  product: AdminGetProductType | null;
}) => {
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
            Shipping
          </button>
          <button
            className={`p-2 ${
              TabItem === "item4"
                ? "text-[#000000] border-b-4 border-[#EDB842]"
                : "text-[#505050]"
            }`}
            onClick={() => setTabItem("item4")}
          >
            About seller
          </button>
        </div>
        <div className="">
          {TabItem === "item1" ? (
            <ProductsTab1 />
          ) : TabItem === "item2" ? (
            <ProductsTab2 product={product} />
          ) : TabItem === "item3" ? (
            <ProductsTab3 />
          ) : (
            <ProductsTab4 />
          )}
        </div>
      </div>
    </div>
  );
};

const ProductsTab1 = () => {
  return (
    <div
      className="border bg-no-repeat bg-contain bg-center text-[#505050] p-3 flex flex-col gap-3"
      style={{ backgroundImage: `url(${bgWhoAreWe})` }}
    >
      <div className="">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit
        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, Quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.{" "}
      </div>
      <div className="text-[#505050]">
        <table className="table-auto w-full md:w-2/3">
          <tbody className="">
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Model</td>
              <td className="border p-2">#8786867</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Style</td>
              <td className="border p-2">Classic style</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Certificate</td>
              <td className="border p-2">ISO-898921212</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Size</td>
              <td className="border p-2">34mm x 450mm x 19mm</td>
            </tr>
            <tr className="">
              <td className="border p-2 bg-[#EFF2F4]">Memory</td>
              <td className="border p-2">36GB RAM</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col space-y-3 p-3">
        <div className="flex space-x-3">
          <span className="text-2xl">
            <TiTick />
          </span>
          <span>Some great feature name here</span>
        </div>
        <div className="flex space-x-3">
          <span className="text-2xl">
            <TiTick />
          </span>
          <span>Lorem ipsum dolor sit amet, consectetur </span>
        </div>
        <div className="flex space-x-3">
          <span className="text-2xl">
            <TiTick />
          </span>
          <span>Duis aute irure dolor in reprehenderit</span>
        </div>
        <div className="flex space-x-3">
          <span className="text-2xl">
            <TiTick />
          </span>
          <span>Some great feature name here</span>
        </div>
      </div>
    </div>
  );
};
const ProductsTab2 = ({ product }: { product: AdminGetProductType | null }) => {
  return (
    <div className="flex w-full">
      <Reviews
        product_id={product?._id || ""}
        owner_id={product?.owner?.id}
        product_type={"product"}
      />
    </div>
  );
};
const ProductsTab3 = () => {
  return <div>Tab 3</div>;
};
const ProductsTab4 = () => {
  return <div>Tab 4</div>;
};

export default AdminProductsDetailsBody;
