import { JBL } from "../../images/products";

const Enhance = () => {
  return (
    <section className="bg-[#000000] flex flex-col md:flex-row py-10 px-5 gap-4 justify-center">
      <div className="flex flex-col gap-2 md:w-1/3">
        <div className="font-[600] text-[48px] text-white playfair-display">
          Enhance Your Music Experience
        </div>
        <div className="">
          <button className="p-3 text-white bg-[#EDB842] flex-none w-1/2">
            Buy Now
          </button>
        </div>
      </div>
      <div className="p-3 md:w-1/3 rounded-full bg-[#0c0c0c]">
        <img className="object-contain w-full h-full" src={JBL} alt="" />
      </div>
    </section>
  );
};

export default Enhance;
