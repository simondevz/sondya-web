import { BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { MdMailOutline, MdOutlineLocationOn, MdPhone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LogoSide } from "../../images/logo";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#F8F9FA] text-[#77808B] flex flex-col gap-5 p-5 md:p-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-between">
        <div className="col-span-2 md:col-span-1">
          <img onClick={() => navigate("/")} src={LogoSide} alt="" />
          <div className="">
            Sondya is an E-commerce platform designed and developed for buyers
            and sellers located in Worldwide
          </div>
          <div className="text-[#EDB842]">Copyright Sondya Limited.</div>
        </div>
        <div className="">
          <div className="text-[#EDB842]">Our Service</div>
          <div onClick={() => navigate("/products")} className="">
            Products
          </div>
          <div onClick={() => navigate("/services")} className="">
            Services
          </div>
          <div onClick={() => navigate("/groupchat/list")} className="">
            Group Chat
          </div>
          <div onClick={() => navigate("/wishlist")} className="">
            Wishlist
          </div>
          <div onClick={() => navigate("/register")} className="">
            Sign Up
          </div>
        </div>
        <div className="">
          <div className="text-[#EDB842]">Company</div>
          <div onClick={() => navigate("/about-us")} className="">
            About us
          </div>
          <div onClick={() => navigate("/contact-us")} className="">
            Contact us
          </div>
          <div onClick={() => navigate("/terms")} className="">
            Terms & Conditions
          </div>
          <div onClick={() => navigate("/terms")} className="">
            Privacy Policy
          </div>
          <div onClick={() => navigate("/delete/account")} className="">
            Delete Account
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-around col-span-2 md:col-span-1">
          <div className="">Join a Newsletter</div>
          <div className="flex flex-row gap-2 items-center">
            <input
              className="p-2 border rounded-md"
              type="text"
              placeholder="Input Your email"
            />

            <button className="bg-[#EDB842] text-white p-2 rounded-md">
              Subscribe
            </button>
          </div>
          <div className="flex flex-row gap-2 text-white">
            <span className="bg-[#EDB842] p-2 rounded-full">
              <BsWhatsapp />
            </span>
            <span className="bg-[#EDB842] p-2 rounded-full">
              <BsTwitter />
            </span>
            <span className="bg-[#EDB842] p-2 rounded-full">
              <BsLinkedin />
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-4 border-t-2 border-t-[#76AEFF] py-5">
        <div className="">
          Powered by{" "}
          <a
            className="text-[#EDB842]"
            target="_blank"
            rel="noreferrer"
            href="https://www.snappy-fix.com/"
          >
            Snappy-fix technologies
          </a>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-row gap-1 items-center">
            <span className="text-[#EDB842]">
              <MdOutlineLocationOn />
            </span>{" "}
            <span>8819 Ohio St. Lagos State, CA 90280</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <span className="text-[#EDB842]">
              <MdMailOutline />
            </span>{" "}
            <span>support@sondya.com</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <span className="text-[#EDB842]">
              <MdPhone />
            </span>{" "}
            <span>+234 123-456-789</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
