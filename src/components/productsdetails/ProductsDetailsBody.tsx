import { useEffect, useMemo, useState } from "react";
import { AiFillStar, AiOutlineRight, AiOutlineShareAlt } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import {
  BsArrowRight,
  BsCart,
  BsFacebook,
  BsHandThumbsDown,
  BsHandThumbsUp,
  BsSearch,
  BsTwitter,
} from "react-icons/bs";
import { FaFlag, FaHome, FaPinterestP } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { MdFavoriteBorder, MdMenu } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { mayLike } from "../../data/maylikeData";
import {
  PaymentMethod,
  ProductdetailImageMain,
} from "../../images/productdetails";
import { bgWhoAreWe } from "../../images/whoarewe";
import { homeGetProductDetailsAction } from "../../redux/actions/home.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { AdminGetProductType } from "../../redux/types/products.types";
import { Ratings } from "../shareables/Ratings";

const ProductsDetailsBody = () => {
  let [count, setCount] = useState<number>(2);

  // fetch product detail
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const id = String(params.id);
  const name = String(params.name);

  const homeGetProductDetailsRedux = useSelector(
    (state: ReducersType) => state?.homeGetProductDetails
  ) as ReduxResponseType<AdminGetProductType>;

  const product = useMemo(() => {
    return homeGetProductDetailsRedux?.serverResponse?.data;
  }, [homeGetProductDetailsRedux]);

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

  // console.log(product);

  return (
    <section className="p-3 flex flex-col gap-4">
      <div className="text-[#5F6C72] flex flex-row justify-between">
        <div className="hidden md:flex flex-row items-center gap-1">
          <FaHome /> <span>Home</span> <AiOutlineRight /> <span>Category</span>{" "}
          <AiOutlineRight /> <span>Product</span> <AiOutlineRight />{" "}
          <span>Electronics Devices</span>
          <AiOutlineRight /> <span>Macbook Pro</span>{" "}
        </div>
        <div className="flex flex-row items-center gap-3 ms-auto">
          <MdMenu />
          <MdFavoriteBorder />
          <span className="border border-[#DADBDD] p-1 rounded-md">2,767</span>
          <span className="border border-[#DADBDD] p-2 rounded-md">
            <FaFlag />
          </span>
          <span className="border border-[#DADBDD] p-2 rounded-md text-[#EDB842]">
            {" "}
            <AiOutlineShareAlt />
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-2 w-4/5">
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
            {" "}
            <Ratings rating={4.7} />
            <span className="text-[#191C1F]">4.7 Star Rating</span>
            <span className="text-[#5F6C72]">(21,671 User feedback)</span>
          </div>
          <div className="">
            {product?.name && (
              <h1 className="text-[#191C1F]">{product?.name}</h1>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <span className="text-[#5F6C72]">Sku:</span>
              <span className="text-[#191C1F]">{product?.model}</span>
            </div>
            <div className="">
              <span className="text-[#5F6C72]">Availability:</span>
              <span className="text-[#EDB842]">{product?.product_status}</span>
            </div>
            <div className="">
              <span className="text-[#5F6C72]">Brand:</span>
              <span className="text-[#191C1F]">{product.brand}</span>
            </div>
            <div className="">
              <span className="text-[#5F6C72]">Category:</span>
              <span className="text-[#191C1F]">{product.category}</span>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-baseline">
            <span className="text-[#EDB842] font-[600]">
              ${product.current_price}
            </span>
            <span className="text-[#5F6C72] font-[400]">
              ${product.old_price}.00
            </span>
            <button className="p-2 bg-[#EDB842] rounded-md">
              {product.discount_percentage}% OFF
            </button>
          </div>
          <hr />
          <div className="grid grid-cols-2 gap-2 text-[#475156]">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Color</label>
              <div className="flex gap-2">
                <input name="color" className="p-3" type="radio" />
                <input name="color" className="p-3" type="radio" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Size</label>
              <div className="border-2 p-1 rounded-md overflow-x-hidden">
                <select name="" id="">
                  <option className="" value="">
                    14-inch Liquid Retina XDR display
                  </option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Memory</label>
              <div className="border-2 p-1 rounded-md">
                <select name="" id="">
                  <option value="">16GB unified memory</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Storage</label>
              <div className="border-2 p-1 rounded-md">
                <select name="" id="">
                  <option value="">1TV SSD Storage</option>
                </select>
              </div>
            </div>
          </div>
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
          <button className="p-2 border-2 border-[#62646A] text-[#62646A] rounded-md w-6/12 mx-auto">
            Contact Seller
          </button>
          <div className="flex flex-row gap-3 py-2 text-[#475156] items-center">
            <span className="flex flex-wrap gap-2 items-center">
              <span className="text-3xl">
                <MdFavoriteBorder />
              </span>
              Add to Wishlist
            </span>
            <span className="flex flex-wrap gap-2 items-center">
              <span className="text-3xl">
                <BiRefresh />
              </span>
              Add to Compare
            </span>
            <span className="flex gap-2 ms-auto whitespace-nowrap">
              Share product: <FiCopy /> <BsFacebook /> <BsTwitter />
              <FaPinterestP />
            </span>
          </div>
          <div className="flex flex-col text-[#191C1F] gap-2 border p-3 rounded-sm">
            <div className="">100% Guarantee Safe Checkout</div>
            <img className="object-cover w-1/2" src={PaymentMethod} alt="" />
          </div>
        </div>
      </div>
      <ProductsDetailsTab />
      <Reviews />
    </section>
  );
};

export const ProductsDetailsTab = () => {
  const [TabItem, setTabItem] = useState<string>("item1");
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
            <ProductsTab2 />
          ) : TabItem === "item3" ? (
            <ProductsTab3 />
          ) : (
            <ProductsTab4 />
          )}
        </div>
      </div>
      <div className="hidden border bg-white rounded-md p-4 space-y-4 md:flex md:flex-col md:w-1/3 lg:w-2/5 max-w-[280px]">
        <div className="font-[600] text-[#1C1C1C] text-xl">You may like</div>
        {mayLike.map((value, i) => {
          return (
            <div className="flex flex-row space-x-2 w-full">
              <img
                className="border rounded-md object-cover"
                src={value.image}
                alt=""
              />
              <div className="flex flex-col">
                <div className="text-[#1C1C1C] text-md">{value.name}</div>
                <div className="text-[#8B96A5] text-sm">{value.price}</div>
              </div>
            </div>
          );
        })}
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
const ProductsTab2 = () => {
  return <div>Tab 2</div>;
};
const ProductsTab3 = () => {
  return <div>Tab 3</div>;
};
const ProductsTab4 = () => {
  return <div>Tab 4</div>;
};

const Reviews = () => {
  return (
    <div className="flex flex-col gap-4 p-5 w-full md:w-3/5">
      <div className="">Reviews</div>
      <div className="flex flex-row  gap-5">
        <span>902 reviews for this Gig</span> <Ratings rating={4.6} />
      </div>
      <div className="flex flex-row items-center">
        <input
          className="border-[1px]  p-[0.46rem] border-[#C5C6C9] outline-none rounded-l-md"
          type="text"
        />
        <button className="bg-[#222325] px-3 py-3 text-white -m-2 rounded-r-md">
          <BsSearch />
        </button>
      </div>
      <div className="flex gap-3 text-[#404145]">
        Sort By:{" "}
        <select className="outline-none" name="" id="">
          <option value="">Search reviews</option>
        </select>
      </div>
      <div className="flex flex-row gap-3 text-[#62646A] items-center">
        <input type="checkbox" name="" id="" />
        <label htmlFor="">Delivery images (558)</label>
      </div>
      <div className="flex flex-col gap-4 border shadow-md p-5 rounded-md">
        <div className="border-b-4 text-[#EDB842] border-b-[#EDB842] w-20 whitespace-nowrap text-lg">
          Write Review
        </div>
        <div className="flex flex-row gap-2 text-2xl text-[#DADDE5]">
          {" "}
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <textarea
          className="border-2 p-3 rounded-md"
          name="comment"
          id=""
          cols={20}
          rows={5}
        >
          Share you thought about this seller...
        </textarea>
        <button className="flex flex-row gap-2 justify-between px-4 py-2 items-center text-white bg-[#EDB842] rounded-md max-w-[190px]">
          <span>publish Review</span>
          <span>
            <BsArrowRight />
          </span>
        </button>
      </div>
      <hr />
      <div className="flex flex-row gap-4">
        <div className="">
          <span className="bg-[#E4E5E7] p-2 rounded-full text-white">M</span>
        </div>
        <div className="flex flex-col gap-2 text-[#62646A]">
          <div className="text-[#404145]">marvinachi</div>
          <div className="">United states</div>
          <div className="flex flex-row gap-4 items-center">
            <Ratings rating={5} /> <span>1 month ago</span>
          </div>
          <div className="">
            Amazing work. Will def work again with him this was a big project
            and he knocked it out of the park.
          </div>
          <div className="flex gap-3 items-center">
            {" "}
            <span>Helpful?</span>
            <span className="flex items-center">
              Yes
              <BsHandThumbsUp />
            </span>
            <span className="flex items-center">
              No
              <BsHandThumbsDown />
            </span>
          </div>
          {/* Response */}
          <div className="mt-4 flex flex-row gap-4">
            <div className="">
              <span className="bg-[#E4E5E7] p-2 rounded-full text-white">
                M
              </span>
            </div>
            <div className="">
              <div className="text-[#404145] font-[700]">Seller's Response</div>
              <div className="text-[#404145] font-[400]">
                Thank you so much 😊
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-row gap-4">
        <div className="">
          <span className="bg-[#E4E5E7] p-2 rounded-full text-white">M</span>
        </div>
        <div className="flex flex-col gap-2 text-[#62646A]">
          <div className="text-[#404145]">jcpconsulting</div>
          <div className="">United states</div>
          <div className="flex flex-row gap-4 items-center">
            <Ratings rating={5} /> <span>1 month ago</span>
          </div>
          <div className="">
            Amazing work. Will def work again with him this was a big project
            and he knocked it out of the park.
          </div>
          <div className="flex gap-3 items-center">
            {" "}
            <span>Helpful?</span>
            <span className="flex items-center">
              Yes
              <BsHandThumbsUp />
            </span>
            <span className="flex items-center">
              No
              <BsHandThumbsDown />
            </span>
          </div>
          {/* Response */}
          <div className="mt-4 flex flex-row gap-4">
            <div className="">
              <span className="bg-[#E4E5E7] p-2 rounded-full text-white">
                M
              </span>
            </div>
            <div className="">
              <div className="text-[#404145] font-[700]">Seller's Response</div>
              <div className="text-[#404145] font-[400]">
                Thank you so much 😊
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-[#EDB842] text-lg font-[700]">+ See More</div>
    </div>
  );
};

export default ProductsDetailsBody;
