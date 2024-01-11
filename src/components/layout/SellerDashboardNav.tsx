import { useEffect, useRef, useState } from "react";
import { BiCog, BiLogOut, BiMoneyWithdraw } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import {
  MdChat,
  MdOutlineChangeCircle,
  MdOutlineMiscellaneousServices,
  MdShoppingCart,
  MdStorefront,
} from "react-icons/md";
import { PiStackBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_SESSION } from "../../extraStorage/storageStore";
import { logoutAction } from "../../redux/actions/auth.actions";

const SellerDashboardNav = ({
  isSmScreen = false,
  isOpen = false,
  setIsOpen,
}: {
  isSmScreen?: boolean;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [index, setIndex] = useState<string>("seller-dashboard");

  // for logout
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutAction();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(LOGIN_SESSION);
    }
    navigate("/");
  };

  const menuButtonRef = useRef<any>();

  // handles click outside the navBar
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsOpen && setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuButtonRef, setIsOpen]);

  return (
    <div
      ref={menuButtonRef}
      className={` ${
        isSmScreen && isOpen
          ? "flex md:hidden fixed bg-white z-20 animate__animated animate__slideInLeft overflow-y-auto h-full"
          : !isSmScreen
          ? "hidden md:flex"
          : "hidden"
      } text-[#5F6C72] flex-col gap-3 border py-3 rounded-md w-[17rem] h-fit max-w-[20rem] transform transition-transform duration-300 ease-in-out`}
    >
      <button
        onClick={() => setIsOpen && setIsOpen(false)}
        id="menu-btn"
        className={` ${
          isOpen && "open"
        } flex hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg md:hidden mx-2`}
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "seller-dashboard" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/seller/dashboard");
          setIndex("seller-dashboard");
        }}
      >
        <span>
          <PiStackBold />
        </span>
        <span className="whitespace-nowrap">Dashboard</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "seller-business-analytics" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/seller/analytics");
          setIndex("seller-business-analytics");
        }}
      >
        <span>
          <BsCart />
        </span>
        <span className="whitespace-nowrap">Business Analytics</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "seller-products" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/seller/products");
          setIndex("seller-products");
        }}
      >
        <span>
          <MdStorefront />
        </span>
        <span className="whitespace-nowrap">Products</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "seller-services" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/seller/services");
          setIndex("seller-services");
        }}
      >
        <span>
          <MdOutlineMiscellaneousServices />
        </span>
        <span className="whitespace-nowrap">Services</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "seller-orders-products" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/seller/orders/products");
          setIndex("seller-orders-products");
        }}
      >
        <span>
          <MdShoppingCart />
        </span>
        <span className="whitespace-nowrap">Product Orders</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "seller-orders-services" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/seller/orders/services");
          setIndex("seller-orders-services");
        }}
      >
        <span>
          <GoChecklist />
        </span>
        <span className="whitespace-nowrap">Service Orders</span>
      </div>

      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "inbox" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/seller/inbox");
          setIndex("inbox");
        }}
      >
        <span>
          <MdChat />
        </span>
        <Link to={"/track-Order"}>
          <span className="whitespace-nowrap">Inbox </span>
        </Link>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "seller-withdrawal" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/seller/withdrawal");
          setIndex("seller-withdrawal");
        }}
      >
        <span>
          <BiMoneyWithdraw />
        </span>
        <span className="whitespace-nowrap">Withdrawal</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "user-page" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/dashboard");
          setIndex("user-page");
        }}
      >
        <span>
          <MdOutlineChangeCircle />
        </span>
        <span className="whitespace-nowrap">Go to User page</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "seller-settings" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/seller/settings");
          setIndex("seller-settings");
        }}
      >
        <span>
          <BiCog />
        </span>
        <span className="whitespace-nowrap">Settings</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "log-out" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("log-out");
          logoutHandler();
        }}
      >
        <span>
          <BiLogOut />
        </span>
        <span className="whitespace-nowrap">Log out</span>
      </div>
    </div>
  );
};

export default SellerDashboardNav;
