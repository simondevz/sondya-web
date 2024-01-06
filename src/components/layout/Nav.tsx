import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { FaComments, FaHome, FaUser } from "react-icons/fa";
import { MdFavoriteBorder, MdPersonOutline, MdSell } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Nav.css";
import { Category } from "../../data/CategoryData";
import { LogoSide, LogoSideBlack } from "../../images/logo";
import { totalCartAction } from "../../redux/actions/cart.actions";
import { ReducersType } from "../../redux/store";
import { LoginResponseType } from "../../redux/types/auth.types";
import { ReduxResponseType } from "../../redux/types/general.types";
import {
  Dropdown,
  DropdownMenuBar,
  DropdownMenuForLargeScreen,
} from "../shareables/Dropdown";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // for the on change scrollable navbar
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // for the on change scrollable navbar ends

  const openRef = useRef<any>("");
  const flexRef = useRef<any>("hidden");

  const skrill = () => {
    openRef.current.className ===
    "open hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg"
      ? (openRef.current.className =
          "hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg")
      : (openRef.current.className =
          "open hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg");

    flexRef.current.className === "hidden md:hidden"
      ? (flexRef.current.className = "md:hidden")
      : (flexRef.current.className = "hidden md:hidden");
  };

  const login = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType[]>;

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

  // bounce cart on change
  const [totalCartItemsChanged, setTotalCartItemsChanged] = useState(false);

  useEffect(() => {
    setTotalCartItemsChanged(true);
    setTimeout(() => {
      setTotalCartItemsChanged(false);
    }, 600); // Adjust animation duration as needed
  }, [totalCartItems]);

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

  // search button
  // const history = useHistory();
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

  return (
    <div className="z-40 bg-white w-full flex flex-col flex-grow shadow-sm">
      {/* <div
        className={` ${
          isScrolled ? "hidden" : "flex"
        } flex-wrap gap-3 justify-center bg-[#EDB842] py-2 px-10`}
      >
        <div className="flex space-x-3">
          <div className="flex items-center space-x-1">
            <span className="text-white">
              <MdLocationPin />
            </span>
            <span className="text-[#666666]">
              Deliver to <span className="font-[700]">411017</span>
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-white">
              <BsTruck />
            </span>
            <span className="text-[#666666]">Track your order</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-white">
              <GoVerified />
            </span>
            <span className="text-[#666666]">All Offers</span>
          </div>
        </div>
      </div> */}
      <div
        className={`${
          isScrolled ? "fixed py-2 bg-[#F8F9FA]" : "bg-white py-2"
        } flex flex-wrap justify-evenly items-center playfair-display  w-full z-20 gap-2 px-5`}
      >
        <button
          onClick={skrill}
          id="menu-btn"
          ref={openRef}
          className="flex hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg md:hidden mx-2"
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
        <img
          onClick={() => navigate("/")}
          className="object-cover w-32 me-auto"
          src={LogoSide}
          alt=""
        />
        <div className="hidden md:flex border-[2px] border-[#EDB842] rounded-md">
          <input
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 p-2 outline-none font-[600]"
            type="text"
            placeholder="Search"
            value={search}
          />
          <Dropdown options={Category} setCategorySelect={setCategorySelect} />
          <button
            onClick={handleSearch}
            className="bg-[#EDB842] text-white p-2 font-[700]"
          >
            Search
          </button>
        </div>
        <div className="flex p-2 gap-2 ms-auto">
          <Link to={"/login"}>
            <div className="flex gap-2 items-center">
              <span className="text-[#EDB842] text-2xl">
                <MdPersonOutline />
              </span>
              {login.serverResponse.success ? "Dashboard" : "Login"}
            </div>
          </Link>
          {/* <div className="flex gap-2 items-center border-l-[2px] border-[#D9D9D9] px-2"> */}
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
          {/* </div> */}
        </div>
        <div className="flex flex-row md:hidden border-[2px] border-[#EDB842] rounded-md w-full">
          <input
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 p-2 outline-none font-[600] flex-1"
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
      </div>
      <div className="hidden md:flex bg-[#000000] p-3 text-white justify-center gap-5 playfair-display items-center">
        <div className="border-r-[0.4px] px-5 border-[#afa9a9]">
          <Link to={"/"}>Home</Link>
        </div>
        <div className="border-r-[0.4px] px-5 border-[#afa9a9]">
          {/* <Link to={"/product"}>Category</Link> */}
          <DropdownMenuForLargeScreen />
        </div>
        <div className="border-r-[0.4px] px-5 border-[#afa9a9]">
          <Link to={"/groupchat/list"}>Groupchat</Link>
        </div>
        <div className="px-5">
          <Link to={"/seller/dashboard"}>Join Sellers</Link>
        </div>

        {/* <div className="border-r-[0.4px] px-5 border-[#afa9a9]">
          <Link to={"/contact-us"}>Contact</Link>
        </div>
        <div className="px-5">
          <Link to={"/about-us"}>About Us</Link>
        </div> */}
      </div>
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
    </div>
  );
};

export default Nav;
