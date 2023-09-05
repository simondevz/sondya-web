import {
  Facebook,
  Google,
  Instagram,
  Package,
  Pinterest,
  Receipt,
  Reddit,
  Rocket,
  Telegram,
  Twitter,
  Whatsapp,
  userImage,
} from "../../../images/dashboard";

const DashboardHero = () => {
  return (
    <section className="flex flex-col gap-3">
      <div className="text-[#EDB842] playfair-display font-[900] text-xl">
        Hello, Ade
      </div>
      <div className="max-w-[35rem] text-[#475156] font-[500]">
        From your account dashboard. you can easily check & view your Recent
        Orders, manage your{" "}
        <span className="text-[#000000] font-[600]">
          Shipping and Billing Addresses
        </span>{" "}
        and edit your{" "}
        <span className="text-[#000000] font-[600]">Password</span> and{" "}
        <span className="text-[#000000] font-[600]">Account Details</span> .
      </div>
      <div className="flex flex-wrap gap-3 justify-start md:justify-around w-full">
        <div className="flex flex-col border max-w-[20rem]">
          <div className="p-3 border text-[#191C1F]">Account Info</div>
          <div className="flex flex-col gap-2 p-3 border flex-grow">
            <div className="flex flex-row gap-2">
              <div className="">
                <img
                  className="object-cover rounded-full"
                  src={userImage}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[#191C1F]">Adekunle Gilbert</div>
                <div className="text-[#5F6C72]">Dhaka - 1207, Bangladesh</div>
              </div>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Email:</span>
              <span className="text-[#5F6C72]"> ade.gilbert@gmail.com</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Sec Email:</span>
              <span className="text-[#5F6C72]">kevin12345@gmail.com</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Phone:</span>
              <span className="text-[#5F6C72]">+234 1234 567 890</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col border max-w-[20rem]">
          <div className="p-3 border text-[#191C1F]">Billing address</div>
          <div className="flex flex-col gap-2 p-3 border flex-grow">
            <div className="">
              <div className="text-[#191C1F]">Adekunle Gilbert</div>
              <div className="text-[#5F6C72]">
                East Ikoyi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C,
                Flat No. 5D, Ikeja - 1200, Lagos
              </div>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Phone:</span>
              <span className="text-[#5F6C72]">+234 1234 567 890</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Email:</span>
              <span className="text-[#5F6C72]"> ade.gilbert@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap me-auto md:flex-col gap-3">
          <div className="flex flex-1 flex-row items-center gap-2 bg-[#EDB84233] py-3 px-5 rounded-md w-[16rem]">
            <div className="p-2 bg-white">
              <img src={Rocket} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-[700] playfair-display">154</div>
              <div className="font-[400]">Total Orders</div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 bg-[#FFF3EB] py-3 px-5 rounded-md w-[16rem]">
            <div className="p-2 bg-white">
              <img src={Receipt} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-[700] playfair-display">05</div>
              <div className="font-[400]">Total Orders</div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 bg-[#EAF7E9] py-3 px-5 rounded-md w-[16rem]">
            <div className="p-2 bg-white">
              <img src={Package} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-[700] playfair-display">149</div>
              <div className="font-[400]">Total Orders</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-[600] playfair-display text-[#243A73]">
          Socials
        </div>
        <div className="flex flex-row gap-2">
          <img className="object-cover w-8 h-8" src={Facebook} alt="" />
          <img className="object-cover w-8 h-8" src={Instagram} alt="" />
          <img className="object-cover w-8 h-8" src={Google} alt="" />
          <img className="object-cover w-8 h-8" src={Twitter} alt="" />
          <img className="object-cover w-8 h-8" src={Telegram} alt="" />
          <img className="object-cover w-8 h-8" src={Reddit} alt="" />
          <img className="object-cover w-8 h-8" src={Whatsapp} alt="" />
          <img className="object-cover w-8 h-8" src={Pinterest} alt="" />
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
