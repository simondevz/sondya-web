import { useEffect, useState } from "react";
import { BiMap } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { MdPayment, MdStorefront } from "react-icons/md";
import { PiClockClockwiseLight, PiStackBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_SESSION } from "../../extraStorage/storageStore";
import { ReducersType } from "../../redux/store";
import { LoginResponseType } from "../../redux/types/auth.types";
import { ReduxResponseType } from "../../redux/types/general.types";

const AdminDashboardNav = () => {
  const [index, setIndex] = useState<string>("seller-dashboard");

  // for logout
  const navigate = useNavigate();
  const [loginRedux, setLoginRedux] =
    useState<ReduxResponseType<LoginResponseType>>();

  const _loginRedux = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType>;

  const logoutHandler = () => {
    console.log(_loginRedux);
    // dispatch(logoutAction() as any);
    if (typeof window !== "undefined") {
      // window.location.href = window.location.origin;
      window.localStorage.removeItem(LOGIN_SESSION);
    }
    navigate("/");
  };

  useEffect(() => {
    if (_loginRedux?.serverResponse?.success) {
      setLoginRedux(_loginRedux);
    }
  }, [_loginRedux]);

  return (
    <div className="text-[#5F6C72] hidden md:flex flex-col gap-3 border py-3 rounded-md w-[17rem] h-fit max-w-[17rem]">
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-dashboard" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("admin-dashboard")}
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
        onClick={() => setIndex("admin-business-analytics")}
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
        onClick={() => setIndex("admin-products")}
      >
        <span>
          <MdPayment />
        </span>{" "}
        <span className="whitespace-nowrap">Product</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-categories" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("admin-categories")}
      >
        <span>
          <MdStorefront />
        </span>{" "}
        <span className="whitespace-nowrap">Categories</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-orders" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("admin-orders")}
      >
        <span>
          <BiMap />
        </span>
        <Link to={"/track-Order"}>
          <span className="whitespace-nowrap">Orders</span>
        </Link>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-users" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("admin-users")}
      >
        <span>
          <PiClockClockwiseLight />
        </span>{" "}
        <span className="whitespace-nowrap">Users</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "admin-testimonial" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("admin-testimonial")}
      >
        <span>
          <PiClockClockwiseLight />
        </span>{" "}
        <span className="whitespace-nowrap">Testimonial</span>
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
          <PiClockClockwiseLight />
        </span>{" "}
        <span className="whitespace-nowrap">Log out</span>
      </div>
    </div>
  );
};

export default AdminDashboardNav;
