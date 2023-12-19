import { useState } from "react";
import { BiSolidBadgeCheck, BiMap } from "react-icons/bi";
import {
  BsBookmarkCheck,
  BsCart,
  BsFillChatSquareTextFill,
} from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import {
  MdLogout,
  MdOutlineCategory,
  MdOutlineMiscellaneousServices,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { PiStackBold } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_SESSION } from "../../extraStorage/storageStore";
import { logoutAction } from "../../redux/actions/auth.actions";

const AdminDashboardNav = () => {
  const location = useLocation();
  const [index, setIndex] = useState<string>(
    location?.state?.index || "seller-dashboard"
  );

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
          index === "admin-dashboard" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/admin/dashboard", { state: { index: "admin-dashboard" } });
          setIndex("admin-dashboard");
        }}
      >
        <span>
          <PiStackBold />
        </span>
        <span className="whitespace-nowrap">Dashboard</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-business-analytics" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/admin/analytics", {
            state: { index: "admin-business-analytics" },
          });
          setIndex("admin-business-analytics");
        }}
      >
        <span>
          <BsCart />
        </span>
        <span className="whitespace-nowrap">Business Analytics</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-products" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("admin-products");
          navigate("/admin/products", { state: { index: "admin-products" } });
        }}
      >
        <span>
          <MdProductionQuantityLimits />
        </span>{" "}
        <span className="whitespace-nowrap">Product</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-services" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("admin-services");
          navigate("/admin/services", { state: { index: "admin-services" } });
        }}
      >
        <span>
          <MdOutlineMiscellaneousServices />
        </span>{" "}
        <span className="whitespace-nowrap">Services</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-categories" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("admin-categories");
          navigate("/admin/category", { state: { index: "admin-categories" } });
        }}
      >
        <span>
          <MdOutlineCategory />
        </span>{" "}
        <span className="whitespace-nowrap">Categories</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-orders" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("admin-orders");
          navigate("/admin/orders", { state: { index: "admin-orders" } });
        }}
      >
        <span>
          <BsBookmarkCheck />
        </span>
        <Link to={"/track-Order"}>
          <span className="whitespace-nowrap">Orders</span>
        </Link>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-payments" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("admin-payments");
          navigate("/admin/payments", { state: { index: "admin-payments" } });
        }}
      >
        <span>
          <BsBookmarkCheck />
        </span>
        <Link to={"/admin/payments"}>
          <span className="whitespace-nowrap">Payments</span>
        </Link>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-users" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("admin-users");
          navigate("/admin/users", { state: { index: "admin-users" } });
        }}
      >
        <span>
          <FaUsers />
        </span>{" "}
        <span className="whitespace-nowrap">Users</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-testimonial" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("admin-testimonial");
          navigate("/admin/testimonial", {
            state: { index: "admin-testimonial" },
          });
        }}
      >
        <span>
          <BiSolidBadgeCheck />
        </span>{" "}
        <span className="whitespace-nowrap">Testimonial</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "inbox" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          navigate("/admin/inbox");
          setIndex("inbox");
        }}
      >
        <span>
          <BiMap />
        </span>
        <span className="whitespace-nowrap">Inbox </span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-group-chats" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("admin-group-chats");
          navigate("/admin/groupchat/list", {
            state: { index: "admin-group-chats" },
          });
        }}
      >
        <span>
          <BsFillChatSquareTextFill />
        </span>{" "}
        <span className="whitespace-nowrap">Group Chats</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "log-out" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          logoutHandler();
          setIndex("log-out");
        }}
      >
        <span>
          <MdLogout />
        </span>{" "}
        <span className="whitespace-nowrap">Log out</span>
      </div>
    </div>
  );
};

export default AdminDashboardNav;
