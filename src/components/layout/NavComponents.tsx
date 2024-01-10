import { useEffect, useMemo, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { FaComments, FaHome, FaUser } from "react-icons/fa";
import { MdFavoriteBorder, MdPersonOutline, MdSell } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "../../data/CategoryData";
import { LogoSideBlack } from "../../images/logo";
import { totalCartAction } from "../../redux/actions/cart.actions";
import { ReducersType } from "../../redux/store";
import { LoginResponseType } from "../../redux/types/auth.types";
import { ReduxResponseType } from "../../redux/types/general.types";
import {
  Dropdown,
  DropdownMenuBar,
  DropdownMenuForLargeScreen,
} from "../shareables/Dropdown";

export const LargeScreenNav = () => {
  return (
    <div className="hidden md:flex bg-[#000000] p-3 text-white justify-center gap-5 playfair-display items-center">
      <div className="border-r-[0.4px] px-5 border-[#afa9a9]">
        <Link to={"/"}>Home</Link>
      </div>
      <div className="border-r-[0.4px] px-5 border-[#afa9a9]">
        <DropdownMenuForLargeScreen />
      </div>
      <div className="border-r-[0.4px] px-5 border-[#afa9a9]">
        <Link to={"/groupchat/list"}>Groupchat</Link>
      </div>
      <div className="px-5">
        <Link to={"/seller/dashboard"}>Join Sellers</Link>
      </div>
    </div>
  );
};

export const NavCartAndLogin = ({
  login,
}: {
  login: ReduxResponseType<LoginResponseType[]>;
}) => {
  const dispatch = useDispatch();

  // get cart total
  const totalCartRedux = useSelector(
    (state: ReducersType) => state?.totalCart
  ) as ReduxResponseType<number>;

  const totalCartItems = useMemo(() => {
    return totalCartRedux?.serverResponse?.data;
  }, [totalCartRedux]);

  useEffect(() => {
    dispatch(totalCartAction() as any);
  }, [dispatch]);
  // get cart total ends

  // bounce cart on change
  const [totalCartItemsChanged, setTotalCartItemsChanged] = useState(false);

  useEffect(() => {
    setTotalCartItemsChanged(true);
    setTimeout(() => {
      setTotalCartItemsChanged(false);
    }, 600); // Adjust animation duration as needed
  }, [totalCartItems]);
  // bounce cart on change ends
  return (
    <div className="flex p-2 gap-2 ms-auto">
      <Link to={"/login"}>
        <div className="flex gap-2 items-center">
          <span className="text-[#EDB842] text-2xl">
            <MdPersonOutline />
          </span>
          {login.serverResponse.success ? "Dashboard" : "Login"}
        </div>
      </Link>
      <Link
        className="flex gap-2 items-center border-l-[2px] border-[#D9D9D9] px-2"
        to={"/cart"}
      >
        <span className="text-[#EDB842] text-2xl relative p-1">
          {totalCartItems >= 0 && (
            <span
              className={`absolute -top-3 -right-1 rounded-full bg-[#EDB842] text-white p-[0.3rem] w-fit h-fit font-[600] text-sm animate__animated animate__bounce ${
                totalCartItemsChanged ? "animate__bounceIn" : ""
              }`}
            >
              {totalCartItems}
            </span>
          )}
          <AiOutlineShoppingCart />
        </span>
        Cart
      </Link>
    </div>
  );
};

export const SellerSwitchNav = () => {
  const navigate = useNavigate();
  // toggle switch to seller dashboard after login start
  const [isChecked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked((prevState) => !prevState);
  };

  useEffect(() => {
    // navigate to seller dashboard
    setTimeout(() => {
      if (isChecked) {
        navigate("/seller/dashboard");
      }
    }, 2000);
  }, [isChecked, navigate]);
  // toggle switch to seller dashboard after login end
  return (
    <div className="flex flex-row justify-around text-[#282828] playfair-display py-4 px-2 bg-[#f1f1f2] ">
      <div className="flex flex-row gap-2">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="hidden"
              checked={isChecked}
              onChange={toggleSwitch}
            />
            <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div
              className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform ${
                isChecked ? "transform translate-x-full bg-green-500" : ""
              }`}
            ></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium whitespace-nowrap">
            Switch to seller page
          </div>
        </label>
      </div>
      <div className="flex flex-row gap-2">
        <div
          onClick={() => navigate("/wishlist")}
          className="flex gap-2 items-center"
        >
          <MdFavoriteBorder /> Wishlist
        </div>
        <div className="">English,USD</div>
      </div>
    </div>
  );
};

export const NavSearchInput = ({ isMdScreen }: { isMdScreen: boolean }) => {
  // search input and button start
  const [categorySelect, setCategorySelect] = useState("products");
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log(categorySelect, search);
    if (search !== "") {
      if (categorySelect === "products") {
        // window.location.href = `/products?page=1&search=${search}`;
        window.location.replace(`/products?page=1&search=${search}`);
      } else if (categorySelect === "services") {
        // window.location.href = `/services?page=1&search=${search}`;
        window.location.replace(`/services?page=1&search=${search}`);
      }
    }
  };
  // search input and button end
  return (
    <div
      className={` ${
        isMdScreen ? "hidden md:flex" : "flex md:hidden w-full"
      } border-[2px] border-[#EDB842] rounded-md`}
    >
      <input
        name="search"
        onChange={(e) => setSearch(e.target.value)}
        className={`border-0 p-2 outline-none font-[600] ${
          !isMdScreen && "flex-1"
        }`}
        type="text"
        placeholder="Search"
        value={search}
      />
      <Dropdown options={Category} setCategorySelect={setCategorySelect} />
      <button
        onClick={handleSearch}
        type="button"
        className="bg-[#EDB842] text-white py-2 font-[700] px-5"
      >
        Search
      </button>
    </div>
  );
};

type HomeNavSmallScreenType = {
  login: ReduxResponseType<LoginResponseType[]>;
  flexRef: React.MutableRefObject<any>;
  skrill: () => void;
};

export const HomeNavSmallScreen = ({
  login,
  flexRef,
  skrill,
}: HomeNavSmallScreenType) => {
  return (
    <div
      ref={flexRef}
      className={`hidden md:hidden`}
      // style={{ display: isScrolled ? "hidden !important" : "visible" }}
    >
      <div className="fixed animate__animated animate__slideInRight z-20 flex flex-col items-start pt-5 space-y-12 font-bold  sm:w-auto sm:self-center top-0 left-44 right-0 bottom-0 bg-[#000000] text-white rounded-b-lg">
        <div className="flex space-x-2 items-center py-4 ps-8">
          <img className="w-44 object-contain" src={LogoSideBlack} alt="" />
        </div>
        <Link
          className="text-xl flex space-x-3 items-center ps-8"
          onClick={skrill}
          to={"/"}
        >
          <span>
            <FaHome />
          </span>
          <span>Home</span>
        </Link>
        <div className="text-xl flex space-x-2 ps-8">
          <span className="mt-3">
            <BsBoxSeam />
          </span>
          <DropdownMenuBar command={skrill} />
        </div>
        <Link
          className="text-xl flex space-x-3 items-center ps-8"
          onClick={skrill}
          to={"/groupchat/list"}
        >
          <span>
            <FaComments />
          </span>
          <span>Group Chat</span>
        </Link>
        <Link
          className="text-xl flex space-x-3 items-center ps-8"
          onClick={skrill}
          to={"/seller/dashboard"}
        >
          <span>
            <MdSell />
          </span>
          <span>Join Sellers</span>
        </Link>
        {!login.serverResponse.success && (
          <div className=" border-y-2  border-[#5F6C72] flex flex-row w-full justify-around">
            <Link to={"/register"}>
              <div className="py-4">Sign Up</div>
            </Link>
            <Link to={"/login"}>
              <div className="border-l-2 border-[#5F6C72] py-4 ps-14">
                Login
              </div>
            </Link>{" "}
          </div>
        )}
        {login.serverResponse.success && (
          <Link
            className="text-xl flex space-x-3 items-center ps-8"
            onClick={skrill}
            to={"/login"}
          >
            <span>
              <FaUser />
            </span>
            <span>Dasboard</span>
          </Link>
        )}
      </div>
    </div>
  );
};
