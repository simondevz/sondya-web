import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../css/Nav.css";
import { LogoSide } from "../../images/logo";
import { ReducersType } from "../../redux/store";
import { LoginResponseType } from "../../redux/types/auth.types";
import { ReduxResponseType } from "../../redux/types/general.types";
import AdminDashboardNav from "./AdminDashboardNav";
import { UserDashboardNav } from "./DashboardNav";
import {
  HomeNavSmallScreen,
  LargeScreenNav,
  NavCartAndLogin,
  NavSearchInput,
  SellerSwitchNav,
} from "./NavComponents";
import SellerDashboardNav from "./SellerDashboardNav";

type NavType = {
  isAuth?: boolean;
  isHome?: boolean;
  isSellerDasboard?: boolean;
  isUserDashBoard?: boolean;
  isAdminDasboard?: boolean;
  isProductSearch?: boolean;
  isServiceSearch?: boolean;
};

const Nav = ({
  isAuth = false,
  isHome = false,
  isSellerDasboard = false,
  isUserDashBoard = false,
  isAdminDasboard = false,
}: NavType) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

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

  // side navBar starts
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
  // side navBar ends

  // get login
  const login = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType[]>;
  // get login ends

  // console.log(isOpen);
  return (
    <div className="z-40 bg-white w-full flex flex-col flex-grow shadow-sm">
      <div
        className={`${
          isScrolled ? "fixed py-2 bg-[#F8F9FA]" : "bg-white py-2"
        } flex flex-wrap justify-evenly items-center playfair-display  w-full z-20 gap-2 px-5`}
      >
        {isHome || isAuth ? (
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
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            id="menu-btn"
            className="flex hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg md:hidden mx-2"
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        )}
        <img
          onClick={() => navigate("/")}
          className="object-cover w-32 me-auto"
          src={LogoSide}
          alt=""
        />
        <NavSearchInput isMdScreen={true} />
        <NavCartAndLogin login={login} />
        <NavSearchInput isMdScreen={false} />
      </div>
      <LargeScreenNav />
      {!isAuth && <SellerSwitchNav />}
      <HomeNavSmallScreen login={login} flexRef={flexRef} skrill={skrill} />
      {isUserDashBoard && (
        <UserDashboardNav isSmScreen isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {isSellerDasboard && (
        <SellerDashboardNav isSmScreen isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {isAdminDasboard && (
        <AdminDashboardNav isSmScreen isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default Nav;
