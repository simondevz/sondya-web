import { useState } from "react";
import { BiMap, BiMoneyWithdraw } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import {
  MdOutlineMiscellaneousServices,
  MdPayment,
  MdStorefront,
} from "react-icons/md";
import { PiClockClockwiseLight, PiStackBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_SESSION } from "../../extraStorage/storageStore";
import { logoutAction } from "../../redux/actions/auth.actions";

const SellerDashboardNav = () => {
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
  return (
    <div className="text-[#5F6C72] hidden md:flex flex-col gap-3 border py-3 rounded-md w-[17rem] h-fit max-w-[17rem]">
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
          index === "seller-orders" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/seller/order");
          setIndex("seller-orders");
        }}
      >
        <span>
          <MdPayment />
        </span>{" "}
        <span className="whitespace-nowrap">Orders</span>
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
        </span>{" "}
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
        </span>{" "}
        <span className="whitespace-nowrap">Services</span>
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
          <BiMap />
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
        </span>{" "}
        <span className="whitespace-nowrap">Withdrawal</span>
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
          <PiClockClockwiseLight />
        </span>{" "}
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
          <PiClockClockwiseLight />
        </span>{" "}
        <span className="whitespace-nowrap">Log out</span>
      </div>
    </div>
  );
};

export default SellerDashboardNav;
