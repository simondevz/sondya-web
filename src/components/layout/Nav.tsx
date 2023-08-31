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

export default Nav;

// const Nav1 = () => {
//   const openRef = useRef<any>("");
//   const flexRef = useRef<any>("hidden");

//   const skrill = () => {
//     openRef.current.className ===
//     "open hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg"
//       ? (openRef.current.className =
//           "hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg")
//       : (openRef.current.className =
//           "open hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg");

//     flexRef.current.className === "hidden md:hidden"
//       ? (flexRef.current.className = "md:hidden")
//       : (flexRef.current.className = "hidden md:hidden");

//     // console.log(openRef.current.className);
//     // console.log(flexRef.current.className);
//   };
//   return (
//     <div>
//       <div className="flex flex-row justify-center space-x-4 p-4">
//         <div className="flex items-center space-x-2">
//           <img className="h-5" src={Logo} alt="" />
//           <div className="">Sell on Connect MI</div>
//         </div>
//         <div className="hidden md:flex items-center space-x-2">
//           <TbTruckDelivery />
//           <div className="">Track Your Orders</div>
//         </div>
//         <div className="hidden md:flex items-center space-x-2">
//           <PiSeal />
//           <div className="">All Offers</div>
//         </div>
//         <div className="flex items-center space-x-2">
//           <GrFavorite />
//           <div className="">Wishlist</div>
//         </div>
//       </div>
//       <div className="flex flex-col space-y-5 md:space-y-0 bg-white rounded-xl p-4">
//         <div className="flex md:justify-center justify-between space-x-8 items-center">
//           <button
//             onClick={skrill}
//             id="menu-btn"
//             ref={openRef}
//             className="flex hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg md:hidden"
//           >
//             <span className="hamburger-top"></span>
//             <span className="hamburger-middle"></span>
//             <span className="hamburger-bottom"></span>
//           </button>
//           <div className="flex items-center space-x-2">
//             <img className="h-5" src={Logo} alt="" />
//             <div className="">Connect MI</div>
//           </div>
//           <div className="hidden md:flex bg-[#ffffff] w-1/3 items-center p-2 justify-around border-2 border-black rounded-xl">
//             <IconContext.Provider value={{ size: "2rem" }}>
//               <BiSearch />
//             </IconContext.Provider>
//             <input
//               className="border-none outline-none shadow-none py-2 w-2/3"
//               type="text"
//               name=""
//               id=""
//               placeholder="Search a product or a service"
//             />
//             <button className="bg-[#222F3E] px-4 py-2 text-white rounded-xl">
//               search
//             </button>
//           </div>
//           <div className="hidden md:flex items-center">
//             <IconContext.Provider value={{ size: "2rem" }}>
//               <HiOutlineUser />
//             </IconContext.Provider>

//             <button>Sign Up/Sign In</button>
//           </div>
//           <div className="flex relative">
//             <IconContext.Provider value={{ size: "2rem" }}>
//               <BsCart />
//             </IconContext.Provider>
//             <span className="px-2 py-1 bg-red-600 text-white rounded-full absolute left-5 -top-4">
//               0
//             </span>
//           </div>
//         </div>
//         <div className="flex md:hidden bg-[#ffffff] w-full items-center p-2 justify-around border-2 border-black rounded-xl">
//           <IconContext.Provider value={{ size: "2rem" }}>
//             <BiSearch />
//           </IconContext.Provider>
//           <input
//             className="border-none outline-none shadow-none py-2 w-2/3"
//             type="text"
//             name=""
//             id=""
//             placeholder="Search a product or a service"
//           />
//           <button className="bg-[#222F3E] px-4 py-2 text-white rounded-xl">
//             search
//           </button>
//         </div>
//       </div>
//       <div ref={flexRef} className="hidden md:hidden">
//         <div className="animate__animated animate__slideInRight absolute z-20 flex flex-col items-start pt-5 ps-8 space-y-5 font-bold  sm:w-auto sm:self-center top-0 left-60 right-0 bottom-0 bg-[#222F3E] text-white">
//           <div className="flex space-x-2 items-center py-4 border-b-[0.5px] border-b-[#5c5656]">
//             <img src={Logo} alt="" />
//             <span className="font-[700] text-2xl">Connect Mi</span>
//           </div>
//           <Link
//             className="text-xl flex space-x-3 items-center"
//             onClick={skrill}
//             to={"/"}
//           >
//             <span>
//               <FaHome />
//             </span>
//             <span>Home</span>
//           </Link>
//           <Link
//             className="text-xl flex space-x-3 items-center"
//             onClick={skrill}
//             to={"/products"}
//           >
//             <span>
//               <BsBoxSeam />
//             </span>
//             <span>Products</span>
//           </Link>
//           <Link
//             className="text-xl flex space-x-3 items-center"
//             onClick={skrill}
//             to={"/services"}
//           >
//             <span>
//               <PiHandCoins />
//             </span>
//             <span>Services</span>
//           </Link>
//           <Link
//             className="text-xl flex space-x-3 items-center"
//             onClick={skrill}
//             to={"/wishlist"}
//           >
//             <span>
//               <MdFavoriteBorder />
//             </span>
//             <span>WishList</span>
//           </Link>
//           <Link
//             className="text-xl flex space-x-3 items-center"
//             onClick={skrill}
//             to={"/search"}
//           >
//             <span>
//               <TbClipboardList />
//             </span>
//             <span>My Items</span>
//           </Link>
//           <Link
//             className="text-xl flex space-x-3 items-center pt-10"
//             onClick={skrill}
//             to={"/support"}
//           >
//             <span>
//               <BiSupport />
//             </span>
//             <span>Support</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
