import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { MdLocationPin, MdPersonOutline } from "react-icons/md";
import { Category } from "../../data/CategoryData";
import { LogoSide } from "../../images/logo";
import { Dropdown } from "../shareables/Dropdown";

const Nav = () => {
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
      <div className="flex bg-[#000000] p-3 text-white justify-center gap-5 playfair-display">
        <div className="border-r-[0.4px] px-5 border-[#afa9a9]">Home</div>
        <div className="border-r-[0.4px] px-5 border-[#afa9a9]">Category</div>
        <div className="border-r-[0.4px] px-5 border-[#afa9a9]">Contact</div>
        <div className="px-5">About Us</div>
      </div>
      <div className="flex flex-row justify-around text-[#1C1C1C] playfair-display p-2">
        <div className="flex flex-row gap-2">
          <div className="">All category</div>
          <div className="">Hot offers</div>
          <div className="">Hot offers</div>
          <div className="">Affiliate</div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="">English,USD</div>
          <div className="">Ship to</div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
