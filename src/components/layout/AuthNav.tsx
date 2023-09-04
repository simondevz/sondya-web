import { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBoxSeam, BsTruck } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import {
  MdFavoriteBorder,
  MdLocationPin,
  MdPersonOutline,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "../../css/Nav.css";
import { Category } from "../../data/CategoryData";
import { LogoSide } from "../../images/logo";
import { Dropdown } from "../shareables/Dropdown";

const AuthNav = () => {
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

    // console.log(openRef.current.className);
    // console.log(flexRef.current.className);
  };

  return (
    <div className="z-40 bg-white w-full flex flex-col flex-grow shadow-sm">
      <div
        className={` ${
          isScrolled ? "hidden" : "flex"
        } flex-wrap gap-3 justify-center md:justify-between bg-[#EDB842] py-2 px-10`}
      >
        <div className="text-[#666666]">Delivery in 10 minutes</div>
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
      </div>
      <div
        className={`${
          isScrolled ? "fixed py-6 bg-[#F8F9FA]" : "bg-white py-2"
        } flex flex-wrap justify-evenly items-center playfair-display  w-full z-20 gap-3 px-5`}
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
        <img className="object-cover w-32 me-auto" src={LogoSide} alt="" />
        <div className="hidden md:flex border-[2px] border-[#EDB842] rounded-md">
          <input className="border-0 p-2 outline-none font-[600]" type="text" />
          <Dropdown options={Category} />
          <button className="bg-[#EDB842] text-white p-2 font-[700]">
            Search
          </button>
        </div>
        <div className="flex p-2 gap-2 ms-auto">
          <div className="flex gap-2 items-center">
            <span className="text-[#EDB842] text-2xl">
              <MdPersonOutline />
            </span>
            Login
          </div>
          <div className="flex gap-2 items-center border-l-[2px] border-[#D9D9D9] px-2">
            <span className="text-[#EDB842] text-2xl">
              <AiOutlineShoppingCart />
            </span>
            Cart
          </div>
        </div>
        <div className="flex flex-row md:hidden border-[2px] border-[#EDB842] rounded-md w-full">
          <input
            className="border-0 p-2 outline-none font-[600] flex-1"
            type="text"
          />
          <Dropdown options={Category} />
          <button className="bg-[#EDB842] text-white py-2 font-[700] px-5">
            Search
          </button>
        </div>
      </div>
      <div
        ref={flexRef}
        className={`hidden md:hidden`}
        // style={{ display: isScrolled ? "hidden !important" : "visible" }}
      >
        <div className="fixed animate__animated animate__slideInRight z-20 flex flex-col items-start pt-5 ps-8 space-y-5 font-bold  sm:w-auto sm:self-center top-0 left-44 right-0 bottom-0 bg-[#6c6a6a] text-white rounded-b-lg">
          <div className="flex space-x-2 items-center py-4 border-b-[0.5px] border-b-[#5c5656]">
            <img src={LogoSide} alt="" />
          </div>
          <Link
            className="text-xl flex space-x-3 items-center"
            onClick={skrill}
            to={"/"}
          >
            <span>
              <FaHome />
            </span>
            <span>Home</span>
          </Link>
          <Link
            className="text-xl flex space-x-3 items-center"
            onClick={skrill}
            to={"/products"}
          >
            <span>
              <BsBoxSeam />
            </span>
            <span>Products</span>
          </Link>
          <Link
            className="text-xl flex space-x-3 items-center"
            onClick={skrill}
            to={"/services"}
          >
            <span>
              <MdFavoriteBorder />
            </span>
            <span>Services</span>
          </Link>
          <Link
            className="text-xl flex space-x-3 items-center"
            onClick={skrill}
            to={"/wishlist"}
          >
            <span>
              <MdFavoriteBorder />
            </span>
            <span>WishList</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthNav;
