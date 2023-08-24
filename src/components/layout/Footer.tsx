import { LogoSide } from "../../images/logo";
import { ButtonSondya, InputSondya } from "../shareables/FormShareables";

const Footer = () => {
  return (
    <footer className="bg-[#F8F9FA]">
      <div className="">
        <div className="">
          <img src={LogoSide} alt="" />
          <div className="">
            Sondya is an E-commerce platform designed and developed for buyers
            and sellers located in Nigeria, Africa.
          </div>
          <div className="">Copyright Sondya Corp.</div>
        </div>
        <div className="flex">
          <div className="">
            <div className="text-[#EDB842]">Service</div>
            <div className="">Whole-sell</div>
            <div className="">Retail</div>
            <div className="">EDI</div>
            <div className="">Supply Chain</div>
            <div className="">Development</div>
            <div className="">Internet Marketing</div>
          </div>
          <div className="">
            <div className="">Company</div>
            <div className="">Service</div>
            <div className="">Features</div>
            <div className="">Our Team</div>
            <div className="">Portfolio</div>
            <div className="">Blog</div>
            <div className="">Contact Us</div>
          </div>
        </div>
        <div className="max-w-2xl">
          <div className="">Join a Newsletter</div>
          <div className="flex flex-row gap-1">
            <div className="flex flex-col">
              <label htmlFor="">Subject</label>
              <InputSondya placeholder={"This is an optional"} />
            </div>
            <ButtonSondya text={"Subscribe"} />
          </div>
        </div>
      </div>
      <div className=""></div>
    </footer>
  );
};

export default Footer;
