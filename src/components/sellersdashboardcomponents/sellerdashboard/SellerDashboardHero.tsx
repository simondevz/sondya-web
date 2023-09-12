import {
  Facebook,
  Google,
  Instagram,
  Pinterest,
  Reddit,
  Telegram,
  Twitter,
  Whatsapp,
  userImage,
} from "../../../images/dashboard";

const SellerDashboardHero = () => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3 justify-start w-full">
        <div className="flex flex-col border max-w-[20rem]">
          <div className="p-3 border text-[#191C1F] font-[700] playfair-display">
            Account Info
          </div>
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
              <span className="text-[#191C1F]">Username:</span>
              <span className="text-[#5F6C72]"> kevin12345@gmail.com</span>
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
              <span className="text-[#191C1F]">Country:</span>
              <span className="text-[#5F6C72]">+234 1234 567 890</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">State:</span>
              <span className="text-[#5F6C72]">+234 1234 567 890</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Zip Code:</span>
              <span className="text-[#5F6C72]">+234 1234 567 890</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col border max-w-[20rem]">
          <div className="p-3 border text-[#191C1F]  font-[700] playfair-display">
            Company Details
          </div>
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
            <div className="">
              <span className="text-[#191C1F]">Website:</span>
              <span className="text-[#5F6C72]"> ade.gilbert@gmail.com</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Contact Person:</span>
              <span className="text-[#5F6C72]"> ade.gilbert@gmail.com</span>
            </div>
            <div className="">
              <span className="text-[#191C1F]">Designation:</span>
              <span className="text-[#5F6C72]"> ade.gilbert@gmail.com</span>
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

export default SellerDashboardHero;
