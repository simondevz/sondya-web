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
import { API_ROUTES } from "../../redux/routes";
import useWebSocket from "react-use-websocket";
import { toast } from "react-toastify";
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
  ) as ReduxResponseType<LoginResponseType>;

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

  // Websocket for notifications
  const socketUrl = API_ROUTES.websocket.notifications;
  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    const connectionTesterFunc = () => {
      if (login?.serverResponse?.data?.id)
        sendMessage(
          JSON.stringify({
            meta: "testing_connection",
            receiver_id: login?.serverResponse?.data?.id,
            sender_id: login?.serverResponse?.data?.id,
            payload: {
              meta: "testing_connection",
              message: "connection tested user in rooms",
            },
          })
        );
    };
    connectionTesterFunc();
    const connectionTester = setInterval(connectionTesterFunc, 60 * 1000);
    return clearInterval(connectionTester);
  }, [login?.serverResponse?.data?.id, sendMessage]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage?.data);

      if (data?.meta) {
        if (data?.meta === "echo_payload") {
          toast(data?.data?.title || "You Have a new notification", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // add 1 to the notification count
        }

        if (data?.meta === "connection_tested") {
          console.log(data);
        }
      }
    }
  }, [lastMessage]);

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
